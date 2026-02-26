"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { ExperienceItem } from "@/content/experience";
import { fadeUp } from "@/lib/motion";

import { Badge } from "@/components/ui/badge";

export function TimelineItem({ item }: { item: ExperienceItem }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={reducedMotion ? { duration: 0 } : undefined}
      className="relative pl-10"
    >
      <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_0_6px_rgba(34,211,238,0.15)]" />

      <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 dark:border-white/10 dark:bg-zinc-900/70">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.18em] text-slate-500 uppercase dark:text-zinc-500">{item.type}</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{item.role}</h3>
            <p className="text-slate-600 dark:text-zinc-300">{item.company}</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-600 dark:text-zinc-300">{item.period}</p>
            <p className="text-xs text-slate-500 dark:text-zinc-500">{item.location}</p>
          </div>
        </div>

        <ul className="mt-5 space-y-2 text-sm leading-7 text-slate-600 dark:text-zinc-300">
          {item.bullets.map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[11px] text-slate-700 dark:text-zinc-300">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
