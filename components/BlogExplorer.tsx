"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import type { PostMeta } from "@/lib/mdx";
import { fadeUp, staggerContainer } from "@/lib/motion";

import { BlogCard } from "@/components/BlogCard";
import { useI18n } from "@/components/providers/language-provider";
import { Input } from "@/components/ui/input";

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
      <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dictionary.blogExplorer.searchPlaceholder}
            className="pl-10"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          {tags.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTag(item)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                tag === item
                  ? "border-cyan-500/40 bg-cyan-500/12 text-cyan-700 dark:border-cyan-400/50 dark:bg-cyan-500/20 dark:text-cyan-100"
                  : "border-slate-300 bg-white/85 text-slate-700 hover:border-slate-400 hover:text-slate-900 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-white/30 dark:hover:text-white"
              }`}
            >
              {item === "All" ? dictionary.filters.All : item}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length ? (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <motion.div key={post.slug} variants={fadeUp}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
          {dictionary.blogExplorer.noResults}
        </div>
      )}
    </div>
  );
}
