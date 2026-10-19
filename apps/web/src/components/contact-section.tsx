"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import SectionEyebrow from "@/components/home/section-eyebrow";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(1, "mobile name is required"),
  company: z.string().min(1, "company name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted" }),
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactSectionProps {
  /** Dark theme for homepage continuity */
  theme?: "light" | "dark";
}

const ContactSection = forwardRef<HTMLElement, ContactSectionProps>(
  ({ theme = "light" }, ref) => {
  const dark = theme === "dark";
  const controls = useAnimation();
  const inViewRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(inViewRef, { once: true, amount: 0.1 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      await apiFetch("/enquiries", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          company: data.company,
          message: data.message,
          action: "quote",
        }),
      });

      setIsSubmitted(true);
      toast({
        title: "Message Sent Successfully!",
        description:
          "Thank you for reaching out. Our team will contact you shortly.",
      });
    } catch (error) {
      console.error("Email error:", error);
      toast({
        title: "Message could not be sent",
        description: "Please try again later or contact us directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors",
      dark
        ? "bg-background border-border text-foreground placeholder:text-muted-foreground"
        : "text-black border-neutral-300",
      hasError && "border-red-500"
    );

  const labelClass = cn(
    "block text-sm font-medium mb-1",
    dark ? "text-muted-foreground" : "text-neutral-700"
  );

  return (
    <section
      id="contact"
      ref={(node) => {
        // @ts-ignore - forwarded ref can be a function
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        inViewRef.current = node as any;
      }}
      className={cn(
        "py-16 md:py-24 section-fade-in relative",
        dark ? "bg-background" : "bg-white"
      )}
    >
      {dark && (
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(118,185,0,0.08), transparent)",
          }}
          aria-hidden
        />
      )}
      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-14"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          {dark && <SectionEyebrow centered>Contact</SectionEyebrow>}
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              dark ? "gradient-text" : "text-black"
            )}
          >
            Contact Us
          </h2>
          <div
            className={cn(
              "w-20 h-1 mx-auto mb-6",
              dark ? "bg-primary" : "bg-secondary"
            )}
          />
          <p
            className={cn(
              "text-lg max-w-2xl mx-auto",
              dark ? "text-muted-foreground" : "text-black"
            )}
          >
            Configure your integration kit or discuss Edge AI hardware with our
            engineering team.
          </p>
        </motion.div>

        <motion.div
          className={cn(
            "max-w-4xl mx-auto rounded-2xl overflow-hidden border shadow-xl",
            dark
              ? "bg-[#171b25] border-border shadow-black/40"
              : "bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.1)]"
          )}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
            <motion.div
              className={cn(
                "p-6 md:p-8 md:col-span-2",
                dark
                  ? "bg-primary/15 border-r border-border text-foreground"
                  : "bg-primary text-white"
              )}
              variants={itemVariants}
            >
              <h3
                className={cn(
                  "text-2xl font-bold mb-6",
                  dark ? "text-primary" : "text-black"
                )}
              >
                Get in Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin
                      className={cn(
                        "h-5 w-5",
                        dark ? "text-primary" : "text-secondary"
                      )}
                    />
                  </div>
                  <div className="ml-4">
                    <h4
                      className={cn(
                        "font-bold mb-1",
                        dark ? "text-foreground" : "text-black"
                      )}
                    >
                      Our Location
                    </h4>
                    <p className={dark ? "text-muted-foreground" : "text-black"}>
                      Hyderabad &amp; Kakinada, India
                      <br />
                      Shenzhen, China
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Mail
                      className={cn(
                        "h-5 w-5",
                        dark ? "text-primary" : "text-secondary"
                      )}
                    />
                  </div>
                  <div className="ml-4">
                    <h4
                      className={cn(
                        "font-bold mb-1",
                        dark ? "text-foreground" : "text-black"
                      )}
                    >
                      Email Us
                    </h4>
                    <p className={dark ? "text-muted-foreground" : "text-black"}>
                      sales@core-bolt.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Phone
                      className={cn(
                        "h-5 w-5",
                        dark ? "text-primary" : "text-secondary"
                      )}
                    />
                  </div>
                  <div className="ml-4">
                    <h4
                      className={cn(
                        "font-bold mb-1",
                        dark ? "text-foreground" : "text-black"
                      )}
                    >
                      Call Us
                    </h4>
                    <p className={dark ? "text-muted-foreground" : "text-black"}>
                      +91 98490 35858
                    </p>
                    <p className={dark ? "text-muted-foreground" : "text-black"}>
                      +91 96526 59992
                    </p>
                  </div>
                </div>
              </div>

              {/* <div className="mt-8">
                <h4 className="font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div> */}
            </motion.div>

            <motion.div
              className="p-6 md:p-8 md:col-span-3"
              variants={itemVariants}
            >
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-primary mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-neutral-700">
                    Thank you for reaching out. Our team will contact you
                    shortly.
                  </p>
                </div>
              ) : (
                <form
                  ref={formRef}
                  className="space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className={inputClass(!!errors.name)}
                        placeholder="Your Name"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className={inputClass(!!errors.email)}
                        placeholder="Your Email"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className={labelClass}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      className={inputClass(!!errors.company)}
                      placeholder="Your Company"
                      {...register("company")}
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="mobile" className={labelClass}>
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      id="mobile"
                      className={inputClass(!!errors.mobile)}
                      placeholder="Your Mobile Number"
                      {...register("mobile")}
                    />
                    {errors.mobile && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Tell Us About Your Project
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className={inputClass(!!errors.message)}
                      placeholder="Share details about your project, including any specific requirements, your budget, and any other relevant information."
                      {...register("message")}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="consent"
                      className={cn(
                        "h-4 w-4 rounded focus:ring-primary",
                        dark
                          ? "border-border text-primary"
                          : "text-secondary focus:ring-secondary border-neutral-300",
                        errors.consent && "border-red-500"
                      )}
                      {...register("consent")}
                    />
                    <label
                      htmlFor="consent"
                      className={cn(
                        "ml-2 block text-sm",
                        dark ? "text-muted-foreground" : "text-neutral-700"
                      )}
                    >
                      I consent to CORE BOLT processing my information for the
                      purpose of contacting me.
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.consent.message}
                    </p>
                  )}

                  <div>
                    <button
                      type="submit"
                      className={cn(
                        "w-full font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center",
                        dark
                          ? "bg-primary hover:bg-secondary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/90 text-white"
                      )}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Submit Inquiry"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
  }
);

ContactSection.displayName = "ContactSection";

export default ContactSection;
