"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/lib/wouter-compat";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import CoreBoltLogo from "@/components/core-bolt-logo";
import {
  COMPUTING_LINKS,
  VISION_LINKS,
} from "@/lib/replica-product-routes";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/core.bolt/",
    Icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/COREBOLTcom/",
    Icon: Facebook,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/corebolt/",
    Icon: Linkedin,
  },
];

/**
 * Footer link columns are <details> elements: always open (and not
 * clickable) on tablet/desktop, collapsible accordions with a chevron on
 * phones (<=768px). Server HTML renders them open, so crawlers and no-JS
 * visitors always see every link.
 */
function useFooterAccordions() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => {
      root
        .querySelectorAll<HTMLDetailsElement>("details.footer-col")
        .forEach((d) => {
          d.open = !mq.matches;
        });
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return ref;
}

export default function ReplicaFooter() {
  const gridRef = useFooterAccordions();
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid" ref={gridRef}>
          <div className="footer-brand">
            <div className="footer-logo">
              <CoreBoltLogo variant="footer" />
            </div>
            <p>
               Edge AI computers and Perception systems for the next
              generation of autonomous machines.
            </p>
            <div className="footer-social" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit CORE BOLT on ${label}`}
                  className="footer-social-link"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
          <details className="footer-col" open>
            <summary className="footer-col-hd">Products</summary>
            <ul className="footer-links">
              <li>
                <Link href={COMPUTING_LINKS.edgeComputers}>Edge AI Computers</Link>
              </li>
              <li>
                <Link href={COMPUTING_LINKS.panelPc}>Industrial Panel Computers</Link>
              </li>
              <li>
               <Link href="/perception-kits">Perception Kits</Link>
              </li>
            </ul>
          </details>
          <details className="footer-col" open>
            <summary className="footer-col-hd">Vision</summary>
            <ul className="footer-links">
              <li>
                <Link href={VISION_LINKS.lidar}>3D LiDAR Sensors</Link>
              </li>
              <li>
                <Link href={VISION_LINKS.cameras}>GMSL Cameras</Link>
              </li>
              <li>
                <Link href={VISION_LINKS.cameras}>Intel Depth Cameras</Link>
              </li>
            </ul>
          </details>
          <details className="footer-col" open>
            <summary className="footer-col-hd">Company</summary>
            <ul className="footer-links">
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/#solutions">Solutions</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </details>
           <details className="footer-col" open>
            <summary className="footer-col-hd">Address</summary>
            <ul className="footer-links">
              <li>
                <Link href="/about-us">Kakinada,India</Link>
              </li>
              <li>
                <Link href="/#solutions">Hyderabad, India</Link>
              </li>
              <li>
                <Link href="/contact-us">Shenzhen, China</Link>
              </li>
            </ul>
          </details>
          
          
          
        </div>
        <div className="footer-bot">
          <p>© 2026 CORE BOLT™. All rights reserved.</p>
          <div className="footer-legal">
            <Link href="/shipping-policy">Shipping</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/return-warranty-policy">Terms</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}