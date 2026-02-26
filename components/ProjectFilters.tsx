"use client";

import type { ProjectCategory } from "@/content/projects";

import { cn } from "@/lib/utils";

export function ProjectFilters({
  categories,
  value,
  onChange,
}: {
  categories: readonly ProjectCategory[];
  value: ProjectCategory;
  onChange: (next: ProjectCategory) => void;
}) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          onClick={() => onChange(category)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition",
            value === category
              ? "border-cyan-500/40 bg-cyan-500/12 text-cyan-700 dark:border-cyan-400/50 dark:bg-cyan-500/20 dark:text-cyan-100"
              : "border-slate-300 bg-white/85 text-slate-700 hover:border-slate-400 hover:text-slate-900 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-white/30 dark:hover:text-white",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
