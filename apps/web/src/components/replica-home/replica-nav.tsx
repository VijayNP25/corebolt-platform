"use client";

import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { Link, useLocation } from "@/lib/wouter-compat";
import { AUTH_CHANGED_EVENT, getMe } from "@/lib/auth";
import CoreBoltLogo from "@/components/core-bolt-logo";
import CurrencySwitcher from "@/components/currency-switcher";
import CartNavLink from "@/components/commerce/cart-nav-link";
import WishlistNavLink from "@/components/commerce/wishlist-nav-link";
import CatalogSearch from "@/components/catalog/catalog-search";
import ReplicaProductsMenu from "@/components/replica-home/replica-products-menu";
import { getNavCategories } from "@/lib/catalog-nav";
import { categorySelectionHref } from "@/lib/replica-product-routes";
import "@/styles/currency-switcher.css";

const SECTION_LINKS = [
  { id: "computing", label: "Compute" },
  { id: "vision", label: "Vision sensor systems" },
  { id: "kits", label: "Perception Kits" },
] as const;

export type ReplicaPageId = "about" | "contact";

/** One step in the breadcrumb shown under the header. */
export interface NavTrailItem {
  label: string;
  href: string;
}

/**
 * Sibling category shown beside the current one in the trail:
 *   LiDARs  <-> Vision Systems & Cameras
 *   Edge Computers <-> Industrial Panel Computer
 * Edit the pairs here to change what the nav links to.
 */
const SIBLING_CATEGORY: Record<string, string> = {
  lidar: "vision-systems-cameras",
  "vision-systems-cameras": "lidar",
  "edge-computers": "industrial-panel-pc",
  "industrial-panel-pc": "edge-computers",
};

export function navSiblingForCategory(
  categoryId?: string | null
): NavTrailItem | undefined {
  const siblingId = categoryId ? SIBLING_CATEGORY[categoryId] : undefined;
  if (!siblingId) return undefined;
  const sibling = getNavCategories().find((c) => c.id === siblingId);
  if (!sibling) return undefined;
  return { label: sibling.name, href: categorySelectionHref(sibling.id) };
}

export function ReplicaNav({
  dark,
  currentPage,
}: {
  dark: boolean;
  currentPage?: ReplicaPageId;
  /** Kept so existing pages still type-check. The trail renders under the header, not in this menu. */
  trail?: NavTrailItem[];
  showBlogs?: boolean;
  /** Sibling category linked right after the trail, e.g. LiDARs -> "Vision Systems & Cameras". */
  sibling?: NavTrailItem;
  onToggleTheme?: () => void;
  themeIcon?: string;
}) {
  const [location] = useLocation();
  const onHome = location === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getMe().then((user) => {
      if (!cancelled) setSignedIn(Boolean(user));
    });
    return () => {
      cancelled = true;
    };
  }, [location]);

  useEffect(() => {
    const refresh = () => {
      getMe().then((user) => setSignedIn(Boolean(user)));
    };
    window.addEventListener(AUTH_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, refresh);
  }, []);

  const accountHref = signedIn ? "/account" : "/login";
  const accountLabel = signedIn ? "Account" : "Sign in";

  const closeMenu = () => setMenuOpen(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  };

  const sectionLink = (id: string, label: string) => {
    if (onHome) {
      return (
        <li key={id}>
          <a
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(id);
            }}
          >
            {label}
          </a>
        </li>
      );
    }

    return (
      <li key={id}>
        <Link href={`/#${id}`} onClick={closeMenu}>
          {label}
        </Link>
      </li>
    );
  };

  return (
    <nav id="replica-nav">
      <div className="nav-utility">
        <div className="nav-utility-inner">
          <CurrencySwitcher dark={dark} />
          <div className="nav-utility-actions">
            <CatalogSearch />
            <Link
              href={accountHref}
              className="nav-icon-btn"
              aria-label={accountLabel}
              onClick={closeMenu}
            >
              <UserRound size={18} strokeWidth={1.75} aria-hidden />
              <span className="nav-icon-btn__label">{accountLabel}</span>
            </Link>
            <WishlistNavLink onClick={closeMenu} />
            <CartNavLink variant="icon" onClick={closeMenu} />
          </div>
        </div>
      </div>

      <div className="nav-main">
        <div className="nav-inner">
          <CoreBoltLogo onClick={closeMenu} />
          <ul
            className={`nav-links${menuOpen ? " nav-links--open" : ""}`}
            id="replica-nav-menu"
          >
            <>
              {SECTION_LINKS.map(({ id, label }) => sectionLink(id, label))}
              <li className="replica-nav-products-li">
                <ReplicaProductsMenu
                  variant="desktop"
                  onNavigate={closeMenu}
                />
              </li>
              <li className="replica-nav-products-mobile-li">
                <ReplicaProductsMenu
                  variant="mobile"
                  onNavigate={closeMenu}
                />
              </li>
              <li>
                <Link
                  href="/store"
                  className={location.startsWith("/store") ? "active" : undefined}
                  onClick={closeMenu}
                >
                  Store
                </Link>
              </li>
              <li>
                <Link href="/blog" onClick={closeMenu}>
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className={currentPage === "about" ? "active" : undefined}
                  onClick={closeMenu}
                >
                  About Us
                </Link>
              </li>
            </>
            <li className="replica-nav-mobile-cta-li">
              <div className="replica-nav-currency-mobile">
                <CurrencySwitcher dark={dark} />
              </div>
              <Link href="/cart" onClick={closeMenu}>
                Cart
              </Link>
              <Link href={accountHref} onClick={closeMenu}>
                {accountLabel}
              </Link>
              <Link
                href="/contact-us"
                className="replica-nav-mobile-cta"
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <Link href="/contact-us" className="nav-cta nav-main-cta" onClick={closeMenu}>
            Contact Us
          </Link>
          <div
            className="ham"
            role="button"
            tabIndex={0}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            onKeyDown={(e) => e.key === "Enter" && setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
}
