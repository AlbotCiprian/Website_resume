import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { getAdjacentPosts, getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { articleJsonLd, buildMetadata } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { meta } = await getPostBySlug(slug);
    const base = buildMetadata({
      title: meta.title,
      description: meta.description,
      path: `/blog/${meta.slug}`,
      image: meta.cover,
    });

    return {
      ...base,
      openGraph: {
        ...base.openGraph,
        type: "article",
        publishedTime: meta.date,
      },
    };
  } catch {
    return buildMetadata({
      title: "Post not found",
      description: "The requested article could not be found.",
      path: `/blog/${slug}`,
    });
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;

  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { content, meta } = post;
  const adjacent = await getAdjacentPosts(slug);
  const jsonLd = articleJsonLd({
    title: meta.title,
    description: meta.description,
    slug: meta.slug,
    publishedAt: meta.date,
    image: meta.cover,
  });

  return (
    <article className="pb-24 pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Container className="max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200">
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <header className="mt-6 border-b border-white/10 pb-8">
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <Badge key={tag} variant="muted">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">{meta.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">{meta.description}</p>
          <p className="mt-4 text-sm text-zinc-400">
            {new Date(meta.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {" • "}
            {meta.readingTime}
          </p>
        </header>

        {meta.cover ? (
          <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-3xl border border-white/10">
            <Image src={meta.cover} alt={meta.title} fill className="object-cover" priority />
          </div>
        ) : null}

        <div className="prose prose-invert prose-zinc mt-10 max-w-none">{content}</div>

        <nav className="mt-14 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-2">
          {adjacent.previous ? (
            <Link
              href={`/blog/${adjacent.previous.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/40"
            >
              <p className="text-xs tracking-[0.16em] text-zinc-500 uppercase">Previous post</p>
              <p className="mt-2 text-zinc-100 group-hover:text-cyan-200">{adjacent.previous.title}</p>
            </Link>
          ) : (
            <span className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-500">
              No previous post
            </span>
          )}

          {adjacent.next ? (
            <Link
              href={`/blog/${adjacent.next.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-right transition hover:border-cyan-400/40"
            >
              <p className="text-xs tracking-[0.16em] text-zinc-500 uppercase">Next post</p>
              <p className="mt-2 inline-flex items-center gap-2 text-zinc-100 group-hover:text-cyan-200">
                {adjacent.next.title}
                <ArrowRight className="h-4 w-4" />
              </p>
            </Link>
          ) : (
            <span className="rounded-2xl border border-white/10 bg-white/5 p-4 text-right text-sm text-zinc-500">
              No newer post
            </span>
          )}
        </nav>
      </Container>
    </article>
  );
}
