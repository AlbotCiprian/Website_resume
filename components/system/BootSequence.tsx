"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { TypewriterText } from "./TypewriterText";

type BootLine = {
  /** Body text after the `>` glyph. */
  text: string;
  /** Optional trailing status — rendered to the right of the line. */
  status?: "ok" | "warn" | "info";
  /** Typing speed in characters per second. */
  speed?: number;
};

type BootSequenceProps = {
  lines?: BootLine[];
  /** Called once every line has finished typing. */
  onComplete?: () => void;
  className?: string;
};

const DEFAULT_LINES: BootLine[] = [
  { text: "booting albot-os v2026.05", status: "info", speed: 38 },
  { text: "loading backend.architecture.modules", status: "ok", speed: 44 },
  { text: "scanning production.experience", status: "ok", speed: 44 },
  { text: "validating database.layer", status: "ok", speed: 46 },
  { text: "initializing api.gateway", status: "ok", speed: 46 },
  { text: "system ready.", status: "ok", speed: 30 },
];

const STATUS_TONE: Record<NonNullable<BootLine["status"]>, string> = {
  ok: "text-accent-positive term-glow-green",
  warn: "text-accent-warning",
  info: "text-accent-cyan",
};

const STATUS_LABEL: Record<NonNullable<BootLine["status"]>, string> = {
  ok: "[ OK ]",
  warn: "[ WARN ]",
  info: "[ .... ]",
};

/**
 * BootSequence — orchestrated boot lines with retro typing effect.
 *
 * Lines reveal one after another via TypewriterText. The status tag fades
 * in once the line finishes typing, then the next line begins. Final line
 * leaves a blinking cursor on the prompt.
 *
 * Behaviour:
 *   - prefers-reduced-motion: all lines appear instantly, then the cursor
 *     blinks once and `onComplete` fires.
 *   - The component is purely visual; consumers can listen to `onComplete`
 *     to chain follow-up reveals (e.g. headline appearing after boot).
 */
export function BootSequence({ lines = DEFAULT_LINES, onComplete, className }: BootSequenceProps) {
  const reducedMotion = useReducedMotion();
  const [typedLine, setTypedLine] = useState(0);
  // When reduced motion is on, jump straight to the fully revealed state
  // (derived during render, so no setState-in-effect is needed).
  const currentLine = reducedMotion ? lines.length : typedLine;

  // Reduced motion still needs to notify the consumer once, via an effect.
  useEffect(() => {
    if (reducedMotion) {
      onComplete?.();
    }
  }, [reducedMotion, onComplete]);

  return (
    <div className={cn("mono space-y-1.5 text-[12.5px] leading-6 md:text-[13px]", className)}>
      {lines.map((line, index) => {
        const isVisible = index <= currentLine;
        const isCurrent = index === currentLine && !reducedMotion;
        const isLast = index === lines.length - 1;

        if (!isVisible) return null;

        return (
          <div key={index} className="flex items-center gap-3">
            <span aria-hidden className="text-ink-faint">{">"}</span>
            <span className="flex-1 text-ink-soft">
              {isCurrent ? (
                <TypewriterText
                  text={line.text}
                  speed={line.speed ?? 38}
                  cursor={isLast}
                  cursorTone={line.status === "ok" ? "green" : "amber"}
                  onDone={() => {
                    if (isLast) {
                      onComplete?.();
                      return;
                    }
                    // Move to the next line after a short beat.
                    window.setTimeout(() => setTypedLine((value) => value + 1), 110);
                  }}
                />
              ) : (
                <span>
                  {line.text}
                  {isLast && reducedMotion ? <span aria-hidden className="term-cursor term-cursor-green" /> : null}
                </span>
              )}
            </span>
            {line.status && (index < currentLine || (reducedMotion && index <= currentLine)) ? (
              <span className={cn("mono text-[10.5px] tracking-[0.16em] uppercase", STATUS_TONE[line.status])}>
                {STATUS_LABEL[line.status]}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
