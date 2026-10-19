"use client";

const items = [
  "Edge AI Computers",
  "NVIDIA Jetson Orin",
  "Industrial Panel Computers",
  "3D LiDAR Sensors",
  "GMSL Depth Cameras",
  "Robotics Integration Kits",
  "AMR & AGV Platforms",
  "Machine Vision Hardware",
  "Fanless Rugged Design",
  "Made in India",
];

export default function TickerStrip() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-muted/30 border-y border-border py-3.5 overflow-hidden whitespace-nowrap">
      <div className="home-ticker-track">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-10 px-10 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
