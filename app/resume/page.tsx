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
        commandIndex="01"
        command="resume.profile"
        eyebrow={dictionary.resumePage.eyebrow}
        title={dictionary.resumePage.title}
        description={dictionary.resumePage.description}
        className="pt-16"
      >
        <div className="overflow-hidden rounded-md border border-line bg-elevated/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex items-center gap-2 border-b border-line-subtle bg-canvas/60 px-4 py-2">
            <span className="mono text-[11px] tracking-[0.18em] text-ink-mono uppercase">
              <span aria-hidden className="text-ink-faint">$ </span>cat about.md
            </span>
          </div>
          <div className="p-6 md:p-8">
            <p className="max-w-4xl text-[14.5px] leading-8 text-ink-soft">{profile.shortAbout}</p>
            <div className="mt-4 space-y-3 text-[14.5px] leading-7 text-ink-soft">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="rounded-sm bg-accent text-canvas hover:bg-accent-warning">
                <Link href={profile.resumePath} target="_blank">
                  <span className="mono mr-2 text-canvas/70">{">"}</span>
                  <Download className="mr-2 h-4 w-4" />
                  {dictionary.resumePage.downloadPdf}
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-sm border-line text-ink hover:border-accent/50 hover:bg-accent-soft hover:text-accent">
                <Link href="/projects">
                  <span className="mono mr-2 text-ink-faint">{">"}</span>
                  {dictionary.resumePage.viewProjects}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section
        commandIndex="02"
        command="experience.log"
        eyebrow={dictionary.resumePage.careerEyebrow}
        title={dictionary.resumePage.careerTitle}
        description={dictionary.resumePage.careerDescription}
      >
        <Timeline items={experience} />
      </Section>

      <Section
        commandIndex="03"
        command="system_inventory"
        eyebrow={dictionary.resumePage.strengthsEyebrow}
        title={dictionary.resumePage.strengthsTitle}
        description={dictionary.resumePage.strengthsDescription}
      >
        <TechStack groups={profile.skills} />
      </Section>

      <Section
        commandIndex="04"
        command="education.dat"
        eyebrow={dictionary.resumePage.eduEyebrow}
        title={dictionary.resumePage.eduTitle}
        description={dictionary.resumePage.eduDescription}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <article className="overflow-hidden rounded-md border border-line bg-elevated/95">
            <div className="flex items-center gap-2 border-b border-line-subtle bg-canvas/60 px-4 py-2">
              <span className="mono text-[11px] tracking-[0.16em] text-ink-mono uppercase">education.txt</span>
            </div>
            <div className="p-5">
              <h3 className="text-[16px] font-semibold text-ink">{dictionary.resumePage.education}</h3>
              <ul className="mt-4 space-y-2 border-l border-line-subtle pl-3 text-[14px] leading-7 text-ink-soft">
                <li className="flex gap-2"><span aria-hidden className="mt-2.5 h-1 w-1 rounded-full bg-accent" />CEITI, Chișinău (2019 - 2023), Database Administration focus</li>
                <li className="flex gap-2"><span aria-hidden className="mt-2.5 h-1 w-1 rounded-full bg-accent" />USM, Chișinău, Applied Information Science (part-time)</li>
              </ul>
            </div>
          </article>
          <article className="overflow-hidden rounded-md border border-line bg-elevated/95">
            <div className="flex items-center gap-2 border-b border-line-subtle bg-canvas/60 px-4 py-2">
              <span className="mono text-[11px] tracking-[0.16em] text-ink-mono uppercase">languages.txt</span>
            </div>
            <div className="p-5">
              <h3 className="text-[16px] font-semibold text-ink">{dictionary.resumePage.languages}</h3>
              <ul className="mt-4 space-y-2 border-l border-line-subtle pl-3 text-[14px] leading-7 text-ink-soft">
                {profile.languages.map((language) => (
                  <li key={language} className="flex gap-2">
                    <span aria-hidden className="mt-2.5 h-1 w-1 rounded-full bg-accent-positive" />
                    {language}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </Section>
    </div>
  );
}
