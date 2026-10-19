import { Link } from "@/lib/wouter-compat";
import {
  ArrowRight,
  Camera,
  CircleDot,
  Gauge,
  Radar,
  Shield,
  Thermometer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionEyebrow from "@/components/home/section-eyebrow";
import { useHomeReveal } from "@/components/home/use-home-reveal";
import { getNewRoute } from "@/lib/route-mapping";

const lidarHref =
  getNewRoute("/lidar/subcategories") || "/lidar/subcategories";
const visionHref =
  getNewRoute("/vision-systems-cameras/subcategories") ||
  "/vision-systems-cameras/subcategories";

type Feature = { icon: LucideIcon; label: string };

const perceptionBlocks: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  features: Feature[];
  image: string;
  imageAlt: string;
  href: string;
  imageLeft: boolean;
}[] = [
    {
      id: "lidar",
      eyebrow: "3D LiDAR",
      title: "360° Spatial Awareness at 100 m Range",
      description:
        "High-resolution 3D solid-state and mechanical LiDAR sensors deliver accurate depth mapping and obstacle detection for autonomous mobile robots, UGVs, and industrial perception systems.",
      features: [
        { icon: Radar, label: "360° Field of View" },
        { icon: Gauge, label: "Up to 100 m range" },
        { icon: Shield, label: "IP67 rated" },
        { icon: Gauge, label: "200k+ pts/s" },
        { icon: Thermometer, label: "IP67 enclosure" },
        { icon: CircleDot, label: "ROS / ROS2 drivers" },
      ],
      image: "https://assets.core-bolt.com/blog-assets/livox.webp",
      imageAlt: "3D LiDAR sensor for autonomous robotics and spatial mapping",
      href: lidarHref,
      imageLeft: true,
    },
    {
      id: "depth",
      eyebrow: "Depth Cameras",
      title: "Synchronized Visual & Depth Data",
      description:
        "Stereo and structured-light depth cameras provide high-fidelity 3D data for robotic arms, mobile platforms, pick-and-place, and intelligent inspection at close to mid range.",
      features: [
        { icon: Camera, label: "Stereo & structured light" },
        { icon: Gauge, label: "Sub-mm depth accuracy" },
        { icon: CircleDot, label: "GMSL & USB integration" },
        { icon: Shield, label: "Pick-and-place ready" },
        { icon: Radar, label: "Multi-camera sync" },
        { icon: Thermometer, label: "-20°C to +60°C" },
      ],
      image: "https://assets.core-bolt.com/blog-assets/livox_5.png",
      imageAlt: "Depth camera for robotics and machine vision",
      href: visionHref,
      imageLeft: false,
    },
    {
      id: "gmsl",
      eyebrow: "GMSL Cameras",
      title: "Automotive-Grade Multi-Camera Vision",
      description:
        "GMSL cameras deliver long-reach, low-latency video over coax — ideal for multi-camera AI perception stacks on NVIDIA Jetson and rugged edge computers.",
      features: [
        { icon: Camera, label: "Up to 8 MP at 30 fps" },
        { icon: Gauge, label: "15 m+ coax reach" },
        { icon: CircleDot, label: "Hardware sync" },
        { icon: Shield, label: "Global shutter options" },
        { icon: Radar, label: "Native Jetson support" },
        { icon: Thermometer, label: "Industrial temperature" },
      ],
      image: "https://assets.core-bolt.com/website-assets/SN2M4EFGD-Starlight-Camera.jpg",
      imageAlt: "GMSL camera integration for edge AI perception",
      href: visionHref,
      imageLeft: true,
    },
  ];

export const perceptionSystemsSchemaItems = perceptionBlocks.map((b) => ({
  name: b.eyebrow,
  url: b.href,
}));

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function PerceptionSystemsSection() {
  const sectionRef = useHomeReveal<HTMLElement>();

  return (
    <section
      id="perception-systems"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center home-fu mb-14 md:mb-16 max-w-3xl mx-auto">
          <SectionEyebrow centered>Vision Systems</SectionEyebrow>
          <h2 className="home-sec-h mb-4">
            <span className="gradient-text" >Perception-Grade</span>
            <br />
            Sensing Hardware
          </h2>
          <p className="home-sec-p mx-auto text-center">
            Sensors selected and validated for seamless integration with CoreBolt
            Edge AI platforms.
          </p>
        </div>

        <div className="space-y-16 md:space-y-20">
          {perceptionBlocks.map((block, index) => (
            <div
              key={block.id}
              className="home-fu grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div
                className={`relative rounded-2xl overflow-hidden border border-border aspect-[4/3] lg:aspect-auto lg:min-h-[380px] ${block.imageLeft ? "" : "lg:order-2"
                  }`}
              >
                <img
                  src={block.image}
                  alt={block.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/30" />
              </div>

              <div className={block.imageLeft ? "" : "lg:order-1"}>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary mb-3 block">
                  {block.eyebrow}
                </span>
                <h3 className="text-2xl md:text-[1.75rem] font-bold text-foreground tracking-tight mb-4 leading-snug">
                  {block.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {block.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {block.features.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.label} className="flex items-start gap-2.5">
                        <div className="w-9 h-9 rounded-lg home-icon-box flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm text-foreground font-medium leading-snug pt-1.5">
                          {f.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={block.href}
                    className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Explore {block.eyebrow}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="text-sm font-semibold text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors"
                  >
                    Request Specs
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
