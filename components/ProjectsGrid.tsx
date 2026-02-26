"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { projectCategories, type ProjectCategory, type ProjectItem } from "@/content/projects";

import { fadeUp } from "@/lib/motion";

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

      <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              variants={fadeUp}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.32, delay: Math.min(index * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
