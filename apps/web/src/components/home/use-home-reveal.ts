"use client";

import { useEffect, useRef } from "react";

export function useHomeReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("home-in");
          }
        });
      },
      { threshold: 0.12 }
    );

    const nodes = el.querySelectorAll(".home-fu");
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return ref;
}
