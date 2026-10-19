import { Fragment } from "react";
import { Link } from "@/lib/wouter-compat";

/**
 * Shared breadcrumb trail used across all product-related pages
 * (category, subcategory, product-group, and product-detail pages).
 *
 * Reuses the exact markup/classNames that already ship on the product
 * detail page (`replica-product-crumb`, see
 * client/src/styles/replica-product-page.css) so styling stays
 * consistent everywhere without introducing a new visual design.
 *
 * The last item in `items` is treated as the current page: it is
 * rendered as plain (non-clickable) text even if an `href` is passed,
 * so callers don't need to strip it manually.
 */
export interface ProductBreadcrumbItem {
  label: string;
  href?: string;
}

export default function ProductBreadcrumb({
  items,
  className,
}: {
  items: ProductBreadcrumbItem[];
  className?: string;
}) {
  if (!items.length) return null;

  return (
    <nav
      className={`replica-product-crumb${className ? ` ${className}` : ""}`}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Fragment key={`${item.label}-${index}`}>
            {item.href && !isLast ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span className="replica-product-crumb-current">
                {item.label}
              </span>
            )}
            {!isLast && (
              <span className="replica-product-crumb-sep" aria-hidden="true">
                /
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
