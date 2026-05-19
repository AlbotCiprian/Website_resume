"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type TypewriterTextProps = {
  /** The full string to type out. */
  text: string;
  /** Characters typed per second. Defaults to 32 (~31ms/char). */
  speed?: number;
  /** Delay before typing starts, in ms. */
  delay?: number;
  /** Show a blinking cursor after typing finishes. */
  cursor?: boolean;
  /** Cursor color tone. */
  cursorTone?: "amber" | "green";
  /** Fired once the line finishes typing. */
  onDone?: () => void;
  className?: string;
};

/**
 * TypewriterText — types a string out character-by-character. Respects
 * `prefers-reduced-motion`: when set, the full string appears immediately
 * and `onDone` fires on next tick.
 *
 * The component renders the typed substring as a `<span>` so it can sit
 * inline with surrounding markup (e.g. `> booting...` lines).
 */
export function TypewriterText({
  text,
  speed = 32,
  delay = 0,
  cursor = false,
  cursorTone = "amber",
  onDone,
  className,
}: TypewriterTextProps) {
  const reducedMotion = useReducedMotion();
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (reducedMotion) {
      setOutput(text);
      setDone(true);
      const id = window.setTimeout(() => onDoneRef.current?.(), 0);
      return () => window.clearTimeout(id);
    }

    let cancelled = false;
    let index = 0;
    const intervalMs = Math.max(8, Math.round(1000 / speed));

    const startId = window.setTimeout(() => {
      const id = window.setInterval(() => {
        if (cancelled) return;
        index += 1;
        setOutput(text.slice(0, index));
        if (index >= text.length) {
          window.clearInterval(id);
          setDone(true);
          onDoneRef.current?.();
        }
      }, intervalMs);
    }, delay);

    return () => {
      cancelled = true;
      window.clearTimeout(startId);
    };
  }, [text, speed, delay, reducedMotion]);

  return (
    <span className={cn("whitespace-pre-wrap", className)}>
      <span>{output}</span>
      {cursor && done ? (
        <span
          aria-hidden
          className={cn("term-cursor", cursorTone === "green" && "term-cursor-green")}
        />
      ) : null}
    </span>
  );
}
