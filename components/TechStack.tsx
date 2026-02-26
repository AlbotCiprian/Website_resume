"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cloud, Database, Server, ShieldCheck, Workflow } from "lucide-react";

import type { SkillGroup } from "@/content/profile";

import { fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";

const iconMap = {
  Backend: Server,
  Databases: Database,
  "Data & Automation": Workflow,
  Infrastructure: Cloud,
  "Testing & Quality": ShieldCheck,
} as const;

export function TechStack({ groups }: { groups: SkillGroup[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div variants={staggerContainer} {...revealOnScroll} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {groups.map((group) => {
        const Icon = iconMap[group.group as keyof typeof iconMap] ?? Server;

        return (
          <motion.article
            key={group.group}
            variants={fadeUp}
            whileHover={reducedMotion ? undefined : { y: -4, scale: 1.01 }}
            transition={reducedMotion ? undefined : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            title={group.group}
            className="group relative rounded-3xl border border-slate-200/80 bg-white/85 p-6 transition-all hover:border-cyan-500/40 hover:shadow-[0_20px_40px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-zinc-900/70 dark:hover:border-cyan-400/40 dark:hover:shadow-[0_24px_44px_rgba(2,8,20,0.38)]"
          >
            <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2 py-0.5 text-[10px] tracking-[0.1em] text-cyan-700 uppercase opacity-0 transition group-hover:opacity-100 dark:text-cyan-200">
              {group.group}
            </span>
            <div className="mb-4 inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 p-2 text-cyan-700 transition-shadow group-hover:shadow-[0_0_24px_rgba(34,211,238,0.28)] dark:text-cyan-200">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{group.group}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-zinc-300">{group.skills.join(" • ")}</p>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
