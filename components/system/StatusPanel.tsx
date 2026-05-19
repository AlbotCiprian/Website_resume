"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type StatusPanelProps = {
  /** ISO region label, e.g. "EU-CENTRAL · CHISINAU". */
  region?: string;
  /** Uptime label rendered as mono. */
  uptime?: string;
  /** Latency label rendered as mono. */
  latency?: string;
  /** Optional className for outer container. */
  className?: string;
};

/**
 * StatusPanel — live mono pill used in the hero.
 *
 * Renders three discrete cells separated by hairlines, each pre-fixed with a
 * fixed-width status dot. The clock cell ticks every second on the client.
 * Server-rendered placeholder keeps SSR stable; hydration then upgrades it.
 */
export function StatusPanel({
  region = "EU-CENTRAL · CHISINAU",
  uptime = "99.97% UPTIME",
  latency = "38ms P50",
  className,
}: StatusPanelProps) {
  const [now, setNow] = useState<string>("--:--:--");

  useEffect(() => {
    const tick = () => {
      const date = new Date();
      const pad = (value: number) => value.toString().padStart(2, "0");
      setNow(`${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} UTC`);
    };

    tick();
    const interval = window.setInterval(tick, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "mono inline-flex items-stretch divide-x divide-white/10 rounded-sm border border-line bg-elevated/70 text-[11px] tracking-[0.12em] text-ink-soft",
        className,
      )}
    >
      <Cell tone="positive" label="PROD" />
      <Cell label={uptime} />
      <Cell label={latency} />
      <Cell tone="muted" label={region} className="hidden md:flex" />
      <Cell tone="muted" label={now} className="hidden lg:flex" />
    </div>
  );
}

type CellProps = {
  label: string;
  tone?: "positive" | "muted";
  className?: string;
};

function Cell({ label, tone, className }: CellProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 px-3.5 py-1.5 uppercase",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "positive" && "bg-accent-positive shadow-[0_0_8px_rgba(123,181,110,0.6)]",
          tone === "muted" && "bg-ink-faint",
          !tone && "bg-accent shadow-[0_0_6px_rgba(232,163,61,0.55)]",
        )}
      />
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}
