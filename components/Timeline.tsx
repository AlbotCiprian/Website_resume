"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { ExperienceItem } from "@/content/experience";
import { fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";

import { TimelineItem } from "@/components/TimelineItem";

/**
 * Timeline — experience.log viewer.
 *
 * Renders the experience list as a single retro log panel with a
 * header strip, a vertical rail on the far left, and one
 * TimelineItem per role. The rail emits a soft amber gradient
 * to suggest career progression downward (most recent first).
 */
export function Timeline({ items }: { items: ExperienceItem[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={staggerContainer}
      {...revealOnScroll}
      className="relative overflow-hidden rounded-md border border-line bg-elevated/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    >
      {/* Log header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-subtle bg-canvas/60 px-4 py-2.5 md:px-5">
        <div className="mono flex items-center gap-3 text-[11px] tracking-[0.18em] text-ink-mono uppercase">
          <span className="text-ink-faint">$</span>
          <span>tail -f experience.log</span>
        </div>
        <div className="mono flex items-center gap-3 text-[10px] tracking-[0.2em] text-ink-faint uppercase">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-positive shadow-[0_0_6px_rgba(123,181,110,0.55)]" />
            <span>{items.length} entries</span>
          </span>
        </div>
      </div>

      {/* Column headers — visible from md up */}
      <div className="mono hidden border-b border-line-subtle bg-canvas/40 px-5 py-2 text-[10px] tracking-[0.2em] text-ink-faint uppercase md:grid md:grid-cols-[160px_1fr_140px] md:gap-6">
        <span>period</span>
        <span>role · company</span>
        <span className="text-right">domain</span>
      </div>

      {/* Rail + items */}
      <div className="relative">
        <motion.span
          aria-hidden
          className="absolute top-4 bottom-4 left-3.5 w-px bg-linear-to-b from-accent/65 via-accent/25 to-transparent md:left-7"
          initial={reducedMotion ? false : { scaleY: 0, opacity: 0.3 }}
          whileInView={reducedMotion ? undefined : { scaleY: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={reducedMotion ? undefined : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
        />

        <ul className="divide-y divide-line-subtle">
          {items.map((item, index) => (
            <motion.li key={item.id} variants={fadeUp}>
              <TimelineItem item={item} index={index} isLast={index === items.length - 1} />
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Footer prompt */}
      <div className="flex items-center justify-between gap-3 border-t border-line-subtle bg-canvas/60 px-4 py-2 md:px-5">
        <span className="mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
          end of log
        </span>
        <span className="mono inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-ink-faint uppercase">
          <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
          live
        </span>
      </div>
    </motion.div>
  );
}
