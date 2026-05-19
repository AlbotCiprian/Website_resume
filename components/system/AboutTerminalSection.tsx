"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { TerminalWindow } from "@/components/system/TerminalWindow";
import { Container } from "@/components/Container";
import { fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type WhyChooseItem = {
  id: string;
  title: string;
  description: string;
  outcome: string;
};

type AboutTerminalSectionProps = {
  whyChooseItems: WhyChooseItem[];
  eyebrow: string;
  title: string;
  description: string;
  blueprintTitle: string;
  blueprintDescription: string;
};

/**
 * AboutTerminalSection — `./whoami` retro terminal panel.
 *
 * Replaces the previous accordion + diagram split with a single, more
 * editorial composition that fits the ALBOT-OS direction:
 *
 *   - Section command title rendered as `// 02 — ./whoami`.
 *   - Left: a TerminalWindow listing principles as `man`-page entries.
 *     Selecting an entry highlights it and shows the long-form outcome in
 *     a dedicated detail pane below. Feels like a retro IDE doc viewer.
 *   - Right: a second TerminalWindow titled `system.blueprint.svg`
 *     wrapping the existing ArchitectureDiagram (kept as a meaningful
 *     visual rather than ornament).
 *   - A bottom command rail with mono prompt nudges the user onward.
 */
export function AboutTerminalSection({
  whyChooseItems,
  eyebrow,
  title,
  description,
  blueprintTitle,
  blueprintDescription,
}: AboutTerminalSectionProps) {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(whyChooseItems[0]?.id ?? "");
  const active = whyChooseItems.find((item) => item.id === activeId) ?? whyChooseItems[0];

  return (
    <section id="about" className="relative py-20 md:py-28">
      <Container>
        {/* Section command header */}
        <motion.header
          variants={staggerContainer}
          {...revealOnScroll}
          className="mb-10 max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            className="mono mb-5 flex items-center gap-2 text-[11px] tracking-[0.2em] text-ink-mono uppercase"
          >
            <span className="text-ink-faint">//</span>
            <span className="text-ink-faint">02 —</span>
            <span>./whoami</span>
            <span aria-hidden className="ml-2 hairline w-12" />
            <span className="text-ink-faint">{eyebrow}</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-semibold tracking-[-0.01em] text-ink md:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-[15.5px] leading-8 text-ink-soft md:text-[17px]"
          >
            {description}
          </motion.p>
        </motion.header>

        {/* Two-column terminal pair */}
        <motion.div
          variants={staggerContainer}
          {...revealOnScroll}
          className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8"
        >
          {/* Left — principles list (`man principles`) */}
          <motion.div variants={fadeUp}>
            <TerminalWindow
              title="albot-os ~ man principles"
              badge="DOCS"
              badgeTone="amber"
              promptText="> arrows to navigate · enter to select"
              bodyClassName="p-0 md:p-0"
            >
              <ul role="listbox" aria-label="Engineering principles" className="divide-y divide-line-subtle">
                {whyChooseItems.map((item, index) => {
                  const isActive = item.id === activeId;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => setActiveId(item.id)}
                        className={cn(
                          "group flex w-full items-start gap-4 px-4 py-4 text-left transition-colors md:px-5 md:py-5",
                          isActive
                            ? "bg-accent-soft text-ink"
                            : "text-ink-soft hover:bg-bezel/30 hover:text-ink",
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "mono mt-0.5 inline-flex w-12 shrink-0 items-center gap-1 text-[10.5px] tracking-[0.18em] uppercase",
                            isActive ? "text-accent" : "text-ink-faint",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                          <span>/</span>
                        </span>

                        <span className="flex-1">
                          <span
                            className={cn(
                              "block text-[15px] font-medium md:text-[16px]",
                              isActive && "term-glow",
                            )}
                          >
                            {item.title}
                          </span>
                          <span className="mt-1 block text-[13px] leading-6 text-ink-soft">
                            {item.description}
                          </span>
                        </span>

                        <span
                          aria-hidden
                          className={cn(
                            "mono mt-1 text-[10px] tracking-[0.2em] uppercase",
                            isActive ? "text-accent" : "text-ink-faint opacity-0 group-hover:opacity-100",
                          )}
                        >
                          {isActive ? "● open" : "→"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Detail pane — outcome of the selected principle */}
              {active ? (
                <motion.div
                  key={active.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="border-t border-line bg-canvas/55 px-5 py-4"
                >
                  <span className="mono flex items-center gap-2 text-[10px] tracking-[0.2em] text-ink-faint uppercase">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-accent-positive shadow-[0_0_6px_rgba(123,181,110,0.55)]" />
                    output · outcome
                  </span>
                  <p className="mono mt-2 text-[13.5px] leading-6 text-accent-positive term-glow-green">
                    {active.outcome}
                  </p>
                </motion.div>
              ) : null}
            </TerminalWindow>
          </motion.div>

          {/* Right — system blueprint diagram */}
          <motion.div variants={fadeUp}>
            <TerminalWindow
              title="albot-os ~ system.blueprint.svg"
              badge="RENDER"
              badgeTone="cyan"
              promptText="> visual architecture map"
              bodyClassName="p-3 md:p-4"
            >
              <ArchitectureDiagram
                enableParallax={!reducedMotion}
                className="rounded-md border border-line-subtle"
              />
              <div className="mt-4 flex flex-col gap-2 px-1">
                <h3 className="text-[16px] font-medium text-ink">{blueprintTitle}</h3>
                <p className="text-[13.5px] leading-6 text-ink-soft">
                  {blueprintDescription}
                </p>
              </div>
            </TerminalWindow>
          </motion.div>
        </motion.div>

        {/* Bottom command rail */}
        <motion.div
          variants={fadeUp}
          {...revealOnScroll}
          className="mt-8 flex flex-wrap items-center gap-3 border-t border-line-subtle pt-5 mono text-[10.5px] tracking-[0.18em] text-ink-faint uppercase"
        >
          <span className="text-ink-mono">$</span>
          <span>cat principles.log</span>
          <span aria-hidden className="hairline flex-1" />
          <span className="text-ink-mono">{whyChooseItems.length} entries</span>
        </motion.div>
      </Container>
    </section>
  );
}
