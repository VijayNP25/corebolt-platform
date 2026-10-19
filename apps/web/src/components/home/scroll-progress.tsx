"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-[#76b900] to-[#91c733] transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(118,185,0,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
