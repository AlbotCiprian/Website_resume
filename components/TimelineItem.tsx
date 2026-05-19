"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { ExperienceItem } from "@/content/experience";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

type TimelineItemProps = {
  item: ExperienceItem;
  index: number;
  isLast?: boolean;
};

/**
 * TimelineItem — single experience.log entry.
 *
 * Layout on desktop (md+):
 *   ┌─ rail dot ─┬─ period (mono) ─┬─ role + company + bullets ─┬─ domain ─┐
 *
 * On mobile, the row collapses to a vertical stack with the rail
 * dot on the left and the period rendered above the role.
 */
export function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reducedMotion ? undefined : { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.04 * (index % 4) }}
      className={cn(
        "group relative grid grid-cols-[44px_1fr] gap-x-5 px-4 py-5 transition-colors md:grid-cols-[60px_160px_1fr_140px] md:gap-x-6 md:px-5 md:py-6",
        "hover:bg-bezel/25",
      )}
    >
      {/* Rail dot */}
      <div className="relative flex items-start justify-center md:justify-start md:pl-2">
        <span
          aria-hidden
          className={cn(
            "relative z-10 mt-1 h-3 w-3 rounded-sm border border-accent/55 bg-canvas",
            "shadow-[0_0_0_3px_rgba(232,163,61,0.10),0_0_10px_rgba(232,163,61,0.32)]",
            "transition-colors group-hover:border-accent",
            isLast && "border-ink-faint shadow-none",
          )}
        />
        <span
          aria-hidden
          className="mono absolute top-2.5 left-1/2 hidden -translate-x-1/2 text-[9.5px] tracking-[0.16em] text-ink-faint uppercase opacity-0 group-hover:opacity-100 md:block"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Period (mono) */}
      <div className="col-start-2 md:col-start-2">
        <span className="mono inline-flex items-center rounded-sm border border-line bg-canvas/60 px-2 py-0.5 text-[10.5px] tracking-[0.16em] text-ink-mono uppercase">
          {item.period}
        </span>
        <p className="mono mt-1.5 text-[10px] tracking-[0.18em] text-ink-faint uppercase">
          {item.location}
        </p>
      </div>

      {/* Role + company + bullets (full-width content on mobile, middle col on md) */}
      <div className="col-span-2 mt-3 md:col-span-1 md:col-start-3 md:mt-0">
        <h3 className="text-[17px] leading-snug font-semibold text-ink md:text-[18px]">
          {item.role}
        </h3>
        <p className="mono text-[12.5px] tracking-[0.04em] text-ink-mono">
          <span aria-hidden className="text-ink-faint">@ </span>
          {item.company}
        </p>

        <ul className="mt-4 space-y-2 border-l border-line-subtle pl-3">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2 text-[13.5px] leading-6 text-ink-soft">
              <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="mono">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Domain (right) */}
      <div className="col-span-2 mt-3 md:col-span-1 md:col-start-4 md:mt-0 md:text-right">
        <span className="mono inline-flex items-center gap-1.5 rounded-sm border border-line bg-canvas/60 px-2 py-0.5 text-[10px] tracking-[0.18em] text-ink-mono uppercase">
          <span aria-hidden className="h-1 w-1 rounded-full bg-accent-positive" />
          {item.type}
        </span>
      </div>
    </motion.article>
  );
}
