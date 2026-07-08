"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileCode2, FileText, Github } from "lucide-react";
import { useCallback } from "react";

import type { ProjectItem } from "@/content/projects";

import { useI18n } from "@/components/providers/language-provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * ProjectCard — retro IDE file. Replaces the old accordion-heavy card.
 *
 * Layout:
 *   - Title bar (terminal-style) with mono filename, category chip
 *   - Media (image or hover-playing video)
 *   - Body: title, subtitle (italic-ish mono ink-mono), description,
 *           implementation bullets shown by default but truncated, tags
 *   - Footer: link cluster prefixed with `>`
 *
 * Accessibility:
 *   - Title is the canonical link target (demo > case study > github).
 *   - Footer links are independent `<a>` elements.
 *   - The card itself is NOT a button — no nested-interactive trap.
 *   - Hover effect is decorative only (border + box-shadow).
 */
export function ProjectCard({ project }: { project: ProjectItem }) {
  const { dictionary } = useI18n();

  const primaryHref = project.links.demo ?? project.links.caseStudy ?? project.links.github;
  const filename = `${project.slug.replace(/-/g, "_")}.ts`;
  const hasFooterLinks = Boolean(project.links.github || project.links.demo || project.links.caseStudy);

  const playPreview = useCallback((event: React.MouseEvent<HTMLVideoElement>) => {
    event.currentTarget.play().catch(() => {
      /* preview playback can be blocked; poster remains as fallback */
    });
  }, []);

  const pausePreview = useCallback((event: React.MouseEvent<HTMLVideoElement>) => {
    event.currentTarget.pause();
  }, []);

  const media = (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-canvas">
      {project.video ? (
        <video
          src={project.video}
          poster={project.image}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${project.title} preview video`}
          onMouseEnter={playPreview}
          onMouseLeave={pausePreview}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <Image
          src={project.image}
          alt={project.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}
      {/* Soft top vignette + scan band on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-canvas/15 via-transparent to-canvas/55"
      />
    </div>
  );

  return (
    <article
      id={project.slug}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md border border-line bg-elevated/95",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_40px_-26px_rgba(0,0,0,0.7)]",
        "transition-[border-color,box-shadow,transform] duration-300",
        "hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_22px_48px_-22px_rgba(232,163,61,0.18)]",
      )}
    >
      {/* Title bar — terminal-style file header */}
      <div className="flex items-center gap-2 border-b border-line-subtle bg-canvas/65 px-3 py-2">
        <FileCode2 className="h-3.5 w-3.5 text-accent" aria-hidden />
        <span className="mono flex-1 truncate text-[11px] tracking-[0.12em] text-ink-mono">
          {filename}
        </span>
        <span className="mono inline-flex items-center gap-1 rounded-sm border border-line bg-canvas/65 px-1.5 py-0.5 text-[9.5px] tracking-[0.2em] text-ink-soft uppercase">
          {dictionary.filters[project.category] ?? project.category}
        </span>
        {project.status ? (
          <span
            className="mono inline-flex items-center gap-1 rounded-sm border border-accent-warning/40 bg-accent-warning/10 px-1.5 py-0.5 text-[9.5px] tracking-[0.2em] text-accent-warning uppercase"
            title={project.status}
          >
            WIP
          </span>
        ) : null}
      </div>

      {/* Media */}
      {primaryHref ? (
        <Link
          href={primaryHref}
          target={primaryHref.startsWith("http") ? "_blank" : undefined}
          rel={primaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={`Open ${project.title}`}
          className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          {media}
        </Link>
      ) : (
        media
      )}

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 px-5 py-5">
        <header className="space-y-1.5">
          <h3 className="text-[18px] leading-snug font-semibold text-ink">
            {primaryHref ? (
              <Link
                href={primaryHref}
                target={primaryHref.startsWith("http") ? "_blank" : undefined}
                rel={primaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
                className="transition-colors hover:text-accent"
              >
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>
          <p className="mono text-[12.5px] tracking-[0.04em] text-ink-mono">
            <span aria-hidden className="text-ink-faint">{"// "}</span>
            {project.subtitle}
          </p>
        </header>

        <p className="text-[13.5px] leading-6 text-ink-soft">{project.description}</p>

        {/* Implementation peek — first two bullets, the rest fade out on hover */}
        {project.implementation.length > 0 ? (
          <ul className="space-y-1.5 border-l border-line-subtle pl-3">
            {project.implementation.slice(0, 2).map((point) => (
              <li key={point} className="flex gap-2 text-[12.5px] leading-5 text-ink-soft">
                <span aria-hidden className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{point}</span>
              </li>
            ))}
            {project.implementation.length > 2 ? (
              <li className="mono text-[10.5px] tracking-[0.16em] text-ink-faint uppercase">
                +{project.implementation.length - 2} more in case study
              </li>
            ) : null}
          </ul>
        ) : null}

        {/* Stack — mono chips, max 6 visible */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 6).map((tag) => (
            <Badge key={tag} variant="mono">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 6 ? (
            <span className="mono inline-flex items-center text-[10.5px] tracking-[0.16em] text-ink-faint uppercase">
              +{project.tags.length - 6}
            </span>
          ) : null}
        </div>
      </div>

      {/* Footer link rail */}
      {hasFooterLinks ? (
        <footer className="flex flex-wrap items-center gap-4 border-t border-line-subtle bg-canvas/55 px-5 py-3 mono text-[11.5px] tracking-[0.04em]">
          {project.links.github ? (
            <FooterLink href={project.links.github} icon={<Github className="h-3.5 w-3.5" />}>
              {dictionary.common.github}
            </FooterLink>
          ) : null}
          {project.links.demo ? (
            <FooterLink href={project.links.demo} icon={<ExternalLink className="h-3.5 w-3.5" />}>
              {dictionary.common.visitWebsite}
            </FooterLink>
          ) : null}
          {project.links.caseStudy ? (
            <FooterLink href={project.links.caseStudy} icon={<FileText className="h-3.5 w-3.5" />}>
              {dictionary.common.caseStudy}
            </FooterLink>
          ) : null}
        </footer>
      ) : null}
    </article>
  );
}

function FooterLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-ink-soft transition-colors hover:text-accent"
    >
      <span aria-hidden className="text-ink-faint">{">"}</span>
      {icon}
      <span>{children}</span>
    </Link>
  );
}
