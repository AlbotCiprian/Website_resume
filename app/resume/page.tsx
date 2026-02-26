import Link from "next/link";
import { Download } from "lucide-react";

import { Section } from "@/components/Section";
import { TechStack } from "@/components/TechStack";
import { Timeline } from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resume",
  description: "Online resume of Albot Ciprian with experience timeline and technical strengths.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="pb-24">
      <Section
        eyebrow="Resume"
        title="Senior Backend Engineer & Systems Architect"
        description="From data-centric foundations to production backend architecture and platform ownership."
        className="pt-16"
      >
        <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 md:p-8 dark:border-white/10 dark:bg-zinc-900/70">
          <p className="max-w-4xl text-sm leading-8 text-slate-600 dark:text-zinc-300">{profile.shortAbout}</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-zinc-300">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={profile.resumePath} target="_blank">
                <Download className="mr-2 h-4 w-4" />
                Download CV (PDF)
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/projects">View Projects</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Career timeline"
        title="Experience"
        description="Roles across banking, enterprise analytics, consulting, and product architecture."
      >
        <Timeline items={experience} />
      </Section>

      <Section
        eyebrow="Technical strengths"
        title="Core capabilities"
        description="Practical skill groups used in production delivery and architecture decisions."
      >
        <TechStack groups={profile.skills} />
      </Section>

      <Section
        eyebrow="Education & languages"
        title="Academic path"
        description="CEITI graduate with database administration specialization and ongoing Applied Information Science studies at USM."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 dark:border-white/10 dark:bg-zinc-900/70">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Education</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-zinc-300">
              <li>CEITI, Chisinau (2019 - 2023), Database Administration focus</li>
              <li>USM, Chisinau, Applied Information Science (part-time)</li>
            </ul>
          </article>
          <article className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 dark:border-white/10 dark:bg-zinc-900/70">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Languages</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-zinc-300">
              {profile.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </article>
        </div>
      </Section>
    </div>
  );
}
