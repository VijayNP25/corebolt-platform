import { useEffect, useMemo } from "react";
import { useParams, Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Package } from "lucide-react";
import ReplicaSiteLayout from "@/components/replica-pages/replica-site-layout";
import ReplicaInnerHero from "@/components/replica-pages/replica-inner-hero";
import ProductCard from "@/components/product-card";
import SelectionGridCard from "@/components/selection-grid-card";
import { categories, Category, Subcategory, Product } from "@/data/products";
import {
  getSubcategoryProductsFlat,
  getProductGroup,
  getNestedProductGroup,
  buildProductPath,
  countGroupProducts,
  getProductGroupImage,
  getProductGroupDescription,
  getProductGroupHeroDescription,
  getProductGroupPageTitle,
} from "@/lib/subcategory-products";
import { useSeo, type SeoData } from "@/lib/seo";
import { useServerNotFound } from "@/lib/redirect";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ContactFormMini from "@/components/contact-form-mini";
import { getCategoryInfoFromNewRoute, getNewRoute } from "@/lib/route-mapping";
import { categorySelectionHref, subcategoryHref } from "@/lib/replica-product-routes";
import { navSiblingForCategory } from "@/components/replica-home/replica-nav";
import { hasConfirmedPrice } from "@/lib/lidar-order";
import "@/styles/replica-product-page.css";

interface CategoryPageProps {
  productGroupId?: string;
  nestedProductGroupId?: string;
}

export default function CategoryPage({
  productGroupId,
  nestedProductGroupId,
}: CategoryPageProps) {
  const { categoryId: paramCategoryId, subcategoryId: paramSubcategoryId } = useParams();
  const [location] = useLocation();

  // Check if current route is a mapped route
  const categoryInfo = getCategoryInfoFromNewRoute(location);
  const categoryId = categoryInfo?.categoryId || paramCategoryId;
  const subcategoryId = categoryInfo?.subcategoryId || paramSubcategoryId;

  const category =
    categories.find((c: Category) => c.id === categoryId) || null;
  const subcategory =
    category && subcategoryId
      ? category.subcategories?.find(
          (s: Subcategory) => s.id === subcategoryId
        ) || null
      : null;

  const seoData: SeoData | null = useMemo(() => {
    if (!category) return null;

    const parentGroup =
      subcategory && productGroupId
        ? getProductGroup(subcategory, productGroupId)
        : undefined;
    const leafGroup =
      subcategory && productGroupId && nestedProductGroupId
        ? getNestedProductGroup(
            subcategory,
            productGroupId,
            nestedProductGroupId
          )
        : undefined;
    const activeGroup = leafGroup ?? parentGroup;

    const title = (() => {
      if (!subcategory) {
        return category.metaTitle || `${category.name} | CORE BOLT`;
      }
      if (leafGroup && !leafGroup.metaTitle?.trim() && parentGroup && parentGroup.name === leafGroup.name) {
        // Nested group shares its parent's name (e.g. "GMSL" > "GMSL") —
        // the default title formula would collide with the parent
        // group's own page, so include the subcategory to disambiguate.
        return `${leafGroup.name} - ${subcategory.name} - ${category.name} | CORE BOLT`;
      }
      if (activeGroup) {
        return getProductGroupPageTitle(activeGroup, category.name);
      }
      return (
        subcategory.metaTitle ||
        `${subcategory.name} - ${category.name} | CORE BOLT`
      );
    })();

    const descriptionText = (() => {
      if (activeGroup?.metaDescription?.trim()) {
        return activeGroup.metaDescription.trim();
      }
      if (activeGroup) return getProductGroupDescription(activeGroup);
      if (subcategory) {
        return subcategory.metaDescription || subcategory.description;
      }
      return category.metaDescription || category.name;
    })();

    const descriptionSuffix =
      activeGroup?.metaDescription?.trim() ||
      subcategory?.metaDescription?.trim()
        ? ""
        : " - Professional robotics and automation solutions from CORE BOLT.";
    const description = `${descriptionText}${descriptionSuffix}`;

    const keywords =
      activeGroup?.metaKeywords?.trim() ||
      (!productGroupId ? subcategory?.metaKeywords?.trim() : undefined);

    const baseUrl = "https://www.core-bolt.com";
    const categoryUrl = `${baseUrl}${categorySelectionHref(category.id)}`;
    const oldSubcategoryRoute = subcategory
      ? `/${category.id}/${subcategory.id}`
      : undefined;
    const newSubcategoryRoute = oldSubcategoryRoute
      ? getNewRoute(oldSubcategoryRoute)
      : null;
    const subcategoryUrl = subcategory
      ? `${baseUrl}${newSubcategoryRoute || oldSubcategoryRoute}`
      : undefined;

    const breadcrumbItems: any[] = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: categoryUrl,
      },
    ];
    if (subcategory) {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 3,
        name: subcategory.name,
        item: subcategoryUrl,
      });
      if (productGroupId) {
        const g = getProductGroup(subcategory, productGroupId);
        if (g) {
          breadcrumbItems.push({
            "@type": "ListItem",
            position: 4,
            name: g.name,
            item: `${baseUrl}/${category.id}/${subcategory.id}/${g.id}`,
          });
          if (nestedProductGroupId) {
            const leaf = getNestedProductGroup(
              subcategory,
              productGroupId,
              nestedProductGroupId
            );
            if (leaf) {
              breadcrumbItems.push({
                "@type": "ListItem",
                position: 5,
                name: leaf.name,
                item: `${baseUrl}/${category.id}/${subcategory.id}/${productGroupId}/${nestedProductGroupId}`,
              });
            }
          }
        }
      }
    }

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    } as const;

    // Collection schema: subcategory list, product groups, or products
    let itemListElements: { "@type": string; position: number; url: string; name: string }[];
    if (subcategory) {
      if (subcategory.productGroups?.length && !productGroupId) {
        itemListElements = subcategory.productGroups.map((g, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `${baseUrl}/${category.id}/${subcategory.id}/${g.id}`,
          name: g.name,
        }));
      } else if (productGroupId && nestedProductGroupId) {
        const leaf = getNestedProductGroup(
          subcategory,
          productGroupId,
          nestedProductGroupId
        );
        itemListElements = (leaf?.products ?? []).map((p: Product, idx: number) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `${baseUrl}${buildProductPath(p)}`,
          name: p.name,
        }));
      } else if (productGroupId) {
        const g = getProductGroup(subcategory, productGroupId);
        if (g?.productGroups?.length) {
          itemListElements = g.productGroups.map((child, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `${baseUrl}/${category.id}/${subcategory.id}/${productGroupId}/${child.id}`,
            name: child.name,
          }));
        } else {
          itemListElements = (g?.products ?? []).map((p: Product, idx: number) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `${baseUrl}${buildProductPath(p)}`,
            name: p.name,
          }));
        }
      } else {
        itemListElements = getSubcategoryProductsFlat(subcategory).map(
          (p: Product, idx: number) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `${baseUrl}${buildProductPath(p)}`,
            name: p.name,
          })
        );
      }
    } else if (category.products?.length) {
      itemListElements = category.products.map((p: Product, idx: number) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${baseUrl}${buildProductPath(p)}`,
        name: p.name,
      }));
    } else {
      itemListElements = (category.subcategories ?? []).map(
        (s: Subcategory, idx: number) => {
          const oldSubRoute = `/${category.id}/${s.id}`;
          const newSubRoute = getNewRoute(oldSubRoute);
          return {
            "@type": "ListItem",
            position: idx + 1,
            url: `${baseUrl}${newSubRoute || oldSubRoute}`,
            name: s.name,
          };
        }
      );
    }

    const collectionJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: (() => {
        if (activeGroup?.metaTitle?.trim()) return activeGroup.metaTitle.trim();
        if (subcategory) {
          return subcategory.metaTitle || `${subcategory.name} - ${category.name}`;
        }
        return category.metaTitle || category.name;
      })(),
      description: descriptionText,
      url: subcategory ? subcategoryUrl : categoryUrl,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: itemListElements,
      },
    } as const;

    return {
      title,
      description,
      keywords,
      canonical: subcategory ? subcategoryUrl : categoryUrl,
      jsonLd: [breadcrumbJsonLd, collectionJsonLd],
    };
  }, [category, subcategory, productGroupId, nestedProductGroupId]);

  useSeo(seoData);

  // Scroll to top when category or subcategory changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId, subcategoryId, productGroupId, nestedProductGroupId]);

  useServerNotFound(!category);

  if (!category) {
    return (
      <ReplicaSiteLayout>
        <ReplicaInnerHero title="Category Not Found" />
        <main className="replica-site-main replica-site-section">
          <div className="replica-site-wrap text-center">
            <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="replica-page-sub mb-6">
              The category you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </main>
      </ReplicaSiteLayout>
    );
  }

  const activeParentGroup =
    subcategory && productGroupId
      ? getProductGroup(subcategory, productGroupId)
      : undefined;

  const activeLeafGroup = (() => {
    if (!activeParentGroup || !subcategory) return undefined;
    if (nestedProductGroupId) {
      return getNestedProductGroup(
        subcategory,
        productGroupId!,
        nestedProductGroupId
      );
    }
    if (activeParentGroup.productGroups?.length) {
      return undefined;
    }
    return activeParentGroup;
  })();

  const displayProducts: Product[] = (() => {
    if (!subcategory) {
      // Category with direct products (no subcategory tier)
      if (category.products?.length) {
        return category.products;
      }
      return (category.subcategories ?? []).flatMap((sub: Subcategory) =>
        getSubcategoryProductsFlat(sub)
      );
    }
    if (subcategory.productGroups?.length && !productGroupId) {
      return [];
    }
    if (activeLeafGroup?.products?.length) {
      return activeLeafGroup.products;
    }
    return getSubcategoryProductsFlat(subcategory);
  })().filter((product) => !product.hidden);

  const showGroupPicker =
    Boolean(subcategory?.productGroups?.length) && !productGroupId;

  const showChildGroupPicker =
    Boolean(activeParentGroup?.productGroups?.length) &&
    Boolean(productGroupId) &&
    !nestedProductGroupId;

  const displayTitle = (() => {
    if (!subcategory) return category.name;
    if (nestedProductGroupId && activeLeafGroup) {
      return activeLeafGroup.name;
    }
    if (productGroupId && activeParentGroup) {
      return activeParentGroup.name;
    }
    return subcategory.name;
  })();

  const activeDisplayGroup = (() => {
    if (nestedProductGroupId && activeLeafGroup) return activeLeafGroup;
    if (productGroupId && activeParentGroup) return activeParentGroup;
    return undefined;
  })();

  const displayDescription = (() => {
    if (activeDisplayGroup) {
      return getProductGroupHeroDescription(activeDisplayGroup);
    }
    if (subcategory?.description) return subcategory.description;
    if (!subcategory && category.description) return category.description;
    return "";
  })();

  const displayOverview =
    activeDisplayGroup?.overview ??
    subcategory?.overview ??
    (!subcategory ? category.overview : undefined);
  const displayOverviewTitle =
    activeDisplayGroup?.overviewTitle ??
    subcategory?.overviewTitle ??
    (!subcategory ? category.overviewTitle ?? "" : "");

  const imageFallback = category.image ?? "";

  const breadcrumbNavItems: { label: string; href?: string }[] = [
    { label: "Home", href: "/" },
    {
      label: category.name,
      href: subcategory ? categorySelectionHref(category.id) : undefined,
    },
  ];
  if (subcategory) {
    breadcrumbNavItems.push({
      label: subcategory.name,
      href: productGroupId ? subcategoryHref(category.id, subcategory.id) : undefined,
    });
    if (productGroupId && activeParentGroup) {
      breadcrumbNavItems.push({
        label: activeParentGroup.name,
        href: nestedProductGroupId
          ? `/${category.id}/${subcategory.id}/${productGroupId}`
          : undefined,
      });
      if (nestedProductGroupId && activeLeafGroup) {
        breadcrumbNavItems.push({ label: activeLeafGroup.name });
      }
    }
  }

  return (
    <ReplicaSiteLayout
      navTrail={breadcrumbNavItems
        .slice(1)
        .map((item) => ({ label: item.label, href: item.href ?? location }))}
      navSibling={navSiblingForCategory(category.id)}
    >
      <ReplicaInnerHero
        key={
          categoryId +
          "-" +
          (subcategoryId ?? "") +
          "-" +
          (productGroupId ?? "") +
          "-" +
          (nestedProductGroupId ?? "")
        }
        title={displayTitle}
        description={displayDescription}
        image={category.image || undefined}
      />

      <main className="replica-site-main" data-nav-tone="light">
        {/* How It Works Section */}

        {/* Products / group picker */}
        <section
          className="py-10 bg-white"
          id={showGroupPicker || showChildGroupPicker ? "subcategories" : "availableProducts"}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {displayProducts.length > 0
                    ? "Available Products"
                    : "Product Categories"}
                </h2>
                <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
                 <p className="text-lg text-muted-foreground">
                  {displayProducts.length > 0
                    ? `Explore our ${displayTitle.toLowerCase()} product lineup`
                    : `Browse subcategories in ${displayTitle}`}
                </p> 
              </div> */}

              {nestedProductGroupId && subcategory && productGroupId && (
                <div className="mb-4">
                  <Link
                    href={`/${category.id}/${subcategory.id}/${productGroupId}`}
                  >
                    <Button
                      variant="ghost"
                      className="text-[#6A6A6A] hover:text-black hover:bg-transparent font-normal text-sm px-0"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to {activeParentGroup?.name ?? "groups"}
                    </Button>
                  </Link>
                </div>
              )}

              {productGroupId && subcategory && !nestedProductGroupId && (
                <div className="mb-8">
                  <Link href={subcategoryHref(category.id, subcategory.id)}>
                    <Button
                      variant="ghost"
                      className="text-[#6A6A6A] hover:text-black hover:bg-transparent font-normal text-sm px-0"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      All interface tiers
                    </Button>
                  </Link>
                </div>
              )}

              {showGroupPicker && subcategory?.productGroups ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {subcategory.productGroups.map((group, index) => (
                    <SelectionGridCard
                      tagline={category.name}
                      key={group.id}
                      href={`/${category.id}/${subcategory.id}/${group.id}`}
                      title={group.name}
                      description={getProductGroupDescription(group)}
                      image={getProductGroupImage(group, imageFallback)}
                      productCount={countGroupProducts(group)}
                      index={index}
                    />
                  ))}
                </div>
              ) : showChildGroupPicker && activeParentGroup?.productGroups ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activeParentGroup.productGroups.map((child, index) => (
                    <SelectionGridCard
                      tagline={category.name}
                      key={child.id}
                      href={`/${category.id}/${subcategoryId}/${productGroupId}/${child.id}`}
                      title={child.name}
                      description={getProductGroupDescription(child)}
                      image={getProductGroupImage(child, imageFallback)}
                      productCount={countGroupProducts(child)}
                      index={index}
                    />
                  ))}
                </div>
              ) : displayProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                  {displayProducts.map((product: Product, index: number) => (
                    <div key={product.id} className="h-full">
                      <ProductCard
                        product={product}
                        index={index}
                        addToCart={hasConfirmedPrice(product)}
                        manufacturer={subcategory?.name}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(category.subcategories ?? []).map(
                    (sub: Subcategory, index: number) => (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      >
                        <Link href={`/${category.id}/${sub.id}`}>
                          <div className="bg-white rounded-none border border-[rgba(0,0,0,0.09)] hover:border-[rgba(118,185,0,0.3)] p-6 transition-all duration-300 group cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
                            <div className="space-y-4">
                              <h3 className="text-2xl font-bold text-primary group-hover:text-foreground transition-colors duration-300">
                                {sub.name}
                              </h3>
                              <p className="text-muted-foreground">
                                {sub.description}
                              </p>
                              <div className="text-sm text-muted-foreground">
                                {getSubcategoryProductsFlat(sub).length} products
                                available
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  )}
                </div>
              )}

              {displayProducts.length === 0 &&
                !showGroupPicker &&
                !showChildGroupPicker &&
                !category.products?.length &&
                (category.subcategories ?? []).every(
                  (sub: Subcategory) =>
                    getSubcategoryProductsFlat(sub).length === 0
                ) && (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Products Coming Soon
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      We're working on adding products to this category. Check
                      back soon or contact us for availability.
                    </p>
                    <Link href="/contact-us">
                      <Button>Contact Us</Button>
                    </Link>
                  </motion.div>
                )}
            </motion.div>
          </div>
        </section>


        {displayOverview && (
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
                {displayOverviewTitle && <h2>{displayOverviewTitle}</h2>}
                <p className="whitespace-pre-line">{displayOverview}</p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {/* <ContactSection /> */}
      </main>
    </ReplicaSiteLayout>
  );
}