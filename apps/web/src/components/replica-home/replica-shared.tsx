"use client";

import { useEffect, useRef, useState } from "react";

export { ReplicaNav } from "@/components/replica-home/replica-nav";
export type { ReplicaPageId } from "@/components/replica-home/replica-nav";

const SUN_ICON = `<path d="M7.5 1v1M7.5 13v1M1 7.5H2M13 7.5h1M3.2 3.2l.7.7M11.1 11.1l.7.7M3.2 11.8l.7-.7M11.1 3.9l.7-.7M10 7.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>`;
const MOON_ICON = `<path d="M11.5 9A5 5 0 016 3.5a.5.5 0 00-.6-.6A5.5 5.5 0 1012.1 9.6a.5.5 0 00-.6-.6z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>`;

const NAV_HEIGHT = 72;

/**
 * Pick the smallest `[data-nav-tone]` element whose vertical span contains the
 * nav's mid-line (most specific / innermost section wins).
 */
function applyNavTone(nav: HTMLElement, defaultTone?: "light" | "dark") {
  const zones = document.querySelectorAll<HTMLElement>("[data-nav-tone]");
  const navMid = NAV_HEIGHT / 2;
  let tone: string | null = null;
  let smallestArea = Infinity;

  zones.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top <= navMid && r.bottom > navMid) {
      const area = r.width * r.height;
      if (area < smallestArea) {
        smallestArea = area;
        tone = el.getAttribute("data-nav-tone");
      }
    }
  });

  if (!tone && defaultTone) tone = defaultTone;
  nav.classList.toggle("tone-light", tone === "light");
  nav.classList.toggle("tone-dark", tone === "dark");
}

/**
 * Keeps `#replica-nav` in sync with the section currently under the nav.
 * Pass a `defaultTone` for pages where most of the body has a single bg.
 */
export function useReplicaNavTone(defaultTone?: "light" | "dark") {
  useEffect(() => {
    const nav = document.getElementById("replica-nav");
    if (!nav) return;
    const sync = () => applyNavTone(nav, defaultTone);
    sync();
    const settleTimer = window.setTimeout(sync, 150);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      nav.classList.remove("tone-light", "tone-dark");
    };
  }, [defaultTone]);
}

export function useReplicaHomeEffects(dark: boolean) {
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = document.getElementById("replica-nav");
    const heroBg = heroBgRef.current;
    // Parallax only on tablet/desktop. Phones get a text-only hero (the
    // background photo is hidden by CSS <=768px), so skip the per-scroll
    // style write there: less main-thread work while scrolling.
    const parallaxMq = window.matchMedia("(min-width: 769px)");

    const syncNavTone = () => {
      if (nav) applyNavTone(nav);
    };

    const onScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 10);
      syncNavTone();
      if (heroBg && parallaxMq.matches) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    onScroll();
    const toneSettleTimer = window.setTimeout(syncNavTone, 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncNavTone);

    const els = document.querySelectorAll(".replica-home .rv,.replica-home .rv-l,.replica-home .rv-r");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    els.forEach((el) => io.observe(el));
    document.querySelectorAll(".replica-home .ccard,.replica-home .vcard,.replica-home .acard").forEach((el, i) => {
      el.classList.add("rv");
      const delay = `${(i % 3) * 0.12}s`;
      const node = el as HTMLElement;
      node.style.transitionDelay = delay;
      if (!node.style.animationDelay) {
        node.style.animationDelay = delay;
      }
      io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncNavTone);
      window.clearTimeout(toneSettleTimer);
      nav?.classList.remove("tone-light", "tone-dark");
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const menu = document.getElementById("replica-nav-menu");
    if (!menu || window.innerWidth > 768) return;
    const bg = dark ? "#141414" : "#fff";
    const cl = dark ? "rgba(255,255,255,.75)" : "#111";
    const bd = dark ? "rgba(255,255,255,.08)" : "#e5e7eb";
    menu.querySelectorAll("a").forEach((a) => {
      (a as HTMLElement).style.color = cl;
    });
    if (menu.style.display === "flex") {
      menu.style.background = bg;
      menu.style.borderBottomColor = bd;
    }
  }, [dark]);

  return { heroBgRef };
}

export function useReplicaTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("replica-theme") === "dark";
  });

  const toggle = () => {
    setDark((d) => {
      const next = !d;
      localStorage.setItem("replica-theme", next ? "dark" : "light");
      return next;
    });
  };

  return { dark, toggle, themeIcon: dark ? SUN_ICON : MOON_ICON };
}

export function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3l5 4.5L12 3M2 3h10v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
