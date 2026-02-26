import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileText, Github } from "lucide-react";

import type { ProjectItem } from "@/content/projects";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectCard({ project }: { project: ProjectItem }) {
  const imageNode = (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200 dark:border-white/10">
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );

  return (
    <Card className="group overflow-hidden border-slate-200/80 bg-white/85 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/45 dark:border-white/10 dark:bg-zinc-900/75 dark:hover:border-cyan-400/45">
      {project.links.demo ? (
        <Link href={project.links.demo} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} website`}>
          {imageNode}
        </Link>
      ) : (
        imageNode
      )}

      <CardHeader>
        <div className="mb-3">
          <Badge variant="muted">{project.category}</Badge>
        </div>
        <CardTitle className="text-xl text-slate-900 dark:text-white">{project.title}</CardTitle>
        <p className="text-sm leading-7 text-slate-600 dark:text-zinc-300">{project.description}</p>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[11px] text-slate-700 dark:text-zinc-300">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-3">
        {project.links.github ? (
          <Link
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-cyan-700 dark:text-zinc-200 dark:hover:text-cyan-200"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
        ) : null}

        {project.links.demo ? (
          <Link
            href={project.links.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-cyan-700 dark:text-zinc-200 dark:hover:text-cyan-200"
          >
            <ExternalLink className="h-4 w-4" />
            Visit website
          </Link>
        ) : null}

        {project.links.caseStudy ? (
          <Link
            href={project.links.caseStudy}
            className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-cyan-700 dark:text-zinc-200 dark:hover:text-cyan-200"
          >
            <FileText className="h-4 w-4" />
            Case Study
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
}
