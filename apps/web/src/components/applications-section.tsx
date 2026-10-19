import { useEffect } from "react";
import { Link } from "@/lib/wouter-compat";
import {
  Bot,
  Factory,
  Sprout,
  HardHat,
  Shield,
  Building2,
  FlaskConical,
  Truck,
  type LucideIcon,
} from "lucide-react";
import SectionEyebrow from "@/components/home/section-eyebrow";
import { useHomeReveal } from "@/components/home/use-home-reveal";

const applications: {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
  image: string;
}[] = [
  {
    title: "AMRs, AGVs & UGVs",
    description:
      "Full navigation stacks with spatial awareness for safe autonomous operation indoors and outdoors.",
    icon: Truck,
    slug: "amr-agv",
    image: "https://assets.core-bolt.com/website-assets/robotics_lab.png",
  },
  {
    title: "Humanoid Robots",
    description:
      "Wrist-mount vision and edge compute for manipulation, humanoids, and physical AI.",
    icon: Bot,
    slug: "humanoid-robots",
    image: "https://assets.core-bolt.com/website-assets/About-us.jpg",
  },
  {
    title: "Industrial Automation",
    description:
      "AI-powered inspection, quality control, and process monitoring on the factory floor.",
    icon: Factory,
    slug: "industrial-automation",
    image: "https://assets.core-bolt.com/blog-assets/vision-lidar-workload.jpg",
  },
  {
    title: "Smart Agriculture",
    description:
      "Autonomous farming equipment and agri-robotics with rugged edge perception.",
    icon: Sprout,
    slug: "smart-agriculture",
    image: "https://assets.core-bolt.com/blog-assets/livox.webp",
  },
  {
    title: "Construction Automation",
    description:
      "Machine vision and LiDAR for construction robotics and site awareness.",
    icon: HardHat,
    slug: "construction-automation",
    image: "https://assets.core-bolt.com/blog-assets/Actuator.jpg",
  },
  {
    title: "Defense & Surveillance",
    description:
      "Matched depth cameras, LiDAR, and compute for UGV and perimeter systems.",
    icon: Shield,
    slug: "defense-surveillance",
    image: "https://assets.core-bolt.com/website-assets/Robosense_Airy_96.webp",
  },
  {
    title: "Smart Infrastructure",
    description:
      "Traffic monitoring, people counting, and edge analytics at the infrastructure layer.",
    icon: Building2,
    slug: "smart-infrastructure",
    image: "https://assets.core-bolt.com/blog-assets/vision-lidar-workload.jpg",
  },
  {
    title: "R&D Platforms",
    description:
      "Validated hardware stacks for labs, prototypes, and next-gen robotics R&D.",
    icon: FlaskConical,
    slug: "rd-platforms",
    image: "https://assets.core-bolt.com/website-assets/robotics_lab.png",
  },
];

function injectApplicationsSchema() {
  const scriptId = "home-applications-schema";
  document.getElementById(scriptId)?.remove();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SiteNavigationElement",
        name: "CoreBolt Applications",
        hasPart: applications.map((app) => ({
          "@type": "SiteNavigationElement",
          name: app.title,
          url: "https://www.core-bolt.com/#applications",
        })),
      },
      {
        "@type": "ItemList",
        name: "Where our Hardware Works",
        itemListElement: applications.map((app, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: app.title,
        })),
      },
    ],
  };

  const script = document.createElement("script");
  script.id = scriptId;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export default function ApplicationsSection() {
  const sectionRef = useHomeReveal<HTMLElement>();

  useEffect(() => {
    injectApplicationsSchema();
    return () => document.getElementById("home-applications-schema")?.remove();
  }, []);

  return (
    <section
      id="applications"
      ref={sectionRef}
      className="py-20 md:py-24 bg-gradient-to-br from-slate-900 via-background to-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center home-fu mb-12 md:mb-14">
          <SectionEyebrow centered>Applications</SectionEyebrow>
          <h2 className="home-sec-h mb-4 text-primary">Where our Hardware Works</h2>
          <p className="home-sec-p mx-auto text-center text-white">
            Proven across the most demanding industrial, autonomous, and
            intelligent-infrastructure applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {applications.map((app, index) => {
            const Icon = app.icon;
            return (
              <Link
                key={app.slug}
                href="/contact-us"
                className="home-fu block"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <article
                  className="home-scard home-scard-flush overflow-hidden text-left group"
                  aria-label={`CoreBolt edge AI hardware for ${app.title}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={app.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171b25] via-[#171b25]/25 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 w-9 h-9 rounded-lg bg-[#171b25]/80 border border-primary/30 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="px-4 py-4">
                    <h3 className="text-base font-semibold text-white leading-snug mb-2">
                      {app.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {app.description}
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
