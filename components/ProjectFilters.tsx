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
              ? "border-cyan-400/50 bg-cyan-500/20 text-cyan-100"
              : "border-white/15 bg-white/5 text-zinc-300 hover:border-white/30 hover:text-white",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
