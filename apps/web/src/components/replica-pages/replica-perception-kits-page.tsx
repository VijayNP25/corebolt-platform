"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/wouter-compat";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ReplicaFooter from "@/components/replica-home/replica-footer";
import { CONTACT_DIALOG_CONTENT_CLASS } from "@/components/contact-form-modal";
import PerceptionKitContactModal from "@/components/perception-kit-contact-modal";
import { useSeo } from "@/lib/seo";
import CdnImage from "@/components/cdn-image";
import { buildBackgroundImageValue } from "@/lib/webp-image";
import {
  ReplicaNav,
  useReplicaNavTone,
  useReplicaTheme,
} from "@/components/replica-home/replica-shared";
import {
  APPLICATIONS,
  OVERVIEW_PARAGRAPHS,
  PERCEPTION_KITS_IMAGES,
  SPEC_CARDS,
  WHY_CORE_BOLT,
} from "@/lib/perception-kits-data";
import { PERCEPTION_KITS_LINK } from "@/lib/replica-product-routes";
import "@/styles/replica-perception-kits.css";
import "@/styles/replica-product-page.css";

function WhyIcon({ icon }: { icon: string }) {
  const paths: Record<string, React.ReactNode> = {
    layers: (
      <>
        <path d="M12 3 3 8l9 5 9-5-9-5z" />
        <path d="m3 13 9 5 9-5M3 18l9 5 9-5" />
      </>
    ),
    expertise: (
      <>
        <circle cx="9" cy="8" r="3.4" />
        <path d="M3.5 20c.6-3.3 2.9-5 5.5-5s4.9 1.7 5.5 5" />
        <circle cx="17.6" cy="9.5" r="2.2" />
        <path d="M17.6 5.8v1.1M17.6 12.1v1.1M20.9 9.5h-1.1M15.4 9.5h-1.1" />
      </>
    ),
    chip: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <rect x="10" y="10" width="4" height="4" />
        <path d="M9 7V4M12 7V4M15 7V4M9 20v-3M12 20v-3M15 20v-3M7 9H4M7 12H4M7 15H4M20 9h-3M20 12h-3M20 15h-3" />
      </>
    ),
    delivery: (
      <>
        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
        <circle cx="7" cy="18" r="1.8" />
        <circle cx="17" cy="18" r="1.8" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.5 3 8.4 7 10 4-1.6 7-5.5 7-10V6l-7-3z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    support: (
      <>
        <path d="M2.5 12 7 7.5l5 1.5 5-1.5 4.5 4.5" />
        <path d="m12 9-3.5 3.5a1.6 1.6 0 0 0 2.3 2.3L12 13.7l1.2 1.1a1.6 1.6 0 0 0 2.3-2.2" />
      </>
    ),
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[icon]}</svg>;
}

export default function ReplicaPerceptionKitsPage() {
  const { dark } = useReplicaTheme();
  const appCardsRef = useRef<HTMLDivElement>(null);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useReplicaNavTone("light");

  useSeo({
    title: "Perception Kits | CORE BOLT",
    description:
      "Everything you need to connect LiDAR, cameras, and industrial sensors to a CORE BOLT edge computer — cables, adapters, and mounts included for plug-and-play deployment.",
    canonical: "https://www.core-bolt.com/perception-kits",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const nav = document.getElementById("replica-nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const cards = appCardsRef.current?.querySelectorAll(".pk-app-card");
    if (!cards?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="perception-kits-page min-h-screen" data-theme={dark ? "dark" : "light"}>
      <ReplicaNav
        dark={dark}
        trail={[{ label: "Perception Kits", href: "/perception-kits" }]}
        showBlogs
      />

      <section className="pk-hero" data-nav-tone="light">
        <div className="pk-container">
          <div className="pk-hero-content">
            <h1>
              <span className="accent">Ready-to-Deploy</span>
              Perception Kits.
            </h1>
            <p className="pk-hero-description">
              Perception Kit combines AI edge computing, multi-camera connectivity, and
              high-speed interfaces to enable real-time perception, sensor fusion, and
              object detection. Designed for robotics, autonomous vehicles, and industrial
              automation, it delivers reliable edge intelligence for demanding AI
              applications.
            </p>
            <div className="pk-integration-card">
              <h2>Integration Capabilities</h2>
              <ul>
                <li>Dual LiDAR Integration</li>
                <li>Support up to 8 GMSL cameras</li>
                <li>Industrial sensors &amp; peripherals</li>
                <li>Industrial I/O &amp; communication</li>
                <li>AI-ready edge deployment</li>
              </ul>
            </div>
            <div className="pk-hero-cta-row">
              <Link href="/contact-us" className="pk-btn-primary">
                Request Perception Kit →
              </Link>
              <Link href={PERCEPTION_KITS_LINK} className="pk-btn-outline">
                Know more
              </Link>
            </div>
          </div>
          <div className="pk-hero-image">
            <CdnImage
              src={PERCEPTION_KITS_IMAGES.hero}
              alt="Perception Kit hardware bundle"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

    

      <section className="pk-applications" data-nav-tone="dark">
        <div className="pk-container">
          <h2>
            Built for Real-World <span className="accent">Deployments</span>
          </h2>
          <p>One integration kit, six deployment paths - from warehouse floors to open roads.</p>
          <div className="pk-app-grid" ref={appCardsRef}>
            {APPLICATIONS.map((app) => (
              <div className="pk-app-card" key={app.title}>
                <div
                  className="pk-app-card-img"
                  style={{ backgroundImage: buildBackgroundImageValue(app.image) }}
                />
                <div className="pk-app-card-text">
                  <h3>{app.title}</h3>
                  <p>{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pk-why-section" data-nav-tone="light">
        <div className="pk-container">
          <span className="pk-why-tag">WHY CORE BOLT</span>
          <h2>Built for Faster AI Deployment</h2>
          <p className="pk-why-intro">
            Our perception kits combine validated hardware, industrial connectivity, and
            engineering expertise into one complete platform that accelerates the
            development of robotics, autonomous machines, and intelligent vision systems.
          </p>
          <div className="pk-why-grid">
            {WHY_CORE_BOLT.map((item) => (
              <article className="pk-why-card" key={item.title}>
                <div className="pk-why-icon">
                  <WhyIcon icon={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pk-provide-section" data-nav-tone="dark">
        <div className="pk-specs-triple-intro">
          <div className="pk-specs-eyebrow">Configure Integration Kit</div>
          <h3>Build a Perception Kit Tailored to Your Application</h3>
          <p>
            Select the ideal combination of Edge AI computing, sensing technologies,
            connectivity, and accessories to create a deployment-ready perception platform
            for your robotics, automation, or autonomous system.
          </p>
        </div>

        <div className="pk-specs-triple">
          {SPEC_CARDS.map((card) => (
            <div className="pk-spec-card" key={card.alt}>
              <CdnImage src={card.image} alt={card.alt} className="pk-spec-card-image" loading="lazy" />
              <h4 className="pk-spec-card-title">{card.title}</h4>
              <p className="pk-spec-card-desc">{card.desc}</p>
              <div className="pk-spec-card-cta">
                <Link href={card.href} className="pk-table-cta">
                  {card.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pk-overview-section" data-nav-tone="light">
        <h2>The Complete Sensor Integration Kit for Edge AI</h2>
        <div className="pk-overview-subheading">
          Connect LiDAR, Cameras &amp; Industrial Sensors to Your Edge Computer - No Custom
          Wiring Required
        </div>
        <div className="pk-overview-body">
          {OVERVIEW_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="pk-cta-banner" data-nav-tone="dark">
        <div className="pk-cta-eyebrow">GET STARTED</div>
        <h2>
          Ready to Build Your <span className="accent">Perception System</span>
        </h2>
        <p>
          Talk to our team about matching the right edge computer, sensors and integration
          components to your application.
        </p>
        <div className="pk-quantity-section">
          <span className="pk-quantity-label">Kit quantity</span>
          <div className="pk-quantity-control" aria-label="Kit quantity">
            <button
              type="button"
              aria-label="Decrease kit quantity"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            >
              −
            </button>
            <output>{quantity}</output>
            <button
              type="button"
              aria-label="Increase kit quantity"
              onClick={() => setQuantity((current) => current + 1)}
            >
              +
            </button>
          </div>
        </div>
        <button
          type="button"
          className="pk-btn-primary"
          onClick={() => setIsQuoteDialogOpen(true)}
        >
          Contact Us →
        </button>
      </section>

      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
        <DialogContent className={CONTACT_DIALOG_CONTENT_CLASS}>
          <PerceptionKitContactModal
            title="Get a Quote for a Perception Kit"
            subtitle="Share your application details and our team will help configure the right kit."
            action="quote"
          />
        </DialogContent>
      </Dialog>

      <ReplicaFooter />
    </div>
  );
}
