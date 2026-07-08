import { cn } from "@/lib/utils";

type MonoLabelProps = {
  /** Section number, e.g. "01". Padded automatically if short. */
  index?: string;
  /** Section title. Rendered uppercase. */
  children: React.ReactNode;
  className?: string;
  /** Show the leading double slash like a code comment. Defaults to true. */
  showSlash?: boolean;
};

/**
 * MonoLabel — editorial section ID rendered in IBM Plex Mono.
 * Example: `// 01 — PROFILE`
 *
 * Used as a section header eyebrow throughout the redesign. The leading
 * slashes and dash are decorative; the readable label remains accessible
 * via the children prop.
 */
export function MonoLabel({ index, children, className, showSlash = true }: MonoLabelProps) {
  return (
    <span className={cn("mono-eyebrow inline-flex items-center gap-2", className)}>
      {showSlash ? <span aria-hidden className="text-ink-faint">{"//"}</span> : null}
      {index ? <span aria-hidden className="text-ink-faint">{index.padStart(2, "0")} —</span> : null}
      <span className="text-ink-mono">{children}</span>
    </span>
  );
}
