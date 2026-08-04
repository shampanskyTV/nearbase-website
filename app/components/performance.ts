"use client";

type NavigatorWithPerfHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

export function isLowPowerDevice(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get("forcePlasma") === "1") return false;

  const nav = navigator as NavigatorWithPerfHints;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return true;

  if (nav.connection?.saveData) return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return true;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2) return true;
  if (nav.connection?.effectiveType && /(^2g$|^3g$|slow-2g)/.test(nav.connection.effectiveType)) return true;

  return false;
}
