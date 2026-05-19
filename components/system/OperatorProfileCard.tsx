"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

type OperatorProfileCardProps = {
  src: string;
  alt: string;
  name: string;
  role: string;
  region: string;
  /** Optional operator id printed in the badge. */
  operatorId?: string;
  /** Optional status flag. Defaults to AVAILABLE. */
  status?: { label: string; tone: "positive" | "amber" | "muted" };
  className?: string;
};

const STATUS_DOT: Record<NonNullable<OperatorProfileCardProps["status"]>["tone"], string> = {
  positive: "bg-accent-positive shadow-[0_0_6px_rgba(123,181,110,0.55)]",
  amber: "bg-accent shadow-[0_0_6px_rgba(232,163,61,0.55)]",
  muted: "bg-ink-faint",
};

/**
 * OperatorProfileCard — retro PC operator ID badge.
 *
 * The portrait remains untouched (natural color, professional). What
 * changes is the frame: a tinted bezel, a top bar with the "USER PROFILE"
 * banner, mono identity fields below, and small retro hardware details
 * (corner brackets, cardstock punch hole, magnetic strip). This is the
 * intentional non-cyan, non-duotone treatment the design brief asks for.
 */
export function OperatorProfileCard({
  src,
  alt,
  name,
  role,
  region,
  operatorId = "OP-0419",
  status = { label: "AVAILABLE", tone: "positive" },
  className,
}: OperatorProfileCardProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-md border border-line bg-elevated/95",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_50px_-26px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      {/* Top bezel — chrome bar with embossed label */}
      <header className="relative border-b border-line bg-[linear-gradient(180deg,#1c1812_0%,#15110c_100%)] px-3 py-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <PunchHole />
            <span className="mono text-[10px] tracking-[0.22em] text-ink-mono uppercase">
              user.profile
            </span>
          </div>
          <span className="mono inline-flex items-center gap-1.5 rounded-sm border border-line-subtle bg-canvas/60 px-1.5 py-0.5 text-[9.5px] tracking-[0.2em] text-ink-mono uppercase">
            <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[status.tone])} />
            {status.label}
          </span>
        </div>
      </header>

      {/* Portrait — NATURAL COLOR. No filters, no duotone. */}
      <div className="relative">
        <div className="relative aspect-[4/5] bg-canvas">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 80vw, 360px"
            priority
            className="object-cover object-center"
          />

          {/* Very subtle warm vignette so the image blends into the dark frame
              without recoloring the portrait itself. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 30%, transparent 55%, rgba(10,11,14,0.45) 100%)",
            }}
          />

          {/* Corner brackets — small retro detail */}
          <CornerBracket position="tl" />
          <CornerBracket position="tr" />
          <CornerBracket position="bl" />
          <CornerBracket position="br" />

          {/* Stamp — "AUTHENTIC" rotation */}
          <div
            aria-hidden
            className="absolute right-3 bottom-3 rotate-[-6deg] rounded-sm border border-accent/60 bg-accent-soft px-1.5 py-0.5 mono text-[9px] tracking-[0.22em] text-accent uppercase"
          >
            Verified · 2026
          </div>
        </div>
      </div>

      {/* Identity block — mono fields like an old account panel */}
      <dl className="grid grid-cols-[110px_1fr] gap-x-3 gap-y-2 border-t border-line-subtle bg-canvas/55 px-4 py-4">
        <Field label="NAME" value={name} />
        <Field label="ROLE" value={role} tone="amber" />
        <Field label="REGION" value={region} />
        <Field label="ID" value={operatorId} mono />
      </dl>

      {/* Magnetic strip footer */}
      <footer className="flex items-center justify-between gap-3 border-t border-line-subtle bg-[linear-gradient(180deg,#15110c_0%,#0d0a07_100%)] px-3 py-2">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              aria-hidden
              className="h-3 w-[3px] rounded-[1px] bg-ink-faint/60"
              style={{ opacity: 0.25 + (Math.sin(index * 1.7) + 1) * 0.32 }}
            />
          ))}
        </div>
        <span className="mono text-[9.5px] tracking-[0.22em] text-ink-faint uppercase">
          albot-os · auth
        </span>
      </footer>
    </article>
  );
}

/* --------------------------------------------------------------- */
/* Internals                                                        */
/* --------------------------------------------------------------- */

type FieldProps = {
  label: string;
  value: string;
  tone?: "default" | "amber";
  mono?: boolean;
};

function Field({ label, value, tone = "default", mono }: FieldProps) {
  return (
    <>
      <dt className="mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">{label}</dt>
      <dd
        className={cn(
          "text-[13px]",
          mono && "mono",
          tone === "amber" ? "text-accent" : "text-ink",
        )}
      >
        {value}
      </dd>
    </>
  );
}

function PunchHole() {
  return (
    <span
      aria-hidden
      className="h-2.5 w-2.5 rounded-full border border-line bg-canvas shadow-[inset_0_1px_0_rgba(0,0,0,0.6)]"
    />
  );
}

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const positionClass = {
    tl: "top-2 left-2",
    tr: "top-2 right-2 rotate-90",
    bl: "bottom-2 left-2 -rotate-90",
    br: "bottom-2 right-2 rotate-180",
  }[position];

  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={cn("absolute h-4 w-4 text-ink-mono/60", positionClass)}
      fill="none"
    >
      <path d="M0 6 L0 0 L6 0" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
