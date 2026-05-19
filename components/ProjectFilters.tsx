"use client";

import { motion } from "framer-motion";

import type { ProjectCategory } from "@/content/projects";

import { useI18n } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

/**
 * ProjectFilters — retro directory tabs.
 *
 * Categories render as bracketed mono labels with an amber "open" pill
 * sliding behind the active item via `layoutId`. The whole strip is
 * wrapped in a thin command header to feel like a real file explorer
 * navigating subdirectories.
 */
export function ProjectFilters({
  categories,
  value,
  onChange,
}: {
  categories: readonly ProjectCategory[];
  value: ProjectCategory;
  onChange: (next: ProjectCategory) => void;
}) {
  const { dictionary } = useI18n();

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-2 mono text-[10.5px] tracking-[0.18em] text-ink-faint uppercase">
        <span className="text-ink-mono">$</span>
        <span>cd ./project_archive/</span>
        <span className="text-accent">{value.toLowerCase()}/</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {categories.map((category) => {
          const active = value === category;
          const label = dictionary.filters[category] ?? category;

          return (
            <button
              type="button"
              key={category}
              onClick={() => onChange(category)}
              aria-pressed={active}
              className={cn(
                "mono relative inline-flex items-center gap-1 rounded-sm border px-3 py-1.5 text-[10.5px] tracking-[0.14em] uppercase transition-colors",
                active
                  ? "border-accent/55 text-accent"
                  : "border-line bg-canvas/40 text-ink-soft hover:border-line-strong hover:text-ink",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="project-filter-pill"
                  className="absolute inset-0 rounded-sm bg-accent-soft"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
              ) : null}
              <span className="relative z-10 flex items-center gap-1.5">
                <span aria-hidden className="text-ink-faint">{"["}</span>
                <span>{label}</span>
                <span aria-hidden className="text-ink-faint">{"]"}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
