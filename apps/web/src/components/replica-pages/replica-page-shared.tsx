"use client";

import { useEffect } from "react";
import ReplicaFooter from "@/components/replica-home/replica-footer";
import {
  ArrowIcon,
  ReplicaNav,
  useReplicaNavTone,
  useReplicaTheme,
  type ReplicaPageId,
} from "@/components/replica-home/replica-shared";

export type { ReplicaPageId };

/** @deprecated Use useReplicaTheme */
export const useReplicaPageTheme = useReplicaTheme;

export function useReplicaPageEffects() {
  useReplicaNavTone("light");
  useEffect(() => {
    const nav = document.getElementById("replica-nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const els = document.querySelectorAll(
      ".replica-page .rv,.replica-page .rv-l,.replica-page .rv-r"
    );
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

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);
}

/** @deprecated Use ReplicaNav */
export const ReplicaPageNav = ReplicaNav;

export function ReplicaPageFooter() {
  return <ReplicaFooter />;
}
export { ArrowIcon };
