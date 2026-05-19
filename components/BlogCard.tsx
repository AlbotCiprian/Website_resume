"use client";

import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

import type { PostMeta } from "@/lib/mdx";

import { useI18n } from "@/components/providers/language-provider";
import { Badge } from "@/components/ui/badge";

/**
 * BlogCard — technical_notes .md file.
 *
 * Each post reads like a markdown file in a retro IDE:
 *   - Title bar with mono filename `YYYY-MM-DD_slug.md`
 *   - Tag chips (max 3)
 *   - Title as the canonical link to the post
 *   - Short description (2 lines clamp via CSS)
 *   - Footer with reading time + open-file arrow
 */
export function BlogCard({ post }: { post: PostMeta }) {
  const { locale } = useI18n();
  const date = new Date(post.date);
  const filename = `${formatDateForFilename(date)}_${post.slug}.md`;
  const formattedDate = date.toLocaleDateString(locale === "ro" ? "ro-RO" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-elevated/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_40px_-26px_rgba(0,0,0,0.7)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_22px_46px_-22px_rgba(232,163,61,0.18)]">
      {/* Title bar */}
      <header className="flex items-center gap-2 border-b border-line-subtle bg-canvas/65 px-3 py-2">
        <FileText className="h-3.5 w-3.5 text-accent" aria-hidden />
        <span className="mono flex-1 truncate text-[11px] tracking-[0.04em] text-ink-mono">
          {filename}
        </span>
        <span className="mono text-[10px] tracking-[0.2em] text-ink-faint uppercase">
          .md
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="mono">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-[18px] leading-snug font-semibold text-ink">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-start gap-2 transition-colors hover:text-accent"
          >
            <span>{post.title}</span>
            <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </h3>

        {/* Description */}
        <p className="text-[13.5px] leading-6 text-ink-soft">{post.description}</p>

        {/* Footer */}
        <footer className="mt-auto flex items-center justify-between gap-3 border-t border-line-subtle pt-3 mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
          <span>{formattedDate}</span>
          <span>·</span>
          <span className="flex-1 text-ink-mono">{post.readingTime}</span>
          <span aria-hidden className="inline-flex items-center gap-1 text-accent opacity-0 transition-opacity group-hover:opacity-100">
            <span>{">"}</span>
            <span>open</span>
          </span>
        </footer>
      </div>
    </article>
  );
}

function formatDateForFilename(date: Date) {
  const pad = (value: number) => value.toString().padStart(2, "0");
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}
