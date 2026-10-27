import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Redirect } from "wouter";
import { Download, ShoppingCart } from "lucide-react";
import ReplicaSiteLayout, { SiteBreadcrumb } from "@/components/replica-pages/replica-site-layout";
import CdnImage from "@/components/cdn-image";
import ContactFormModal, {
  CONTACT_DIALOG_CONTENT_CLASS,
} from "@/components/contact-form-modal";
import { categories, Product, ProductFeatureTable, ProductFeatureTableRow } from "@/data/products";
import {
  locateProduct,
  buildProductPath,
  findSubcategoryBySlug,
  getProductGroup,
  getNestedProductGroup,
} from "@/lib/subcategory-products";
import { categorySelectionHref, subcategoryHref } from "@/lib/replica-product-routes";
import { navSiblingForCategory } from "@/components/replica-home/replica-nav";
import { findMinimumOrder, isOrderInformationTable } from "@/lib/product-order-info";
import { Link as LocaleLink } from "@/i18n/routing";
import { useSeo, type SeoData } from "@/lib/seo";
import { useServerRedirect, useServerNotFound } from "@/lib/redirect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import CatalogBuyNowButton from "@/components/catalog/catalog-buy-now-button";
import CatalogProductPrice from "@/components/catalog/catalog-product-price";
import { useCatalogOffer } from "@/hooks/use-catalog-offer";
import ProductReviews from "@/components/catalog/product-reviews";
import RelatedProducts from "@/components/catalog/related-products";
import "@/styles/replica-product-page.css";

function formatSpecDisplayTitle(text: string): string {
  const normalized = text.replace(/\s*—\s*/g, " — ").replace(/\s+/g, " ").trim();
  if (normalized !== normalized.toUpperCase()) {
    return normalized;
  }

  return normalized
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (!word) return word;
      if (word === "i/o") return "I/O";
      if (word.includes("/")) {
        return word
          .split("/")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join("/");
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function productContactLabel(product: Product) {
  const category = categories.find((c) => c.id === product.category);
  return category ? `${product.name} (${category.name})` : product.name;
}

/** Body uses parameter + value (2 cells) when the table defines a single merged header. */
function getSpecTableLayoutColCount(table: ProductFeatureTable): number {
  const columns = table.columns ?? ["Parameter", "Specification"];
  if (columns.length === 1) {
    return 2;
  }
  return columns.length;
}

function getSpecSectionHeaderColSpan(
  row: ProductFeatureTableRow,
  layoutColCount: number
): number {
  if (!row.colspan) {
    return layoutColCount;
  }
  return Math.min(row.colspan, layoutColCount);
}

function renderApplicationsHeading(heading?: string) {
  if (!heading) {
    return (
      <>
        Built for Real-World
        <br />
        <strong>Deployments</strong>
      </>
    );
  }

  const words = heading.trim().split(/\s+/);
  if (words.length <= 1) {
    return heading;
  }

  const lastWord = words.pop();
  return (
    <>
      {words.join(" ")}
      <br />
      <strong>{lastWord}</strong>
    </>
  );
}

export default function ProductPage() {
  const params = useParams<{
    categoryId?: string;
    subcategoryId?: string;
    groupId?: string;
    nestedGroupId?: string;
    productId?: string;
    slug?: string;
    a?: string;
    b?: string;
  }>();
  const groupId = params.groupId ?? params.a;
  const nestedGroupId = params.nestedGroupId;
  // `params.subcategoryId` is used as a fallback for the
  // `/:categoryId/:subcategoryId` route, where a category-level product is
  // served directly (no subcategory tier) — e.g. /industrial-panel-pc/hypercore-ipc-g-series.
  const productIdParam =
    params.productId ?? params.slug ?? params.b ?? params.subcategoryId ?? "";

  const loc = useMemo(
    () => (productIdParam ? locateProduct(productIdParam) : null),
    [productIdParam]
  );

  const canonicalRedirect = useMemo(() => {
    if (!productIdParam || !loc) return null;

    const canonicalPath = buildProductPath(loc.product);

    const segments: string[] = [];
    if (params.categoryId) segments.push(params.categoryId);
    // When there's no real subcategory tier, `subcategoryId` is actually
    // the product id itself (see the productIdParam fallback above) — don't
    // double it up in the reconstructed current path.
    if (params.subcategoryId && params.subcategoryId !== productIdParam) {
      segments.push(params.subcategoryId);
    }
    if (groupId) segments.push(groupId);
    if (nestedGroupId) segments.push(nestedGroupId);
    segments.push(productIdParam);
    const currentPath = `/${segments.join("/")}`;

    return currentPath !== canonicalPath ? canonicalPath : null;
  }, [
    productIdParam,
    loc,
    params.categoryId,
    params.subcategoryId,
    groupId,
    nestedGroupId,
  ]);

  useServerRedirect(canonicalRedirect);

  const product = !canonicalRedirect ? loc?.product ?? null : null;
  const productCategoryId = loc?.category.id ?? null;
  const productSubcategoryId = loc?.subcategory?.id ?? null;
  const productGroupId = loc?.productGroupPath?.[0] ?? null;
  const nestedProductGroupId = loc?.productGroupPath?.[1] ?? null;
  const categoryName = loc?.category.name ?? null;
  const subcategoryName = loc?.subcategory?.name ?? null;

  const offer = useCatalogOffer(
    product
      ? {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
        }
      : null,
  );

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedSystemCore, setSelectedSystemCore] = useState<string | null>(
    null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openContactModal = (systemCore?: string) => {
    setSelectedSystemCore(systemCore ?? null);
    setIsContactModalOpen(true);
  };

  const handleContactModalChange = (open: boolean) => {
    setIsContactModalOpen(open);
    if (!open) {
      setSelectedSystemCore(null);
    }
  };

  const seoData: SeoData | null = useMemo(() => {
    if (!product || !productCategoryId) return null;

    const base = "https://www.core-bolt.com";
    const productUrl = `${base}${buildProductPath(product)}`;
    const subcategoryUrl = productSubcategoryId
      ? `${base}/${productCategoryId}/${productSubcategoryId}`
      : null;
    const categoryUrl = `${base}${categorySelectionHref(productCategoryId)}`;

    const sub = productSubcategoryId
      ? findSubcategoryBySlug(productCategoryId, productSubcategoryId)
      : undefined;
    const parentGroupMeta =
      productGroupId && sub ? getProductGroup(sub, productGroupId) : undefined;
    const parentGroupUrl =
      productGroupId && sub && productSubcategoryId
        ? `${base}/${productCategoryId}/${productSubcategoryId}/${productGroupId}`
        : null;
    const nestedGroupMeta =
      productGroupId && nestedProductGroupId && sub
        ? getNestedProductGroup(sub, productGroupId, nestedProductGroupId)
        : undefined;
    const nestedGroupUrl =
      productGroupId && nestedProductGroupId && sub && productSubcategoryId
        ? `${base}/${productCategoryId}/${productSubcategoryId}/${productGroupId}/${nestedProductGroupId}`
        : null;

    const breadcrumbItems: Array<{
      "@type": string;
      position: number;
      name: string;
      item: string;
    }> = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${base}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryName || productCategoryId,
        item: categoryUrl,
      },
    ];

    if (productSubcategoryId && subcategoryUrl) {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: breadcrumbItems.length + 1,
        name: subcategoryName || productSubcategoryId,
        item: subcategoryUrl,
      });
    }

    if (parentGroupUrl && parentGroupMeta) {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: breadcrumbItems.length + 1,
        name: parentGroupMeta.name,
        item: parentGroupUrl,
      });
    }

    if (nestedGroupUrl && nestedGroupMeta) {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: breadcrumbItems.length + 1,
        name: nestedGroupMeta.name,
        item: nestedGroupUrl,
      });
    }

    breadcrumbItems.push({
      "@type": "ListItem",
      position: breadcrumbItems.length + 1,
      name: product.name,
      item: productUrl,
    });

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    } as const;

    // Use Product schema for fixed-price items, Service schema for quote-based items
    // This aligns with Google's requirements and B2B best practices
    const isPricedProduct =
      product.price !== null &&
      product.price !== undefined &&
      typeof product.price === "number" &&
      product.price > 0;

    const itemJsonLd: Record<string, any> = isPricedProduct
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          sku: product.id,
          url: productUrl,
          category: productSubcategoryId
            ? `${productCategoryId} > ${productSubcategoryId}`
            : productCategoryId,
          image: product.image,
          brand: {
            "@type": "Brand",
            name: "CORE BOLT",
          },
          offers: {
            "@type": "Offer",
            url: productUrl,
            availability: "https://schema.org/InStock",
            priceCurrency: "INR",
            price: product.price,
            priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
            seller: {
              "@type": "Organization",
              name: "CORE BOLT",
            },
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Service",
          name: product.name,
          description: product.description,
          url: productUrl,
          provider: {
            "@type": "Organization",
            name: "CORE BOLT",
          },
          areaServed: "IN",
          serviceType: productSubcategoryId
            ? `${productCategoryId} > ${productSubcategoryId}`
            : productCategoryId,
        };

    return {
      title: product.metaTitle || `${product.name} | CORE BOLT`,
      description:
        product.metaDescription ||
        `${product.description} - Professional robotics and automation solutions from CORE BOLT.`,
      keywords: product.metaKeywords,
      canonical: productUrl,
      ogImage: product.image,
      jsonLd: [breadcrumbJsonLd, itemJsonLd],
    };
  }, [
    product,
    productCategoryId,
    productSubcategoryId,
    productGroupId,
    nestedProductGroupId,
    categoryName,
    subcategoryName,
  ]);

  useSeo(seoData);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productIdParam]);

  const scrollToSpecs = () => {
    document
      .getElementById("productSpecs")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!product) return;
    const revealEls = document.querySelectorAll(
      ".replica-product-overview.rv, .replica-product-specs-hd.rv, .replica-product-spec-block.rv, .replica-product-spec-empty.rv"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            entry.target
              .querySelector(".replica-product-spec-table")
              ?.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [product]);

  const parseFeatureRow = (feature: string) => {
    const separatorIndex = feature.indexOf(":");
    if (separatorIndex === -1) {
      return {
        featureName: feature.trim(),
        featureValue: "✓ Included",
      };
    }

    return {
      featureName: feature.slice(0, separatorIndex).trim(),
      featureValue: feature.slice(separatorIndex + 1).trim(),
    };
  };

  /** Split multi-variant spec strings (|| or spaced /) into readable lines */
  const formatSpecValue = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "—";

    const pipeParts = trimmed.split(/\s*\|\|\s*/).filter(Boolean);
    const parts =
      pipeParts.length > 1
        ? pipeParts
        : trimmed.includes(" / ")
          ? trimmed.split(/\s+\/\s+/).filter(Boolean)
          : [trimmed];

    const valueClass =
      "break-words [overflow-wrap:anywhere] leading-relaxed";

    if (parts.length <= 1) {
      return <span className={valueClass}>{parts[0]}</span>;
    }

    return (
      <ul className="list-none space-y-2 m-0 p-0">
        {parts.map((part, i) => (
          <li key={i} className={valueClass}>
            {parts.length > 1 && (
              <span className="text-[#6b6b6b] font-medium tabular-nums">
                {i + 1}.{" "}
              </span>
            )}
            {part.trim()}
          </li>
        ))}
      </ul>
    );
  };


  const renderSpecTable = (table: ProductFeatureTable, tableIndex: number) => {
    const columns = table.columns ?? ["Parameter", "Specification"];
    const layoutColCount = getSpecTableLayoutColCount(table);
    const mergedHeader = columns.length === 1;
    const isOrderTable = isOrderInformationTable(table);
    const tableColCount = layoutColCount + (isOrderTable ? 1 : 0);
    const contactCtaLabel = offer.status === "buy" ? "Buy Now" : "Request Quote";
    const needsHorizontalScroll =
      isOrderTable ||
      layoutColCount > 2 ||
      table.rows.some((row) => (row.values?.length ?? 0) > 1);

    const getOrderModelNumber = (row: ProductFeatureTableRow) => {
      const directValue = row.value?.trim();
      if (directValue) {
        return directValue;
      }

      const values = row.values;
      if (!values?.length) {
        return undefined;
      }

      return values[values.length - 1]?.trim() || undefined;
    };

    const renderOrderActionCell = (modelNumber?: string) => {
      if (!isOrderTable || !modelNumber?.trim()) {
        return isOrderTable ? <td /> : null;
      }

      return (
        <td className="replica-product-spec-action-cell">
          <button
            type="button"
            className="replica-product-spec-buy-btn"
            onClick={() => openContactModal(modelNumber.trim())}
          >
            {contactCtaLabel}
          </button>
        </td>
      );
    };

    return (
      <div
        key={`${table.title}-${tableIndex}`}
        className="replica-product-spec-block rv"
        style={{ transitionDelay: `${Math.min(tableIndex * 0.08, 0.48)}s` }}
      >
        <h3 className="replica-product-spec-heading">
          {formatSpecDisplayTitle(table.title)}
        </h3>
        <div className="replica-product-spec-table-wrap">
          <table
            className={`replica-product-spec-table${
              mergedHeader ? " replica-product-spec-table--merged-header" : ""
            }${needsHorizontalScroll ? " replica-product-spec-table--scroll" : ""}`}
          >
          <caption className="sr-only">
            {formatSpecDisplayTitle(table.title)} specifications for{" "}
            {product?.name}
          </caption>
          <thead>
            <tr>
              {mergedHeader ? (
                <th colSpan={layoutColCount}>
                  {formatSpecDisplayTitle(columns[0] ?? '')}
                </th>
              ) : (
                columns.map((column) => (
                  <th key={column}>{formatSpecDisplayTitle(column)}</th>
                ))
              )}
              {isOrderTable && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => {
              if (row.sectionHeader) {
                return (
                  <tr
                    key={`${row.parameter}-${rowIndex}`}
                    className={`replica-product-spec-section-row${
                      row.accent ? " replica-product-spec-section-row--accent" : ""
                    }`}
                  >
                    <th colSpan={getSpecSectionHeaderColSpan(row, tableColCount)}>
                      {formatSpecDisplayTitle(row.parameter)}
                    </th>
                  </tr>
                );
              }

              if (row.values && row.values.length > 0) {
                return (
                  <tr key={`${row.parameter}-${rowIndex}`}>
                    <td>{row.parameter}</td>
                    {row.values.map((value, valueIndex) => (
                      <td key={`${row.parameter}-${valueIndex}`}>
                        {formatSpecValue(value)}
                      </td>
                    ))}
                    {renderOrderActionCell(getOrderModelNumber(row))}
                  </tr>
                );
              }

              const valueColspan = row.colspan
                ? Math.min(row.colspan, layoutColCount - 1)
                : layoutColCount - 1;

              return (
                <tr key={`${row.parameter}-${rowIndex}`}>
                  <td>{row.parameter}</td>
                  <td colSpan={valueColspan}>
                    {formatSpecValue(row.value ?? "")}
                  </td>
                  {renderOrderActionCell(getOrderModelNumber(row))}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    );
  };

  useServerNotFound(!canonicalRedirect && !product);

  if (canonicalRedirect) {
    return <Redirect to={canonicalRedirect} />;
  }

  if (!product) {
    return (
      <ReplicaSiteLayout lightNav>
        <main className="replica-site-main replica-site-section">
          <div className="replica-site-wrap text-center">
            <h1 className="replica-page-title mb-2">Product Not Found</h1>
            <p className="replica-page-sub mb-6 mx-auto">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </main>
      </ReplicaSiteLayout>
    );
  }

  const productImages = product.images?.length
    ? product.images
    : [product.image];

  // Top menu on product pages: Home · Category · Subcategory · Product · Contact Us
  const navTrail = [
    {
      label: categoryName ?? productCategoryId ?? "",
      href: categorySelectionHref(productCategoryId ?? ""),
    },
    ...(productCategoryId && productSubcategoryId && subcategoryName
      ? [
          {
            label: subcategoryName,
            href: subcategoryHref(productCategoryId, productSubcategoryId),
          },
        ]
      : []),
    { label: product.name, href: buildProductPath(product) },
  ];

  return (
    <ReplicaSiteLayout
      lightNav
      navTrail={navTrail}
      navShowBlogs={false}
      navSibling={navSiblingForCategory(productCategoryId)}
    >
      <main className="replica-site-main">
        <section
          className="replica-site-section replica-product-top"
          data-nav-tone="light"
        >
          <div className="replica-site-wrap">
            <SiteBreadcrumb trail={navTrail} />
            <div className="replica-product-layout">
              <div className="replica-product-gallery">
                <div className="replica-product-main-image">
                  <CdnImage
                    src={productImages[selectedImageIndex] || product.image}
                    alt={product.name}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                {productImages.length > 1 && (
                  <div className="replica-product-thumbs">
                    {productImages.map((img, index) => (
                      <button
                        key={`${img}-${index}`}
                        type="button"
                        onClick={() => setSelectedImageIndex(index)}
                        aria-label={`View image ${index + 1} of ${product.name}`}
                        aria-pressed={selectedImageIndex === index}
                        style={{ all: "unset", display: "block", cursor: "pointer" }}
                      >
                        <CdnImage
                          src={img}
                          alt={`${product.name} view ${index + 1}`}
                          className={`replica-product-thumb${
                            selectedImageIndex === index ? " is-active" : ""
                          }`}
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="replica-product-info">
                <p className="lbl">
                  <span className="lbl-num">
                    {categoryName ?? productCategoryId}
                  </span>
                  {subcategoryName ? ` · ${subcategoryName}` : ""}
                </p>
                <h1 className="replica-page-title">{product.name}</h1>
                <p className="replica-page-sub">{product.description}</p>

                {offer.status === "buy" && (
                  <CatalogProductPrice inr={Number(offer.priceInr)} />
                )}

                {product.compatibleModulesSection &&
                  product.compatibleModulesSection.items.length > 0 && (
                    <div className="replica-product-som-section">
                      <div className="replica-product-som-label">
                        {product.compatibleModulesSection.label ??
                          "Compatible Modules"}
                      </div>
                      <div className="replica-product-som-row">
                        {product.compatibleModulesSection.items.map((mod) => (
                          <div
                            key={mod.name}
                            className="replica-product-som-card"
                          >
                            <CdnImage src={mod.image} alt={mod.name} loading="lazy" />
                            <div>{mod.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="replica-product-actions">
                  {product.fileUrl ? (
                    <a
                      href={product.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary replica-product-download-btn"
                    >
                      <Download
                        className="replica-product-download-icon"
                        size={18}
                        strokeWidth={2.25}
                        aria-hidden
                      />
                      Technical Details
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={scrollToSpecs}
                    >
                      Technical Details
                    </button>
                  )}
                  {offer.status === "buy" ? (
                    <CatalogBuyNowButton
                      productId={offer.productId}
                      slug={offer.slug}
                      name={offer.name}
                      imageUrl={offer.imageUrl}
                      priceInr={offer.priceInr}
                      shippingInr={offer.shippingInr}
                      shippingUsd={offer.shippingUsd}
                    />
                  ) : offer.status === "quote" ? (
                    <button
                      type="button"
                      className="btn replica-btn-dark"
                      onClick={() => openContactModal()}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Request Quote
                    </button>
                  ) : null}
                </div>
                <p className="text-sm mt-4" style={{ color: "var(--ink3)" }}>
                  {findMinimumOrder(product)
                    ? `Minimum order: ${findMinimumOrder(product)} pieces. `
                    : null}
                  Shipping is ₹2,000 on an INR order and $21 on a USD order, charged once at checkout. Lead time is confirmed when the order is accepted.{" "}
                  <LocaleLink href="/shipping-policy" className="underline">
                    Shipping details
                  </LocaleLink>
                </p>
              </div>
            </div>
          </div>
        </section>

        {product.applicationsSection &&
          product.applicationsSection.items.length > 0 && (
            <section className="apps" data-nav-tone="dark">
              <div className="wrap">
                <div className="apps-hd">
                  <h2
                    className="d2-dk"
                    style={{ marginBottom: 12, fontWeight: "300" }}
                  >
                    {renderApplicationsHeading(
                      product.applicationsSection.heading
                    )}
                  </h2>
                  <p
                    className="body-dk"
                    style={{ margin: "0 auto", maxWidth: 460 }}
                  >
                    {product.applicationsSection.description ??
                      "Proven across demanding industrial, autonomous, and smart infrastructure applications."}
                  </p>
                </div>
                <div className="apps-grid">
                  {product.applicationsSection.items.map((app) => (
                    <div key={app.title} className="acard">
                      <CdnImage src={app.image} alt={app.title} loading="lazy" />
                      <div className="acard-overlay" />
                      <div className="acard-label">
                        <h4>{app.title}</h4>
                        {app.subtitle ? <p>{app.subtitle}</p> : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        <section
          id="productSpecs"
          className="replica-site-section replica-site-section--alt replica-product-specs-section"
          data-nav-tone="light"
        >
          <div className="replica-site-wrap">
            <div className="replica-product-specs-hd rv">
              <p className="lbl" style={{ justifyContent: "center" }}>
                <span className="lbl-num">Specifications</span>
              </p>
              <h2 className="d2 replica-product-specs-title">
                Technical Specifications
              </h2>
            </div>

            <div className="replica-product-specs-list">
              {product.featureTables && product.featureTables.length > 0 ? (
                product.featureTables.map((table, tableIndex) =>
                  renderSpecTable(table, tableIndex)
                )
              ) : product.features && product.features.length > 0 ? (
                <div
                  className="replica-product-spec-block rv"
                  style={{ transitionDelay: "0s" }}
                >
                  <h3 className="replica-product-spec-heading">
                    Product Features
                  </h3>
                  <div className="replica-product-spec-table-wrap">
                    <table className="replica-product-spec-table">
                    <caption className="sr-only">
                      Technical features and specifications for {product.name}
                    </caption>
                    <thead>
                      <tr>
                        <th>Feature</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.features.map((feature: string, index: number) => {
                        const { featureName, featureValue } =
                          parseFeatureRow(feature);
                        return (
                          <tr key={index}>
                            <td>{featureName}</td>
                            <td>{formatSpecValue(featureValue)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  </div>
                </div>
              ) : (
                <p className="replica-product-spec-empty rv">
                  Detailed feature specifications will be updated soon.
                </p>
              )}
            </div>
          </div>
        </section>

        {product.overview && (
          <section
            className="replica-site-section replica-product-overview-section"
            data-nav-tone="light"
          >
            <div className="replica-site-wrap">
              <div className="replica-product-overview rv">
                <p className="lbl">
                  <span className="lbl-num">Overview</span>
                </p>
                {product.overviewTitle && (
                  <h2 className="replica-product-overview-title">
                    {product.overviewTitle}
                  </h2>
                )}
                <div className="replica-prose replica-product-overview-prose">
                  {product.overview
                    .split(/\n\n+/)
                    .filter(Boolean)
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <RelatedProducts product={product} />
        <ProductReviews catalogId={product.id} />
      </main>

      <Dialog open={isContactModalOpen} onOpenChange={handleContactModalChange}>
        <DialogContent className={CONTACT_DIALOG_CONTENT_CLASS}>
          <ContactFormModal
            title={
              product.price
                ? `Place Order for ${productContactLabel(product)}`
                : `Get a Quote for ${productContactLabel(product)}`
            }
            subtitle={
              product.price
                ? "Complete your order details and our team will process it."
                : "Share a few details and our team will get back within one business day."
            }
            selectedProduct={product}
            action={product.price ? "order" : "quote"}
            initialSystemCore={selectedSystemCore ?? undefined}
          />
        </DialogContent>
      </Dialog>
    </ReplicaSiteLayout>
  );
}
