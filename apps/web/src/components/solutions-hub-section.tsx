import { ArrowRight, Cpu, Eye, Package } from "lucide-react";
import SectionEyebrow from "@/components/home/section-eyebrow";
import { useHomeReveal } from "@/components/home/use-home-reveal";

const pillars = [
  {
    id: "computing-platforms",
    icon: Cpu,
    title: "Industrial Computing",
    description: "Edge AI, embedded, and panel PCs for mission-critical workloads.",
    href: "#computing-platforms",
  },
  {
    id: "perception-systems",
    icon: Eye,
    title: "Vision & Sensing",
    description: "3D LiDAR, depth cameras, and GMSL vision for real-world perception.",
    href: "#perception-systems",
  },
  {
    id: "integration-kits",
    icon: Package,
    title: "Integration Kits",
    description: "Pre-validated compute + sensor stacks, ready to deploy.",
    href: "#integration-kits",
    highlight: true,
  },
];

export default function SolutionsHubSection() {
  const sectionRef = useHomeReveal<HTMLElement>();

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="py-24 bg-[#171b25]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center home-fu mb-12">
          <SectionEyebrow centered>What We Offer</SectionEyebrow>
          <h2 className="home-sec-h mb-4">Complete Solutions Stack</h2>
          <p className="home-sec-p mx-auto text-center text-white">
            Compute, perceive, and deploy — everything from a single engineering
            partner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <a
                key={p.id}
                href={p.href}
                className={`home-fu block rounded-2xl border p-6 transition-all duration-300 group ${
                  p.highlight
                    ? "border-primary/50 bg-primary/5 hover:border-primary hover:shadow-lg hover:shadow-primary/15"
                    : "border-border bg-background hover:border-primary/40"
                }`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 rounded-xl home-icon-box flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  {p.description}
                </p>
                <span className="text-sm font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
