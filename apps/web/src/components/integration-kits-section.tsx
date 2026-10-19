import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Rocket } from "lucide-react";
import SectionEyebrow from "@/components/home/section-eyebrow";
import KitDiagram from "@/components/home/kit-diagram";
import { useHomeReveal } from "@/components/home/use-home-reveal";

const features = [
  {
    icon: Clock,
    title: "Less Integration Time",
    description:
      "Pre-matched hardware eliminates weeks of bring-up and compatibility testing. Every component in the kit is selected, wired, and validated to work together — right out of the box.",
  },
  {
    icon: ShieldCheck,
    title: "Fewer Compatibility Risks",
    description:
      "No driver surprises. No connector mismatches. No power budget guesswork. Every CoreBolt Integration Kit is end-to-end validated before it leaves our facility.",
  },
  {
    icon: Rocket,
    title: "Faster Time to Deployment",
    description:
      "Ship your autonomous product sooner. Our kits compress the hardware-to-deployment cycle by weeks — letting your engineering team move straight to software and integration testing.",
  },
];

const exampleKits = [
  {
    name: "AMR Navigation Kit",
    description: "Jetson Orin NX + Mid-360 LiDAR + dual GMSL cameras",
    tags: ["Indoor AMR", "SLAM-ready"],
  },
  {
    name: "Factory Vision Kit",
    description: "Industrial edge PC + Orbbec depth + triggered lighting",
    tags: ["QC inspection", "Line sync"],
  },
  {
    name: "Outdoor UGV Kit",
    description: "Rugged IP67 compute + RoboSense LiDAR + sealed harness",
    tags: ["Defense UGV", "All-weather"],
  },
];

const useCases = [
  "Autonomous Mobile Robots (AMRs) & AGVs",
  "Machine Vision & AI Inspection",
  "Industrial Edge AI Computing",
  "Autonomous Vehicles & Robotics",
  "Drone & UAV Autonomy",
  "Smart Surveillance & Video Analytics",
  "Precision Agriculture & Agri-Robotics",
  "Logistics & Warehouse Automation",
];

export const integrationKitsSchemaItems = [
  { name: "Robotics Integration Kits", url: "#integration-kits" },
  { name: "Pre-configured AI Robot Kits", url: "#integration-kits" },
  { name: "NVIDIA Jetson LiDAR Camera Kits", url: "#integration-kits" },
];

export default function IntegrationKitsSection() {
  const sectionRef = useHomeReveal<HTMLElement>();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="integration-kits"
      ref={sectionRef}
      data-nav-tone="light"
      className="home-section-light py-20 md:py-28 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(118,185,0,.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center home-fu mb-14 md:mb-16">
          <SectionEyebrow centered>Perception Kits</SectionEyebrow>
          <h2 className="home-sec-h mb-4 mx-auto max-w-2xl text-center">
            Ready-to-Deploy{" "}
            <span className="text-[#76b900]">Integration Kits</span>
          </h2>
          <p className="home-sec-p mx-auto text-center">
            Everything you need matched, tested and shipped together. Accelerate
            development with pre-integrated hardware platforms combining AI
            computing, vision sensors, communication interfaces, and
            software-ready architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-14">
          <div className="home-fu">
            <KitDiagram />
          </div>

          <div className="home-fu space-y-0">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex gap-4 py-5 border-b border-[#e2e8e0] last:border-0"
              >
                <div className="w-11 h-11 rounded-[11px] home-icon-box flex items-center justify-center shrink-0">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#0f1419] mb-1">
                    {f.title}
                  </h4>
                  <p className="text-sm text-[#64748b] leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="home-fu mb-12">
          <h3 className="text-lg font-bold text-[#76b900] mb-4">Example kits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {exampleKits.map((kit) => (
              <div
                key={kit.name}
                className="home-light-card p-5 hover:border-[#76b900]/40 transition-colors"
              >
                <h4 className="text-sm font-bold text-[#0f1419] mb-2">
                  {kit.name}
                </h4>
                <p className="text-xs text-[#64748b] leading-relaxed mb-3">
                  {kit.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {kit.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-primary/15 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-bold text-[#76b900] mb-4">Use cases</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {useCases.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-[#0f1419]"
              >
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="home-fu text-center home-light-card px-6 py-12 md:px-16 relative overflow-hidden border-[#76b900]/30">
          <p className="text-lg md:text-xl text-[#4a5568] max-w-3xl mx-auto mb-8 leading-relaxed relative z-10">
            Connect with our engineers to configure a custom integration kit for
            your exact use case — hardware selection, mounting, power, and
            software stack included.
          </p>
          <button
            type="button"
            className="home-btn-primary relative z-10"
            onClick={scrollToContact}
          >
            Configure Your Kit
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
