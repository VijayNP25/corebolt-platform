"use client";

const peripherals = [
  { label: "3D LiDAR", sub: "360° mapping", pos: "top-2 left-0 sm:left-2" },
  { label: "GMSL Cameras", sub: "Multi-cam sync", pos: "top-2 right-0 sm:right-2" },
  { label: "Depth Camera", sub: "Stereo vision", pos: "bottom-2 left-0 sm:left-2" },
  { label: "AI SDK Stack", sub: "ROS-ready", pos: "bottom-2 right-0 sm:right-2" },
];

export default function KitDiagram() {
  return (
    <div className="relative min-h-[300px] sm:min-h-[340px] flex items-center justify-center py-6 px-2">
      <svg
        className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] pointer-events-none"
        viewBox="0 0 400 280"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <g stroke="rgba(118,185,0,0.35)" strokeWidth="1" strokeDasharray="5 5" fill="none">
          <line x1="200" y1="140" x2="70" y2="35" />
          <line x1="200" y1="140" x2="330" y2="35" />
          <line x1="200" y1="140" x2="70" y2="245" />
          <line x1="200" y1="140" x2="330" y2="245" />
        </g>
      </svg>

      <div className="relative z-10 rounded-[18px] home-kit-core px-8 py-7 text-center">
        <div className="w-14 h-14 rounded-[13px] mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-[#76b900] to-[#91c733]">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="hsl(222, 84%, 4.9%)">
            <rect x="2" y="2" width="7" height="7" rx="1.5" />
            <rect x="11" y="2" width="7" height="7" rx="1.5" opacity="0.7" />
            <rect x="2" y="11" width="7" height="7" rx="1.5" opacity="0.7" />
            <rect x="11" y="11" width="7" height="7" rx="1.5" opacity="0.4" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-foreground">Edge AI Computer</h3>
        <p className="text-xs text-muted-foreground mt-1">NVIDIA Jetson · Intel</p>
      </div>

      {peripherals.map((p) => (
        <div
          key={p.label}
          className={`absolute ${p.pos} z-10 rounded-xl border border-border bg-[#171b25] px-3 py-2.5 min-w-[110px] text-center shadow-lg`}
        >
          <div className="text-xs font-bold text-primary">{p.label}</div>
          <div className="text-[10px] text-muted-foreground">{p.sub}</div>
        </div>
      ))}
    </div>
  );
}
