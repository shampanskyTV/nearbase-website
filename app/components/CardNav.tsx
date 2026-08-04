"use client";

import Link from 'next/link';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import './CardNav.css';

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: React.ReactNode;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  theme?: 'light' | 'dark' | 'auto';
  adaptiveTheme?: boolean;
}

type NavAppearance = 'light' | 'dark';

const parseRgb = (color: string): { r: number; g: number; b: number; a: number } | null => {
  if (!color || color === 'transparent') return null;
  const matched = color.match(/rgba?\(([^)]+)\)/i);
  if (!matched) return null;
  const parts = matched[1]?.split(',').map((part) => Number(part.trim()));
  if (!parts || parts.length < 3) return null;
  const [r = 0, g = 0, b = 0, a = 1] = parts;
  return { r, g, b, a };
};

const relativeLuminance = (r: number, g: number, b: number) => {
  const toLinear = (value: number) => {
    const sRgb = value / 255;
    return sRgb <= 0.03928 ? sRgb / 12.92 : Math.pow((sRgb + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};

const resolveBackgroundColor = (from: Element | null): string => {
  let current: Element | null = from;
  while (current) {
    const bg = window.getComputedStyle(current).backgroundColor;
    const parsed = parseRgb(bg);
    if (parsed && parsed.a > 0.01) return bg;
    current = current.parentElement;
  }
  return window.getComputedStyle(document.body).backgroundColor || 'rgb(255, 255, 255)';
};

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor,
  theme,
  adaptiveTheme = true
}) => {
  const isExternalHref = (href: string) =>
    href.startsWith('http://') || href.startsWith('https://');

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const mobileCtaRef = useRef<HTMLAnchorElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [appearance, setAppearance] = useState<NavAppearance>(theme === 'dark' ? 'dark' : 'light');
  const initialAppearanceResolvedRef = useRef(false);

  const getAnimatedItems = () =>
    [mobileCtaRef.current, ...cardsRef.current].filter(Boolean) as HTMLElement[];

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        void contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  }, []);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;
    const animatedItems = getAnimatedItems();

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(animatedItems, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(animatedItems, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  }, [calculateHeight, ease]);

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [createTimeline, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateHeight, createTimeline, isExpanded]);

  useEffect(() => {
    const shouldAutoDetect = adaptiveTheme && (theme === 'auto' || theme === undefined);
    if (!shouldAutoDetect) return;

    const navEl = navRef.current;
    if (!navEl) return;

    let rafId: number | null = null;
    let switchTimeout: number | null = null;
    let pendingAppearance: NavAppearance | null = null;

    const updateAppearance = (immediate = false) => {
      const rect = navEl.getBoundingClientRect();
      // Sample directly below the fixed top bar for stable mobile/desktop theme detection.
      const topBarBottom = rect.top + 60;
      const sampleYTarget = topBarBottom + 10;
      const sampleY = Math.max(0, Math.min(window.innerHeight - 1, sampleYTarget));
      const sampleRatios = [0.2, 0.5, 0.8];
      const sampleXs = sampleRatios.map((ratio) =>
        Math.max(0, Math.min(window.innerWidth - 1, rect.left + rect.width * ratio))
      );

      const luminances: number[] = [];
      let forcedAppearance: NavAppearance | null = null;

      for (const sampleX of sampleXs) {
        const stack = document.elementsFromPoint(sampleX, sampleY);
        const underneath =
          stack.find((el) => {
            if (el === navEl || navEl.contains(el)) return false;
            if (el.closest('[data-theme-ignore="true"]')) return false;
            return true;
          }) ?? document.body;

        const forcedSurface = underneath.closest('[data-surface-theme]')?.getAttribute('data-surface-theme');
        if (forcedSurface === 'dark' || forcedSurface === 'light') {
          forcedAppearance = forcedSurface;
          break;
        }

        const bg = resolveBackgroundColor(underneath);
        const parsed = parseRgb(bg);
        if (parsed) luminances.push(relativeLuminance(parsed.r, parsed.g, parsed.b));
      }

      const targetAppearance: NavAppearance | null = (() => {
        if (forcedAppearance) return forcedAppearance;
        if (luminances.length === 0) return null;
        const avgLuminance = luminances.reduce((sum, value) => sum + value, 0) / luminances.length;
        const darkThreshold = 0.3;
        const lightThreshold = 0.42;
        if (appearance === 'light') return avgLuminance < darkThreshold ? 'dark' : 'light';
        return avgLuminance > lightThreshold ? 'light' : 'dark';
      })();

      if (!targetAppearance || targetAppearance === appearance) {
        if (!initialAppearanceResolvedRef.current && targetAppearance) {
          initialAppearanceResolvedRef.current = true;
        }
        pendingAppearance = null;
        if (switchTimeout !== null) {
          window.clearTimeout(switchTimeout);
          switchTimeout = null;
        }
        return;
      }

      if (pendingAppearance === targetAppearance) return;

      const shouldSwitchInstantly = immediate || !initialAppearanceResolvedRef.current;
      if (shouldSwitchInstantly) {
        if (switchTimeout !== null) {
          window.clearTimeout(switchTimeout);
          switchTimeout = null;
        }
        pendingAppearance = null;
        initialAppearanceResolvedRef.current = true;
        setAppearance(targetAppearance);
        return;
      }

      pendingAppearance = targetAppearance;
      if (switchTimeout !== null) window.clearTimeout(switchTimeout);
      switchTimeout = window.setTimeout(() => {
        setAppearance(targetAppearance);
        pendingAppearance = null;
        switchTimeout = null;
      }, 180);
    };

    const scheduleUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateAppearance();
      });
    };

    updateAppearance(true);
    const firstRecheckId = window.setTimeout(() => updateAppearance(true), 90);
    const secondRecheckId = window.setTimeout(() => updateAppearance(true), 320);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (switchTimeout !== null) window.clearTimeout(switchTimeout);
      window.clearTimeout(firstRecheckId);
      window.clearTimeout(secondRecheckId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [adaptiveTheme, theme, appearance]);

  const effectiveAppearance: NavAppearance = theme === 'dark' || theme === 'light' ? theme : appearance;
  const effectiveMenuColor = menuColor || (effectiveAppearance === 'dark' ? '#F2F0EB' : '#0A0A0A');
  const isAutoTheme = adaptiveTheme && (theme === 'auto' || theme === undefined);

  const navStyle = useMemo(
    () => {
      const lightCardSurface = 'rgba(240, 238, 233, 0.9)'; /* #F0EEE9 */
      const darkCardSurface = '#141414';
      return ({
        '--card-nav-bg': isAutoTheme
          ? effectiveAppearance === 'dark'
            ? 'rgba(10, 10, 10, 0.5)'
            : 'rgba(242, 240, 235, 0.76)' /* #F2F0EB */
          : baseColor || (effectiveAppearance === 'dark' ? 'rgba(10, 10, 10, 0.5)' : 'rgba(242, 240, 235, 0.76)'),
        '--card-nav-blur': effectiveAppearance === 'dark' ? '18px' : '28px',
        '--card-nav-text': effectiveMenuColor,
        '--card-nav-border':
          effectiveAppearance === 'dark' ? 'rgba(242, 240, 235, 0.16)' : 'rgba(10, 10, 10, 0.1)',
        '--card-nav-shadow':
          effectiveAppearance === 'dark'
            ? 'none'
            : '0 8px 26px rgba(10, 10, 10, 0.12)',
        '--card-nav-card-bg': effectiveAppearance === 'dark' ? darkCardSurface : lightCardSurface,
        '--card-nav-card-border':
          effectiveAppearance === 'dark' ? 'rgba(242, 240, 235, 0.16)' : 'rgba(10, 10, 10, 0.08)',
        '--card-nav-card-text': effectiveAppearance === 'dark' ? '#F2F0EB' : '#0A0A0A',
        '--btn-begin-bg': buttonBgColor || (effectiveAppearance === 'dark' ? '#F2F0EB' : '#0A0A0A'),
        '--btn-begin-text': buttonTextColor || (effectiveAppearance === 'dark' ? '#0A0A0A' : '#F2F0EB')
      }) as React.CSSProperties;
    },
    [baseColor, buttonBgColor, buttonTextColor, effectiveAppearance, effectiveMenuColor, isAutoTheme]
  );

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav card-nav-${effectiveAppearance} ${isExpanded ? 'open' : ''}`}
        style={navStyle}
      >
        <div className="card-nav-surface" aria-hidden="true" />
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: effectiveMenuColor }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>
<div className="logo-container">
  <Link href="/" aria-label={logoAlt} style={{ textDecoration: 'none', lineHeight: 0 }}>
    <img
      src={effectiveAppearance === 'light' ? '/logo-dark.svg' : '/logo.svg'}
      alt="Nearbase"
      style={{ height: '30px', width: 'auto', display: 'block' }}
    />
  </Link>
</div>

          <a
            className="btn-begin-2"
            href="/contact"
          >
            <span>Termin vereinbaren</span>
            <span className="btn-begin-arrow" aria-hidden="true">
              <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.79222 3.46797L7.7093 3.49623L2.5 8.72243L3.27757 9.5L8.49532 4.28225L8.43124 8.1609L9.5 8.1609L9.5 2.5L3.79222 2.5001V3.46797Z" fill="currentColor"></path>
              </svg>
            </span>
          </a>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          <a ref={mobileCtaRef} className="btn-begin-2 card-nav-mobile-cta" href="/contact">
            <span>Termin vereinbaren</span>
            <span className="btn-begin-arrow" aria-hidden="true">
              <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.79222 3.46797L7.7093 3.49623L2.5 8.72243L3.27757 9.5L8.49532 4.28225L8.43124 8.1609L9.5 8.1609L9.5 2.5L3.79222 2.5001V3.46797Z" fill="currentColor"></path>
              </svg>
            </span>
          </a>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: 'var(--card-nav-card-bg)', color: 'var(--card-nav-card-text)' }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel || lnk.label}
                    target={isExternalHref(lnk.href) ? "_blank" : undefined}
                    rel={isExternalHref(lnk.href) ? "noopener noreferrer" : undefined}
                  >
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
