import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Input — retro terminal field. Square corners, amber focus ring,
 * mono placeholder feel via tracking on the type-in.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-sm border border-line bg-canvas/65 px-3.5 py-2 text-[14px] text-ink placeholder:text-ink-faint",
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
Input.displayName = "Input";

export { Input };
