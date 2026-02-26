import type { MDXComponents } from "mdx/types";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1 className={cn("mt-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white", className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn("mt-10 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("mt-8 text-xl font-semibold tracking-tight text-slate-800 dark:text-zinc-100", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("mt-5 leading-8 text-slate-700 dark:text-zinc-300", className)} {...props} />
  ),
  a: ({ className, href = "", ...props }) => (
    <Link
      href={href}
      className={cn("font-medium text-cyan-700 transition-colors hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("mt-4 list-disc space-y-2 pl-6 text-slate-700 dark:text-zinc-300", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("mt-4 list-decimal space-y-2 pl-6 text-slate-700 dark:text-zinc-300", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-cyan-500/60 pl-5 text-slate-700 italic dark:text-zinc-300",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-5 text-sm dark:border-white/10 dark:bg-zinc-900",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded-md bg-slate-200 px-1.5 py-0.5 font-mono text-[0.92em] text-slate-800 dark:bg-zinc-800 dark:text-zinc-100",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-10 border-slate-300 dark:border-zinc-800", className)} {...props} />
  ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
