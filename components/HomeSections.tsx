"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Download, MoveDown, Send } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import type { PostMeta } from "@/lib/mdx";
import type { ProjectItem } from "@/content/projects";
import { fadeIn, fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { AnimatedText } from "@/components/AnimatedText";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { TechStack } from "@/components/TechStack";
import { Timeline } from "@/components/Timeline";
import { useI18n } from "@/components/providers/language-provider";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(14,165,233,0.24),transparent_40%),radial-gradient(circle_at_88%_76%,rgba(34,197,94,0.2),transparent_34%),linear-gradient(180deg,#050910_0%,#070d18_100%)]" />
  ),
});

const GithubFeed = dynamic(() => import("@/components/GithubFeed").then((module) => module.GithubFeed), {
  ssr: false,
  loading: () => (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`github-skeleton-${index}`}
          className="h-16 animate-pulse rounded-2xl border border-white/10 bg-white/5"
        />
      ))}
    </div>
  ),
});

const aboutHeadlineVariants: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const aboutSubtextVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function HomeSections({ featuredProjects, latestPosts }: { featuredProjects: ProjectItem[]; latestPosts: PostMeta[] }) {
  const reducedMotion = useReducedMotion();
  const { dictionary } = useI18n();

  const heroRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -44]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1024px)");

    const update = () => setIsMobile(query.matches);
    update();

    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const disableParallax = reducedMotion || isMobile;

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
      <section ref={heroRef} className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <Background3D />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_58%_30%,rgba(255,255,255,0.12),transparent_36%)]" />

        <div className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-6xl items-center gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1fr_0.92fr]">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-xs tracking-[0.32em] text-cyan-300/85 uppercase">
              {dictionary.hero.eyebrow}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl xl:text-7xl"
            >
              {profile.name.toUpperCase()}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
              {dictionary.hero.intro}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 text-sm tracking-[0.2em] text-cyan-200 uppercase">
              <AnimatedText items={dictionary.hero.keywords} intervalMs={2300} />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <motion.div
                whileHover={disableParallax ? undefined : { y: -2, scale: 1.02 }}
                whileTap={disableParallax ? undefined : { scale: 0.99 }}
              >
                <Button
                  asChild
                  className="shadow-[0_10px_26px_rgba(34,211,238,0.2)] transition-shadow hover:shadow-[0_18px_40px_rgba(34,211,238,0.35)]"
                >
                  <Link href="/projects">
                    {dictionary.common.viewProjects}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={disableParallax ? undefined : { y: -2, scale: 1.02 }}
                whileTap={disableParallax ? undefined : { scale: 0.99 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 bg-white/7 shadow-[0_10px_26px_rgba(15,23,42,0.26)] hover:bg-white/12"
                >
                  <Link href={profile.resumePath} target="_blank">
                    {dictionary.common.downloadCv}
                    <Download className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            style={disableParallax ? undefined : { y: parallaxY }}
            className="relative mx-auto w-full max-w-[500px]"
          >
            <div className="absolute -inset-9 rounded-[2.2rem] bg-[radial-gradient(circle_at_40%_40%,rgba(34,211,238,0.34),transparent_56%)] blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-200/28 bg-slate-950/75 shadow-[0_32px_84px_rgba(2,8,20,0.55)] backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-transparent to-sky-500/20" />
              <div className="relative aspect-[4/5]">
                <Image
                  src={profile.avatar}
                  alt={`${profile.name} portrait`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 38vw"
                  className="object-cover object-center contrast-110 saturate-110"
                  priority
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_35%,transparent_30%,rgba(2,8,20,0.56)_100%)]" />
              </div>
            </div>

            <motion.div
              whileHover={disableParallax ? undefined : { y: -3 }}
              className="absolute -bottom-7 left-6 w-[72%] rounded-2xl border border-cyan-200/22 bg-slate-950/88 p-4 shadow-[0_20px_42px_rgba(2,8,20,0.5)]"
            >
              <p className="text-[11px] tracking-[0.16em] text-cyan-200 uppercase">{profile.title}</p>
              <p className="mt-1 text-sm text-zinc-200">Backend architecture with production ownership.</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-300"
          animate={disableParallax ? undefined : { y: [0, 8, 0], opacity: [0.45, 1, 0.45] }}
          transition={disableParallax ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link href="#about" className="inline-flex items-center gap-2 text-sm hover:text-white">
            {dictionary.common.scrollToExplore}
            <MoveDown className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      <section id="about" className="relative py-28 md:py-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />

        <Container>
          <motion.div variants={staggerContainer} {...revealOnScroll} className="mb-12 max-w-3xl">
            <motion.p variants={fadeIn} className="mb-4 text-sm font-medium tracking-[0.18em] text-cyan-300/85 uppercase">
              {dictionary.home.why.eyebrow}
            </motion.p>
            <motion.h2 variants={aboutHeadlineVariants} className="text-3xl font-semibold tracking-tight text-white md:text-6xl">
              {dictionary.home.why.title}
            </motion.h2>
            <motion.p variants={aboutSubtextVariants} className="mt-5 text-base leading-8 text-zinc-300 md:text-lg">
              {dictionary.home.why.description}
            </motion.p>
          </motion.div>

          <motion.div variants={staggerContainer} {...revealOnScroll} className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div variants={fadeUp} className="relative z-20">
              <Accordion
                type="single"
                collapsible
                defaultValue={whyChooseItems[0]?.id}
                className="rounded-3xl border border-white/12 bg-zinc-900/68 px-6 py-2 shadow-[0_22px_52px_rgba(2,8,20,0.4)] backdrop-blur"
              >
                {whyChooseItems.map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="border-white/10">
                    <motion.div variants={fadeUp}>
                      <AccordionTrigger className="text-base text-zinc-100 transition-all duration-300 hover:scale-[1.01] hover:text-cyan-200 hover:drop-shadow-[0_0_18px_rgba(34,211,238,0.25)]">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="leading-7 text-zinc-300">{item.description}</p>
                        <p className="mt-3 text-sm text-cyan-200">{item.outcome}</p>
                      </AccordionContent>
                    </motion.div>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            <motion.article
              variants={fadeIn}
              className="relative z-10 overflow-hidden rounded-3xl border border-white/12 bg-zinc-900/68 p-6 shadow-[0_22px_52px_rgba(2,8,20,0.4)] lg:-ml-8 lg:mt-8"
            >
              <motion.div
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={
                  reducedMotion
                    ? undefined
                    : {
                        duration: 0.48,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
              >
                <ArchitectureDiagram enableParallax={!disableParallax} />
              </motion.div>
              <h3 className="mt-5 text-xl font-semibold text-white">{dictionary.home.blueprintTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{dictionary.home.blueprintDescription}</p>
            </motion.article>
          </motion.div>
        </Container>
      </section>

      <Section
        id="experience"
        eyebrow={dictionary.home.experience.eyebrow}
        title={dictionary.home.experience.title}
        description={dictionary.home.experience.description}
      >
        <Timeline items={experience} />
      </Section>

      <Section
        id="featured-projects"
        eyebrow={dictionary.home.featured.eyebrow}
        title={dictionary.home.featured.title}
        description={dictionary.home.featured.description}
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="secondary">
            <Link href="/projects">
              {dictionary.common.viewAllProjects}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section
        id="tech-stack"
        eyebrow={dictionary.home.tech.eyebrow}
        title={dictionary.home.tech.title}
        description={dictionary.home.tech.description}
      >
        <TechStack groups={profile.skills} />
      </Section>

      <Section
        id="github"
        eyebrow={dictionary.home.github.eyebrow}
        title={dictionary.home.github.title}
        description={dictionary.home.github.description}
      >
        <GithubFeed limit={10} />
      </Section>

      <Section
        id="blog-preview"
        eyebrow={dictionary.home.blog.eyebrow}
        title={dictionary.home.blog.title}
        description={dictionary.home.blog.description}
      >
        <motion.div variants={staggerContainer} {...revealOnScroll} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latestPosts.map((post) => (
            <motion.div key={post.slug} variants={fadeUp}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8">
          <Button asChild variant="secondary">
            <Link href="/blog">
              {dictionary.common.viewAllPosts}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow={dictionary.home.contact.eyebrow}
        title={dictionary.home.contact.title}
        description={dictionary.home.contact.description}
      >
        <motion.div variants={staggerContainer} {...revealOnScroll} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.article variants={fadeUp} className="rounded-3xl border border-white/12 bg-zinc-900/68 p-6 md:p-8">
            <ContactForm />
          </motion.article>

          <motion.article variants={fadeUp} className="rounded-3xl border border-white/12 bg-zinc-900/68 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-white">{dictionary.common.directChannels}</h3>
            <ul className="mt-5 space-y-4 text-sm text-zinc-300">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <Link href={social.href} className="inline-flex items-center gap-2 hover:text-cyan-200">
                    <Send className="h-4 w-4" />
                    {socialLabelMap[social.label as keyof typeof socialLabelMap] ?? social.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-zinc-400">{profile.location}</p>
          </motion.article>
        </motion.div>
      </Section>
    </>
  );
}
