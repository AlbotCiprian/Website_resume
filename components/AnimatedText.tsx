"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type AnimatedTextProps = {
  items: string[];
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

  return (
    <span className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={items[index]}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
