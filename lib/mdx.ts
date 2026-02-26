import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import readingTime from "reading-time";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/mdx-components";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  published: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTime: string;
};

function normalizeFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  return {
    title: typeof data.title === "string" ? data.title : "Untitled post",
    description: typeof data.description === "string" ? data.description : "",
    date: typeof data.date === "string" ? data.date : new Date().toISOString(),
    tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === "string") : [],
    cover: typeof data.cover === "string" ? data.cover : undefined,
    published: typeof data.published === "boolean" ? data.published : true,
  };
}

export async function getPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(blogDirectory);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
}

function sortPosts(posts: PostMeta[]) {
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getAllPosts(includeDrafts = false): Promise<PostMeta[]> {
  const slugs = await getPostSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const source = await fs.readFile(path.join(blogDirectory, `${slug}.mdx`), "utf8");
      const { data, content } = matter(source);
      const frontmatter = normalizeFrontmatter(data);

      return {
        ...frontmatter,
        slug,
        readingTime: readingTime(content).text,
      } satisfies PostMeta;
    }),
  );

  return sortPosts(includeDrafts ? posts : posts.filter((post) => post.published));
}

export async function getLatestPosts(limit = 3): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(blogDirectory, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");
  const { data, content: markdownContent } = matter(source);
  const frontmatter = normalizeFrontmatter(data);

  const { content } = await compileMDX({
    source: markdownContent,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-default", keepBackground: false }]],
      },
    },
    components: mdxComponents,
  });

  return {
    content,
    meta: {
      ...frontmatter,
      slug,
      readingTime: readingTime(markdownContent).text,
    } satisfies PostMeta,
  };
}

export async function getAdjacentPosts(slug: string) {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}
