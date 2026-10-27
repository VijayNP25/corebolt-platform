"use client";

import { createContext, useEffect, type ReactNode } from "react";
import "@/styles/replica-pages.css";
import "@/styles/replica-site-content.css";
import { useReplicaNavTone } from "@/components/replica-home/replica-shared";
import type { NavTrailItem } from "@/components/replica-home/replica-nav";
import ProductBreadcrumb from "@/components/product-breadcrumb";
import {
  ReplicaPageFooter,
  ReplicaPageNav,
  useReplicaPageTheme,
} from "./replica-page-shared";

export const NavTrailContext = createContext<NavTrailItem[] | undefined>(undefined);

export function SiteBreadcrumb({ trail }: { trail?: NavTrailItem[] }) {
  const steps = (trail ?? []).filter((item) => item.label.trim());
  if (!steps.length) return null;
  return (
    <div className="site-breadcrumb" data-nav-tone="light">
      <div className="site-breadcrumb-inner">
        <ProductBreadcrumb
          items={[
            { label: "Home", href: "/" },
            ...steps.map((step, index) => ({
              label: step.label,
              href: index === steps.length - 1 ? undefined : step.href,
            })),
          ]}
        />
      </div>
    </div>
  );
}

export function useReplicaSiteNavScroll() {
  useReplicaNavTone("light");
  useEffect(() => {
    const nav = document.getElementById("replica-nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

export default function ReplicaSiteLayout({
  children,
  className,
  /** Use on pages with a light background at the top (e.g. product detail) */
  lightNav = false,
  /** Category / subcategory / product pages: show their path in the top menu */
  navTrail,
  navShowBlogs = true,
  /** Sibling category linked after the trail (see navSiblingForCategory). */
  navSibling,
}: {
  children: ReactNode;
  className?: string;
  lightNav?: boolean;
  navTrail?: NavTrailItem[];
  navShowBlogs?: boolean;
  navSibling?: NavTrailItem;
}) {
  const { dark, toggle, themeIcon } = useReplicaPageTheme();
  useReplicaSiteNavScroll();

  return (
    <div
      className={`replica-page replica-site${lightNav ? " replica-site--light-top" : ""}${className ? ` ${className}` : ""}`}
      data-theme={dark ? "dark" : "light"}
    >
      <NavTrailContext.Provider value={navTrail}>
      <ReplicaPageNav
        dark={dark}
        onToggleTheme={toggle}
        themeIcon={themeIcon}
        trail={navTrail}
        showBlogs={navShowBlogs}
        sibling={navSibling}
      />
      {children}
      </NavTrailContext.Provider>
      <ReplicaPageFooter />
    </div>
  );
}
