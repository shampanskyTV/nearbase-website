"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { isLowPowerDevice } from "./performance";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  amount?: number;
  y?: number;
  x?: number;
  scale?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.45,
  amount = 0.1,
  y = 22,
  x = 0,
  scale = 0.96,
  once = true,
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lowPowerMode = isLowPowerDevice();
  const inView = useInView(ref, { amount, once: lowPowerMode ? true : once });
  const reduceMotion = useReducedMotion();
  const shouldReduce = reduceMotion || lowPowerMode;

  const hidden = shouldReduce ? { opacity: 0, x: 0, y: 0, scale: 1 } : { opacity: 0, x, y, scale };
  const shown = { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
