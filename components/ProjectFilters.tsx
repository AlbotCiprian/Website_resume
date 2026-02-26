"use client";

import { motion } from "framer-motion";

import type { ProjectCategory } from "@/content/projects";

import { useI18n } from "@/components/providers/language-provider";

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
    <div className="mb-8 flex flex-wrap gap-3">
      {categories.map((category) => {
        const active = value === category;
        const label = dictionary.filters[category] ?? category;

        return (
          <button
            type="button"
            key={category}
            onClick={() => onChange(category)}
            className={`relative overflow-hidden rounded-full border px-4 py-2 text-sm transition ${
              active
                ? "border-cyan-500/35 text-cyan-700 dark:border-cyan-400/45 dark:text-cyan-100"
                : "border-slate-300 bg-white/85 text-slate-700 hover:border-slate-400 hover:text-slate-900 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-white/30 dark:hover:text-white"
            }`}
          >
            {active ? (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 rounded-full bg-cyan-500/12 shadow-[0_0_18px_rgba(34,211,238,0.24)] dark:bg-cyan-500/20"
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
              />
            ) : null}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
