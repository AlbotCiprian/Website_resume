"use client";

import { motion } from "framer-motion";

import { fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Metric = {
  /** Big mono number, e.g. "99.97%". */
  value: string;
  /** Short uppercase label. */
  label: string;
  /** Optional sub-meta, single mono line. */
  meta?: string;
};

const DEFAULT_METRICS: Metric[] = [
  { value: "4+", label: "Years in production", meta: "Banking · SaaS · Data" },
  { value: "12+", label: "Systems shipped", meta: "API · pipelines · platforms" },
  { value: "99.97%", label: "Uptime maintained", meta: "Critical banking workloads" },
  { value: "4", label: "Languages spoken", meta: "RO · EN · RU · FR" },
];

type ReliabilityMetricsProps = {
  metrics?: Metric[];
  className?: string;
};

/**
 * ReliabilityMetrics — the editorial KPI strip sitting below the hero.
 *
 * Visually a horizontal rail of four cells separated by hairlines. The
 * numbers are rendered in mono with tabular figures so the strip stays
 * pixel-aligned regardless of locale.
 */
export function ReliabilityMetrics({ metrics = DEFAULT_METRICS, className }: ReliabilityMetricsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      {...revealOnScroll}
      className={cn(
        "grid grid-cols-2 gap-y-8 border-y border-line-subtle py-8 md:grid-cols-4 md:gap-y-0 md:py-10",
        className,
      )}
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          variants={fadeUp}
          className={cn(
            "flex flex-col gap-2 px-4 md:px-6",
            // hairline dividers on desktop between columns (except first)
            index > 0 && "md:border-l md:border-line-subtle",
          )}
        >
          <span className="mono text-[34px] leading-none font-medium tracking-tight text-ink md:text-[40px]">
            {metric.value}
          </span>
          <span className="text-[13px] text-ink-soft md:text-sm">{metric.label}</span>
          {metric.meta ? (
            <span className="mono text-[10px] tracking-[0.14em] text-ink-faint uppercase">{metric.meta}</span>
          ) : null}
        </motion.div>
      ))}
    </motion.div>
  );
}
