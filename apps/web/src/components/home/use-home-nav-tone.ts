"use client";

import { useEffect, useState } from "react";

const NAV_HEIGHT = 72;

/** True when the fixed nav overlaps a `[data-nav-tone="light"]` homepage section. */
export function useHomeNavTone(enabled: boolean) {
  const [overLight, setOverLight] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setOverLight(false);
      return;
    }

    const update = () => {
      const zones = document.querySelectorAll('[data-nav-tone="light"]');
      let overlap = false;
      zones.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < NAV_HEIGHT && rect.bottom > 0) overlap = true;
      });
      setOverLight(overlap);
    };

    update();
    const t = window.setTimeout(update, 150);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled]);

  return overLight;
}
