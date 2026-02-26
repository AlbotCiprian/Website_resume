import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70",
  {
    variants: {
      variant: {
        default: "bg-cyan-500 px-6 py-3 text-zinc-950 hover:bg-cyan-400",
        secondary:
          "bg-slate-900 px-6 py-3 text-white hover:bg-slate-800 dark:bg-white/8 dark:text-zinc-100 dark:hover:bg-white/14",
        outline:
          "border border-slate-300 bg-white px-6 py-3 text-slate-800 hover:bg-slate-100 dark:border-white/15 dark:bg-transparent dark:text-zinc-100 dark:hover:bg-white/10",
        ghost:
          "px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white",
        link: "h-auto rounded-none p-0 text-cyan-300 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
