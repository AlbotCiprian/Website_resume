import Link from "next/link";
import { Download } from "lucide-react";

import { Section } from "@/components/Section";
import { TechStack } from "@/components/TechStack";
import { Timeline } from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { getServerDictionary } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resume",
  description: "Online resume of Albot Ciprian with experience timeline and technical strengths.",
  path: "/resume",
});

export default async function ResumePage() {
  const dictionary = await getServerDictionary();

  return (
    <div className="pb-24">
      <Section
        eyebrow={dictionary.resumePage.eyebrow}
        title={dictionary.resumePage.title}
        description={dictionary.resumePage.description}
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
                {dictionary.resumePage.downloadPdf}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/projects">{dictionary.resumePage.viewProjects}</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section
        eyebrow={dictionary.resumePage.careerEyebrow}
        title={dictionary.resumePage.careerTitle}
        description={dictionary.resumePage.careerDescription}
      >
        <Timeline items={experience} />
      </Section>

      <Section
        eyebrow={dictionary.resumePage.strengthsEyebrow}
        title={dictionary.resumePage.strengthsTitle}
        description={dictionary.resumePage.strengthsDescription}
      >
        <TechStack groups={profile.skills} />
      </Section>

      <Section
        eyebrow={dictionary.resumePage.eduEyebrow}
        title={dictionary.resumePage.eduTitle}
        description={dictionary.resumePage.eduDescription}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 dark:border-white/10 dark:bg-zinc-900/70">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{dictionary.resumePage.education}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-zinc-300">
              <li>CEITI, Chisinau (2019 - 2023), Database Administration focus</li>
              <li>USM, Chisinau, Applied Information Science (part-time)</li>
            </ul>
          </article>
          <article className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 dark:border-white/10 dark:bg-zinc-900/70">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{dictionary.resumePage.languages}</h3>
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
