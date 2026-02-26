import type { MDXComponents } from "mdx/types";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1 className={cn("mt-6 text-4xl font-semibold tracking-tight text-white", className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn("mt-10 text-2xl font-semibold tracking-tight text-white", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("mt-8 text-xl font-semibold tracking-tight text-zinc-100", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("mt-5 leading-8 text-zinc-300", className)} {...props} />
  ),
  a: ({ className, href = "", ...props }) => (
    <Link
      href={href}
      className={cn("font-medium text-cyan-300 transition-colors hover:text-cyan-200", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("mt-4 list-disc space-y-2 pl-6 text-zinc-300", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("mt-4 list-decimal space-y-2 pl-6 text-zinc-300", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-cyan-500/60 pl-5 text-zinc-300 italic",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900 p-5 text-sm",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded-md bg-zinc-800 px-1.5 py-0.5 font-mono text-[0.92em] text-zinc-100",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-10 border-zinc-800", className)} {...props} />
  ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
