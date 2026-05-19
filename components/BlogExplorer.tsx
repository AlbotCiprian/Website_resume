"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import type { PostMeta } from "@/lib/mdx";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { BlogCard } from "@/components/BlogCard";
import { useI18n } from "@/components/providers/language-provider";
import { Input } from "@/components/ui/input";

/**
 * BlogExplorer — terminal-style search + tag filter for the blog index.
 *
 * Header reads like a shell command:
 *   $ grep -i "..." technical_notes/
 * Tag filters render as bracketed pill chips with an amber active state.
 */
export function BlogExplorer({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("All");
  const { dictionary } = useI18n();

  const tags = useMemo(() => {
    const allTags = new Set<string>();
    posts.forEach((post) => post.tags.forEach((item) => allTags.add(item)));
    return ["All", ...Array.from(allTags).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = query.toLowerCase().trim();

    return posts.filter((post) => {
      const matchesTag = tag === "All" || post.tags.includes(tag);
      const matchesQuery =
        q.length === 0 ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((item) => item.toLowerCase().includes(q));

      return matchesTag && matchesQuery;
    });
  }, [posts, query, tag]);

  return (
    <div>
      {/* Command header */}
      <div className="mb-3 flex items-center gap-2 mono text-[10.5px] tracking-[0.18em] text-ink-faint uppercase">
        <span className="text-ink-mono">$</span>
        <span>grep -i</span>
        <span className="text-accent">{`"${query || "*"}"`}</span>
        <span>technical_notes/</span>
        <span aria-hidden className="hairline flex-1" />
        <span>{filteredPosts.length} match</span>
      </div>

      <div className="mb-8 grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <span className="sr-only">{dictionary.blogExplorer.searchPlaceholder}</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dictionary.blogExplorer.searchPlaceholder}
            className="pl-10"
          />
        </label>

        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTag(item)}
              aria-pressed={tag === item}
              className={cn(
                "mono inline-flex items-center gap-1 rounded-sm border px-2.5 py-1.5 text-[10.5px] tracking-[0.14em] uppercase transition-colors",
                tag === item
                  ? "border-accent/55 bg-accent-soft text-accent"
                  : "border-line bg-canvas/40 text-ink-soft hover:border-line-strong hover:text-ink",
              )}
            >
              <span aria-hidden className="text-ink-faint">{"["}</span>
              <span>{item === "All" ? dictionary.filters.All : item}</span>
              <span aria-hidden className="text-ink-faint">{"]"}</span>
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredPosts.map((post) => (
            <motion.div key={post.slug} variants={fadeUp}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="rounded-sm border border-line bg-elevated/95 p-8 text-center mono text-[13px] text-ink-soft">
          <span aria-hidden className="text-ink-faint">{">"} </span>
          {dictionary.blogExplorer.noResults}
        </div>
      )}
    </div>
  );
}
