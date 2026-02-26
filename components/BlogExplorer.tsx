"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import type { PostMeta } from "@/lib/mdx";

import { BlogCard } from "@/components/BlogCard";
import { Input } from "@/components/ui/input";

export function BlogExplorer({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("All");

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
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, description or tag"
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
                  ? "border-cyan-400/50 bg-cyan-500/20 text-cyan-100"
                  : "border-white/15 bg-white/5 text-zinc-300 hover:border-white/30 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-zinc-400">
          No posts matched your search.
        </div>
      )}
    </div>
  );
}
