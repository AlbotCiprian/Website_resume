"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cloud, Cpu, Database, Server, ShieldCheck, Workflow } from "lucide-react";

import type { SkillGroup } from "@/content/profile";

import { fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

type GroupMeta = {
  icon: typeof Server;
  mod: string;
  value: string;
};

/**
 * Per-group metadata: a mock `.so` module filename and a 1-line value
 * statement. These read like dependencies loaded into the system, not
 * like a generic tech list.
 */
const GROUP_META: Record<string, GroupMeta> = {
  Backend: {
    icon: Server,
    mod: "mod_backend.so",
    value: "Service contracts, secure flows, predictable APIs.",
  },
  Databases: {
    icon: Database,
    mod: "mod_data.so",
    value: "Schema design, indexed queries, performance tuning.",
  },
  "Data & Automation": {
    icon: Workflow,
    mod: "mod_pipeline.so",
    value: "ETL, reconciliation, automated reporting.",
  },
  Infrastructure: {
    icon: Cloud,
    mod: "mod_ops.so",
    value: "Container-first deploys, Linux ops, VPS-grade reliability.",
  },
  "Testing & Quality": {
    icon: ShieldCheck,
    mod: "mod_qa.so",
    value: "Automated verification across API, UI, and mobile.",
  },
};

const FALLBACK: GroupMeta = {
  icon: Cpu,
  mod: "mod_misc.so",
  value: "Adjacent capability used in production delivery.",
};

/**
 * TechStack — system_inventory grid.
 *
 * Each group renders as a hardware/software inventory card with:
 *   - terminal-style header (mono filename + status)
 *   - value statement (what the group actually delivers)
 *   - skill chips in mono uppercase
 *   - a small "diagnostics meter" showing capacity (skill count)
 */
export function TechStack({ groups }: { groups: SkillGroup[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={staggerContainer}
      {...revealOnScroll}
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      {groups.map((group) => {
        const meta = GROUP_META[group.group] ?? FALLBACK;
        const Icon = meta.icon;
        const capacity = Math.min(8, group.skills.length);
        const segments = Math.max(capacity, 4);

        return (
          <motion.article
            key={group.group}
            variants={fadeUp}
            whileHover={reducedMotion ? undefined : { y: -2 }}
            transition={reducedMotion ? undefined : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-md border border-line bg-elevated/95",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_40px_-26px_rgba(0,0,0,0.7)]",
              "transition-[border-color,box-shadow] hover:border-accent/45 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_22px_46px_-22px_rgba(232,163,61,0.18)]",
            )}
          >
            {/* Title strip */}
            <header className="flex items-center justify-between gap-3 border-b border-line-subtle bg-canvas/60 px-4 py-2">
              <div className="mono flex items-center gap-2 text-[10.5px] tracking-[0.16em] text-ink-mono uppercase">
                <Icon className="h-3.5 w-3.5 text-accent" />
                <span>{meta.mod}</span>
              </div>
              <span className="mono inline-flex items-center gap-1.5 text-[9.5px] tracking-[0.2em] text-ink-faint uppercase">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-positive shadow-[0_0_6px_rgba(123,181,110,0.55)]" />
                loaded
              </span>
            </header>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-4 px-5 py-5">
              <div>
                <h3 className="text-[17px] font-semibold text-ink">{group.group}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-ink-soft">{meta.value}</p>
              </div>

              {/* Skill chips */}
              <ul className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Badge variant="mono">{skill}</Badge>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diagnostics meter */}
            <footer className="flex items-center gap-3 border-t border-line-subtle bg-canvas/55 px-5 py-3">
              <span className="mono shrink-0 text-[9.5px] tracking-[0.2em] text-ink-faint uppercase">
                capacity
              </span>
              <div className="flex flex-1 items-center gap-1">
                {Array.from({ length: segments }).map((_, index) => {
                  const filled = index < capacity;
                  return (
                    <span
                      key={index}
                      aria-hidden
                      className={cn(
                        "h-2 flex-1 rounded-[1px]",
                        filled
                          ? "bg-accent shadow-[0_0_6px_rgba(232,163,61,0.45)]"
                          : "bg-bezel/60",
                      )}
                    />
                  );
                })}
              </div>
              <span className="mono shrink-0 text-[10px] tracking-[0.18em] text-ink-mono uppercase">
                {group.skills.length} / {segments}
              </span>
            </footer>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
