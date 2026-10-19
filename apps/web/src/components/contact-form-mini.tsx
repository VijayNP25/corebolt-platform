"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";
import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { categories } from "@/data/products";
import { getAllProductsForContactForm } from "@/lib/subcategory-products";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(5, "Please enter a contact number"),
  company: z.string().optional(),
  products: z.array(z.string()).optional(),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactFormMini() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Get all products from all categories
  const allProducts = getAllProductsForContactForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const watchedProducts = watch("products", []);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiFetch("/enquiries", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          company: data.company || undefined,
          products: data.products,
          message: data.message || undefined,
          action: "quote",
        }),
      });
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you shortly.",
      });
    } catch (err) {
      toast({
        title: "Failed to send",
        description: "Please try again or contact directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-6 bg-white rounded-xl shadow">
        <h3 className="text-lg font-semibold text-primary mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-muted-foreground text-sm">
          Thank you for contacting us. We'll respond shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-black p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-5 border rounded-lg max-w-[450px] w-full"
    >
      <h3 className="text-2xl font-bold text-white mb-1 text-center">
        Contact Us
      </h3>

      <div className="space-y-3 lg:space-y-4 text-white">
        <input
          {...register("name")}
          placeholder="Your Name"
          aria-label="Your Name"
          className={`w-full rounded-md px-4 py-3 placeholder:text-gray-500 text-white bg-[#171b25] transition ${errors.name ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}

        <input
          {...register("email")}
          placeholder="Email Address"
          aria-label="Email Address"
          type="email"
          className={`w-full rounded-md px-4 py-3  placeholder:text-gray-500 text-white bg-[#171b25] transition ${errors.email ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <input
          {...register("company")}
          placeholder="Company (Optional)"
          aria-label="Company (Optional)"
          className="w-full rounded-md px-4 py-3 placeholder:text-gray-500 text-white bg-[#171b25] transition border-gray-300"
        />

        <input
          {...register("mobile")}
          placeholder="Mobile Number"
          aria-label="Mobile Number"
          className={`w-full rounded-md px-4 py-3  placeholder:text-gray-500 text-white bg-[#171b25] transition ${errors.mobile ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.mobile && (
          <p className="text-sm text-red-500">{errors.mobile.message}</p>
        )}

        <div>
          <MultiSelect
            options={allProducts}
            selected={watchedProducts || []}
            onChange={(selected) => setValue("products", selected)}
            placeholder="Select products (Optional)"
            className="w-full border-gray-300"
          />
        </div>

        <textarea
          {...register("message")}
          rows={2}
          placeholder="Message (Optional)"
          aria-label="Message (Optional)"
          className="w-full rounded-md px-4 py-3 placeholder:text-gray-500 text-white bg-[#171b25] transition border-gray-300"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="block mx-auto w-full sm:w-auto px-6 py-3 justify-center bg-[#171b25] hover:bg-[#68b300] text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Get Quote"}
      </button>
    </form>
  );
}
