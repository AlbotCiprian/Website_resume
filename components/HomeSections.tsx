"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, MoveDown, Send } from "lucide-react";

import type { PostMeta } from "@/lib/mdx";
import type { ProjectItem } from "@/content/projects";
import { fadeUp, staggerChildren } from "@/lib/motion";

import { BlogCard } from "@/components/BlogCard";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { AnimatedText } from "@/components/AnimatedText";
import { GithubFeed } from "@/components/GithubFeed";
import { ProjectCard } from "@/components/ProjectCard";
import { TechStack } from "@/components/TechStack";
import { Timeline } from "@/components/Timeline";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(14,165,233,0.24),transparent_40%),radial-gradient(circle_at_88%_76%,rgba(34,197,94,0.2),transparent_34%),linear-gradient(180deg,#050910_0%,#070d18_100%)]" />
  ),
});

export function HomeSections({ featuredProjects, latestPosts }: { featuredProjects: ProjectItem[]; latestPosts: PostMeta[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-slate-200/70 dark:border-white/10">
        <div className="absolute inset-0 -z-10">
          <Background3D />
        </div>

        <div className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-6xl flex-col justify-center px-5 py-24 md:px-8">
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
            transition={reducedMotion ? { duration: 0 } : undefined}
          >
            <motion.p variants={fadeUp} className="text-xs tracking-[0.32em] text-cyan-300/80 uppercase">
              Senior Backend Engineer & Systems Architect
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl xl:text-7xl"
            >
              ALBOT CIPRIAN
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
              {profile.heroIntro}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 text-sm tracking-[0.2em] text-cyan-200 uppercase">
              <AnimatedText items={profile.heroKeywords} />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={profile.resumePath} target="_blank">
                  Download CV
                  <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 text-sm text-zinc-400">
              <Link href="#about" className="inline-flex items-center gap-2 hover:text-zinc-200">
                Scroll to explore
                <MoveDown className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Section
        id="about"
        eyebrow="Why choose me"
        title="Architecture clarity with production discipline."
        description="I focus on systems that stay understandable under pressure and continue scaling without rewriting the core every quarter."
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Accordion
            type="single"
            collapsible
            defaultValue={profile.whyChooseMe[0]?.id}
            className="rounded-3xl border border-slate-200/80 bg-white/85 px-6 py-2 dark:border-white/10 dark:bg-zinc-900/70"
          >
            {profile.whyChooseMe.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-base text-slate-800 dark:text-zinc-100">{item.title}</AccordionTrigger>
                <AccordionContent>
                  <p className="leading-7 text-slate-600 dark:text-zinc-300">{item.description}</p>
                  <p className="mt-3 text-sm text-cyan-700 dark:text-cyan-200">{item.outcome}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <article className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 p-6 dark:border-white/10 dark:bg-zinc-900/70">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
              <Image
                src={profile.architectureCard}
                alt="Architecture blueprint preview"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">System blueprint mindset</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-zinc-300">
              Reliable APIs, predictable data layers, and deployment practices that keep systems stable while the product evolves.
            </p>
          </article>
        </div>
      </Section>

      <Section
        id="experience"
        eyebrow="Experience"
        title="Progression from data depth to backend leadership."
        description="Hands-on delivery across banking, enterprise analytics, and product engineering with strong ownership of production outcomes."
      >
        <Timeline items={experience} />
      </Section>

      <Section
        id="featured-projects"
        eyebrow="Featured projects"
        title="Selected systems and product builds"
        description="A mix of banking workloads, SaaS architecture, and high-ownership delivery across API, data, and infrastructure layers."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="secondary">
            <Link href="/projects">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section
        id="tech-stack"
        eyebrow="Tech stack"
        title="Backend, data and infrastructure toolkit"
        description="Grouped by the way I build systems in production rather than by trend-driven checklists."
      >
        <TechStack groups={profile.skills} />
      </Section>

      <Section
        id="github"
        eyebrow="GitHub activity"
        title="Recent engineering activity"
        description="Latest public events fetched through an API route with caching and normalized event output."
      >
        <GithubFeed limit={10} />
      </Section>

      <Section
        id="blog-preview"
        eyebrow="Blog"
        title="Latest writing"
        description="Notes on architecture decisions, backend reliability, SQL performance and deployment strategy."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="secondary">
            <Link href="/blog">
              View all posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Let us build your next backend platform."
        description="Share your project scope, current technical constraints, or hiring context and I will respond with concrete next steps."
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 md:p-8 dark:border-white/10 dark:bg-zinc-900/70">
            <ContactForm />
          </article>

          <article className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 md:p-8 dark:border-white/10 dark:bg-zinc-900/70">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Direct channels</h3>
            <ul className="mt-5 space-y-4 text-sm text-slate-600 dark:text-zinc-300">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <Link href={social.href} className="inline-flex items-center gap-2 hover:text-cyan-700 dark:hover:text-cyan-200">
                    <Send className="h-4 w-4" />
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-slate-500 dark:text-zinc-400">{profile.location}</p>
          </article>
        </div>
      </Section>
    </>
  );
}
