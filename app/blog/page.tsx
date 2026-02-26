import { BlogExplorer } from "@/components/BlogExplorer";
import { Section } from "@/components/Section";
import { getServerDictionary } from "@/lib/i18n-server";
import { getAllPosts } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Engineering notes on backend architecture, SQL performance, and production systems.",
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, dictionary] = await Promise.all([getAllPosts(), getServerDictionary()]);

  return (
    <Section
      eyebrow={dictionary.blogPage.eyebrow}
      title={dictionary.blogPage.title}
      description={dictionary.blogPage.description}
      className="pt-16"
    >
      <BlogExplorer posts={posts} />
    </Section>
  );
}
