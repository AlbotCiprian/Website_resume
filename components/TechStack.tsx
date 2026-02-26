import { Cloud, Database, Server, ShieldCheck, Workflow } from "lucide-react";

import type { SkillGroup } from "@/content/profile";

const iconMap = {
  Backend: Server,
  Databases: Database,
  "Data & Automation": Workflow,
  Infrastructure: Cloud,
  "Testing & Quality": ShieldCheck,
} as const;

export function TechStack({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {groups.map((group) => {
        const Icon = iconMap[group.group as keyof typeof iconMap] ?? Server;

        return (
          <article
            key={group.group}
            className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 transition-all hover:-translate-y-1 hover:border-cyan-500/40 dark:border-white/10 dark:bg-zinc-900/70 dark:hover:border-cyan-400/40"
          >
            <div className="mb-4 inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 p-2 text-cyan-700 dark:text-cyan-200">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{group.group}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-zinc-300">{group.skills.join(" • ")}</p>
          </article>
        );
      })}
    </div>
  );
}
