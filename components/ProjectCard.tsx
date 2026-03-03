"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileText, Github } from "lucide-react";
import { useCallback } from "react";

import type { ProjectItem } from "@/content/projects";

import { useI18n } from "@/components/providers/language-provider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectCard({ project }: { project: ProjectItem }) {
  const { dictionary } = useI18n();
  const demoUrl = project.links.demo;
  const hasFooterLinks = Boolean(project.links.github || project.links.demo || project.links.caseStudy);

  const openDemo = useCallback(() => {
    if (!demoUrl) {
      return;
    }

    window.open(demoUrl, "_blank", "noopener,noreferrer");
  }, [demoUrl]);

  const handleCardClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!demoUrl) {
        return;
      }

      const target = event.target as HTMLElement;
      if (target.closest("a,button,[role='button'],input,textarea,select")) {
        return;
      }

      openDemo();
    },
    [demoUrl, openDemo],
  );

  const handleCardKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (!demoUrl) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDemo();
      }
    },
    [demoUrl, openDemo],
  );

  const imageNode = (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200 dark:border-white/10">
      <Image
        src={project.image}
        alt={project.title}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
      />
    </div>
  );

  return (
    <Card
      id={project.slug}
      className={`group overflow-hidden border-slate-200/80 bg-white/85 transition-all duration-300 hover:-translate-y-[3px] hover:border-cyan-500/45 hover:shadow-[0_24px_48px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-zinc-900/75 dark:hover:border-cyan-400/45 dark:hover:shadow-[0_26px_54px_rgba(2,8,20,0.44)] ${
        demoUrl ? "cursor-pointer" : ""
      }`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role={demoUrl ? "button" : undefined}
      tabIndex={demoUrl ? 0 : undefined}
      aria-label={demoUrl ? `Open ${project.title} website` : undefined}
    >
      {project.links.demo ? (
        <Link
          href={project.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} website`}
        >
          {imageNode}
        </Link>
      ) : (
        imageNode
      )}

      <CardHeader>
        <div className="mb-3">
          <Badge variant="muted">{dictionary.filters[project.category] ?? project.category}</Badge>
        </div>
        <CardTitle className="text-xl text-slate-900 dark:text-white">{project.title}</CardTitle>
        <p className="text-sm font-medium text-cyan-700 dark:text-cyan-200">{project.subtitle}</p>
        <p className="text-sm leading-7 text-slate-600 dark:text-zinc-300">{project.description}</p>
      </CardHeader>

      <CardContent className="space-y-5">
        <Accordion
          type="multiple"
          defaultValue={["overview"]}
          className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 dark:border-white/10 dark:bg-slate-950/40"
        >
          <AccordionItem value="overview" className="border-slate-200/80 dark:border-white/10">
            <AccordionTrigger className="py-3 text-[13px] uppercase tracking-[0.08em] text-slate-700 dark:text-zinc-200">
              Overview
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm leading-7 text-slate-600 dark:text-zinc-300">{project.overview}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="implementation" className="border-slate-200/80 dark:border-white/10">
            <AccordionTrigger className="py-3 text-[13px] uppercase tracking-[0.08em] text-slate-700 dark:text-zinc-200">
              Implementation
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {project.implementation.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-7 text-slate-600 dark:text-zinc-300">
                    <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="impact" className="border-b-0">
            <AccordionTrigger className="py-3 text-[13px] uppercase tracking-[0.08em] text-slate-700 dark:text-zinc-200">
              Impact
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {project.impact.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-7 text-slate-600 dark:text-zinc-300">
                    <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {project.status ? (
                <div className="mt-3 rounded-xl border border-amber-400/35 bg-amber-100/70 px-3 py-2 text-xs font-medium text-amber-900 dark:border-amber-300/35 dark:bg-amber-500/10 dark:text-amber-200">
                  Status: {project.status}
                </div>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-cyan-500/25 bg-cyan-50/60 text-[11px] text-cyan-800 dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-100"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      {hasFooterLinks ? (
        <CardFooter className="gap-3">
          {project.links.github ? (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-cyan-700 dark:text-zinc-200 dark:hover:text-cyan-200"
            >
              <Github className="h-4 w-4" />
              {dictionary.common.github}
            </Link>
          ) : null}

          {project.links.demo ? (
            <Link
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-cyan-700 dark:text-zinc-200 dark:hover:text-cyan-200"
            >
              <ExternalLink className="h-4 w-4" />
              {dictionary.common.visitWebsite}
            </Link>
          ) : null}

          {project.links.caseStudy ? (
            <Link
              href={project.links.caseStudy}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-cyan-700 dark:text-zinc-200 dark:hover:text-cyan-200"
            >
              <FileText className="h-4 w-4" />
              {dictionary.common.caseStudy}
            </Link>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  );
}
