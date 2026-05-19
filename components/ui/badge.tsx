import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Badge — retro chip primitive.
 * Variants:
 *   - default: amber phosphor accent
 *   - muted:   neutral surface chip
 *   - outline: hairline border, no fill
 *   - mono:    mono uppercase, ink-mono color (for tech tags)
 *   - positive: green for OK / impact markers
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-[11px] font-medium tracking-[0.04em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-accent/40 bg-accent-soft text-accent",
        muted: "border-line bg-canvas/40 text-ink-soft",
        outline: "border-line text-ink-soft",
        mono: "border-line bg-canvas/40 text-ink-mono mono uppercase tracking-[0.14em]",
        positive: "border-accent-positive/40 bg-accent-positive/10 text-accent-positive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
