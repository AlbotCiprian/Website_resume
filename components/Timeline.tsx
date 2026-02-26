"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { ExperienceItem } from "@/content/experience";
import { staggerChildren } from "@/lib/motion";

import { TimelineItem } from "@/components/TimelineItem";

export function Timeline({ items }: { items: ExperienceItem[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative space-y-8 before:absolute before:left-[5px] before:top-2 before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-cyan-400/60 before:to-transparent"
      transition={reducedMotion ? { duration: 0 } : undefined}
    >
      {items.map((item) => (
        <TimelineItem key={item.id} item={item} />
      ))}
    </motion.div>
  );
}
