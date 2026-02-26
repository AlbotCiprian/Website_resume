"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { ExperienceItem } from "@/content/experience";
import { revealOnScroll, staggerContainer } from "@/lib/motion";

import { TimelineItem } from "@/components/TimelineItem";

export function Timeline({ items }: { items: ExperienceItem[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div variants={staggerContainer} {...revealOnScroll} className="relative">
      <motion.span
        className="absolute left-[5px] top-2 h-[calc(100%-1.2rem)] w-px origin-top bg-gradient-to-b from-cyan-400/70 via-cyan-500/40 to-transparent lg:left-1/2 lg:-translate-x-1/2"
        initial={reducedMotion ? false : { scaleY: 0, opacity: 0.3 }}
        whileInView={reducedMotion ? undefined : { scaleY: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={reducedMotion ? undefined : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="space-y-8 lg:space-y-10">
        {items.map((item, index) => (
          <TimelineItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
