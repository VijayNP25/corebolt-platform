"use client";

import { ArrowRight, Mail } from "lucide-react";
import SectionEyebrow from "@/components/home/section-eyebrow";

export default function ContactCtaBanner() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="pt-16 md:pt-20 pb-8 md:pb-10 bg-background"
      aria-label="Contact call to action"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl home-cta-panel px-6 py-14 md:px-16 text-center relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(118,185,0,.12), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <SectionEyebrow centered>Get Started</SectionEyebrow>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3.5">
              Ready to build smarter systems?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-9 max-w-xl mx-auto">
              Talk to our engineers about the right Edge AI platform and
              perception kit for your application.
            </p>
            <div className="flex flex-wrap gap-3.5 justify-center">
              <a href="mailto:sales@core-bolt.com" className="home-btn-primary">
                <Mail className="h-4 w-4" />
                Contact Sales
              </a>
              <button
                type="button"
                className="home-btn-secondary"
                onClick={scrollToContact}
              >
                Open Contact Form
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
