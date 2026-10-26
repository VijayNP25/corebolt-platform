import { useEffect, useState } from "react";
import { useParams, Link, useLocation, Redirect } from "wouter";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import ReplicaSiteLayout from "@/components/replica-pages/replica-site-layout";
import ReplicaInnerHero from "@/components/replica-pages/replica-inner-hero";
import { categories, Category, Subcategory } from "@/data/products";
import { getSubcategoryProductsFlat } from "@/lib/subcategory-products";
import { ORDER_CATEGORIES, getPricedGroups } from "@/lib/lidar-order";
import { navSiblingForCategory } from "@/components/replica-home/replica-nav";
import { categorySelectionHref } from "@/lib/replica-product-routes";
import CdnImage from "@/components/cdn-image";
import { useSeo } from "@/lib/seo";
import { useServerRedirect, useServerNotFound } from "@/lib/redirect";
import { Badge } from "@/components/ui/badge";
import { getCategoryInfoFromNewRoute, getNewRoute } from "@/lib/route-mapping";
import "@/styles/replica-product-page.css";
import "@/styles/xcard.css";
import { ArrowUpRight } from "lucide-react";

export default function SubcategorySelectionPage() {
  const { categoryId: paramCategoryId } = useParams();
  const [location, setLocation] = useLocation();
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(
    new Set()
  );

  // Check if current route is a mapped route
  const categoryInfo = getCategoryInfoFromNewRoute(location);
  const categoryId = categoryInfo?.categoryId || paramCategoryId;
  const category = categories.find((c: Category) => c.id === categoryId) || null;

  const directProductRedirect =
    category && !category.subcategories?.length && category.products?.length
      ? `/${category.id}`
      : null;
  useServerRedirect(directProductRedirect);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoryId]);

  useSeo(
    category
      ? {
          title: `Shop ${category.name} Categories | CORE BOLT`,
          description: `Explore ${category.name} subcategories and products. Professional robotics and automation solutions from CORE BOLT.`,
          keywords: `${category.name}, ${category.name.toLowerCase()}, robotics, automation, CORE BOLT, industrial automation, robotics components`,
          canonical: `https://www.core-bolt.com/${category.id}/subcategories`,
        }
      : null
  );

  // Get image for subcategory (use first product's image or category image as fallback)
  const getSubcategoryImage = (subcategory: Subcategory): string => {
    const flat = getSubcategoryProductsFlat(subcategory);
    if (flat.length > 0 && flat[0]?.image) {
      return flat[0].image;
    }
    return category?.image || "";
  };

  const toggleDescription = (subcategoryId: string) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(subcategoryId)) {
        newSet.delete(subcategoryId);
      } else {
        newSet.add(subcategoryId);
      }
      return newSet;
    });
  };

  const truncateDescription = (
    text: string,
    maxLength: number = 200
  ): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  useServerNotFound(!category);

  if (!category) {
    return (
      <ReplicaSiteLayout>
        <ReplicaInnerHero title="Category Not Found" />
        <div className="replica-site-section replica-site-wrap text-center">
          <p className="replica-page-sub">Category not found</p>
        </div>
      </ReplicaSiteLayout>
    );
  }

  // If the category serves products directly (no subcategory tier),
  // the subcategory listing is meaningless — send users to the category
  // page which renders the product grid.
  if (directProductRedirect) {
    return <Redirect to={directProductRedirect} />;
  }

  return (
    <ReplicaSiteLayout
      navTrail={[{ label: category.name, href: categorySelectionHref(category.id) }]}
      navSibling={navSiblingForCategory(category.id)}
    >
      <ReplicaInnerHero
        key={categoryId}
        title={category.name}
        description={
          category.metaDescription || "Select a subcategory to explore products"
        }
        image={category.image || undefined}
      />

      <main className="replica-site-main">
        <section className="replica-site-section" id="subcategories" data-nav-tone="light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(category.subcategories ?? [])
                .filter((subcategory) => !subcategory.hidden)
                .map(
                (subcategory: Subcategory, index: number) => {
                  const subcategoryImage = getSubcategoryImage(subcategory);
                  const productCount = getSubcategoryProductsFlat(subcategory).filter(
                    (product) => !product.hidden,
                  ).length;
                  const orderCategory = Object.values(ORDER_CATEGORIES).find(
                    (entry) => entry.categoryId === category.id,
                  );
                  const orderHref =
                    orderCategory &&
                    getPricedGroups(category.id).some((group) => group.id === subcategory.id)
                      ? `${orderCategory.path}/${subcategory.id}`
                      : null;

                  return (
                    <motion.div
                      key={subcategory.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Link
                        href={
                          getNewRoute(`/${category.id}/${subcategory.id}`) ||
                          `/${category.id}/${subcategory.id}`
                        }
                      >
                        <div className="mx-card bg-white rounded-none border border-[rgba(0,0,0,0.09)] hover:border-[rgba(118,185,0,0.3)] transition-all duration-300 group h-full flex flex-col cursor-pointer overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
                          {/* Subcategory Image */}
                          {subcategoryImage && (
                            <div className="mx-media relative h-48 overflow-hidden bg-gray-100">
                              <CdnImage
                                src={subcategoryImage}
                                alt={subcategory.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="mx-notch absolute top-4 right-4">
                                <Badge className="replica-count-badge">
                                  {subcategory.brand
                                    ? subcategory.brand
                                    : `${productCount} ${productCount === 1 ? "Product" : "Products"}`}
                                </Badge>
                              </div>
                            </div>
                          )}

                          {/* Content */}
                          <div className="mx-body p-6 flex-1 flex flex-col">
                            <h3 className="mx-title text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-4">
                              {subcategory.name}
                            </h3>
                            {/* phone: grey category line under the title */}
                            <span className="mx-only mx-tag">{category.name}</span>
                            <div className="mx-desc flex-1 mb-6">
                              <p
                                className="leading-relaxed"
                                style={{ color: "#000", fontSize: "14px" }}
                              >
                                {expandedDescriptions.has(subcategory.id)
                                  ? subcategory.description
                                  : truncateDescription(
                                    subcategory.description
                                  )}
                              </p>
                              {subcategory.description.length > 200 && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleDescription(subcategory.id);
                                  }}
                                  className="text-primary hover:text-primary/80 text-sm font-semibold mt-2 transition-colors"
                                >
                                  {expandedDescriptions.has(subcategory.id)
                                    ? "Read less"
                                    : "Read more"}
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
                              // style={{ background: "#000" }}
                              >
                                Explore Products →
                              </button>
                              {orderHref && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setLocation(orderHref);
                                  }}
                                  className="lidar-order-link"
                                >
                                  Order Now →
                                </button>
                              )}
                              <span className="mx-only mx-cost">
                                {`${productCount} ${productCount === 1 ? "Product" : "Products"}`}
                              </span>
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
                }
              )}
            </div>
          </div>
        </section>
        {category.overview && (
          <section className="replica-site-section replica-site-section--alt">
            <div className="replica-site-wrap">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="replica-prose"
              >
                <p className="lbl" style={{ marginBottom: 12 }}>
                  <span className="lbl-num">Overview</span>
                </p>
                {category.overviewTitle && <h2>{category.overviewTitle}</h2>}
                <p className="whitespace-pre-line">{category.overview}</p>
              </motion.div>
            </div>
          </section>
        )}
      </main>
    </ReplicaSiteLayout>
  );
}
