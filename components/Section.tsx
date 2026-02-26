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
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <Container>
        <div className="mb-10 max-w-3xl">
          {eyebrow ? (
            <p className="mb-4 text-sm font-medium tracking-[0.18em] text-cyan-700/85 uppercase dark:text-cyan-300/80">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl dark:text-white">{title}</h2>
          {description ? (
            <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg dark:text-zinc-300">{description}</p>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
