"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { isLowPowerDevice } from "./performance";

type GlobalSmoothScrollProps = {
  children: React.ReactNode;
};

export default function GlobalSmoothScroll({ children }: GlobalSmoothScrollProps) {
  useEffect(() => {
    if (isLowPowerDevice()) return;
if (typeof window !== 'undefined' && window.innerWidth <= 768) return;

    const globalOptions: ConstructorParameters<typeof Lenis>[0] = {
      duration: 0.65,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.25,
      infinite: false,
      wheelMultiplier: 1.28,
      lerp: 0.18,
      syncTouch: true,
      syncTouchLerp: 0.12,
    };

    let lenis: Lenis | null = new Lenis(globalOptions);

    const destroyLenis = () => {
      if (!lenis) return;
      lenis.destroy();
      lenis = null;
    };

    const createLenis = () => {
      if (lenis) return;
      const y = window.scrollY;
      lenis = new Lenis(globalOptions);
      lenis.scrollTo(y, { immediate: true, force: true });
    };

    const handleScrollStackLenis = (event: Event) => {
      const active = (event as CustomEvent<{ active?: boolean }>).detail?.active === true;
      if (active) {
        destroyLenis();
      } else {
        createLenis();
      }
    };

    window.addEventListener("scrollstack-lenis", handleScrollStackLenis as EventListener);

    let rafId = 0;
    const raf = (time: number) => {
      lenis?.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scrollstack-lenis", handleScrollStackLenis as EventListener);
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
}
