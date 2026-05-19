"use client";

import { useReducedMotion } from "framer-motion";
import { useId, useMemo } from "react";

import { cn } from "@/lib/utils";

import { SystemNode, type SystemNodeTone } from "./SystemNode";

/* ----------------------------------------------------------------
 * Coordinate system
 *
 * The canvas uses a 1000 × 700 SVG viewBox. Node positions are
 * authored in viewBox units and converted to percentages so the
 * absolutely-positioned HTML nodes track the SVG paths.
 * ---------------------------------------------------------------- */

const VIEW_W = 1000;
const VIEW_H = 700;

type NodeId = "edge" | "api" | "auth" | "billing" | "queue" | "workers" | "db";

type Node = {
  id: NodeId;
  label: string;
  meta: string;
  tone: SystemNodeTone;
  live?: boolean;
  /** Position of node center, in viewBox units. */
  x: number;
  y: number;
};

const NODES: Node[] = [
  { id: "edge", label: "Edge / CDN", meta: "TLS · cache", tone: "default", x: 140, y: 80 },
  { id: "api", label: "API Gateway", meta: "v2.4 · 1.2k rps", tone: "accent", live: true, x: 500, y: 110 },
  { id: "auth", label: "Auth Service", meta: "OAuth · JWT", tone: "default", x: 200, y: 280 },
  { id: "billing", label: "Billing", meta: "idempotent", tone: "warm", x: 800, y: 280 },
  { id: "queue", label: "Queue", meta: "BullMQ · DLQ", tone: "default", x: 280, y: 470 },
  { id: "workers", label: "Workers", meta: "8 replicas", tone: "default", x: 720, y: 470 },
  { id: "db", label: "PostgreSQL Cluster", meta: "primary + 2 replicas", tone: "positive", live: true, x: 500, y: 620 },
];

type Link = {
  from: NodeId;
  to: NodeId;
  /** Cubic bezier control offsets. Smooth flow paths, no Manhattan routing. */
  d: string;
  /** Animation duration for the packet riding this path. */
  duration: number;
  /** Delay before the first packet appears (staggered start). */
  delay: number;
  /** Stroke tone — defaults to neutral. */
  tone?: "neutral" | "accent" | "warm" | "positive";
};

const LINKS: Link[] = [
  { from: "edge", to: "api", d: "M 160 80 C 280 80, 380 100, 480 110", duration: 3.6, delay: 0.2 },
  { from: "api", to: "auth", d: "M 480 120 C 380 180, 280 220, 220 270", duration: 3.0, delay: 0.4, tone: "accent" },
  { from: "api", to: "billing", d: "M 520 120 C 620 180, 720 220, 780 270", duration: 3.2, delay: 1.1, tone: "warm" },
  { from: "auth", to: "queue", d: "M 215 295 C 230 360, 250 410, 270 455", duration: 2.8, delay: 1.6 },
  { from: "billing", to: "workers", d: "M 785 295 C 770 360, 750 410, 730 455", duration: 2.9, delay: 0.8, tone: "warm" },
  { from: "queue", to: "workers", d: "M 320 470 C 420 470, 540 470, 680 470", duration: 2.4, delay: 2.0 },
  { from: "queue", to: "db", d: "M 295 490 C 330 540, 400 590, 480 615", duration: 3.0, delay: 1.4, tone: "positive" },
  { from: "workers", to: "db", d: "M 705 490 C 670 540, 600 590, 520 615", duration: 3.1, delay: 0.0, tone: "positive" },
];

// Retro CRT palette — amber is the primary accent, green is positive,
// cyan is reserved for technical/info packets only.
const TONE_STROKE: Record<Required<Link>["tone"], string> = {
  neutral: "rgba(214, 197, 144, 0.32)",
  accent: "rgba(232, 163, 61, 0.55)",
  warm: "rgba(240, 176, 75, 0.45)",
  positive: "rgba(123, 181, 110, 0.5)",
};

const TONE_PACKET: Record<Required<Link>["tone"], string> = {
  neutral: "#C6B896",
  accent: "#E8A33D",
  warm: "#F0B04B",
  positive: "#7BB56E",
};

type ArchitectureCanvasProps = {
  className?: string;
  /** When false, the canvas renders a static blueprint (no packets). */
  animated?: boolean;
};

/**
 * ArchitectureCanvas — hero centerpiece.
 *
 * Renders a blueprint grid, six interconnected system nodes, and animated
 * data packets that travel along the connection paths. Designed to read as
 * "live backend system" rather than decorative artwork.
 *
 * Performance characteristics:
 *   - Pure SVG + HTML absolute layer; no canvas, no three.js.
 *   - Packet motion runs through SMIL <animateMotion>, which most engines
 *     execute on the compositor thread (no React rerenders).
 *   - When the user prefers reduced motion, packets are not rendered.
 */
export function ArchitectureCanvas({ className, animated = true }: ArchitectureCanvasProps) {
  const reducedMotion = useReducedMotion();
  const renderPackets = animated && !reducedMotion;

  // Stable per-instance id prefix so multiple canvases can coexist without
  // colliding on path/gradient IDs.
  const uid = useId().replace(/:/g, "");

  const gridLines = useMemo(() => {
    const cols = Array.from({ length: 11 }, (_, i) => ((i + 1) * VIEW_W) / 12);
    const rows = Array.from({ length: 7 }, (_, i) => ((i + 1) * VIEW_H) / 8);
    return { cols, rows };
  }, []);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-line bg-elevated/85",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_60px_-30px_rgba(0,0,0,0.6)]",
        className,
      )}
      style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
    >
      {/* Subtle vignette + ambient glow — warm amber top, muted green bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(232,163,61,0.10),transparent_55%),radial-gradient(circle_at_50%_88%,rgba(123,181,110,0.07),transparent_50%)]"
      />

      {/* Slow scan line */}
      {renderPackets ? (
        <div
          aria-hidden
          className="scan-line pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-transparent via-accent/8 to-transparent"
        />
      ) : null}

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Backend system architecture diagram showing API gateway, auth, billing, queue, workers and PostgreSQL cluster connected by data flow paths"
      >
        <defs>
          <linearGradient id={`grid-fade-${uid}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.85" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={`grid-mask-${uid}`}>
            <rect width={VIEW_W} height={VIEW_H} fill={`url(#grid-fade-${uid})`} />
          </mask>
        </defs>

        {/* Blueprint grid — warm cream tone */}
        <g mask={`url(#grid-mask-${uid})`} stroke="rgba(220, 200, 158, 0.08)" strokeWidth="0.6">
          {gridLines.cols.map((x) => (
            <line key={`col-${x}`} x1={x} y1="0" x2={x} y2={VIEW_H} />
          ))}
          {gridLines.rows.map((y) => (
            <line key={`row-${y}`} x1="0" y1={y} x2={VIEW_W} y2={y} />
          ))}
        </g>

        {/* Corner brackets — technical detail */}
        <g stroke="rgba(214, 197, 144, 0.28)" strokeWidth="1.2" fill="none" strokeLinecap="square">
          <CornerBracket x={16} y={16} size={22} corner="tl" />
          <CornerBracket x={VIEW_W - 16} y={16} size={22} corner="tr" />
          <CornerBracket x={16} y={VIEW_H - 16} size={22} corner="bl" />
          <CornerBracket x={VIEW_W - 16} y={VIEW_H - 16} size={22} corner="br" />
        </g>

        {/* Connection paths */}
        <g fill="none" strokeLinecap="round">
          {LINKS.map((link, index) => {
            const tone = link.tone ?? "neutral";
            return (
              <path
                key={`link-${index}`}
                id={`${uid}-link-${index}`}
                d={link.d}
                stroke={TONE_STROKE[tone]}
                strokeWidth="1.4"
                strokeDasharray="2 4"
                opacity={0.9}
              />
            );
          })}
        </g>

        {/* Endpoint glyphs at node anchor points */}
        <g>
          {NODES.map((node) => (
            <g key={`anchor-${node.id}`}>
              <circle cx={node.x} cy={node.y} r="3.5" fill="rgba(10, 11, 14, 1)" stroke="rgba(214, 197, 144, 0.35)" strokeWidth="1" />
              {node.live ? (
                <circle cx={node.x} cy={node.y} r="6" className="node-pulse" fill="rgba(232, 163, 61, 0.18)" />
              ) : null}
            </g>
          ))}
        </g>

        {/* Data packets */}
        {renderPackets
          ? LINKS.map((link, index) => {
              const tone = link.tone ?? "neutral";
              const color = TONE_PACKET[tone];
              return (
                <g key={`packet-${index}`}>
                  <circle r="2.6" fill={color} opacity="0.95">
                    <animateMotion
                      dur={`${link.duration}s`}
                      begin={`${link.delay}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="linear"
                    >
                      <mpath xlinkHref={`#${uid}-link-${index}`} />
                    </animateMotion>
                  </circle>
                  {/* Trailing fade */}
                  <circle r="5" fill={color} opacity="0.18">
                    <animateMotion
                      dur={`${link.duration}s`}
                      begin={`${link.delay}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath xlinkHref={`#${uid}-link-${index}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })
          : null}
      </svg>

      {/* HTML node layer (positioned on top of SVG paths via percentages) */}
      <div className="pointer-events-none absolute inset-0">
        {NODES.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(node.x / VIEW_W) * 100}%`, top: `${(node.y / VIEW_H) * 100}%` }}
          >
            <SystemNode label={node.label} meta={node.meta} tone={node.tone} live={node.live} />
          </div>
        ))}
      </div>

      {/* Bottom-right mono badge — build/version detail */}
      <div className="pointer-events-none absolute right-4 bottom-3 flex items-center gap-2 mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">
        <span>v2026.05</span>
        <span aria-hidden className="h-1 w-1 rounded-full bg-ink-faint" />
        <span>build a4f9c2</span>
      </div>

      {/* Top-left mono badge — region/run id */}
      <div className="pointer-events-none absolute top-3 left-4 flex items-center gap-2 mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">
        <span aria-hidden className="h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_rgba(232,163,61,0.6)]" />
        <span>arch.live</span>
      </div>
    </div>
  );
}

type CornerBracketProps = {
  x: number;
  y: number;
  size: number;
  corner: "tl" | "tr" | "bl" | "br";
};

function CornerBracket({ x, y, size, corner }: CornerBracketProps) {
  const dx = corner === "tr" || corner === "br" ? -1 : 1;
  const dy = corner === "bl" || corner === "br" ? -1 : 1;
  return (
    <path
      d={`M ${x} ${y + size * dy} L ${x} ${y} L ${x + size * dx} ${y}`}
      strokeWidth="1.4"
      fill="none"
    />
  );
}
