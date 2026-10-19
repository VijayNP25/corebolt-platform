"use client";

import { useState } from "react";
import { Link } from "@/lib/wouter-compat";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
// Nav-sized catalogue (ids + names), not the full "@/data/products".
import {
  navMenuCategories,
  type NavItem as Product,
  type NavProductGroup as ProductGroup,
  type NavSubcategory as Subcategory,
} from "@/lib/catalog-nav";
import { productGroupHref, subcategoryHref, categorySelectionHref } from "@/lib/replica-product-routes";

// Menu view of the catalogue: e.g. Radars is listed under 3D LiDARs (see MENU_NESTING).
const categories = navMenuCategories({
  category: categorySelectionHref,
  subcategory: subcategoryHref,
});

interface ReplicaProductsMenuProps {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
  linkStyle?: React.CSSProperties;
}

export default function ReplicaProductsMenu({
  variant,
  onNavigate,
  linkStyle,
}: ReplicaProductsMenuProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileGroupParent, setMobileGroupParent] = useState<string | null>(null);
  const [mobileNestedGroup, setMobileNestedGroup] = useState<string | null>(null);

  const closeAll = () => {
    setMobileOpen(false);
    setActiveCategory(null);
    setMobileGroupParent(null);
    setMobileNestedGroup(null);
    onNavigate?.();
  };

  if (variant === "desktop") {
    return (
      <div className="replica-nav-products">
        <button type="button" className="replica-nav-products-trigger">
          Products
          <ChevronDown className="replica-nav-products-chevron" />
        </button>
        <div className="replica-nav-products-panel">
          <div className="replica-nav-products-panel-inner">
            {categories.map((category) => {
              const hasSubs = (category.subcategories?.length ?? 0) > 0;
              const hasDirectProducts = (category.products?.length ?? 0) > 0;
              return (
              <div key={category.id} className="replica-nav-products-item">
                <Link
                  href={category.href ?? categorySelectionHref(category.id)}
                  className="replica-nav-products-row"
                  onClick={closeAll}
                >
                  {category.name}
                  {(hasSubs || hasDirectProducts) && (
                    <ChevronRight className="replica-nav-products-chevron" />
                  )}
                </Link>
                {!hasSubs && hasDirectProducts && (
                  <div className="replica-nav-products-sub">
                    {category.products!.map((p: Product) => (
                      <Link
                        key={p.id}
                        href={`/${category.id}/${p.id}`}
                        className="replica-nav-products-link"
                        onClick={closeAll}
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                )}
                {hasSubs && (
                  <div className="replica-nav-products-sub">
                    {category.subcategories!.map((sub: Subcategory) => {
                      const baseHref = subcategoryHref(category.id, sub.id);
                      const groups = sub.productGroups;

                      if (groups?.length) {
                        return (
                          <div key={sub.id} className="replica-nav-products-sub-item">
                            {sub.href ? (
                              <Link
                                href={sub.href}
                                className="replica-nav-products-subrow"
                                onClick={closeAll}
                              >
                                {sub.name}
                                <ChevronRight className="replica-nav-products-chevron" />
                              </Link>
                            ) : (
                              <span className="replica-nav-products-subrow">
                                {sub.name}
                                <ChevronRight className="replica-nav-products-chevron" />
                              </span>
                            )}
                            <div className="replica-nav-products-nested">
                              {groups.map((g: ProductGroup) =>
                                g.productGroups?.length ? (
                                  <div key={g.id} className="replica-nav-products-nest-item">
                                    <span className="replica-nav-products-subrow">
                                      {g.name}
                                      <ChevronRight className="replica-nav-products-chevron" />
                                    </span>
                                    <div className="replica-nav-products-nested replica-nav-products-nested-2">
                                      {g.productGroups.map((child) => (
                                        <Link
                                          key={child.id}
                                          href={
                                            child.href ??
                                            productGroupHref(category.id, sub.id, g.id, child.id)
                                          }
                                          className="replica-nav-products-link"
                                          onClick={closeAll}
                                        >
                                          {child.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <Link
                                    key={g.id}
                                    href={g.href ?? productGroupHref(category.id, sub.id, g.id)}
                                    className="replica-nav-products-link"
                                    onClick={closeAll}
                                  >
                                    {g.name}
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={sub.id}
                          href={sub.href ?? baseHref}
                          className="replica-nav-products-link"
                          onClick={closeAll}
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="replica-nav-products-mobile">
      <button
        type="button"
        className="replica-nav-mobile-section-hd"
        style={linkStyle}
        onClick={() => setMobileOpen((o) => !o)}
      >
        Products
        <ChevronDown
          className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
        />
      </button>
      {mobileOpen && (
        <div className="replica-nav-mobile-products-list">
          {categories.map((category) => {
            const isOpen = activeCategory === category.id;
            return (
              <div key={category.id}>
                <div className="replica-nav-mobile-cat" style={linkStyle}>
                  <Link
                    href={category.href ?? categorySelectionHref(category.id)}
                    onClick={closeAll}
                    style={{ flex: 1 }}
                  >
                    {category.name}
                  </Link>
                  <button
                    type="button"
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${category.name}`}
                    onClick={() => {
                      setActiveCategory(isOpen ? null : category.id);
                      setMobileGroupParent(null);
                      setMobileNestedGroup(null);
                    }}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
                {isOpen && (
                  <div className="replica-nav-mobile-sub-list">
                    {!category.subcategories?.length &&
                      category.products?.map((p: Product) => (
                        <Link
                          key={p.id}
                          href={`/${category.id}/${p.id}`}
                          onClick={closeAll}
                        >
                          <span className="replica-nav-mobile-link">
                            {p.name}
                          </span>
                        </Link>
                      ))}
                    {(category.subcategories ?? []).map((sub: Subcategory) => {
                      const baseHref = subcategoryHref(category.id, sub.id);
                      const subKey = `${category.id}/${sub.id}`;
                      const groups = sub.productGroups;

                      if (groups?.length) {
                        const groupsOpen = mobileGroupParent === subKey;
                        return (
                          <div key={sub.id}>
                            <button
                              type="button"
                              className="replica-nav-mobile-sub"
                              onClick={() => {
                                setMobileGroupParent(groupsOpen ? null : subKey);
                                setMobileNestedGroup(null);
                              }}
                            >
                              {sub.name}
                              <ChevronDown
                                className={`h-3.5 w-3.5 transition-transform ${groupsOpen ? "rotate-180" : ""}`}
                              />
                            </button>
                            {groupsOpen && (
                              <div className="replica-nav-mobile-nested">
                                {groups.map((g: ProductGroup) => {
                                  const nestKey = `${subKey}::${g.id}`;
                                  const nestOpen = mobileNestedGroup === nestKey;
                                  if (g.productGroups?.length) {
                                    return (
                                      <div key={g.id}>
                                        <button
                                          type="button"
                                          className="replica-nav-mobile-sub"
                                          onClick={() =>
                                            setMobileNestedGroup(nestOpen ? null : nestKey)
                                          }
                                        >
                                          {g.name}
                                          <ChevronDown
                                            className={`h-3.5 w-3.5 transition-transform ${nestOpen ? "rotate-180" : ""}`}
                                          />
                                        </button>
                                        {nestOpen && (
                                          <div className="replica-nav-mobile-nested">
                                            {g.productGroups.map((child) => (
                                              <Link
                                                key={child.id}
                                                href={
                                                  child.href ??
                                                  productGroupHref(category.id, sub.id, g.id, child.id)
                                                }
                                                onClick={closeAll}
                                              >
                                                <span className="replica-nav-mobile-link">
                                                  {child.name}
                                                </span>
                                              </Link>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  }
                                  return (
                                    <Link
                                      key={g.id}
                                      href={g.href ?? productGroupHref(category.id, sub.id, g.id)}
                                      onClick={closeAll}
                                    >
                                      <span className="replica-nav-mobile-link">{g.name}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <Link key={sub.id} href={sub.href ?? baseHref} onClick={closeAll}>
                          <span className="replica-nav-mobile-link">{sub.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}