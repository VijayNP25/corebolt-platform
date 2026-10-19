import { Link } from "@/lib/wouter-compat";
import { ArrowRight, Cpu, Eye, Package, LayoutGrid } from "lucide-react";
import SectionEyebrow from "@/components/home/section-eyebrow";
import { useHomeReveal } from "@/components/home/use-home-reveal";

const stats = [
  { value: "275 TOPS", label: "Peak edge AI performance" },
  { value: "IP67", label: "Rugged enclosure options" },
  { value: "Made in India", label: "Design & manufacturing" },
  { value: "24/7", label: "Engineering support" },
];

const pillars = [
  {
    icon: Cpu,
    title: "Edge AI computing",
    description: "Jetson and industrial platforms built for 24/7 deployment.",
    href: "#computing-platforms",
  },
  {
    icon: Eye,
    title: "Vision & sensing",
    description: "LiDAR, depth, and GMSL validated for your compute stack.",
    href: "#perception-systems",
  },
  {
    icon: Package,
    title: "Integration kits",
    description: "Pre-matched hardware — deploy in weeks, not months.",
    href: "#integration-kits",
  },
];

const HERO_IMAGE =
  "https://assets.core-bolt.com/website-assets/robotics_lab.png";

export default function AboutSection() {
  const sectionRef = useHomeReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      data-nav-tone="light"
      className="home-section-light py-20 md:py-28 relative overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-[480px] h-[480px] pointer-events-none opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle, rgba(118,185,0,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14 md:mb-16">
          <div className="home-fu">
            <SectionEyebrow icon={<LayoutGrid className="h-3 w-3" />}>
              About CoreBolt
            </SectionEyebrow>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-black tracking-tight leading-[1.08] mb-5">
              Engineering the{" "}
              <span className="text-[#76b900]">Intelligence</span> Behind{" "}
              <span className="text-[#0f1419]">Modern Machines</span>
            </h2>
            <div className="space-y-4 text-[#4a5568] leading-relaxed text-base max-w-xl">
              <p>
                Modern autonomous systems require more than powerful processors
                or advanced sensors. They rely on seamless integration of AI
                computing, machine vision, and industrial-grade hardware in
                real-world environments.
              </p>
              <p>
                CoreBolt delivers the full stack — from{" "}
                <Link href="/edge-computers/subcategories" className="home-link">
                  Edge AI Computers
                </Link>{" "}
                and industrial PCs to LiDAR, vision systems, and{" "}
                <a href="#integration-kits" className="home-link">
                  integration kits
                </a>{" "}
                that accelerate robotics, automation, and smart mobility.
              </p>
            </div>
            <p className="mt-6 font-semibold text-[#76b900]">
              Accelerate development. Simplify integration. Deploy with confidence.
            </p>
            <a
              href="#computing-platforms"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[#0f1419] hover:text-[#76b900] transition-colors"
            >
              Explore our platforms
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="home-fu relative">
            <div className="home-light-card overflow-hidden p-2">
              <img
                src={HERO_IMAGE}
                alt="CoreBolt edge AI and robotics engineering lab"
                className="w-full aspect-[4/3] object-cover rounded-xl"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -left-2 sm:left-4 home-light-card px-4 py-3 shadow-lg">
              <div className="text-xs font-bold uppercase tracking-wider text-[#76b900]">
                NVIDIA Partner Ecosystem
              </div>
              <div className="text-sm font-semibold text-[#0f1419]">
                Jetson · GMSL · ROS-ready stacks
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 home-fu">
          {stats.map((s) => (
            <div key={s.label} className="home-light-stat">
              <div className="value">{s.value}</div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 home-fu">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <a
                key={p.title}
                href={p.href}
                className="home-light-card p-6 block hover:border-[#76b900]/50 hover:shadow-lg transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#76b900]/12 border border-[#76b900]/25 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-[#76b900]" />
                </div>
                <h3 className="text-base font-bold text-[#0f1419] mb-2 group-hover:text-[#76b900] transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  {p.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
