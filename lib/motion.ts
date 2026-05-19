import type { MotionProps, Variants } from "framer-motion";

/**
 * Motion language — Engineering Console redesign.
 *
 * Rules:
 *  - One ease across the system: `easeOut` cubic-bezier(0.22, 1, 0.36, 1).
 *  - Reveal-on-scroll uses opacity + 12px translate only. No scale.
 *  - Hover effects belong to the component layer (not here) and use
 *    border/box-shadow only — no scale, no bounce.
 *  - Durations come from three buckets: fast 180ms, base 280ms, slow 480ms.
 */

const easeOut = [0.22, 1, 0.36, 1] as const;

export const durations = {
  fast: 0.18,
  base: 0.28,
  slow: 0.48,
} as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.slow,
      ease: easeOut,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easeOut,
    },
  },
};

/**
 * Use for blocks that should rise from below the fold with a touch more travel.
 * Reserved for hero/headline-level reveals.
 */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easeOut,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

/**
 * Tighter stagger for hero-line reveals (eyebrow → headline → lede → cta).
 */
export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

export const revealOnScroll: Pick<MotionProps, "initial" | "whileInView" | "viewport"> = {
  initial: "hidden",
  whileInView: "visible",
  viewport: {
    once: true,
    margin: "-80px",
  },
};

/**
 * Hover preset — kept light. Components should use this directly via
 * `whileHover` instead of inlining magic numbers everywhere.
 */
export const hoverLift: MotionProps["whileHover"] = {
  y: -2,
  transition: { duration: durations.fast, ease: easeOut },
};

// Backward compatible alias for existing imports.
export const staggerChildren = staggerContainer;

// Deprecated — kept to avoid breaking imports during phased rollout.
export const hoverScale = hoverLift;
