"use client";

import { CheckCircle2, Star } from "lucide-react";

function ModuleBar({ width }: { width: string }) {
  return (
    <div className="h-[3px] bg-white/5 rounded-sm overflow-hidden">
      <div className="h-full rounded-sm home-bar-fill" style={{ width }} />
    </div>
  );
}

export default function HeroDeviceVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
      <div className="rounded-[20px] border border-border bg-[#171b25] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.65),0_0_0_1px_rgba(118,185,0,0.18)]">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[1.2px] text-primary">
            Edge AI Perception Platform
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary home-badge-dot" />
            System Active
          </span>
        </div>
        <div className="grid grid-cols-2 gap-px bg-border">
          {[
            { tag: "AI Compute", val: "NVIDIA Jetson", w: "74%" },
            { tag: "3D LiDAR", val: "360° · 100 m", w: "88%" },
            { tag: "GMSL Camera", val: "8MP · 30 fps", w: "63%" },
            { tag: "Depth Camera", val: "Stereo Vision", w: "81%" },
          ].map((m) => (
            <div key={m.tag} className="bg-[#171b25] p-4 flex flex-col gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                {m.tag}
              </span>
              <span className="text-[13px] font-bold text-foreground">{m.val}</span>
              <ModuleBar width={m.w} />
            </div>
          ))}
        </div>
        <div className="px-5 py-3.5 flex items-center justify-between border-t border-border">
          <span className="text-xs text-muted-foreground">Perception Kit v2.1</span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/25">
            All Systems Go
          </span>
        </div>
      </div>
      <div className="absolute -bottom-5 -left-6 hidden sm:flex items-center gap-2 rounded-[10px] border border-border bg-[#171b25] px-3.5 py-2 text-xs font-semibold text-foreground shadow-lg animate-[home-float_4s_ease-in-out_infinite]">
        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
        Complete Perception Kit
      </div>
      <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 rounded-[10px] border border-border bg-[#171b25] px-3.5 py-2 text-xs font-semibold text-foreground shadow-lg animate-[home-float_4s_ease-in-out_infinite_0.3s]">
        <Star className="h-3.5 w-3.5 text-secondary fill-secondary" />
        Industrial Grade
      </div>
    </div>
  );
}
