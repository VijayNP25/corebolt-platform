import { Link } from "@/lib/wouter-compat";
import { ArrowRight } from "lucide-react";
import SectionEyebrow from "@/components/home/section-eyebrow";
import { useHomeReveal } from "@/components/home/use-home-reveal";
import { getNewRoute } from "@/lib/route-mapping";

function categoryHref(categoryId: string): string {
  const oldRoute = `/${categoryId}/subcategories`;
  return getNewRoute(oldRoute) || oldRoute;
}

type SpecRow = { label: string; value: string };

const cards: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  specs: SpecRow[];
}[] = [
    {
      title: "Edge AI Computers",
      description:
        "Compact, fanless AI platforms with NVIDIA Jetson and Intel Core processors. Designed for real-time inference and multi-sensor fusion at the edge.",
      image: "https://assets.core-bolt.com/website-assets/AI-Edge-Computers.jpg",
      imageAlt: "CoreBolt Edge AI Computers NVIDIA Jetson edge AI computer for robotics",
      href: categoryHref("edge-computers"),
      specs: [
        { label: "Processor", value: "NVIDIA Jetson / Intel" },
        { label: "Form Factor", value: "Compact Fanless" },
        { label: "Temperature", value: "-40°C to +85°C" },
        { label: "I/O", value: "USB / PCIe / GMSL" },
      ],
    },
    {
      title: "Industrial Computers",
      description:
        "Rugged DIN-rail and rack-mount computers for 24/7 harsh environment operation. Wide range power input with full isolation protection.",
      image: "https://assets.core-bolt.com/website-assets/Industrial-Edge-Computer.jpg",
      imageAlt: "CoreBolt Industrial Computers rugged edge PC for factory automation",
      href: "/edge-computers/intel-hypercore-series",
      specs: [
        { label: "Mounting", value: "DIN-Rail / Rack" },
        { label: "Power", value: "9–48 VDC Wide" },
        { label: "Protection", value: "IP20 / IP67" },
        { label: "Certs", value: "IEC 60068 / CE" },
      ],
    },
    {
      title: "Industrial Panel Computers",
      description:
        'All-in-one touchscreen computers with IP65-rated front bezels. Ideal for HMI, SCADA, and factory automation — available 10" to 24".',
      image: "https://assets.core-bolt.com/website-assets/industrial-hardware.png",
      imageAlt: "CoreBolt Industrial Panel Computers rugged panel PC HMI",
      href: "/industrial-panel-pc/subcategories",
      specs: [
        { label: "Display", value: '10"–24" Touch' },
        { label: "Front Panel", value: "IP65 Rated" },
        { label: "CPU", value: "Intel / Rockchip" },
        { label: "OS", value: "Windows / Linux" },
      ],
    },
  ];

export const computingPlatformsSchemaItems = cards.map((c) => ({
  name: c.title,
  url: c.href,
}));

export default function ComputingPlatformsSection() {
  const sectionRef = useHomeReveal<HTMLElement>();

  return (
    <section
      id="computing-platforms"
      ref={sectionRef}
      data-nav-tone="light"
      className="home-section-light pt-4 md:pt-6 pb-20 md:pb-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-14 home-fu">
          <div>
            <SectionEyebrow className="!text-[#5a8f00]">
              Computing Hardware
            </SectionEyebrow>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-black tracking-tight leading-[1.08] text-[#0f1419]">
              <span className="text-[#76b900]">Industrial-Grade</span>
              <br />
              AI Computing Platforms
            </h2>
          </div>
          <p className="text-base text-[#4a5568] leading-relaxed max-w-xl lg:ml-auto lg:text-right">
            Purpose-built for real-world deployment — from compact edge nodes to
            full-featured panel PCs, engineered for 24/7 industrial operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              key={card.title}
              href={card.href}
              className="home-fu block group"
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <article className="h-full flex flex-col bg-white rounded-2xl border border-[#e2e8e0] overflow-hidden shadow-sm hover:shadow-lg hover:border-[#76b900]/40 transition-all duration-300">
                <div className="aspect-[16/10] overflow-hidden bg-[#eef1eb]">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-[#76b900] mb-3 tracking-tight group-hover:text-[#5f9600] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#4a5568] leading-relaxed flex-1 mb-5">
                    {card.description}
                  </p>
                  <div className="grid grid-cols-2 border border-[#e8ece4] rounded-lg overflow-hidden">
                    {card.specs.map((spec, i) => (
                      <div
                        key={spec.label}
                        className={`px-3 py-2.5 bg-[#fafbf9] ${i % 2 === 0 ? "border-r border-[#e8ece4]" : ""
                          } ${i < 2 ? "border-b border-[#e8ece4]" : ""}`}
                      >
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-0.5">
                          {spec.label}
                        </div>
                        <div className="text-xs font-semibold text-[#0f1419]">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-[#e8ece4] flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#76b900] inline-flex items-center gap-1.5 group-hover:gap-2 transition-all">
                    Explore Models <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
