import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroDeviceVisual from "@/components/home/hero-device-visual";

const HERO_VIDEO_SRC =
  "https://videos.pexels.com/video-files/8566657/8566657-hd_1920_1080_30fps.mp4";
const HERO_POSTER_SRC =
  "https://assets.core-bolt.com/website-assets/robotics_lab.png";

const heroStats = [
  { value: "275 TOPS", label: "Peak AI Performance" },
  { value: "IP65", label: "Rugged Enclosures" },
  { value: "Made in India", label: "OEM Manufacturing" },
  { value: "24/7", label: "Engineering Support" },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setVideoFailed(true);
      return;
    }

    const play = () => {
      video.play().catch(() => setVideoFailed(true));
    };

    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener("loadeddata", play, { once: true });
    }

    return () => video.removeEventListener("loadeddata", play);
  }, [videoFailed]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSolutions = () => {
    document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
  };

  const showVideo = videoReady && !videoFailed;

  return (
    <section
      id="hero"
      className="relative min-h-[min(100vh,900px)] flex flex-col overflow-hidden pt-[72px] bg-background"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(118,185,0,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(118,185,0,.06) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 0%, #000 30%, transparent 100%)",
        }}
      />
      <div
        className="absolute w-[800px] h-[600px] -top-44 left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle, rgba(118,185,0,.12) 0%, rgba(145,199,51,.06) 40%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0" aria-hidden="true">
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${showVideo ? "opacity-20" : "opacity-0"
            }`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={HERO_POSTER_SRC}
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <img
          src={HERO_POSTER_SRC}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${showVideo ? "opacity-0" : "opacity-20"
            }`}
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 rounded-full home-tag text-xs font-semibold px-3.5 py-1.5 mb-4 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full home-badge-dot" />
              Edge AI Perception Systems
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[3.1rem] font-black leading-[1.08] tracking-tight text-foreground mb-4">
              AI Computing & Perception for{" "}
              <span className="gradient-text">Autonomous Machines</span>
            </h1>
            <p className="sr-only">
              AI Computing & Perception Systems for Autonomous Machines and
              Automation. CoreBolt edge AI computers, industrial PCs,
              LiDAR sensors and depth cameras.
            </p>

            <p className="text-lg sm:text-xl text-primary font-semibold leading-relaxed max-w-lg mb-3">
              Built for Perception. Engineered for Intelligence.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mb-6">
              Edge AI computers, LiDAR, depth cameras, and ready-to-deploy
              integration kits for robotics and automation.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="home-btn-primary"
                onClick={scrollToSolutions}
              >
                Explore Solutions
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="home-btn-secondary"
                onClick={scrollToContact}
              >
                Talk to an Engineer
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <HeroDeviceVisual />
          </motion.div>
        </div>

        <motion.div
          className="mt-10 pt-8 border-t border-border/80 grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div className="text-xl sm:text-2xl font-black gradient-text leading-none">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-medium mt-1 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
