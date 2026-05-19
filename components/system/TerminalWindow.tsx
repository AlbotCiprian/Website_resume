import * as React from "react";

import { cn } from "@/lib/utils";

type TerminalWindowProps = {
  /** Title rendered in the top bar — e.g. "albot-os ~ /profile". */
  title?: string;
  /** Right-aligned mono badge in the title bar — e.g. "READY". */
  badge?: string;
  /** Tone of the badge dot — defaults to positive (green). */
  badgeTone?: "positive" | "amber" | "cyan" | "muted";
  /** Optional className for the outer frame. */
  className?: string;
  /** Optional className for the inner content area. */
  bodyClassName?: string;
  /** Hide the bottom prompt line. */
  hidePrompt?: boolean;
  /** Text shown at the bottom prompt — e.g. "press [enter]". */
  promptText?: string;
  children: React.ReactNode;
};

const DOT_TONE: Record<NonNullable<TerminalWindowProps["badgeTone"]>, string> = {
  positive: "bg-accent-positive shadow-[0_0_8px_rgba(123,181,110,0.6)]",
  amber: "bg-accent shadow-[0_0_8px_rgba(232,163,61,0.55)]",
  cyan: "bg-accent-cyan shadow-[0_0_8px_rgba(111,214,232,0.55)]",
  muted: "bg-ink-faint",
};

/**
 * TerminalWindow — retro programming workstation panel.
 *
 * The frame mimics a classic IDE/terminal window: a tinted title bar with
 * mac-style dots on the left, an optional title and badge on the right,
 * a square-edged body with phosphor-mono content, and a thin status
 * prompt at the bottom. Use it as a wrapper around any retro panel.
 */
export function TerminalWindow({
  title,
  badge,
  badgeTone = "positive",
  className,
  bodyClassName,
  hidePrompt,
  promptText = "> ready",
  children,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-line bg-elevated/95",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_22px_44px_-26px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-line-subtle bg-canvas/65 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent-critical/80" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent-warning/80" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent-positive/80" />
        </div>
        {title ? (
          <span className="mono flex-1 truncate text-[11px] tracking-[0.12em] text-ink-mono uppercase">
            {title}
          </span>
        ) : (
          <span className="flex-1" />
        )}
        {badge ? (
          <span className="mono flex items-center gap-1.5 text-[10px] tracking-[0.18em] text-ink-mono uppercase">
            <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", DOT_TONE[badgeTone])} />
            {badge}
          </span>
        ) : null}
      </div>

      {/* Body */}
      <div className={cn("relative p-4 md:p-5", bodyClassName)}>{children}</div>

      {/* Bottom prompt — small status line */}
      {hidePrompt ? null : (
        <div className="flex items-center justify-between border-t border-line-subtle bg-canvas/65 px-3 py-1.5">
          <span className="mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
            {promptText}
          </span>
          <span className="mono text-[10px] tracking-[0.16em] text-ink-faint">
            ALBOT-OS · 2026
          </span>
        </div>
      )}
    </div>
  );
}
