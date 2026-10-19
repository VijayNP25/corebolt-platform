"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ChevronRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/lib/wouter-compat";
import { Product, categories } from "@/data/products";
import CdnImage from "@/components/cdn-image";
import { buildProductPath, locateProduct } from "@/lib/subcategory-products";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ContactFormModal, {
  CONTACT_DIALOG_CONTENT_CLASS,
} from "@/components/contact-form-modal";
import "@/styles/xcard.css";

function productContactLabel(product: Product) {
  const category = categories.find((c) => c.id === product.category);
  return category ? `${product.name} (${category.name})` : product.name;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const usesSimplePrice = [
    "livox-mid-360S-lidar-sensor",
    "robosense-airy-96-beam-lidar-sensor",
    "robosense-ruby-plus-lidar-sensor",
  ].includes(product.id);

  // Phone layout: the grey line under the name is the product's category
  // (hidden on tablet/desktop).
  const loc = locateProduct(product.id);
  const mTagline =
    loc?.category.name ??
    categories.find((c) => c.id === product.category)?.name ??
    "";

  // Smart truncation - find last space before 100 chars to avoid cutting words
  const truncateLength = 300;
  const shouldTruncate = (product?.description?.length ?? 0) > truncateLength;

  let displayText = product?.description || "";
  if (shouldTruncate && !showFullDescription && product?.description) {
    // Find the last space before the truncate length to avoid cutting words
    const truncated = product.description.substring(0, truncateLength);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    // If we found a space reasonably close to the truncate point, use it
    if (lastSpaceIndex > truncateLength - 30 && lastSpaceIndex > 0) {
      displayText = truncated.substring(0, lastSpaceIndex) + "...";
    } else {
      displayText = truncated.trim() + "...";
    }
  }

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="mx-card mx-card--product pcard relative h-full flex flex-col border border-[rgba(0,0,0,0.09)] hover:border-[rgba(118,185,0,0.3)] bg-white group overflow-hidden rounded-none shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
        {/* Clickable Image - navigates to product page */}
        <Link
          href={buildProductPath(product)}
        >
          <div className="mx-media relative cursor-pointer">
            <CdnImage
              src={product.image}
              alt={product.name}
              className="pcard-img w-full h-64 object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>

        {/* Title + Description */}
        <CardHeader className="mx-body flex flex-1 flex-col pt-4 pb-5">
          <div className="flex justify-between items-center gap-2">
            <Link
              href={buildProductPath(product)}
            >
              <CardTitle className="mx-title pcard-title text-black transition-colors duration-300 text-xl cursor-pointer hover:text-black">
                {product.name}
              </CardTitle>
            </Link>
          </div>
          {mTagline && <p className="mx-only mx-tag">{mTagline}</p>}

          {product.description && (
            <CardDescription className="mx-desc text-black text-sm mt-3 leading-relaxed">
              {displayText}
              {shouldTruncate && (
                <button
                  className="ml-1 text-primary hover:underline font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullDescription((prev) => !prev);
                  }}
                >
                  {showFullDescription ? " Show less" : " Read more"}
                </button>
              )}
            </CardDescription>
          )}
        </CardHeader>

        {/* Phone layout actions (desktop keeps the row below) */}
        <div className="mx-only mx-actions">
          {product.price ? (
            <span className="mx-cost">
              ₹{product.price.toLocaleString("en-IN")}
              <small>Excl. GST</small>
            </span>
          ) : (
            <button
              type="button"
              className="mx-cost mx-cost--ask"
              onClick={() => setIsContactModalOpen(true)}
            >
              Ask for price
            </button>
          )}
          <Link href={buildProductPath(product)} className="mx-pill">
            Know More
            <span className="mx-pill-ico" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </Link>
        </div>

        {/* CTAs */}
        <CardContent className="mx-desktop-actions mt-auto pt-0 pb-4">
          {product.price ? (
            usesSimplePrice ? (
              <div className="flex items-center justify-between px-1 pt-2">
                <span className="text-base font-semibold text-primary whitespace-nowrap">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-black">View <ChevronRight className="inline h-4 w-4" /></span>
              </div>
            ) : (
              <div className="flex gap-2 items-stretch">
                <Dialog
                  open={isContactModalOpen}
                  onOpenChange={setIsContactModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="replica-btn-dark w-[calc(45%-0.25rem)] h-9 flex-shrink-0 font-semibold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className={CONTACT_DIALOG_CONTENT_CLASS}>
                    <ContactFormModal
                      title={`Place Order for ${productContactLabel(product)}`}
                      subtitle="Complete your order details and our team will process it."
                      selectedProduct={product}
                      action="order"
                    />
                  </DialogContent>
                </Dialog>
                <div className="flex w-[calc(55%-0.25rem)] items-stretch">
                  <div className="relative w-full min-h-9 flex flex-nowrap items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10">
                    <span className="text-xl font-bold text-black drop-shadow-sm whitespace-nowrap">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide whitespace-nowrap shrink-0">
                      (Excl. GST)
                    </span>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="flex gap-2 items-stretch">
              <Dialog
                open={isContactModalOpen}
                onOpenChange={setIsContactModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="replica-btn-dark w-[calc(50%-0.25rem)] h-9 flex-shrink-0 font-semibold rounded-[5px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ask Price
                  </Button>
                </DialogTrigger>
                <DialogContent className={CONTACT_DIALOG_CONTENT_CLASS}>
                  <ContactFormModal
                    title={`Get a Quote for ${productContactLabel(product)}`}
                    subtitle="Share a few details and our team will get back within one business day."
                    selectedProduct={product}
                    action="quote"
                  />
                </DialogContent>
              </Dialog>
              <Link
                href={buildProductPath(product)}
                className="w-[calc(50%-0.25rem)] flex items-stretch"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-9 bg-white text-black border-primary/40 hover:bg-white hover:text-black rounded-[5px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  Know more
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
