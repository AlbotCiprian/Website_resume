import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Section } from "@/components/Section";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description: "Selected backend, banking, SaaS, data and infrastructure projects.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Section
      eyebrow="Project archive"
      title="All projects"
      description="Filter by domain to explore banking integrations, SaaS systems, data workflows and infrastructure-focused delivery."
      className="pt-16"
    >
      <ProjectsGrid items={projects} />
    </Section>
  );
}
