import { HomeSections } from "@/components/HomeSections";
import { projects } from "@/content/projects";
import { getLatestPosts } from "@/lib/mdx";
import { buildMetadata, personJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Albot Ciprian | Senior Backend Engineer & Systems Architect",
  description:
    "Premium portfolio focused on scalable backend systems, banking-grade reliability, and architecture leadership.",
  path: "/",
});

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 6);

  const structuredData = [personJsonLd(), websiteJsonLd()];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <HomeSections featuredProjects={featuredProjects} latestPosts={latestPosts} />
    </>
  );
}
