import type { MotionProps, Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
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

export const revealOnScroll: Pick<MotionProps, "initial" | "whileInView" | "viewport"> = {
  initial: "hidden",
  whileInView: "visible",
  viewport: {
    once: true,
    margin: "-80px",
  },
};

// Backward compatible alias for existing imports.
export const staggerChildren = staggerContainer;
