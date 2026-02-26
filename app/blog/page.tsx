import { BlogExplorer } from "@/components/BlogExplorer";
import { Section } from "@/components/Section";
import { getAllPosts } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Engineering notes on backend architecture, SQL performance, and production systems.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Section
      eyebrow="Engineering notes"
      title="Blog"
      description="Search by keyword and filter by tags to find architecture, backend, data and infrastructure content."
      className="pt-16"
    >
      <BlogExplorer posts={posts} />
    </Section>
  );
}
