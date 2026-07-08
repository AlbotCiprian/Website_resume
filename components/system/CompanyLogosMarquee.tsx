"use client";

import Image from "next/image";
import { useMemo } from "react";

import { clients } from "@/content/clients";
import { cn } from "@/lib/utils";

/**
 * CompanyLogosMarquee — infinite, edge-masked logo band.
 *
 * Reusable: pass any list of logos via `items` (companies/clients, or the
 * tech-stack, integrations & certifications set). Design:
 *   - A framed terminal strip (ALBOT-OS chrome) with a mono header.
 *   - Each logo sits on a "sample chip" so full-colour brand marks stay
 *     legible on the dark band WITHOUT any filter on the logo itself.
 *       · `variant="light"` → warm off-white chip. Best for dark / colourful
 *          marks (the tech & payments set).
 *       · `variant="dark"`  → graphite chip. Best for light / white marks
 *          and mixed client logos (some ship a white wordmark).
 *   - Two identical track copies translate -50% for a seamless loop
 *     (`.marquee-*` in globals.css). Transform-only → stays on the compositor.
 *   - `reverse` flips the scroll direction (handy for a second, lower band).
 *   - Reduced-motion users get a static, horizontally scrollable strip.
 */

export type MarqueeLogo = {
  /** Display name — used for the wordmark fallback and image alt text. */
  name: string;
  /** Path to a logo asset under /public. When omitted, a wordmark shows. */
  logo?: string;
  /** Optional external URL (opens the brand site in a new tab). */
  url?: string;
  /** Short mono tag shown under the wordmark fallback. */
  tag?: string;
};

type ChipVariant = "light" | "dark";

type CompanyLogosMarqueeProps = {
  /** Logos to render. Defaults to the companies/clients set. */
  items?: MarqueeLogo[];
  /** Mono eyebrow above the band, e.g. "// worked with". */
  eyebrow?: string;
  /** Short human title shown next to the eyebrow. */
  title?: string;
  /** Seconds for one full loop. Lower = faster. */
  durationSeconds?: number;
  /** Scroll right-to-left (default) or left-to-right when true. */
  reverse?: boolean;
  /** Chip tone — pick the one that keeps this set of logos legible. */
  variant?: ChipVariant;
  className?: string;
};

function LogoChip({ item, variant }: { item: MarqueeLogo; variant: ChipVariant }) {
  const inner = item.logo ? (
    <Image
      src={item.logo}
      alt={item.name}
      width={180}
      height={44}
      sizes="180px"
      className="h-7 w-auto max-w-36 object-contain md:h-8 md:max-w-44"
    />
  ) : (
    <span className="flex flex-col items-center leading-none">
      <span
        className={cn(
          "text-[13.5px] font-semibold tracking-[-0.01em]",
          variant === "dark" ? "text-ink-soft" : "text-neutral-800",
        )}
      >
        {item.name}
      </span>
      {item.tag ? (
        <span
          className={cn(
            "mono mt-1 text-[8.5px] tracking-[0.22em] uppercase",
            variant === "dark" ? "text-ink-faint" : "text-neutral-500",
          )}
        >
          {item.tag}
        </span>
      ) : null}
    </span>
  );

  const chip = (
    <span
      className={cn(
        "flex h-14 min-w-max items-center justify-center rounded-xl border px-6 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-colors duration-200 group-hover/chip:border-accent/50",
        variant === "dark"
          ? "border-white/10 bg-[#191b19]"
          : "border-black/6 bg-[#f4f1ea]",
      )}
    >
      {inner}
    </span>
  );

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/chip mx-3 shrink-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        aria-label={item.name}
      >
        {chip}
      </a>
    );
  }

  return <span className="group/chip mx-3 shrink-0">{chip}</span>;
}

export function CompanyLogosMarquee({
  items = clients,
  eyebrow = "// worked with",
  title = "Companies & products I've built for",
  durationSeconds = 42,
  reverse = false,
  variant = "light",
  className,
}: CompanyLogosMarqueeProps) {
  // Two copies of the sequence make the loop seamless.
  const sequence = useMemo(() => [...items, ...items], [items]);

  return (
    <section
      aria-label={title}
      className={cn(
        "relative overflow-hidden border-y border-line bg-elevated/40",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 md:px-8 md:py-7">
        {/* Mono header row */}
        <div className="mono mb-4 flex items-center gap-3 text-[10.5px] tracking-[0.2em] text-ink-faint uppercase">
          <span aria-hidden className="hairline w-8 shrink-0" />
          <span>{eyebrow}</span>
          <span className="hidden text-ink-mono normal-case tracking-normal sm:inline">
            {title}
          </span>
          <span aria-hidden className="hairline flex-1" />
          <span className="inline-flex items-center gap-1.5 text-accent-positive">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-positive shadow-[0_0_6px_rgba(123,181,110,0.55)]" />
            {items.length}
          </span>
        </div>

        {/* Marquee viewport */}
        <div className="marquee-viewport relative w-full overflow-hidden">
          <div
            className={cn("marquee-track flex w-max items-center", reverse && "is-reverse")}
            style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
          >
            {sequence.map((item, index) => (
              <LogoChip key={`${item.name}-${index}`} item={item} variant={variant} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
