"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type L from "leaflet";
// leaflet's CSS is only needed on this page (for the embedded office map),
// but a static `import` here would still get bundled into the site-wide
// CSS file that ships on every route. Loading it dynamically alongside the
// leaflet JS module (below) keeps it out of the global stylesheet.
import "@/styles/replica-pages.css";
import { REPLICA_IMAGES } from "@/lib/replica-home-images";
import { buildBackgroundImageValue } from "@/lib/webp-image";
import { useSeo } from "@/lib/seo";
import { apiFetch } from "@/lib/api";
import {
  ArrowIcon,
  ReplicaPageFooter,
  ReplicaPageNav,
  useReplicaPageEffects,
  useReplicaPageTheme,
} from "./replica-page-shared";

const TOPICS = [
  "General Enquiry",
  "Edge AI Computers",
  "Industrial Panel Computers",
  "Perception Kits",
  "Bulk / OEM Order",
  "Technical Support",
] as const;

const OFFICES = [
  {
    title: "Headquarters",
    city: "Kakinada, India",
    address:
      "D/no. 69-3B-12, Somanath Heights, Kakinada, 533003, Andhra Pradesh, India.",
    phoneLabel: "+91 98490 35858",
    phoneHref: "+919849035858",
    coordinates: [16.9891, 82.2475] as L.LatLngTuple,
  },
  {
    title: "Sales Office 1",
    city: "Hyderabad, India",
    address:
      "D/no. 18-78/35/108, Madhapur, Hyderabad, 500098, Telangana, India.",
    phoneLabel: "+91 81435 29595",
    phoneHref: "+918143529595",
    coordinates: [17.4483, 78.3915] as L.LatLngTuple,
  },
  {
    title: "Sales Office 2",
    city: "Shenzhen, China",
    address:
      "Room 1401, Block B, Time Valley Creative 2nd Bldg, No. 39 Xishi Road, Hewan Community, Matian Street, Guangming, Shenzhen.",
    phoneLabel: "+86 130 0411 8792",
    phoneHref: "+8613004118792",
    coordinates: [22.7284, 113.991] as L.LatLngTuple,
  },
] as const;

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  phone: z.string().min(5, "Phone is required"),
  topic: z.string().min(1, "Please select a topic"),
  message: z.string().min(10, "Please include a brief message"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ReplicaContactPage() {
  const { dark, toggle, themeIcon } = useReplicaPageTheme();
  useReplicaPageEffects();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const officeMapRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: TOPICS[0] },
  });

  useSeo({
    title: "Contact Us | Core Bolt — Edge AI Computers & Perception Systems",
    description:
      "Get in touch with Core Bolt. Talk to our engineers about Edge AI computers, industrial PCs, and Perception Kits for robotics and automation.",
    canonical: "https://www.core-bolt.com/contact-us",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!officeMapRef.current) return;

    let map: L.Map | undefined;
    let cancelled = false;
    let resizeTimer: number | undefined;

    Promise.all([import("leaflet"), import("leaflet/dist/leaflet.css")]).then(
      ([{ default: L }]) => {
      // Keep leaflet.css BEFORE the site stylesheet, as it was when it shipped
      // in the vendor bundle: the site's rules must keep winning ties (e.g. the
      // colour of the map attribution links). Vite appends lazily loaded CSS
      // at the end of <head>, so move it up.
      const leafletCss = document.querySelector<HTMLLinkElement>(
        'link[rel="stylesheet"][href*="/assets/leaflet"]'
      );
      const siteCss = document.querySelector<HTMLLinkElement>(
        'link[rel="stylesheet"][href*="/assets/index"]'
      );
      if (
        leafletCss &&
        siteCss &&
        siteCss.compareDocumentPosition(leafletCss) & Node.DOCUMENT_POSITION_FOLLOWING
      ) {
        siteCss.before(leafletCss);
      }
      if (cancelled || !officeMapRef.current) return;

      map = L.map(officeMapRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false,
        dragging: false,
      });

      // OpenStreetMap tiles (free, no API key; the attribution must stay visible).
      // CARTO basemaps now need an API key and show "API KEY REQUIRED" without one.
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const markerIcon = L.divIcon({
        className: "office-map-marker",
        html: '<span class="office-map-marker-pin"></span>',
        iconSize: [20, 24],
        iconAnchor: [10, 24],
        tooltipAnchor: [0, -22],
      });

      const bounds = L.latLngBounds([]);
      OFFICES.forEach((office) => {
        L.marker(office.coordinates, { icon: markerIcon })
          .addTo(map!)
          .bindTooltip(office.city, {
            permanent: true,
            direction: "top",
            offset: [0, -5],
            className: "office-map-label",
          });
        bounds.extend(office.coordinates);
      });

      map.fitBounds(bounds, { padding: [48, 48] });
      resizeTimer = window.setTimeout(() => map?.invalidateSize(), 100);
      }
    );

    return () => {
      cancelled = true;
      if (resizeTimer) window.clearTimeout(resizeTimer);
      map?.remove();
    };
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitting(true);
    try {
      await apiFetch("/enquiries", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          mobile: data.phone,
          company: data.company || undefined,
          topic: data.topic,
          message: data.message,
          action: "quote",
        }),
      });
      setSubmitted(true);
    } catch {
      const subject = `${data.topic} — Enquiry from ${data.name}`;
      const body = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.company && `Company: ${data.company}`,
        `Phone: ${data.phone}`,
        `Topic: ${data.topic}`,
        "",
        data.message,
      ]
        .filter(Boolean)
        .join("\n");
      window.location.href = `mailto:sales@core-bolt.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="replica-page" data-theme={dark ? "dark" : "light"}>
      <ReplicaPageNav
        dark={dark}
        currentPage="contact"
        onToggleTheme={toggle}
        themeIcon={themeIcon}
      />

      <section className="pg-header pg-header--contact" data-nav-tone="dark">
        <div
          className="pg-header-bg"
          style={{ backgroundImage: buildBackgroundImageValue(REPLICA_IMAGES.edgeComputer) }}
        />
        <div className="pg-header-vignette" />
        <div className="pg-header-inner">
          <div className="lbl">
            <span>Get in Touch</span>
          </div>
          <h1 className="d1-dk">
            Let&apos;s Talk
            <br />
            <strong style={{ fontWeight: 400, color: "var(--g-lt)" }}>Hardware.</strong>
          </h1>
          <p>
            Whether you&apos;re scoping a new robotics platform or need a perception kit
            validated for your application - our engineering team is ready to help. Reach
            out and we&apos;ll respond within one business day.
          </p>
        </div>
      </section>

      <section className="contact-sec">
        <div className="wrap">
          <div className="contact-grid">
            <div className="rv-l">
              <div className="lbl">
                Contact Information
              </div>
              <h2 className="d2" style={{ marginBottom: 16, fontSize: "clamp(26px,2.8vw,38px)", fontWeight: "400" }}>
                Reach Our
                <br />
                <strong>Engineering Team</strong>
              </h2>
              <p className="body" style={{ marginBottom: 28 }}>
                Pick whichever channel works best  email, phone, or the form. For
                technical evaluations and bulk orders, the form gets you to the right
                engineer fastest.
              </p>

              <div className="cinfo-card">
                <div className="cinfo-ico">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M2 4l6 4.5L14 4M2 4h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>
                    <a href="mailto:sales@core-bolt.com">sales@core-bolt.com</a>
                  </p>
                </div>
              </div>

              <div className="cinfo-card">
                <div className="cinfo-ico">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M3 2.5h2.5L7 6 5.5 7.5a8 8 0 005 5L12 11l3.5 1.5V15c0 .55-.45 1-1 1A12.5 12.5 0 013 3.5c0-.55.45-1 1-1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3>Sales &amp; Support</h3>
                  <p style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                    <a href="tel:+919849035858">+91 9849035858</a>
                    <span style={{ color: "var(--ink4)" }}>|</span>
                    <a href="tel:+918143529595">+91 8143529595</a>
                  </p>
                  <p style={{ marginTop: 6 }}>Mon–Sat, 9:30 AM – 6:30 PM IST</p>
                </div>
              </div>

            </div>

            <form className="cform rv-r" onSubmit={handleSubmit(onSubmit)} noValidate>
              {submitted && (
                <div className="cform-success">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M5.5 9.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>
                    Thank you — your message has been sent. We&apos;ll respond within one
                    business day.
                  </span>
                </div>
              )}

              {!submitted && (
                <>
                  <div className="cform-row">
                    <div className="cfield">
                      <label htmlFor="cf-name">Name</label>
                      <input
                        id="cf-name"
                        type="text"
                        placeholder="Your full name"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="cfield-error">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="cfield">
                      <label htmlFor="cf-email">Email</label>
                      <input
                        id="cf-email"
                        type="email"
                        placeholder="you@company.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="cfield-error">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="cform-row">
                    <div className="cfield">
                      <label htmlFor="cf-company">Company</label>
                      <input
                        id="cf-company"
                        type="text"
                        placeholder="Company name"
                        {...register("company")}
                      />
                    </div>
                    <div className="cfield">
                      <label htmlFor="cf-phone">Phone</label>
                      <input
                        id="cf-phone"
                        type="tel"
                        placeholder="+91 00000 00000"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="cfield-error">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="cfield">
                    <label htmlFor="cf-topic">What can we help with?</label>
                    <select id="cf-topic" {...register("topic")}>
                      {TOPICS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.topic && (
                      <p className="cfield-error">{errors.topic.message}</p>
                    )}
                  </div>
                  <div className="cfield">
                    <label htmlFor="cf-message">Message</label>
                    <textarea
                      id="cf-message"
                      placeholder="Tell us about your application and requirements…"
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="cfield-error">{errors.message.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                    disabled={submitting}
                  >
                    {submitting ? "Sending…" : "Send Message"}
                    <ArrowIcon />
                  </button>
                  <p className="cform-note">
                    Messages are sent to{" "}
                    <a href="mailto:sales@core-bolt.com">sales@core-bolt.com</a>. We
                    typically respond within one business day.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="office-locations" data-nav-tone="light">
        <div className="wrap">
          <div className="office-locations-grid">
            {OFFICES.map((office) => (
              <article className="office-location-card" key={office.title}>
                <div className="office-location-content">
                  <span className="office-location-label">{office.title}</span>
                  <p>{office.address}</p>
                  <h3>{office.city}</h3>

                  <div className="office-location-phone">
                    <span>Contact number:</span>{" "}
                    <a href={`tel:${office.phoneHref}`}>{office.phoneLabel}</a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="contact-map-shell">
            {/* data-prerender-empty: Leaflet fills this div at runtime; the
                prerender saves it empty so hydration matches (see prerender.mjs). */}
            <div
              ref={officeMapRef}
              className="contact-leaflet-map"
              data-prerender-empty=""
              aria-label="Map showing CORE BOLT offices in Kakinada, Hyderabad, and Shenzhen"
            />
          </div>
        </div>
      </section>

      <ReplicaPageFooter />
    </div>
  );
}
