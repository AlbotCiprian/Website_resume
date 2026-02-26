"use client";

import { useMemo, useState } from "react";

import { projectCategories, type ProjectCategory, type ProjectItem } from "@/content/projects";

import { ProjectCard } from "@/components/ProjectCard";
import { ProjectFilters } from "@/components/ProjectFilters";

export function ProjectsGrid({ items }: { items: ProjectItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") {
      return items;
    }

    return items.filter((project) => project.category === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <div>
      <ProjectFilters
        categories={projectCategories}
        value={selectedCategory}
        onChange={(category) => setSelectedCategory(category)}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
