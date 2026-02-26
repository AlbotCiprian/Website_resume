import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { PostMeta } from "@/lib/mdx";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Card className="group border-white/10 bg-zinc-900/70 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/45">
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="muted">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="mt-3 text-xl text-white">
          <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 hover:text-cyan-200">
            {post.title}
            <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
          </Link>
        </CardTitle>
        <p className="text-sm text-zinc-400">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          {" • "}
          {post.readingTime}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-7 text-zinc-300">{post.description}</p>
      </CardContent>
    </Card>
  );
}
