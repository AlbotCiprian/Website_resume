"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { useMemo } from "react";

import type { PostMeta } from "@/lib/mdx";
import type { ProjectItem } from "@/content/projects";
import { fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";

import { AboutTerminalSection } from "@/components/system/AboutTerminalSection";
import { CompanyLogosMarquee } from "@/components/system/CompanyLogosMarquee";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { TechStack } from "@/components/TechStack";
import { Timeline } from "@/components/Timeline";
import { useI18n } from "@/components/providers/language-provider";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { techPartners } from "@/content/tech-partners";

const GithubFeed = dynamic(() => import("@/components/GithubFeed").then((module) => module.GithubFeed), {
  ssr: false,
  loading: () => (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`github-skeleton-${index}`}
          className="h-16 animate-pulse rounded-2xl border border-line bg-white/4"
        />
      ))}
    </div>
  ),
});

export function HomeSections({ featuredProjects, latestPosts }: { featuredProjects: ProjectItem[]; latestPosts: PostMeta[] }) {
  const { dictionary } = useI18n();

  const whyChooseItems = useMemo(() => {
    return profile.whyChooseMe.map((item) => {
      const localized = dictionary.whyChoose[item.id as keyof typeof dictionary.whyChoose];

      return localized
        ? {
            ...item,
            ...localized,
          }
        : item;
    });
  }, [dictionary]);

  const socialLabelMap = useMemo(
    () => ({
      GitHub: dictionary.common.github,
      LinkedIn: dictionary.common.linkedin,
      Email: dictionary.common.email,
    }),
    [dictionary],
  );

  return (
    <>
      <HeroSection />

      <CompanyLogosMarquee
        eyebrow={dictionary.home.clients.eyebrow}
        title={dictionary.home.clients.title}
        variant="dark"
      />

      <AboutTerminalSection
        whyChooseItems={whyChooseItems}
        title={dictionary.home.why.title}
        eyebrow={dictionary.home.why.eyebrow}
        description={dictionary.home.why.description}
        blueprintTitle={dictionary.home.blueprintTitle}
        blueprintDescription={dictionary.home.blueprintDescription}
      />

      <Section
        id="experience"
        commandIndex="03"
        command="experience.log"
        eyebrow={dictionary.home.experience.eyebrow}
        title={dictionary.home.experience.title}
        description={dictionary.home.experience.description}
      >
        <Timeline items={experience} />
      </Section>

      <Section
        id="featured-projects"
        commandIndex="04"
        command="project_archive/"
        eyebrow={dictionary.home.featured.eyebrow}
        title={dictionary.home.featured.title}
        description={dictionary.home.featured.description}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline" className="rounded-sm border-line text-ink hover:border-accent/50 hover:bg-accent-soft hover:text-accent">
            <Link href="/projects">
              <span className="mono mr-2 text-ink-faint">{">"}</span>
              {dictionary.common.viewAllProjects}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section
        id="tech-stack"
        commandIndex="05"
        command="system_inventory"
        eyebrow={dictionary.home.tech.eyebrow}
        title={dictionary.home.tech.title}
        description={dictionary.home.tech.description}
      >
        <TechStack groups={profile.skills} />
      </Section>

      <CompanyLogosMarquee
        items={techPartners}
        eyebrow={dictionary.home.integrations.eyebrow}
        title={dictionary.home.integrations.title}
        durationSeconds={52}
        reverse
        variant="light"
      />

      <Section
        id="github"
        commandIndex="06"
        command="github.feed"
        eyebrow={dictionary.home.github.eyebrow}
        title={dictionary.home.github.title}
        description={dictionary.home.github.description}
      >
        <GithubFeed limit={10} />
      </Section>

      <Section
        id="blog-preview"
        commandIndex="07"
        command="technical_notes/"
        eyebrow={dictionary.home.blog.eyebrow}
        title={dictionary.home.blog.title}
        description={dictionary.home.blog.description}
      >
        <motion.div variants={staggerContainer} {...revealOnScroll} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {latestPosts.map((post) => (
            <motion.div key={post.slug} variants={fadeUp}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8">
          <Button asChild variant="outline" className="rounded-sm border-line text-ink hover:border-accent/50 hover:bg-accent-soft hover:text-accent">
            <Link href="/blog">
              <span className="mono mr-2 text-ink-faint">{">"}</span>
              {dictionary.common.viewAllPosts}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section
        id="contact"
        commandIndex="08"
        command="secure_connection"
        eyebrow={dictionary.home.contact.eyebrow}
        title={dictionary.home.contact.title}
        description={dictionary.home.contact.description}
      >
        <motion.div variants={staggerContainer} {...revealOnScroll} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.article variants={fadeUp} className="overflow-hidden rounded-md border border-line bg-elevated/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="flex items-center gap-2 border-b border-line-subtle bg-canvas/60 px-4 py-2">
              <span className="mono flex-1 truncate text-[11px] tracking-[0.16em] text-ink-mono uppercase">
                $ establish_connection --to ciprian.albot
              </span>
              <span className="mono inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-accent-positive uppercase">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-positive shadow-[0_0_6px_rgba(123,181,110,0.55)]" />
                ready
              </span>
            </div>
            <div className="p-5 md:p-6">
              <ContactForm />
            </div>
          </motion.article>

          <motion.article variants={fadeUp} className="overflow-hidden rounded-md border border-line bg-elevated/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="flex items-center gap-2 border-b border-line-subtle bg-canvas/60 px-4 py-2">
              <span className="mono text-[11px] tracking-[0.16em] text-ink-mono uppercase">
                direct.channels
              </span>
            </div>
            <div className="p-5 md:p-6">
              <h3 className="mono text-[11px] tracking-[0.2em] text-ink-faint uppercase">
                <span aria-hidden>{"// "}</span>
                {dictionary.common.directChannels}
              </h3>
              <ul className="mt-4 space-y-3 text-[14px]">
                {profile.socials.map((social) => (
                  <li key={social.label}>
                    <Link
                      href={social.href}
                      className="group inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-accent"
                    >
                      <span aria-hidden className="mono text-ink-faint">{">"}</span>
                      <Send className="h-3.5 w-3.5" />
                      <span>{socialLabelMap[social.label as keyof typeof socialLabelMap] ?? social.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-line-subtle pt-4 mono text-[11px] tracking-[0.18em] text-ink-faint uppercase">
                <span aria-hidden className="text-ink-mono">$ </span>
                location: {profile.location}
              </div>
            </div>
          </motion.article>
        </motion.div>
      </Section>
    </>
  );
}
