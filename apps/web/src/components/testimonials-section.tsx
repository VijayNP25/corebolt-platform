import { useEffect } from "react";
import { Quote, ArrowRight } from "lucide-react";
import SectionEyebrow from "@/components/home/section-eyebrow";
import { useHomeReveal } from "@/components/home/use-home-reveal";

const testimonials = [
  {
    quote:
      "CoreBolt's edge AI platform and LiDAR integration cut our AMR bring-up from months to weeks. The pre-validated hardware stack let our team focus on navigation software immediately.",
    author: "Robotics Systems Lead",
    role: "Autonomous Mobile Robot OEM",
    rating: 5,
  },
  {
    quote:
      "We deployed NVIDIA Jetson-based industrial computers from CoreBolt across our factory vision lines. Reliability in harsh environments and responsive engineering support made the difference.",
    author: "Automation Director",
    role: "Industrial Automation Integrator",
    rating: 5,
  },
  {
    quote:
      "For our UGV perception stack, CoreBolt supplied matched depth cameras, LiDAR, and compute in one integration path. Fewer compatibility risks and faster field trials.",
    author: "Principal Engineer",
    role: "Defense & Surveillance Robotics",
    rating: 5,
  },
];

const partners = ["NVIDIA", "Ouster", "Intel", "Stereolabs", "Hesai", "RoboSense"];

const trustHighlights = [
  { value: "IP67", label: "Weatherproof" },
  { value: "5★", label: "Customer rated" },
  { value: "100%", label: "Pre-validated kits" },
  { value: "24/7", label: "Engineer support" },
];

function injectTestimonialsSchema() {
  const scriptId = "home-testimonials-schema";
  document.getElementById(scriptId)?.remove();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CoreBolt",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(testimonials.length),
      bestRating: "5",
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewBody: t.quote,
      author: { "@type": "Person", name: t.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
    })),
  };

  const script = document.createElement("script");
  script.id = scriptId;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export default function TestimonialsSection() {
  const sectionRef = useHomeReveal<HTMLElement>();

  useEffect(() => {
    injectTestimonialsSchema();
    return () => document.getElementById("home-testimonials-schema")?.remove();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 md:py-24 bg-[#171b25]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center home-fu mb-10">
          <SectionEyebrow centered>Testimonials</SectionEyebrow>
          <h2 className="home-sec-h mb-4 text-primary">
            Trusted by Innovators Building the Future
          </h2>
          <p className="home-sec-p mx-auto text-center text-white">
            Customer success stories highlighting robotics, automation, and
            autonomous system deployments.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 home-fu max-w-3xl mx-auto">
          {trustHighlights.map((m) => (
            <div
              key={m.label}
              className="text-center rounded-xl border border-border bg-background/50 px-3 py-4"
            >
              <div className="text-xl font-black gradient-text">{m.value}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 home-fu">
          {partners.map((brand) => (
            <div
              key={brand}
              className="px-5 py-3 rounded-xl border border-border bg-background/80 min-w-[100px] text-center hover:border-primary/50 transition-colors"
            >
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-foreground">
                {brand}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {testimonials.map((item, index) => (
            <blockquote
              key={index}
              className="home-fu rounded-2xl border border-border bg-background p-6 flex flex-col gap-4 shadow-xl shadow-primary/10"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <Quote className="h-8 w-8 text-primary/40" />
              <p className="text-foreground leading-relaxed flex-1 italic text-sm">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="border-t border-border pt-4">
                <cite className="not-italic font-semibold text-secondary block text-sm">
                  {item.author}
                </cite>
                <span className="text-xs text-muted-foreground">{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="text-center home-fu">
          <button
            type="button"
            className="home-btn-primary"
            onClick={scrollToContact}
          >
            Talk to an Engineer
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
