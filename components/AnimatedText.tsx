"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type AnimatedTextProps = {
  items: readonly string[];
  className?: string;
  intervalMs?: number;
};

export function AnimatedText({ items, className, intervalMs = 2200 }: AnimatedTextProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (items.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [items, intervalMs]);

  if (!items.length) {
    return null;
  }

  const words = items[index].split(" ");

  return (
    <span className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={items[index]}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex flex-wrap gap-x-1.5"
        >
          {words.map((word, wordIndex) => (
            <motion.span
              key={`${word}-${wordIndex}`}
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              animate={reducedMotion ? false : { opacity: 1, y: 0 }}
              transition={reducedMotion ? undefined : { duration: 0.24, delay: wordIndex * 0.05 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
