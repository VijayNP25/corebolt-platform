"use client";


import { useEffect } from "react";
import { Link } from "@/lib/wouter-compat";
import "@/styles/replica-pages.css";
import { REPLICA_IMAGES } from "@/lib/replica-home-images";
import { buildBackgroundImageValue } from "@/lib/webp-image";
import { useSeo } from "@/lib/seo";
import {
  ArrowIcon,
  ReplicaPageFooter,
  ReplicaPageNav,
  useReplicaPageEffects,
  useReplicaPageTheme,
} from "./replica-page-shared";

const INDUSTRIES = [
  { num: "01", title: "Smart Manufacturing", desc: "Factory automation, quality inspection, defect detection, and predictive maintenance." },
  { num: "02", title: "Autonomous Robotics", desc: "AMRs, AGVs — autonomous navigation, obstacle avoidance, and fleet management." },
  { num: "03", title: "Logistics & Warehousing", desc: "Automated picking, sorting, inventory tracking, and warehouse automation systems." },
  { num: "04", title: "Transportation", desc: "Intelligent transportation systems, autonomous vehicles, and Unmanned ground vehicles (UGVs)." },
  { num: "05", title: "Drone & UAV Systems", desc: "Aerial perception, obstacle avoidance, and autonomous mission execution." },
  { num: "06", title: "Smart Infrastructure", desc: "Traffic monitoring, security systems, and smart city edge AI deployments." },
  { num: "07", title: "Machine Vision", desc: "Visual inspection, measurement, guidance, and identification on production lines." },
  { num: "08", title: "Edge AI Deployments", desc: "On-premises AI inference requiring reliable performance, low latency, and continuous operation." },
];

export default function ReplicaAboutPage() {
  const { dark, toggle, themeIcon } = useReplicaPageTheme();
  useReplicaPageEffects();

  useSeo({
    title: "About Us | Core Bolt —  AI Computing & Perception Systems",
    description:
      "Core Bolt is an industrial technology company manufacturing AI Edge Computers, Industrial PCs, and Perception Systems for robotics, machine vision, and industrial automation.",
    canonical: "https://www.core-bolt.com/about-us",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="replica-page" data-theme={dark ? "dark" : "light"}>
      <ReplicaPageNav
        dark={dark}
        currentPage="about"
        onToggleTheme={toggle}
        themeIcon={themeIcon}
      />

      <section className="pg-header" data-nav-tone="dark">
        <div
          className="pg-header-bg"
          style={{ backgroundImage: buildBackgroundImageValue(REPLICA_IMAGES.edgeComputer) }}
        />
        <div className="pg-header-vignette" />
        <div className="pg-header-inner">
          <div className="lbl">
            <span style={{ color: "var(--g-lt)" }}>About Core Bolt</span>
          </div>
          <h1 className="d1-dk">
            AI Computing
            <br />
            <strong style={{ color: "var(--g-lt)", fontWeight: 400 }}>
              Built for the Real World.
            </strong>
          </h1>
          <p>
            We are an  technology company manufacturing AI Edge Computers,
            PCs, and Perception Systems for robotics, machine vision, and
            automation applications.
          </p>
        </div>
      </section>

      <section className="about-intro">
        <div className="wrap">
          <div className="about-intro-grid">
            <div className="rv-l">
              <div className="lbl">
                Who We Are
              </div>
              <h2 className="d2">
                A Technology
                <br />
                <strong>Company at the Edge.</strong>
              </h2>
            </div>
        <div className="rv-r">
  <p>
    <strong>CORE BOLT</strong> is a technology company focused on{" "}
    <strong>
    Edge Al computing and perception solutions for autonomous systems and industrial automation.
    </strong>{" "}
     We design and develop Edge Al Computers,
Industrial Computing Platforms, and application-specific Perception Kits that enable real-time Al
processing, perception, and intelligent decision-making across robotics, autonomous machines,
machine vision, logistics, and industrial automation.
  </p>

  <br />
   

  <br />

  <p>
    Our solutions are designed for Robotics, Autonomous Mobile Robots
   (AMRs), Automated Guided Vehicles (AGVs), machine vision, and intelligent
    automation. By combining high-performance edge computing with perception technologies, <strong>CORE BOLT </strong> 
    enables reliable real-time processing, machine perception, autonomous operation, and intelligent decision-making in demanding real-world environments.
  </p>
</div>
          </div>
        </div>
      </section>

      <section className="products-sec" data-nav-tone="dark">
        <div className="wrap">
          <div className="rv" style={{ textAlign: "center" }}>
            <div
              className="lbl"
              style={{ color: "rgba(255,255,255,.3)", justifyContent: "center" }}
            >
              Our Products
            </div>
            <h2 className="d2-dk">
              What We <strong>Make</strong>
            </h2>
          </div>
          <div className="products-grid rv">
            <div className="prod-card">
              <div className="prod-card-ico">
                <svg viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="5" width="16" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M6 9h8M6 12h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M18 8h1M18 12h1M1 8H2M1 12H2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <h3>Edge Computers</h3>
              <p>
                Built on NVIDIA Jetson and Intel Core architectures for high-performance
                AI inference, computer vision, and multi-sensor fusion at the edge.
              </p>
            </div>
            <div className="prod-card">
              <div className="prod-card-ico">
                <svg viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M6 17h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M10 14v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <circle cx="10" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
              <h3>Industrial Panel Computers</h3>
              <p>
                All-in-one touchscreen computers with IP65-rated front bezels,
                purpose-built for HMI and SCADA applications on factory floors in 10&quot;
                to 24&quot; sizes.
              </p>
            </div>
          </div>
        </div>
      </section>



      <section className="industries-sec" data-nav-tone="dark">
        <div className="wrap">
          <div className="rv" style={{ textAlign: "center" }}>
            <div
              className="lbl"
              style={{ color: "rgba(255,255,255,.3)", justifyContent: "center" }}
            >
              Industries We Serve
            </div>
            <h2 className="d2-dk">
              Built for Real-World
              <br />
              <strong>Deployments</strong>
            </h2>
          </div>
          <div className="industries-grid rv">
            {INDUSTRIES.map((ind) => (
              <div key={ind.num} className="ind-card">
                <div className="ind-num">{ind.num}</div>
                <h3>{ind.title}</h3>
                <p>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mission-strip">
        <div className="wrap">
          <div className="mission-inner rv">
            <div className="lbl" style={{ justifyContent: "center" }}>
              Our Mission
            </div>
            <h2 className="d2">
              Delivering Integrated Solutions
              <br />
              <strong>for Edge AI & Automation.</strong>
            </h2>
            <p>
              CORE BOLT™&apos;s portfolio of{" "}
              AI Edge Computers, Industrial Panel Computers, 3D sensors, and Machine Vision cameras 

              supports the development of intelligent systems capable of processing data at
              the edge, improving operational efficiency, and enabling autonomous
              decision-making in industrial and commercial environments.
            </p>
            <p>
              We are committed to delivering validated, production-ready hardware that
              accelerates the deployment of intelligent autonomous systems across
              industries.
            </p>
            <div className="mission-cta">
              <Link href="/contact-us" className="btn btn-primary">
                Talk to Our Engineers
                <ArrowIcon />
              </Link>
              <Link
                href="/"
                className="btn btn-outline-dk"
                style={{ borderColor: "var(--bd)", color: "var(--ink2)" }}
              >
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ReplicaPageFooter />
    </div>
  );
}