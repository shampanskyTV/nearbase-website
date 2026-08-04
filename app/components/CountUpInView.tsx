"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface CountUpInViewProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  minDigits?: number;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUpInView({
  to,
  duration = 900,
  prefix = "",
  suffix = "",
  minDigits = 0,
  className,
}: CountUpInViewProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      const frameId = window.requestAnimationFrame(() => setValue(to));
      return () => window.cancelAnimationFrame(frameId);
    }

    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const nextValue = Math.round(to * eased);
      setValue(nextValue);
      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [inView, reduceMotion, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {String(value).padStart(minDigits, "0")}
      {suffix}
    </span>
  );
}
