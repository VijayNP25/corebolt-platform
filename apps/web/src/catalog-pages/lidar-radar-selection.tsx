import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ReplicaSiteLayout from "@/components/replica-pages/replica-site-layout";
import ReplicaInnerHero from "@/components/replica-pages/replica-inner-hero";
import { categories, type Category } from "@/data/products";
import { navSiblingForCategory } from "@/components/replica-home/replica-nav";
import { categorySelectionHref } from "@/lib/replica-product-routes";
import { LIDAR_RADAR_PAGE } from "@/lib/catalog-nav";
import CdnImage from "@/components/cdn-image";
import { useSeo } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import "@/styles/replica-product-page.css";
import "@/styles/xcard.css";

/**
 * "3D LiDARs" page (opened from the homepage card and the Products menu):
 * two cards, LiDARs and Radars. Same card design as the company pages
 * (pages/subcategory-selection.tsx).
 *   LiDARs -> LiDAR companies -> company products -> product page
 *   Radars -> radar products -> product page
 */
const CARDS: { categoryId: string; label: string }[] = [
  { categoryId: "lidar", label: "LiDARs" },
  { categoryId: "radar", label: "Radars" },
];

const PAGE_TITLE = "3D LiDARs";
const PAGE_DESCRIPTION =
  "Choose LiDAR or radar sensors for robotics, autonomous vehicles, mapping and industrial automation.";

function countLabel(category: Category): string {
  const brands = category.subcategories?.length ?? 0;
  if (brands) return `${brands} ${brands === 1 ? "Brand" : "Brands"}`;
  const products = category.products?.length ?? 0;
  return `${products} ${products === 1 ? "Product" : "Products"}`;
}

export default function LidarRadarSelectionPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useSeo({
    title: "3D LiDAR & Radar Sensors | CORE BOLT",
    description:
      "Explore 3D LiDAR sensors from Ouster, Hesai, Livox, RoboSense and AutoL, and Continental 77 GHz radar sensors for robotics, AMRs and autonomous systems.",
    keywords:
      "3D LiDAR, LiDAR sensor, radar sensor, 77 GHz radar, LiDAR and radar sensors, robotics sensors, autonomous vehicle sensors, CORE BOLT",
    canonical: `https://www.core-bolt.com${LIDAR_RADAR_PAGE}`,
  });

  const cards = CARDS.map((c) => ({
    ...c,
    category: categories.find((cat) => cat.id === c.categoryId),
  })).filter(
    (c): c is { categoryId: string; label: string; category: Category } =>
      Boolean(c.category)
  );

  const heroImage = cards[0]?.category.image;

  return (
    <ReplicaSiteLayout
      navTrail={[{ label: PAGE_TITLE, href: LIDAR_RADAR_PAGE }]}
      navSibling={navSiblingForCategory("lidar")}
    >
      <ReplicaInnerHero
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        image={heroImage || undefined}
      />

      <main className="replica-site-main">
        <section className="replica-site-section" id="subcategories" data-nav-tone="light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map(({ categoryId, label, category }, index) => {
                const description =
                  category.description || category.metaDescription || "";
                const count = countLabel(category);
                return (
                  <motion.div
                    key={categoryId}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={categorySelectionHref(categoryId)}>
                      <div className="mx-card bg-white rounded-none border border-[rgba(0,0,0,0.09)] hover:border-[rgba(118,185,0,0.3)] transition-all duration-300 group h-full flex flex-col cursor-pointer overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
                        {category.image && (
                          <div className="mx-media relative h-48 overflow-hidden bg-gray-100">
                            <CdnImage
                              src={category.image}
                              alt={label}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="mx-notch absolute top-4 right-4">
                              <Badge className="replica-count-badge">{count}</Badge>
                            </div>
                          </div>
                        )}

                        <div className="mx-body p-6 flex-1 flex flex-col">
                          <h3 className="mx-title text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-4">
                            {label}
                          </h3>
                          {/* phone: grey category line under the title */}
                          <span className="mx-only mx-tag">{PAGE_TITLE}</span>
                          <div className="mx-desc flex-1 mb-6">
                            <p
                              className="leading-relaxed"
                              style={{ color: "#000", fontSize: "14px" }}
                            >
                              {description}
                            </p>
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
                              Explore Products →
                            </button>
                            <span className="mx-only mx-cost">{count}</span>
                            <span className="mx-only mx-pill">
                              Know More
                              <span className="mx-pill-ico" aria-hidden="true"><ArrowUpRight /></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </ReplicaSiteLayout>
  );
}
