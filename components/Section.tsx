"use client";

import { motion } from "framer-motion";

import { fadeIn, fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { Container } from "@/components/Container";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, description, className, children }: SectionProps) {
  return (
    <motion.section id={id} className={cn("relative py-20 md:py-28", className)} variants={staggerContainer} {...revealOnScroll}>
      <Container>
        <motion.div variants={fadeUp} className="mb-10 max-w-3xl">
          {eyebrow ? (
            <motion.p variants={fadeIn} className="mb-4 text-sm font-medium tracking-[0.18em] text-cyan-300/85 uppercase">
              {eyebrow}
            </motion.p>
          ) : null}
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
          {description ? <p className="mt-5 text-base leading-8 text-zinc-300 md:text-lg">{description}</p> : null}
        </motion.div>
        {children}
      </Container>
    </motion.section>
  );
}

