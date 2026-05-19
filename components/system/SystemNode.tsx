import { cn } from "@/lib/utils";

export type SystemNodeTone = "default" | "accent" | "warm" | "positive";

type SystemNodeProps = {
  /** Display label, e.g. "API Gateway". */
  label: string;
  /** Optional secondary mono detail, e.g. "v2.1 · 1.2k rps". */
  meta?: string;
  /** Visual tone. */
  tone?: SystemNodeTone;
  /** Show a pulsing live dot. */
  live?: boolean;
  /** Tailwind class for sizing and absolute positioning by the parent. */
  className?: string;
};

const toneStyles: Record<SystemNodeTone, { border: string; dot: string; shadow: string }> = {
  default: {
    border: "border-line",
    dot: "bg-ink-mono",
    shadow: "shadow-[0_0_0_1px_rgba(220,200,158,0.06),0_8px_24px_-12px_rgba(0,0,0,0.6)]",
  },
  accent: {
    border: "border-accent/40",
    dot: "bg-accent shadow-[0_0_10px_rgba(232,163,61,0.5)]",
    shadow: "shadow-[0_0_0_1px_rgba(232,163,61,0.16),0_10px_28px_-12px_rgba(232,163,61,0.18)]",
  },
  warm: {
    border: "border-accent-warning/35",
    dot: "bg-accent-warning shadow-[0_0_10px_rgba(240,176,75,0.45)]",
    shadow: "shadow-[0_0_0_1px_rgba(240,176,75,0.12),0_10px_28px_-12px_rgba(240,176,75,0.18)]",
  },
  positive: {
    border: "border-accent-positive/35",
    dot: "bg-accent-positive shadow-[0_0_10px_rgba(123,181,110,0.45)]",
    shadow: "shadow-[0_0_0_1px_rgba(123,181,110,0.14),0_10px_28px_-12px_rgba(123,181,110,0.18)]",
  },
};

/**
 * SystemNode — visual unit used inside ArchitectureCanvas.
 *
 * Renders a compact, mono-detailed pill representing a service/component in
 * the backend diagram. Stateless and dumb — positioning is owned by the
 * parent (absolute / grid).
 */
export function SystemNode({ label, meta, tone = "default", live = false, className }: SystemNodeProps) {
  const style = toneStyles[tone];

  return (
    <div
      className={cn(
        "group/node relative flex flex-col gap-1 rounded-xl border bg-elevated/85 px-3 py-2 backdrop-blur-sm",
        style.border,
        style.shadow,
        className,
      )}
    >
      <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
        <span
          aria-hidden
          className={cn("h-1.5 w-1.5 rounded-full", style.dot, live && "node-pulse")}
        />
        {label}
      </span>
      {meta ? (
        <span className="mono text-[10px] tracking-[0.08em] text-ink-faint uppercase">{meta}</span>
      ) : null}
    </div>
  );
}
