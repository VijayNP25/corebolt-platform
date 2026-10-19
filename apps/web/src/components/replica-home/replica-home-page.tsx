"use client";

import { Link } from "@/lib/wouter-compat";
import { ChevronDown } from "lucide-react";
import ReplicaFooter from "@/components/replica-home/replica-footer";
import CdnImage from "@/components/cdn-image";
import { useSeo } from "@/lib/seo";
import { HOME_META, buildHomePageSchema } from "@/lib/home-seo";
import {
  COMPUTING_LINKS,
  VISION_LINKS,
  PERCEPTION_KITS_LINK,
} from "@/lib/replica-product-routes";
import { REPLICA_IMAGES } from "@/lib/replica-home-images";
import "@/styles/replica-home.css";
import {
  ArrowIcon,
  MailIcon,
  ReplicaNav,
  useReplicaHomeEffects,
  useReplicaTheme,
} from "./replica-shared";

const computingSchema = [
  { name: "Edge Computers", url: COMPUTING_LINKS.edgeComputers },
  { name: "Industrial Panel Computers", url: COMPUTING_LINKS.panelPc },
];

const perceptionSchema = [
  { name: "3D LiDAR Sensors", url: VISION_LINKS.lidarRadar },
  { name: "Machine Vision & Industrial Cameras", url: VISION_LINKS.cameras },
];

const kitsSchema = [
  { name: "Perception Kits", url: "#kits" },
];

// Built once at module load; server-rendered into <head> via useSeo.
const homeSchema = buildHomePageSchema({
  computing: computingSchema,
  perception: perceptionSchema,
  integrationKits: kitsSchema,
});

const KIT_PHOTO_WIDTHS = [480, 760, 1140, 1520];
const KIT_PHOTO_SRCSET = (ext: "avif" | "webp") =>
  KIT_PHOTO_WIDTHS.map(
    (w) => `/home-replica/opt/Perception-Kits-white-${w}.${ext} ${w}w`
  ).join(", ");
// Phones: full content width; tablet/desktop: the image is capped at 760px.
const KIT_PHOTO_SIZES = "(max-width: 768px) calc(100vw - 48px), 760px";

export default function ReplicaHomePage() {
  const { dark, toggle, themeIcon } = useReplicaTheme();
  const { heroBgRef } = useReplicaHomeEffects(dark);

  useSeo({
    title: HOME_META.title,
    description: HOME_META.description,
    keywords: HOME_META.keywords,
    canonical: HOME_META.canonical,
    ogImage: HOME_META.ogImage,
    preloadImage: HOME_META.preloadImage,
    preloadImageMedia: HOME_META.preloadImageMedia,
    jsonLd: homeSchema,
  });

  return (
    <div className="replica-home min-h-screen" data-theme={dark ? "dark" : "light"}>
      <ReplicaNav
        dark={dark}
        onToggleTheme={toggle}
        themeIcon={themeIcon}
      />
      {/* HERO */}
      <section className="hero" data-nav-tone="dark">
        <div className="hero-bg" ref={heroBgRef} />
        <div className="hero-vignette" />
        <div className="hero-glow" />

        <div className="hero-content">
          <h1 className="hero-h">
            <span className="hero-line">AI Computing &amp; Perception Systems</span>
            <span className="hero-line">
              for <em>Robotics, Automation </em>
            </span>
            <span className="hero-line">and Autonomous Machines </span>
          </h1>
          <p className="hero-tagline">Built for Perception. Engineered for Intelligence.</p>
          {/* <p className="hero-sub">
            CORE BOLT™  is a leading industrial computing and edge AI solutions provider,
            manufacturing rugged AI Edge Computers, Industrial PCs, and Industrial Panel Computers
            for autonomous systems, robotics, machine vision, and smart industrial
            infrastructure. Our platforms deliver high-performance edge computing, real-time
            AI processing, vision intelligence, and data-driven automation for Industry
            applications.
          </p> */}
          <div className="hero-actions">
            <a href="#solutions" className="btn btn-primary">
              Explore Solutions
              <ArrowIcon />
            </a>
            <Link href="/contact-us" className="btn btn-outline-dk">
              Talk to an Engineer
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div>
              <div className="hero-stat-n">270</div>
              <div className="hero-stat-d">TOPS AI Performance</div>
            </div>
          </div>
          <div className="hero-stat">
            <div>
              <div className="hero-stat-n">OEM/ODM</div>
              <div className="hero-stat-d">Manufacturing</div>
            </div>
          </div>
          <div className="hero-stat">
            <div>
              <div className="hero-stat-n">IP67</div>
              <div className="hero-stat-d">Ingress Protection</div>
            </div>
          </div>
          <div className="hero-stat">
            <div>
              <div className="hero-stat-n">24/7</div>
              <div className="hero-stat-d">Engineering Support</div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="hero-scroll-chevron"
          aria-label="Scroll to computing section"
          onClick={() =>
            document
              .getElementById("computing")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <ChevronDown aria-hidden />
        </button>
      </section>

      {/* BRAND BAR */}
      {/* <div className="brandbar" id="about">
        <div className="brandbar-inner">
          <span className="brandbar-lbl">Our Products</span>
          <div className="brands">
            <div className="brand-item"><span>Edge AI Computers</span></div>
            <div className="brand-item"><span>Integration Kits</span></div>
            <div className="brand-item"><span>Machine Vision Hardware</span></div>
            <div className="brand-item"><span>3D LiDAR Sensors</span></div>
            <div className="brand-item"><span>NVIDIA Jetson Orin</span></div>
          </div>
        </div>
      </div> */}

      {/* COMPUTING */}
      <section className="computing" id="computing" data-nav-tone="light">
        <div className="wrap">
          <div className="sec-hd rv">
            {/* <div className="lbl" style={{ justifyContent: "center" }}>
              <span className="lbl-num">01</span> Computing Hardware
            </div> */}
            <h2 className="d2">
              <span style={{ fontWeight: "300" }}>High Performance</span>
              <br />
              <strong>AI Computing Platforms</strong>
            </h2>
            <p className="sec-hd-body">
              Purpose-built for real-world deployment, our computing solutions
              deliver reliable AI inference, real-time data processing, computer vision, and
              edge computing capabilities in demanding environments. Engineered for
              continuous 24/7 operation.
              {/* , Core Bolt platforms enable{" "}
              <strong>
                intelligent decision-making, autonomous navigation, perception, and control
              </strong>{" "}
              for the next generation of smart machines. From robotics and autonomous systems
              to industrial automation and AI-powered vision applications, Core Bolt provides
              the rugged computing infrastructure that powers modern industrial intelligence. */}
            </p>
          </div>

          <div className="computing-cards">
            <div className="ccard rv" style={{ animationDelay: ".05s" }}>
              <Link href={COMPUTING_LINKS.edgeComputers} className="ccard-img block">
                <CdnImage
                  src={REPLICA_IMAGES.edgeComputer}
                  alt="Edge AI Computer"
                  width={1235}
                  height={750}
                  loading="lazy"
                  decoding="async"
                />
                <div className="ccard-img-ov" />
                {/* <div className="ccard-num">01 · Edge Computers</div> */}
              </Link>
              <div className="ccard-body">
                {/* <div className="ccard-lbl">
                  <span>01 ·</span> Edge Computers
                </div> */}
                <Link href={COMPUTING_LINKS.edgeComputers} className="ccard-name block hover:text-[var(--g)]">
                  Edge Computers
                </Link>
                <p className="ccard-desc">
                  Built on NVIDIA Jetson and Intel Core architectures, our Edge AI computers
                  deliver high-performance AI inference, computer vision processing and
                  multi-sensor fusion for autonomous robots, AGVs, drones, and next-generation
                  industrial automation systems.
                </p>
                <div className="ccard-foot">
                  <Link href="/contact-us" className="btn btn-primary">
                    Request Specs →
                  </Link>
                  <Link href={COMPUTING_LINKS.edgeComputers} className="btn-ghost">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>

            <div className="ccard rv" style={{ animationDelay: ".15s" }}>
              <Link href={COMPUTING_LINKS.panelPc} className="ccard-img block">
                <CdnImage
                  src={REPLICA_IMAGES.industrialPanelPc}
                  alt="Industrial Panel Computer"
                  width={1235}
                  height={750}
                  loading="lazy"
                  decoding="async"
                />
                <div className="ccard-img-ov" />
                {/* <div className="ccard-num">02 · Industrial Panel Computers</div> */}
              </Link>
              <div className="ccard-body">
                {/* <div className="ccard-lbl">
                  <span>02 ·</span> Industrial Panel Computers
                </div> */}
                <Link href={COMPUTING_LINKS.panelPc} className="ccard-name block hover:text-[var(--g)]">
                  Industrial Panel Computers
                </Link>
                <p className="ccard-desc">
                  All-in-one touchscreen computers with IP65-rated front bezels -  purpose-built
                  for HMI and SCADA applications on factory floors, in 10&quot; to 24&quot;
                  display sizes.
                </p>
                <div className="ccard-foot">
                  <Link href="/contact-us" className="btn btn-primary">
                    Request Specs →
                  </Link>
                  <Link href={COMPUTING_LINKS.panelPc} className="btn-ghost">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="vision" id="vision" data-nav-tone="dark">
        <div className="wrap">
          <div className="vision-hd rv">
            {/* <div className="lbl" style={{ justifyContent: "center" }}>
              <span className="lbl-num">02</span> Vision Systems
            </div> */}
            <h2 className="d2-dk" style={{ marginBottom: 14 }}>
              <span style={{ fontWeight: "300" }}>Perception-Grade</span>
              <br />
              <strong>Sensing Hardware</strong>
            </h2>
            <p className="body-dk" style={{ margin: "0 auto", maxWidth: 480, textAlign: "center" }}>
              Sensors selected and validated for seamless integration with Core Bolt Edge AI
              platforms.
            </p>
          </div>

          <div className="vcards">
            <div className="vcard rv" style={{ animationDelay: ".05s" }}>
              <Link href={VISION_LINKS.lidarRadar} className="vcard-img block">
                <CdnImage
                  src={REPLICA_IMAGES.lidar}
                  alt="3D LiDAR"
                  width={1235}
                  height={750}
                  loading="lazy"
                  decoding="async"
                />
                <div className="vcard-img-ov" />
                {/* <div className="vcard-img-tag">
                  <span className="tag tag-g">3D LiDAR</span>
                </div> */}
              </Link>
              <div className="vcard-body">
                {/* <div className="vcard-lbl">
                  <span>01 ·</span> 3D LiDAR Sensors
                </div> */}
                <Link href={VISION_LINKS.lidarRadar} className="vcard-name block">
                  3D LiDAR Sensors &amp; Radars
                </Link>
                <p className="vcard-desc">
                  High-resolution 3D point cloud sensors from Hesai, RoboSense, Livox, SICK,
                  Ouster and Velodyne for depth mapping, obstacle detection, and environmental
                  modelling.
                </p>
                <div className="vcard-foot">
                  <Link href="/contact-us" className="btn btn-primary">
                    Request Specs →
                  </Link>
                  <Link href={VISION_LINKS.lidarRadar} className="btn-ghost-dk">
                    Browse LiDAR →
                  </Link>
                  {/* <span className="tag tag-g">ROS 2 Ready</span> */}
                </div>
              </div>
            </div>

            <div className="vcard rv" style={{ animationDelay: ".15s" }}>
              <Link href={VISION_LINKS.cameras} className="vcard-img block">
                <CdnImage
                  src={REPLICA_IMAGES.machineVision}
                  alt="Vision Systems"
                  width={1235}
                  height={750}
                  loading="lazy"
                  decoding="async"
                />
                <div className="vcard-img-ov" />
                {/* <div className="vcard-img-tag">
                  <span className="tag tag-g">Vision Systems</span>
                </div> */}
              </Link>
              <div className="vcard-body">
                {/* <div className="vcard-lbl">
                  <span>02 ·</span> Vision Systems
                </div> */}
                <Link href={VISION_LINKS.cameras} className="vcard-name block">
                  Machine Vision &amp; Industrial Cameras
                </Link>
                <p className="vcard-desc">
                  GMSL automotive cameras, Intel RealSense depth cameras, and MIPI CSI-2
                  imaging, validated for seamless integration with Core Bolt Edge AI computers.
                </p>
                <div className="vcard-foot">
                  <Link href="/contact-us" className="btn btn-primary">
                    Request Specs →
                  </Link>
                  <Link href={VISION_LINKS.cameras} className="btn-ghost-dk">
                    Browse Cameras →
                  </Link>
                  {/* <span className="tag tag-g">In Stock</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KITS */}
      <section className="kits" id="kits" data-nav-tone="light">
        <div className="wrap">
          <div className="kits-inner">
            <div className="rv-l">
              {/* <div className="lbl">
                <span className="lbl-num">03</span> Perception Kits
              </div> */}
              <h2 className="d3" style={{ marginBottom: 14, fontWeight: "400" }}>
                Ready-to-Deploy
                <br />
                <span style={{ color: "var(--g-text)", fontWeight: "500" }}>Perception Kits.</span>
              </h2>
              <p className="body" style={{ marginBottom: 0 }}>
                Everything you need matched, tested and shipped together. Accelerate
                development with pre-integrated hardware platforms combining AI computing,
                vision sensors, communication interfaces and software-ready architectures.
              </p>
              <div className="kits-list">
                <div className="kit-item">
                  <div className="kit-ico">
                    <svg viewBox="0 0 17 17" fill="none" color="currentColor">
                      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" fill="currentColor" />
                      <rect x="10" y="1.5" width="5.5" height="5.5" rx="1" fill="currentColor" opacity=".6" />
                      <rect x="1.5" y="10" width="5.5" height="5.5" rx="1" fill="currentColor" opacity=".6" />
                      <rect x="10" y="10" width="5.5" height="5.5" rx="1" fill="currentColor" opacity=".3" />
                    </svg>
                  </div>
                  <div>
                    <h3>Less Integration Time</h3>
                    <p>
                      Pre-matched hardware eliminates weeks of bring-up and compatibility
                      testing.
                    </p>
                  </div>
                </div>
                <div className="kit-item">
                  <div className="kit-ico">
                    <svg viewBox="0 0 17 17" fill="none" color="currentColor">
                      <path d="M8.5 2C5 2 2 5 2 8.5S5 15 8.5 15 15 12 15 8.5 12 2 8.5 2z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5.5 8.5l2.2 2.2 3.8-3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3>Fewer Compatibility Risks</h3>
                    <p>
                      No driver surprises. No connector mismatches. No power budget guesswork.
                    </p>
                  </div>
                </div>
                <div className="kit-item">
                  <div className="kit-ico">
                    <svg viewBox="0 0 17 17" fill="none" color="currentColor">
                      <path d="M2 12l3.5-4.5 2.5 2.5 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3>Faster Time to Deployment</h3>
                    <p>
                      Our kits compress the
                      hardware-to-deployment cycle by weeks, letting your engineering team move
                      straight to software and integration testing.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/contact-us" className="btn btn-primary">
                  Request Perception Kit →
                </Link>
                <Link href={PERCEPTION_KITS_LINK} className="btn btn-outline">
                  Know more
                </Link>
              </div>
            </div>
            <div className="rv-r">
              <div className="kit-photo">
                {/* Resized AVIF/WebP copies of Perception-Kits-white.jpeg
                    (4734px, 530 KB) in public/home-replica/opt — 9-35 KB. */}
                <picture>
                  <source
                    type="image/avif"
                    srcSet={KIT_PHOTO_SRCSET("avif")}
                    sizes={KIT_PHOTO_SIZES}
                  />
                  <source
                    type="image/webp"
                    srcSet={KIT_PHOTO_SRCSET("webp")}
                    sizes={KIT_PHOTO_SIZES}
                  />
                  <img
                    src="/home-replica/opt/Perception-Kits-white-1520.jpg"
                    alt="Core Bolt Perception Kit — Edge AI computer with GMSL cameras and cables"
                    width={1520}
                    height={1520}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="apps" id="solutions" data-nav-tone="dark">
        <div className="wrap">
          <div className="apps-hd rv">
            {/* <div className="lbl" style={{ justifyContent: "center", color: "rgba(255,255,255,.3)" }}>
              Applications
            </div> */}
            <h2 className="d2-dk" style={{ marginBottom: 12, fontWeight: "300" }}>
              Built for Real-World
              <br />
              <strong>Deployments</strong>
            </h2>
            <p className="body-dk" style={{ margin: "0 auto", maxWidth: 460 }}>
              Proven across demanding industrial, autonomous, and smart infrastructure
              applications.
            </p>
          </div>
          <div className="apps-grid rv">
            {[
              { img: "https://assets.core-bolt.com/website-assets/Autonomous-Robotics.jpeg", title: "Autonomous Robotics", sub: "AMRs · navigation · obstacle avoidance" },
              { img: "https://assets.core-bolt.com/website-assets/Autonomous-Vehicles.jpeg", title: "Autonomous Vehicles", sub: "AGVs · outdoor ground vehicles" },
              { img: "https://assets.core-bolt.com/website-assets/Smart-Manufacturing.jpeg", title: "Smart Manufacturing", sub: "Visual inspection · defect detection" },
              { img: "https://assets.core-bolt.com/website-assets/Drone-&-UAV-Systems.jpeg", title: "Drone & UAV Systems", sub: "Aerial perception · obstacle avoidance" },
              { img: "https://assets.core-bolt.com/website-assets/Smart-Infrastructure-for-robotic.jpeg", title: "Smart Infrastructure", sub: "Traffic monitoring · security systems" },
              { img: "https://assets.core-bolt.com/website-assets/Logistics-&-Warehousing-corebolt.jpeg", title: "Logistics & Warehousing", sub: "Automated picking · fleet management" },
            ].map((app) => (
              <div key={app.title} className="acard">
                {/* width/height = the 16:10 frame set by .acard img (aspect ratio only) */}
                <CdnImage
                  src={app.img}
                  alt=""
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                />
                <div className="acard-overlay" />

                <div className="acard-label">
                  <h3 style={{ fontSize: "16px" }}>{app.title}</h3>
                  <p style={{ fontSize: "14px" }}>{app.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" data-nav-tone="light">
        <div className="wrap">
          <div className="testi-hd rv">
            <div className="lbl" style={{ justifyContent: "center" }}>
              <span className="lbl-num">Trusted by Engineers</span>
            </div>
            <h2 className="d2" style={{ marginBottom: 12, fontSize: "clamp(26px,2.8vw,38px)", fontWeight: "400" }}>
              What Our Customers
              <br />
              <strong>Say About Us</strong>
            </h2>
            <p className="body" style={{ margin: "0 auto", maxWidth: 480, textAlign: "center" }}>
              Engineers and robotics teams across India trust Core Bolt to deliver validated,
              production-ready hardware.
            </p>
          </div>

          <div className="testi-grid">
            {[
              {
                quote: "Core Bolt's edge AI platform and LiDAR integration cut our AMR bring-up from months to weeks. The pre-validated hardware stack let our team focus on navigation software immediately.",
                name: "Robotics Systems Lead",
                role: "Autonomous Navigation",
                co: "Industrial AMR Manufacturer, Pune",
                delay: ".05s",
              },
              {
                quote: "We deployed NVIDIA Jetson-based industrial computers from Core Bolt across our factory vision lines. Reliability in harsh environments and responsive engineering support made the difference.",
                name: "Automation Director",
                role: "Factory Automation",
                co: "Industrial Automation Integrator, Bengaluru",
                delay: ".18s",
              },
              {
                quote: "For our UGV perception stack, Core Bolt supplied matched depth cameras, LiDAR, and compute in one integration path. Fewer compatibility risks and faster field trials than any other vendor we evaluated.",
                name: "Principal Engineer",
                role: "Perception Systems",
                co: "Defence & Surveillance Robotics, Hyderabad",
                delay: ".31s",
              },
            ].map((t) => (
              <div key={t.name} className="tcard rv" style={{ animationDelay: t.delay }}>
                <div className="tcard-mark">&ldquo;</div>
                <p className="tcard-text">{t.quote}</p>
                <div className="tcard-divider" />
                <div className="tcard-person">
                  <div className="tcard-name">{t.name}</div>
                  <div className="tcard-role">{t.role}</div>
                  <div className="tcard-co">{t.co}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec" id="contact" data-nav-tone="dark">
        <div className="cta-inner rv">
          <div className="lbl" style={{ justifyContent: "center", marginBottom: 20, color: "rgba(255,255,255,.3)" }}>
            <span style={{ color: "var(--g-lt)" }}>Get Started</span>
          </div>
          <h2 className="d2-dk" style={{ marginBottom: 16, fontWeight: "400" }}>
            Ready to build
            <br />
            <strong> smarter machines?</strong>
          </h2>
          <p className="body-dk" style={{ marginBottom: 40 }}>
            Talk to our engineers about the right Edge  AI platform or perception kit for your application
          </p>
          <div className="cta-btns">
            <Link href="/contact-us" className="btn btn-primary">
              Contact Sales
              <MailIcon />
            </Link>
            <a href="#computing" className="btn btn-outline-dk">
              Browse Products
            </a>
          </div>
        </div>
      </section>

      <ReplicaFooter />
    </div>
  );
}