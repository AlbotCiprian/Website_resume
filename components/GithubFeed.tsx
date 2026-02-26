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
import { useEffect, useMemo, useState } from "react";

import type { GithubEventItem } from "@/lib/github";

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

export function GithubFeed({ limit = 10 }: { limit?: number }) {
  const [events, setEvents] = useState<GithubEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      try {
        const response = await fetch(`/api/github?limit=${limit}`);
        const data = (await response.json()) as GithubResponse;

        if (!response.ok || !data.events) {
          throw new Error(data.error ?? "Could not load GitHub activity right now.");
        }

        if (active) {
          setEvents(data.events);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Could not load GitHub activity right now.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadEvents();
    return () => {
      active = false;
    };
  }, [limit]);

  const content = useMemo(() => {
    if (loading) {
      return <p className="text-sm text-slate-500 dark:text-zinc-400">Loading recent GitHub events...</p>;
    }

    if (error) {
      return <p className="text-sm text-slate-500 dark:text-zinc-400">GitHub activity is temporarily unavailable. {error}</p>;
    }

    if (!events.length) {
      return <p className="text-sm text-slate-500 dark:text-zinc-400">No recent public GitHub events found.</p>;
    }

    return (
      <ul className="space-y-3">
        {events.map((event) => {
          const Icon = iconByType[event.type] ?? Activity;
          return (
            <li key={event.id}>
              <Link
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/85 p-4 transition hover:border-cyan-500/40 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-400/40 dark:hover:bg-white/10"
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
            </li>
          );
        })}
      </ul>
    );
  }, [error, events, loading]);

  return <div>{content}</div>;
}
