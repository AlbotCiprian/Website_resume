"use client";

import { motion } from "framer-motion";

import { fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { Container } from "@/components/Container";

type SectionProps = {
  id?: string;
  /** Mono section index, e.g. "03". Rendered as part of the command label. */
  commandIndex?: string;
  /** Mono command name, e.g. "experience.log". */
  command?: string;
  /** Descriptive eyebrow text (translated). */
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Section — editorial section wrapper, ALBOT-OS direction.
 *
 * The header reads like a command being executed: a section index and
 * mono command name in cream, a hairline rule, and the translated
 * eyebrow on the right. Below that, the descriptive title and lede in
 * normal sans typography keep the section readable.
 */
export function Section({
  id,
  commandIndex,
  command,
  eyebrow,
  title,
  description,
  className,
  children,
}: SectionProps) {
  // Auto-derive a command name from the section id when one isn't given.
  const derivedCommand = command ?? (id ? `${id.replace(/-/g, ".")}.run` : "section.run");

  return (
    <motion.section
      id={id}
      className={cn("relative py-20 md:py-28", className)}
      variants={staggerContainer}
      {...revealOnScroll}
    >
      <Container>
        <motion.div variants={fadeUp} className="mb-10 max-w-3xl">
          <div className="mono mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tracking-[0.2em] text-ink-mono uppercase">
            <span className="text-ink-faint">//</span>
            {commandIndex ? <span className="text-ink-faint">{commandIndex} —</span> : null}
            <span>{derivedCommand}</span>
            {eyebrow ? (
              <>
                <span aria-hidden className="hairline w-10 shrink-0" />
                <span className="text-ink-faint">{eyebrow}</span>
              </>
            ) : null}
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.01em] text-ink md:text-5xl">{title}</h2>
          {description ? (
            <p className="mt-5 text-[15.5px] leading-8 text-ink-soft md:text-[17px]">{description}</p>
          ) : null}
        </motion.div>
        {children}
      </Container>
    </motion.section>
  );
}
