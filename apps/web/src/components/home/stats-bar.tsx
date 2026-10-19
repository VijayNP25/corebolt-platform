"use client";

const stats = [
  { value: "-40°C", label: "Operating Temperature" },
  { value: "IP67", label: "Ingress Protection" },
  { value: "100 m", label: "LiDAR Range" },
  { value: "24/7", label: "Technical Support" },
];

export default function StatsBar() {
  return (
    <div className="border-y border-border bg-[#171b25]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`py-7 text-center ${
              i < stats.length - 1 ? "lg:border-r border-border" : ""
            } ${i % 2 === 0 ? "border-r border-border lg:border-r" : ""} ${
              i === 1 ? "lg:border-r" : ""
            }`}
          >
            <div className="text-2xl md:text-[26px] font-black tracking-tight home-grad-text">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground font-medium mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
