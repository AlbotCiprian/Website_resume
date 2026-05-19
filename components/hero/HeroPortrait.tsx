"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

type HeroPortraitProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * HeroPortrait — integrated duotone portrait block.
 *
 * Instead of dropping a smiling-developer card into the hero, we treat the
 * portrait as one cell of the architecture grid: grayscale → cyan duotone
 * via blend modes, a subtle border, a crosshair anchor in the top-right
 * corner, and a mono caption that matches the rest of the engineering
 * console language.
 */
export function HeroPortrait({ src, alt, className }: HeroPortraitProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-line bg-elevated/85",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_28px_50px_-28px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      {/* The image itself, desaturated and slightly darkened so the cyan
          overlay reads cleanly. */}
      <div className="relative aspect-[4/5]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 80vw, 360px"
          priority
          className="object-cover object-center [filter:grayscale(1)_brightness(0.78)_contrast(1.08)]"
        />

        {/* Cyan duotone overlay — multiplies into shadows */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-color bg-[linear-gradient(155deg,#22D3EE_0%,#0F2E3D_55%,#091624_100%)] opacity-90"
        />

        {/* Light vignette so the bottom blends into the page */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_50%,rgba(7,9,14,0.6)_100%)]"
        />

        {/* Diagonal scan lines — faint */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.6) 0, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 6px)",
          }}
        />
      </div>

      {/* Top-right crosshair anchor */}
      <svg
        aria-hidden
        className="pointer-events-none absolute top-3 right-3 h-5 w-5 text-ink-faint"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path d="M10 0 L10 8 M10 12 L10 20 M0 10 L8 10 M12 10 L20 10" stroke="currentColor" strokeWidth="1" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      </svg>

      {/* Mono caption — keeps the portrait inside the engineering console
          language rather than the marketing language. */}
      <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2 rounded-md border border-line-subtle bg-canvas/75 px-3 py-2 backdrop-blur">
        <div className="flex flex-col">
          <span className="mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">Operator</span>
          <span className="text-xs font-medium text-ink">Albot Ciprian</span>
        </div>
        <span className="mono text-[10px] tracking-[0.14em] text-ink-mono uppercase">EU · MD</span>
      </div>
    </div>
  );
}
