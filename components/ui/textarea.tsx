import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-34 w-full rounded-sm border border-line bg-canvas/65 px-3.5 py-3 text-[14px] text-ink placeholder:text-ink-faint",
        "transition-[border-color,box-shadow] duration-200",
        "focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
