import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-cyan-400/35 bg-cyan-500/15 text-cyan-700 dark:text-cyan-200",
        muted: "border-slate-200 bg-slate-100 text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300",
        outline: "border-slate-300 text-slate-700 dark:border-white/20 dark:text-zinc-300",
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
