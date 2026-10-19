import SectionEyebrow from "@/components/home/section-eyebrow";
import { useHomeReveal } from "@/components/home/use-home-reveal";

const metrics = [
  {
    value: "IP67",
    title: "Weatherproof Hardware",
    description:
      "Fully sealed against dust and liquid intrusion — rated for outdoor and harsh factory floor deployment.",
  },
  {
    value: "-40°C",
    title: "Wide Temperature Range",
    description:
      "Validated from -40°C to +85°C for cold-chain, outdoor, and high-temperature industrial environments.",
  },
  {
    value: "100%",
    title: "Pre-Validated Integration",
    description:
      "Every integration kit ships as a tested system — drivers, calibration, and software stack pre-configured.",
  },
  {
    value: "24/7",
    title: "Expert Support",
    description:
      "Direct access to hardware and software engineers for integration support from prototype through production.",
  },
];

export default function TrustMetricsSection() {
  const sectionRef = useHomeReveal<HTMLElement>();

  return (
    <section
      id="why-corebolt"
      ref={sectionRef}
      data-nav-tone="light"
      className="home-section-light py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center home-fu mb-12">
          <SectionEyebrow centered>Why CoreBolt</SectionEyebrow>
          <h2 className="home-sec-h mb-4 text-center">
            Engineered for the Edge.{" "}
            <span className="text-[#76b900]">Built for Industry.</span>
          </h2>
          <p className="home-sec-p mx-auto text-center max-w-2xl">
            We combine manufacturing precision with deep AI systems expertise to
            deliver hardware that works in the real world — not just on a test
            bench.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m, i) => (
            <div
              key={m.title}
              className="home-light-card home-fu p-8 text-center hover:shadow-lg hover:border-[#76b900]/35 transition-all"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl font-black tracking-tight text-[#76b900] mb-1.5">
                {m.value}
              </div>
              <div className="text-sm font-bold text-[#0f1419] mb-1.5">
                {m.title}
              </div>
              <p className="text-[13px] text-[#64748b] leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
