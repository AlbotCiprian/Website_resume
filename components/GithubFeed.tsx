"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Activity,
  AlertCircle,
  GitBranchPlus,
  GitCommitHorizontal,
  GitFork,
  GitPullRequest,
  Package,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import type { GithubEventItem } from "@/lib/github";
import { fadeUp, staggerContainer } from "@/lib/motion";

import { useI18n } from "@/components/providers/language-provider";

const iconByType = {
  push: GitCommitHorizontal,
  pull_request: GitPullRequest,
  issue: AlertCircle,
  fork: GitFork,
  star: Star,
  create: GitBranchPlus,
  release: Package,
  other: Activity,
};

type GithubResponse = {
  events?: GithubEventItem[];
  error?: string;
};

function GithubSkeleton() {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={`github-skeleton-${index}`} className="h-[74px] animate-pulse rounded-2xl border border-slate-200 bg-white/85 dark:border-white/10 dark:bg-white/5" />
      ))}
    </ul>
  );
}

export function GithubFeed({ limit = 10 }: { limit?: number }) {
  const { dictionary } = useI18n();
  const [events, setEvents] = useState<GithubEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch(`/api/github?limit=${limit}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as GithubResponse;

        if (!response.ok || !data.events) {
          throw new Error(data.error ?? dictionary.github.failed);
        }

        if (active) {
          setEvents(data.events);
        }
      } catch (err) {
        if (active) {
          const isAbort = err instanceof DOMException && err.name === "AbortError";
          setError(isAbort ? dictionary.github.timeout : err instanceof Error ? err.message : dictionary.github.failed);
          setEvents([]);
        }
      } finally {
        clearTimeout(timeoutId);
        if (active) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      active = false;
    };
  }, [dictionary.github.failed, dictionary.github.timeout, limit]);

  const content = useMemo(() => {
    if (loading) {
      return <GithubSkeleton />;
    }

    if (error) {
      return <p className="text-sm text-slate-500 dark:text-zinc-400">{error}</p>;
    }

    if (!events.length) {
      return <p className="text-sm text-slate-500 dark:text-zinc-400">{dictionary.github.noEvents}</p>;
    }

    return (
      <motion.ul variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3">
        {events.map((event) => {
          const Icon = iconByType[event.type] ?? Activity;

          return (
            <motion.li key={event.id} variants={fadeUp}>
              <Link
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/85 p-4 transition hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-400/40 dark:hover:bg-white/10"
              >
                <span className="mt-0.5 rounded-full border border-slate-300 p-1.5 text-cyan-700 dark:border-white/15 dark:text-cyan-300">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-slate-900 dark:text-zinc-100">{event.title}</span>
                  <span className="mt-1 block text-xs text-slate-500 dark:text-zinc-400">
                    {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}
                  </span>
                </span>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    );
  }, [dictionary.github.noEvents, error, events, loading]);

  return <div>{content}</div>;
}
