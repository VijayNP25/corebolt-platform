"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";
import { useState } from "react";
import {
  getLidarOptionsForPerceptionKit,
  getSensingCameraOptionsForPerceptionKit,
} from "@/lib/subcategory-products";
import { PerceptionKitProductSelect } from "@/components/perception-kit-product-select";
import { ArrowIcon } from "@/components/replica-pages/replica-page-shared";
import "@/styles/replica-pages.css";
import "@/styles/contact-modal.css";
import "@/styles/perception-kit-contact-modal.css";

const TOPICS = [
  "General Enquiry",
  "Edge AI Computers",
  "Industrial Panel Computers",
  "Perception Kits",
  "Bulk / OEM Order",
  "Technical Support",
] as const;

// Fixed edge computer for every Perception Kit — not user-selectable.
const FIXED_EDGE_COMPUTER_NAME = "HyperEdge 900SR";
const FIXED_EDGE_COMPUTER_QTY = 1;

const SENSING_CAMERA_MIN_QTY = 1;
const SENSING_CAMERA_MAX_QTY = 8;
const LIDAR_MIN_QTY = 1;
const LIDAR_MAX_QTY = 2;

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(5, "Please enter a contact number"),
  company: z.string().optional(),
  topic: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface PerceptionKitContactModalProps {
  title?: string;
  subtitle?: string;
  action?: "quote" | "order";
}

function clampQty(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

/**
 * Quote/contact modal used ONLY on the Perception Kit page (hero "Buy Now"
 * and footer "Contact Us" CTAs). This is a dedicated copy of the shared
 * ContactFormModal so that Perception Kit-specific fields (fixed Edge
 * Computer, Sensing Cameras picker + quantity, LiDARs picker + quantity)
 * never affect the contact modal used on any other page.
 */
export default function PerceptionKitContactModal({
  title,
  subtitle,
  action = "quote",
}: PerceptionKitContactModalProps) {
  const { toast } = useToast();

  const sensingCameraOptions = getSensingCameraOptionsForPerceptionKit();
  const lidarOptions = getLidarOptionsForPerceptionKit();

  const [sensingCameraId, setSensingCameraId] = useState("");
  const [sensingCameraQty, setSensingCameraQty] = useState(1);
  const [lidarId, setLidarId] = useState("");
  const [lidarQty, setLidarQty] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      topic: action === "order" ? "Bulk / OEM Order" : "Perception Kits",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const sensingCameraLabel = sensingCameraOptions.find(
        (option) => option.value === sensingCameraId,
      )?.label;
      const lidarLabel = lidarOptions.find(
        (option) => option.value === lidarId,
      )?.label;

      const componentLines = [
        `Edge Computer: ${FIXED_EDGE_COMPUTER_NAME} x${FIXED_EDGE_COMPUTER_QTY}`,
        sensingCameraLabel
          ? `Sensing Camera: ${sensingCameraLabel} x${sensingCameraQty}`
          : null,
        lidarLabel ? `LiDAR: ${lidarLabel} x${lidarQty}` : null,
      ].filter(Boolean);

      await apiFetch("/enquiries", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          company: data.company || undefined,
          topic: data.topic || "Perception Kits",
          products: [
            FIXED_EDGE_COMPUTER_NAME,
            sensingCameraId,
            lidarId,
          ].filter(Boolean),
          message: [
            data.topic && `Topic: ${data.topic}`,
            `Perception Kit Configuration:\n${componentLines.join("\n")}`,
            data.message,
          ]
            .filter(Boolean)
            .join("\n\n"),
          action,
        }),
      });

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within one business day.",
      });
    } catch {
      toast({
        title: "Failed to send",
        description: "Please try again or email sales@core-bolt.com directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="replica-page contact-modal pk-contact-modal" data-theme="light">
      {title && (
        <div className="contact-modal__header">
          <h2 className="contact-modal__title">{title}</h2>
          {subtitle && <p className="contact-modal__subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="contact-modal__body">
        <div className="contact-grid">
          <div>
            <p className="contact-modal__col-label">Your details</p>
            <form className="cform" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="cform-row">
                <div className="cfield">
                  <label htmlFor="pk-modal-name">Name</label>
                  <input
                    id="pk-modal-name"
                    type="text"
                    placeholder="Your full name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="cfield-error">{errors.name.message}</p>
                  )}
                </div>
                <div className="cfield">
                  <label htmlFor="pk-modal-email">Email</label>
                  <input
                    id="pk-modal-email"
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
                  <label htmlFor="pk-modal-company">Company</label>
                  <input
                    id="pk-modal-company"
                    type="text"
                    placeholder="Company name"
                    {...register("company")}
                  />
                </div>
                <div className="cfield">
                  <label htmlFor="pk-modal-mobile">Phone</label>
                  <input
                    id="pk-modal-mobile"
                    type="tel"
                    placeholder="+91 00000 00000"
                    {...register("mobile")}
                  />
                  {errors.mobile && (
                    <p className="cfield-error">{errors.mobile.message}</p>
                  )}
                </div>
              </div>

              <div className="cfield">
                <label htmlFor="pk-modal-topic">What can we help with?</label>
                <select id="pk-modal-topic" {...register("topic")}>
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="cfield">
                <label>Perception Kit Components</label>
                <div className="pk-components">
                  <div className="pk-component-card">
                    <div className="pk-component-head">
                      <span className="pk-component-name">Edge Computer</span>
                      <span className="pk-component-fixed-note">Fixed · Qty 1</span>
                    </div>
                    <div className="pk-component-fixed-value">
                      {FIXED_EDGE_COMPUTER_NAME}
                    </div>
                  </div>

                  <div className="pk-component-card">
                    <div className="pk-component-head">
                      <span className="pk-component-name">Sensing Cameras</span>
                    </div>
                    <div className="pk-component-row">
                      <div className="pk-select-wrap">
                        <label htmlFor="pk-sensing-camera">Camera model</label>
                        <PerceptionKitProductSelect
                          id="pk-sensing-camera"
                          options={sensingCameraOptions}
                          value={sensingCameraId}
                          onChange={setSensingCameraId}
                          placeholder="Type to search or scroll to select"
                        />
                      </div>
                      <div className="pk-qty-wrap">
                        <label htmlFor="pk-sensing-camera-qty">Quantity</label>
                        <input
                          id="pk-sensing-camera-qty"
                          type="number"
                          min={SENSING_CAMERA_MIN_QTY}
                          max={SENSING_CAMERA_MAX_QTY}
                          value={sensingCameraQty}
                          onChange={(event) =>
                            setSensingCameraQty(
                              clampQty(
                                Number(event.target.value),
                                SENSING_CAMERA_MIN_QTY,
                                SENSING_CAMERA_MAX_QTY,
                              ),
                            )
                          }
                        />
                        <p className="pk-qty-hint">
                          {SENSING_CAMERA_MIN_QTY}–{SENSING_CAMERA_MAX_QTY}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pk-component-card">
                    <div className="pk-component-head">
                      <span className="pk-component-name">LiDARs</span>
                    </div>
                    <div className="pk-component-row">
                      <div className="pk-select-wrap">
                        <label htmlFor="pk-lidar">LiDAR model</label>
                        <PerceptionKitProductSelect
                          id="pk-lidar"
                          options={lidarOptions}
                          value={lidarId}
                          onChange={setLidarId}
                          placeholder="Type to search or scroll to select"
                        />
                      </div>
                      <div className="pk-qty-wrap">
                        <label htmlFor="pk-lidar-qty">Quantity</label>
                        <input
                          id="pk-lidar-qty"
                          type="number"
                          min={LIDAR_MIN_QTY}
                          max={LIDAR_MAX_QTY}
                          value={lidarQty}
                          onChange={(event) =>
                            setLidarQty(
                              clampQty(
                                Number(event.target.value),
                                LIDAR_MIN_QTY,
                                LIDAR_MAX_QTY,
                              ),
                            )
                          }
                        />
                        <p className="pk-qty-hint">
                          {LIDAR_MIN_QTY}–{LIDAR_MAX_QTY}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cfield">
                <label htmlFor="pk-modal-message">Message</label>
                <textarea
                  id="pk-modal-message"
                  placeholder="Tell us about your application and requirements…"
                  {...register("message")}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Sending…"
                  : action === "order"
                    ? "Place Order"
                    : "Send Message"}
                <ArrowIcon />
              </button>

              <p className="cform-note">
                Messages are sent to{" "}
                <a href="mailto:sales@core-bolt.com">sales@core-bolt.com</a>. We
                typically respond within one business day.
              </p>
            </form>

            <div className="contact-info-section">
              <p className="contact-modal__col-label">Contact information</p>
              <div className="cinfo-card">
                <div className="cinfo-ico">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 4l6 4.5L14 4M2 4h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
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
                    <path
                      d="M3 2.5h2.5L7 6 5.5 7.5a8 8 0 005 5L12 11l3.5 1.5V15c0 .55-.45 1-1 1A12.5 12.5 0 013 3.5c0-.55.45-1 1-1z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
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
          </div>
        </div>
      </div>
    </div>
  );
}
