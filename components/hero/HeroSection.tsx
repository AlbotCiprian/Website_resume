"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, FileText, Mail } from "lucide-react";
import { useEffect, useState } from "react";

import { ArchitectureCanvas } from "@/components/system/ArchitectureCanvas";
import { BootSequence } from "@/components/system/BootSequence";
import { OperatorProfileCard } from "@/components/system/OperatorProfileCard";
import { ReliabilityMetrics } from "@/components/system/ReliabilityMetrics";
import { TerminalWindow } from "@/components/system/TerminalWindow";
import { TypewriterText } from "@/components/system/TypewriterText";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/language-provider";
import { profile } from "@/content/profile";
import { fadeUp, heroStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * HeroSection — ALBOT-OS Boot Console.
 *
 * Composition (desktop, 12-col):
 *   - Top status bar: section ID, coordinates, build version
 *   - Left col (7): identity terminal — boot sequence → headline →
 *     animated lede with typewriter → CTAs → status indicators
 *   - Right col (5): OperatorProfileCard (natural color portrait in
 *     retro ID frame) on top, ArchitectureCanvas terminal below
 *   - Diagnostics strip with KPI metrics closes the hero
 *
 * Mobile collapses everything into a single column and shortens the boot
 * sequence so first paint stays under control.
 */
export function HeroSection() {
  const { dictionary } = useI18n();
  const reducedMotion = useReducedMotion();
  const [bootDone, setBootDone] = useState<boolean>(false);

  // Failsafe: if for any reason BootSequence never fires onComplete,
  // unlock the headline after 4s so the page is never stuck.
  useEffect(() => {
    if (bootDone || reducedMotion) return;
    const id = window.setTimeout(() => setBootDone(true), 4000);
    return () => window.clearTimeout(id);
  }, [bootDone, reducedMotion]);

  return (
    <section
      id="profile"
      className="blueprint-grid relative isolate overflow-hidden border-b border-line"
    >
      {/* Top edge accent — amber phosphor rule */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/45 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-5 pt-10 pb-20 md:px-8 md:pt-14 md:pb-24">
        {/* Console header — single mono line with ID, coords, build */}
        <HeaderBar />

        {/* Main grid */}
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          variants={heroStagger}
          className="mt-8 grid gap-8 md:mt-10 md:gap-10 lg:grid-cols-12 lg:gap-x-10"
        >
          {/* Left — Identity terminal */}
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <TerminalWindow
              title="albot-os ~ /profile.boot"
              badge="LIVE"
              badgeTone="positive"
              promptText="> ready for input"
            >
              {/* Boot sequence */}
              <BootSequence onComplete={() => setBootDone(true)} />

              {/* Divider that fades in once boot is done */}
              <AnimatePresence>
                {bootDone ? (
                  <motion.div
                    key="after-boot"
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="hairline my-5" />

                    {/* Headline */}
                    <h1 className="text-ink">
                      <span className="block text-[40px] leading-[1.02] font-semibold tracking-[-0.02em] md:text-[58px] xl:text-[72px]">
                        ALBOT
                      </span>
                      <span className="block text-[40px] leading-[1.02] font-semibold tracking-[-0.02em] text-ink-soft md:text-[58px] xl:text-[72px]">
                        CIPRIAN
                        <span className="text-accent term-glow">.</span>
                      </span>
                    </h1>

                    {/* Subtitle line — typed in once boot completes */}
                    <p className="mono mt-3 text-[13px] tracking-[0.04em] text-ink-mono md:text-sm">
                      <span aria-hidden className="text-ink-faint">$ </span>
                      <TypewriterText
                        text={dictionary.hero.eyebrow}
                        speed={64}
                        delay={150}
                      />
                    </p>

                    {/* Lede */}
                    <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft md:text-[17px] md:leading-8">
                      {dictionary.hero.intro}
                    </p>

                    {/* CTAs as command buttons */}
                    <div className="mt-7 flex flex-wrap gap-2.5">
                      <Button
                        asChild
                        className="rounded-sm bg-accent px-5 text-canvas hover:bg-accent-warning focus-visible:ring-2 focus-visible:ring-accent/70"
                      >
                        <Link href="/projects">
                          <span className="mono mr-2 text-canvas/70">{">"}</span>
                          {dictionary.common.viewProjects}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        className="rounded-sm border-line bg-transparent text-ink hover:border-accent/50 hover:bg-accent-soft hover:text-accent"
                      >
                        <Link href={profile.resumePath} target="_blank">
                          <span className="mono mr-2 text-ink-faint">{">"}</span>
                          {dictionary.common.downloadCv}
                          <Download className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        className="rounded-sm border-line bg-transparent text-ink hover:border-accent-positive/50 hover:bg-canvas/40 hover:text-accent-positive"
                      >
                        <Link href="#experience">
                          <span className="mono mr-2 text-ink-faint">{">"}</span>
                          {dictionary.common.resume}
                          <FileText className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        asChild
                        variant="ghost"
                        className="rounded-sm px-3 text-ink-soft hover:bg-bezel/40 hover:text-ink"
                      >
                        <Link href="#contact">
                          <span className="mono mr-2 text-ink-faint">{">"}</span>
                          {dictionary.common.contact}
                          <Mail className="ml-2 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>

                    {/* Inline status indicators */}
                    <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <StatusChip dot="positive" label="STATUS" value="AVAILABLE" />
                      <StatusChip dot="amber" label="MODE" value="BACKEND · ARCHITECTURE" />
                      <StatusChip dot="cyan" label="REGION" value="EU · MD" />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </TerminalWindow>
          </motion.div>

          {/* Right — Operator card + Architecture canvas */}
          <motion.div variants={fadeUp} className="grid gap-5 lg:col-span-5">
            <OperatorProfileCard
              src={profile.avatar}
              alt={`${profile.name} portrait`}
              name={profile.name}
              role="Senior Backend Engineer · Systems Architect"
              region="Chișinău · EU"
              operatorId="OP-0419"
              status={{ label: "AVAILABLE", tone: "positive" }}
            />

            <TerminalWindow
              title="albot-os ~ system_architecture.svg"
              badge="RENDER"
              badgeTone="amber"
              bodyClassName="p-0 md:p-0"
              promptText="> visual diagnostics"
            >
              <ArchitectureCanvas className="rounded-none border-0 shadow-none" />
            </TerminalWindow>
          </motion.div>
        </motion.div>

        {/* Diagnostics — system metrics strip */}
        <div className="mt-14 md:mt-16">
          <div className="mono mb-3 flex items-center gap-3 text-[10.5px] tracking-[0.2em] text-ink-faint uppercase">
            <span aria-hidden className="hairline w-8 shrink-0" />
            <span>{"// system diagnostics"}</span>
            <span aria-hidden className="hairline flex-1" />
          </div>
          <ReliabilityMetrics />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Header bar — section ID, coordinates, build                     */
/* --------------------------------------------------------------- */

function HeaderBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-y border-line-subtle bg-canvas/55 px-3 py-2 mono text-[10.5px] tracking-[0.18em] text-ink-mono uppercase">
      <div className="flex items-center gap-3">
        <span className="text-ink-faint">{"//"}</span>
        <span className="text-ink-faint">01 —</span>
        <span>profile.boot</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="text-ink-mono">47.0105°N · 28.8638°E</span>
        <span aria-hidden className="hidden text-ink-faint md:inline">·</span>
        <span className="text-ink-mono">Chișinău</span>
        <span aria-hidden className="hidden text-ink-faint md:inline">·</span>
        <span className="text-ink-faint">build 2026.05</span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- */
/* StatusChip — small mono chip for inline status lines            */
/* --------------------------------------------------------------- */

function StatusChip({
  dot,
  label,
  value,
}: {
  dot: "positive" | "amber" | "cyan" | "muted";
  label: string;
  value: string;
}) {
  const dotClass = {
    positive: "bg-accent-positive shadow-[0_0_6px_rgba(123,181,110,0.55)]",
    amber: "bg-accent shadow-[0_0_6px_rgba(232,163,61,0.55)]",
    cyan: "bg-accent-cyan shadow-[0_0_6px_rgba(111,214,232,0.55)]",
    muted: "bg-ink-faint",
  }[dot];

  return (
    <span className="mono inline-flex items-center gap-2 text-[10.5px] tracking-[0.18em] uppercase">
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", dotClass)} />
      <span className="text-ink-faint">{label}</span>
      <span className="text-ink">{value}</span>
    </span>
  );
}
