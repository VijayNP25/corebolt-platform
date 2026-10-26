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
import { useLocalCart } from "@/hooks/use-local-cart";
import { readLocalCart } from "@/lib/local-cart";
import { useToast } from "@/hooks/use-toast";
import { catalogApiSlug } from "@/hooks/use-catalog-offer";
import { formatMoney } from "@corebolt/shared";
import { useCurrency } from "@/hooks/use-currency";
import { convertInrToDisplay } from "@/lib/local-cart";
import "@/styles/xcard.css";

function productContactLabel(product: Product) {
  const category = categories.find((c) => c.id === product.category);
  return category ? `${product.name} (${category.name})` : product.name;
}

interface ProductCardProps {
  product: Product;
  index: number;
  /** Priced products: add to the cart and stay on the page. Unpriced cards keep Ask Price. */
  addToCart?: boolean;
  manufacturer?: string;
}

function confirmedPrice(product: Product): number | null {
  return typeof product.price === "number" && product.price > 0 ? product.price : null;
}

function CataloguePrice({
  amount,
  className,
  noteClassName,
}: {
  amount: number;
  className: string;
  noteClassName?: string;
}) {
  const { currency } = useCurrency();
  const display = convertInrToDisplay(amount.toFixed(2), currency);
  return (
    <>
      <span className={className}>{formatMoney(display, currency)}</span>
      {currency === "INR" && noteClassName ? (
        <span className={noteClassName}>(Excl. GST)</span>
      ) : null}
    </>
  );
}

function LidarCartControl({
  product,
  manufacturer,
  className,
}: {
  product: Product;
  manufacturer?: string;
  className?: string;
}) {
  const { cart, addItem, setQty, removeItem } = useLocalCart();
  const { toast } = useToast();
  const price = confirmedPrice(product);
  if (price == null) return null;

  const slug = catalogApiSlug(product.id);
  const line = cart.items.find((item) => item.productId === product.id || item.slug === slug);
  const latestLine = () =>
    readLocalCart().items.find((item) => item.productId === product.id || item.slug === slug);
  const stop = (event: { preventDefault: () => void; stopPropagation: () => void }) => {
    event.preventDefault();
    event.stopPropagation();
  };

  if (!line || line.quantity < 1) {
    return (
      <Button
        type="button"
        size="sm"
        className={className}
        onClick={(event) => {
          stop(event);
          try {
            addItem({
              productId: product.id,
              slug,
              name: product.name,
              imageUrl: product.image,
              priceInr: price.toFixed(2),
              shippingInr: "0",
              shippingUsd: "0",
              manufacturer,
              quantity: 1,
            });
            toast({ title: "Added to cart", description: product.name });
          } catch (error) {
            toast({
              title: "Could not add",
              description: error instanceof Error ? error.message : "Try again",
              variant: "destructive",
            });
          }
        }}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add to Cart
      </Button>
    );
  }

  return (
    <div className={`lidar-qty ${className ?? ""}`} role="group" aria-label={`Quantity of ${product.name}`}>
      <button
        type="button"
        aria-label={`Decrease quantity of ${product.name}`}
        onClick={(event) => {
          stop(event);
          const current = latestLine();
          if (!current) return;
          if (current.quantity <= 1) removeItem(current.productId);
          else setQty(current.productId, current.quantity - 1);
        }}
      >
        −
      </button>
      <span>{line.quantity}</span>
      <button
        type="button"
        aria-label={`Increase quantity of ${product.name}`}
        onClick={(event) => {
          stop(event);
          const current = latestLine();
          if (!current) return;
          setQty(current.productId, current.quantity + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

export default function ProductCard({
  product,
  index,
  addToCart = false,
  manufacturer,
}: ProductCardProps) {
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
              <CataloguePrice
                amount={product.price}
                className=""
                noteClassName="text-[11px] font-normal"
              />
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
          {addToCart && confirmedPrice(product) != null && (
            <LidarCartControl
              product={product}
              manufacturer={manufacturer}
              className="replica-btn-dark h-9 shrink-0 font-semibold"
            />
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
            usesSimplePrice && !addToCart ? (
              <div className="flex items-center justify-between px-1 pt-2">
                <CataloguePrice
                  amount={product.price}
                  className="text-base font-semibold text-primary whitespace-nowrap"
                />
                <span className="text-sm text-black">View <ChevronRight className="inline h-4 w-4" /></span>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                {addToCart ? (
                  <LidarCartControl
                    product={product}
                    manufacturer={manufacturer}
                    className="replica-btn-dark h-9 shrink-0 font-semibold"
                  />
                ) : (
                <Dialog
                  open={isContactModalOpen}
                  onOpenChange={setIsContactModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="replica-btn-dark h-9 shrink-0 font-semibold"
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
                )}
                <div className="min-w-0 text-right leading-tight">
                  <CataloguePrice
                    amount={product.price}
                    className="block text-base font-bold text-black"
                    noteClassName="mt-0.5 block text-[10px] text-gray-500 font-medium uppercase tracking-wide"
                  />
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
