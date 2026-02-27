"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

type DiagramNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

const nodes: DiagramNode[] = [
  { id: "api", label: "API Gateway", x: 16, y: 18 },
  { id: "auth", label: "Auth Service", x: 49, y: 18 },
  { id: "billing", label: "Billing", x: 80, y: 18 },
  { id: "queue", label: "Queue", x: 25, y: 53 },
  { id: "workers", label: "Workers", x: 57, y: 53 },
  { id: "db", label: "PostgreSQL Cluster", x: 49, y: 82 },
];

const links = [
  { from: "api", to: "auth", tone: "cyan" },
  { from: "auth", to: "billing", tone: "blue" },
  { from: "api", to: "queue", tone: "teal" },
  { from: "auth", to: "workers", tone: "teal" },
  { from: "queue", to: "db", tone: "blue" },
  { from: "workers", to: "db", tone: "blue" },
] as const;

function getNodePosition(id: string) {
  const node = nodes.find((item) => item.id === id);

  if (!node) {
    return { x: 0, y: 0 };
  }

  return { x: node.x, y: node.y };
}

const strokeByTone: Record<(typeof links)[number]["tone"], string> = {
  cyan: "rgba(96, 165, 250, 0.92)",
  teal: "rgba(45, 212, 191, 0.92)",
  blue: "rgba(79, 112, 255, 0.9)",
};

type ArchitectureDiagramProps = {
  className?: string;
  enableParallax?: boolean;
};

export function ArchitectureDiagram({ className, enableParallax = true }: ArchitectureDiagramProps) {
  const reducedMotion = useReducedMotion();
  const canParallax = enableParallax && !reducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 120, damping: 18, mass: 0.5 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 120, damping: 18, mass: 0.5 });
  const smoothX = useSpring(x, { stiffness: 110, damping: 18, mass: 0.45 });
  const smoothY = useSpring(y, { stiffness: 110, damping: 18, mass: 0.45 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!canParallax) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    x.set(relativeX * 8);
    y.set(relativeY * 6);
    rotateXRaw.set(relativeY * -6);
    rotateYRaw.set(relativeX * 7);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        canParallax
          ? {
              x: smoothX,
              y: smoothY,
              rotateX,
              rotateY,
              transformPerspective: 1100,
            }
          : undefined
      }
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_35%_25%,rgba(56,189,248,0.09),transparent_40%),linear-gradient(160deg,rgba(8,22,50,0.94),rgba(7,14,32,0.98))]",
        className,
      )}
    >
      <motion.svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
        {links.map((link, index) => {
          const from = getNodePosition(link.from);
          const to = getNodePosition(link.to);
          const d = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

          return (
            <motion.path
              key={`${link.from}-${link.to}`}
              d={d}
              fill="none"
              stroke={strokeByTone[link.tone]}
              strokeWidth="0.9"
              strokeLinecap="round"
              initial={reducedMotion ? { opacity: 0.88 } : { opacity: 0.2, pathLength: 0 }}
              whileInView={reducedMotion ? { opacity: 0.88 } : { opacity: 1, pathLength: 1 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={
                reducedMotion
                  ? undefined
                  : {
                      duration: 0.72,
                      delay: 0.12 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            />
          );
        })}
      </motion.svg>

      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 0.35,
                  delay: 0.14 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
          whileHover={
            reducedMotion
              ? undefined
              : {
                  scale: 1.05,
                  boxShadow: "0 0 0 1px rgba(103,232,249,0.65), 0 0 24px rgba(45,212,191,0.32)",
                }
          }
          className="absolute min-w-[90px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-sky-200/18 bg-slate-900/88 px-3 py-2 text-center text-[11px] tracking-[0.02em] text-slate-200 shadow-[0_10px_25px_rgba(1,8,20,0.45)]"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
        >
          {node.label}
        </motion.div>
      ))}
    </motion.div>
  );
}
