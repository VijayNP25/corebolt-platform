import { useState } from "react";
import { Link, useLocation } from "@/lib/wouter-compat";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import CdnImage from "@/components/cdn-image";
import "@/styles/xcard.css";
import { ArrowUpRight } from "lucide-react";

const DESCRIPTION_PREVIEW_LENGTH = 200;

function truncateDescription(
  text: string,
  maxLength = DESCRIPTION_PREVIEW_LENGTH
): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export interface SelectionGridCardProps {
  href: string;
  title: string;
  description: string;
  image?: string;
  productCount: number;
  /** Optional brand/platform badge shown above the title (e.g. "NVIDIA", "Intel"). */
  brand?: string;
  /** Phone only: grey line under the title (the category name). */
  tagline?: string;
  index?: number;
}

function getBrandBadgeColor(brand: string): string {
  switch (brand.toLowerCase()) {
    case "nvidia":
      return "#76B900";
    case "intel":
      return "#0071C5";
    default:
      return "#444";
  }
}

export default function SelectionGridCard({
  href,
  title,
  description,
  image,
  productCount,
  brand,
  tagline,
  index = 0,
}: SelectionGridCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [, setLocation] = useLocation();
  const canExpand = description.length > DESCRIPTION_PREVIEW_LENGTH;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={href}>
        <div className="mx-card bg-white rounded-none border border-[rgba(0,0,0,0.09)] hover:border-[rgba(118,185,0,0.3)] transition-all duration-300 group h-full flex flex-col cursor-pointer overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
          {image && (
            <motion.div
              className="mx-media relative h-48 overflow-hidden bg-gray-100"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <CdnImage
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="mx-notch absolute top-4 right-4">
                <Badge className="replica-count-badge">
                  {`${productCount} ${productCount === 1 ? "Product" : "Products"}`}
                </Badge>
              </div>
            </motion.div>
          )}

          <motion.div className="mx-body p-6 flex-1 flex flex-col" whileHover={{ y: -2 }}>
            {brand && (
              <span
                className="mx-brand inline-block w-fit text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded mb-3"
                style={{ background: getBrandBadgeColor(brand), color: "#fff" }}
              >
                {brand}
              </span>
            )}
            <h3 className="mx-title text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-4">
              {title}
            </h3>
            {tagline && <span className="mx-only mx-tag">{tagline}</span>}
            <div className="mx-desc flex-1 mb-6">
              <p
                className="leading-relaxed"
                style={{ color: "#000", fontSize: "14px" }}
              >
                {expanded ? description : truncateDescription(description)}
              </p>
              {canExpand && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setExpanded((v) => !v);
                  }}
                  className="text-primary hover:text-primary/80 text-sm font-semibold mt-2 transition-colors"
                >
                  {expanded ? "Read less" : "Read more"}
                </button>
              )}
            </div>
            <div className="mx-actions flex items-center gap-3 pt-5 border-t border-[rgba(0,0,0,0.09)] group-hover:border-[rgba(118,185,0,0.3)] transition-colors">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setLocation("/contact-us");
                }}
                className="mx-ghost btn btn-primary"
              >
                Request Specs →
              </button>
              <span className="mx-only mx-cost">
                {`${productCount} ${productCount === 1 ? "Product" : "Products"}`}
              </span>
              <span className="mx-only mx-pill">
                Know More
                <span className="mx-pill-ico" aria-hidden="true"><ArrowUpRight /></span>
              </span>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
