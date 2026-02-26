import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Section } from "@/components/Section";
import { projects } from "@/content/projects";
import { getServerDictionary } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description: "Selected backend, banking, SaaS, data and infrastructure projects.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const dictionary = await getServerDictionary();

  return (
    <Section
      eyebrow={dictionary.projectsPage.eyebrow}
      title={dictionary.projectsPage.title}
      description={dictionary.projectsPage.description}
      className="pt-16"
    >
      <ProjectsGrid items={projects} />
    </Section>
  );
}
