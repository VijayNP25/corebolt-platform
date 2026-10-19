"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { categories, type Product } from "@/data/products";
import { getAllProductsForContactForm } from "@/lib/subcategory-products";
import {
  formatOrderInformationSelection,
  getOrderInformationOptions,
} from "@/lib/product-order-info";
import { ArrowIcon } from "@/components/replica-pages/replica-page-shared";
import { apiFetch } from "@/lib/api";
import "@/styles/replica-pages.css";
import "@/styles/contact-modal.css";

const TOPICS = [
  "General Enquiry",
  "Edge AI Computers",
  "Industrial Panel Computers",
  "Perception Kits",
  "Bulk / OEM Order",
  "Technical Support",
] as const;

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(5, "Please enter a contact number"),
  company: z.string().optional(),
  topic: z.string().optional(),
  products: z.array(z.string()).optional(),
  systemCore: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const CONTACT_DIALOG_CONTENT_CLASS = "contact-dialog-content";

interface ContactFormModalProps {
  title?: string;
  subtitle?: string;
  selectedProduct?: Product;
  action?: "quote" | "order";
  initialSystemCore?: string;
}

function ContactInfoPanel({ productCategory }: { productCategory?: string | null }) {
  return (
    <div className="modal-intro">
      <p className="body">
        {productCategory
          ? `Talk to our ${productCategory} specialists about specs, pricing, and lead times.`
          : "Share a few details and our team will get back within one business day."}
      </p>

      

     
    </div>
  );
}

export default function ContactFormModal({
  title,
  subtitle,
  selectedProduct,
  action = "quote",
  initialSystemCore,
}: ContactFormModalProps) {
  const { toast } = useToast();
  const allProducts = getAllProductsForContactForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      topic: action === "order" ? "Bulk / OEM Order" : "General Enquiry",
    },
  });

  const watchedProducts = watch("products", []);

  useEffect(() => {
    if (selectedProduct) {
      setValue("products", [selectedProduct.id]);
    }
  }, [selectedProduct, setValue]);

  useEffect(() => {
    setValue("systemCore", initialSystemCore ?? "");
  }, [initialSystemCore, setValue]);

  const productCategory = selectedProduct
    ? categories.find((c) => c.id === selectedProduct.category)?.name ||
    selectedProduct.category
    : null;

  const orderInformationOptions = selectedProduct
    ? getOrderInformationOptions(selectedProduct)
    : [];

  const getProductDisplayName = () => {
    if (selectedProduct && productCategory) {
      return `${selectedProduct.name} (${productCategory})`;
    }
    return selectedProduct?.name || "Product";
  };

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const productLabels =
        data.products
          ?.map((id) => allProducts.find((p) => p.value === id)?.label)
          .filter(Boolean)
          .join(", ") || "";

      const systemCoreSelection =
        data.systemCore && orderInformationOptions.length > 0
          ? formatOrderInformationSelection(
            data.systemCore,
            orderInformationOptions
          )
          : "";

      const messageParts = [
        data.topic && `Topic: ${data.topic}`,
        systemCoreSelection && `System Core: ${systemCoreSelection}`,
        productLabels && `Products: ${productLabels}`,
        data.message,
      ].filter(Boolean);

      await apiFetch("/enquiries", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          company: data.company || undefined,
          topic: data.topic || undefined,
          products: data.products?.length ? data.products : undefined,
          productIds: undefined,
          systemCore: systemCoreSelection || data.systemCore || undefined,
          orderInformation: systemCoreSelection || undefined,
          message: messageParts.join("\n\n") || undefined,
          action,
          productId: selectedProduct?.id,
          productSlug: selectedProduct?.id,
          productName: selectedProduct?.name,
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
    <div className="replica-page contact-modal" data-theme="light">
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
                  <label htmlFor="modal-name">Name</label>
                  <input
                    id="modal-name"
                    type="text"
                    placeholder="Your full name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="cfield-error">{errors.name.message}</p>
                  )}
                </div>
                <div className="cfield">
                  <label htmlFor="modal-email">Email</label>
                  <input
                    id="modal-email"
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
                  <label htmlFor="modal-company">Company</label>
                  <input
                    id="modal-company"
                    type="text"
                    placeholder="Company name"
                    {...register("company")}
                  />
                </div>
                <div className="cfield">
                  <label htmlFor="modal-mobile">Phone</label>
                  <input
                    id="modal-mobile"
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
                <label htmlFor="modal-topic">What can we help with?</label>
                <select id="modal-topic" {...register("topic")}>
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="cfield">
                <label>Interested Product</label>
                <MultiSelect
                  options={allProducts}
                  selected={watchedProducts || []}
                  onChange={(selected) => setValue("products", selected)}
                  placeholder={
                    selectedProduct ? getProductDisplayName() : "Select products (optional)"
                  }
                  className="w-full border-gray-300 bg-white"
                />
              </div>

              {orderInformationOptions.length > 0 && (
                <div className="cfield">
                  <label htmlFor="modal-system-core">
                    System Core{initialSystemCore ? "" : " (optional)"}
                  </label>
                  <select
                    id="modal-system-core"
                    {...register("systemCore")}
                    value={watch("systemCore") ?? ""}
                    onChange={(event) => setValue("systemCore", event.target.value)}
                  >
                    <option value="">Select a system core</option>
                    {orderInformationOptions.map((option) => (
                      <option key={option.modelNumber} value={option.modelNumber}>
                        {option.systemCore} ({option.modelNumber})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="cfield">
                <label htmlFor="modal-message">Message</label>
                <textarea
                  id="modal-message"
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
