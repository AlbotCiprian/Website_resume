"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { PostMeta } from "@/lib/mdx";

import { useI18n } from "@/components/providers/language-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BlogCard({ post }: { post: PostMeta }) {
  const { locale } = useI18n();

  return (
    <Card className="group border-slate-200/80 bg-white/85 transition-all duration-300 hover:-translate-y-[3px] hover:border-cyan-500/45 hover:shadow-[0_22px_46px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-zinc-900/70 dark:hover:border-cyan-400/45 dark:hover:shadow-[0_24px_50px_rgba(2,8,20,0.42)]">
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="muted">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="mt-3 text-xl text-slate-900 dark:text-white">
          <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 hover:text-cyan-700 dark:hover:text-cyan-200">
            {post.title}
            <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
          </Link>
        </CardTitle>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          {new Date(post.date).toLocaleDateString(locale === "ro" ? "ro-RO" : "en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          {" • "}
          {post.readingTime}
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-4 h-px bg-slate-200 dark:bg-white/10" />
        <p className="text-sm leading-7 text-slate-600 dark:text-zinc-300">{post.description}</p>
      </CardContent>
    </Card>
  );
}
