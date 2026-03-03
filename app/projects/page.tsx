import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Section } from "@/components/Section";
import { projects } from "@/content/projects";
import { getServerDictionary } from "@/lib/i18n-server";
import { buildMetadata, projectsJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Enterprise and SaaS projects across banking platforms, analytics infrastructure, disaster recovery, and marketplace systems.",
  path: "/projects",
  image: "/images/projects/eximbank-enterprise.webp",
});

export default async function ProjectsPage() {
  const dictionary = await getServerDictionary();
  const projectsSchema = projectsJsonLd(projects);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsSchema),
        }}
      />

      <Section
        eyebrow={dictionary.projectsPage.eyebrow}
        title={dictionary.projectsPage.title}
        description={dictionary.projectsPage.description}
        className="pt-16"
      >
        <ProjectsGrid items={projects} />
      </Section>
    </>
  );
}
