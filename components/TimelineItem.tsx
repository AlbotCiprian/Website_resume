"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { ExperienceItem } from "@/content/experience";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

export function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  const reducedMotion = useReducedMotion();
  const isLeft = index % 2 === 0;

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, x: isLeft ? -30 : 30, y: 12 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reducedMotion ? undefined : { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.04 * (index % 4) }}
      className={cn(
        "relative pl-10 lg:w-[calc(50%-1.5rem)] lg:pl-0",
        isLeft ? "lg:mr-auto lg:pr-10" : "lg:ml-auto lg:pl-10",
      )}
    >
      <span
        className={cn(
          "absolute top-2 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_0_6px_rgba(34,211,238,0.16)]",
          "left-0",
          isLeft ? "lg:left-auto lg:right-[-6px]" : "lg:left-[-6px]",
        )}
      />

      <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-zinc-900/70 dark:shadow-[0_18px_44px_rgba(2,8,20,0.36)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.18em] text-slate-500 uppercase dark:text-zinc-500">{item.type}</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{item.role}</h3>
            <p className="text-slate-600 dark:text-zinc-300">{item.company}</p>
          </div>

          <div className={cn("text-right", isLeft ? "lg:text-right" : "lg:text-left")}>
            <p className="text-sm text-slate-600 dark:text-zinc-300">{item.period}</p>
            <p className="text-xs text-slate-500 dark:text-zinc-500">{item.location}</p>
          </div>
        </div>

        <ul className="mt-5 space-y-2 text-sm leading-7 text-slate-600 dark:text-zinc-300">
          {item.bullets.map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={reducedMotion ? undefined : { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="mt-5 flex flex-wrap gap-2"
        >
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[11px] text-slate-700 dark:text-zinc-300">
              {tag}
            </Badge>
          ))}
        </motion.div>
      </div>
    </motion.article>
  );
}
