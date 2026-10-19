"use client";

import { useState, type CSSProperties, type MouseEvent } from "react";
import { UserRound } from "lucide-react";
import { Link, useLocation } from "@/lib/wouter-compat";
import CoreBoltLogo from "@/components/core-bolt-logo";
import CurrencySwitcher from "@/components/currency-switcher";
import CartNavLink from "@/components/commerce/cart-nav-link";
import ReplicaProductsMenu from "@/components/replica-home/replica-products-menu";
import { navCategories as categories } from "@/lib/catalog-nav";
import { categorySelectionHref } from "@/lib/replica-product-routes";
import { getMe } from "@/lib/auth";
import { useRouter } from "@/i18n/routing";
import "@/styles/currency-switcher.css";

const SECTION_LINKS = [
  { id: "computing", label: "Compute" },
  { id: "vision", label: "Vision" },
  { id: "kits", label: "Kits" },
] as const;

export type ReplicaPageId = "about" | "contact";

/**
 * Context menu for inner pages. When a page passes a trail, the nav shows
 * Home -> Products dropdown -> each step of the trail (the last one = current page) -> the sibling
 * category -> Blogs -> Contact Us, instead of the homepage menu. e.g.
 *   category:    Home · LiDARs · Vision Systems & Cameras · Blogs · Contact Us
 *   subcategory: Home · LiDARs · Hesai · Vision Systems & Cameras · Blogs · Contact Us
 *   product:     Home · LiDARs · Hesai · XT32M · Vision Systems & Cameras · Contact Us
 */
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
  const sibling = categories.find((c) => c.id === siblingId);
  if (!sibling) return undefined;
  return { label: sibling.name, href: categorySelectionHref(sibling.id) };
}

export function ReplicaNav({
  dark,
  currentPage,
  trail,
  showBlogs = true,
  sibling,
}: {
  dark: boolean;
  currentPage?: ReplicaPageId;
  trail?: NavTrailItem[];
  showBlogs?: boolean;
  /** Sibling category linked right after the trail, e.g. LiDARs -> "Vision Systems & Cameras". */
  sibling?: NavTrailItem;
  onToggleTheme?: () => void;
  themeIcon?: string;
}) {
  const [location] = useLocation();
  const router = useRouter();
  const onHome = location === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const goCartMobile = async (e: MouseEvent) => {
    e.preventDefault();
    closeMenu();
    const user = await getMe();
    if (!user) {
      router.push("/login?next=/cart");
      return;
    }
    router.push("/cart");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  };

  const linkStyle: CSSProperties | undefined = menuOpen
    ? { color: dark ? "rgba(255,255,255,.85)" : "var(--ink)" }
    : undefined;

  const sectionLink = (id: string, label: string) => {
    if (onHome) {
      return (
        <li key={id}>
          <a
            href={`#${id}`}
            style={linkStyle}
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
        <Link href={`/#${id}`} style={linkStyle} onClick={closeMenu}>
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
            <Link
              href="/login"
              className="nav-icon-btn"
              aria-label="Sign in"
              onClick={closeMenu}
            >
              <UserRound size={18} strokeWidth={1.75} aria-hidden />
              <span className="nav-icon-btn__label">Sign in</span>
            </Link>
            <CartNavLink variant="icon" onClick={closeMenu} />
            <Link href="/contact-us" className="nav-cta" onClick={closeMenu}>
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="nav-main">
        <div className="nav-inner">
          <CoreBoltLogo onClick={closeMenu} />
          <ul
            className={`nav-links${menuOpen ? " nav-links--open" : ""}${trail?.length ? " nav-links--trail" : ""}`}
            id="replica-nav-menu"
            style={
              menuOpen
                ? { background: dark ? "#141414" : "#fff" }
                : undefined
            }
          >
            {trail?.length ? (
              <>
                <li>
                  <Link href="/" style={linkStyle} onClick={closeMenu}>
                    Home
                  </Link>
                </li>
                <li className="replica-nav-products-li">
                  <ReplicaProductsMenu
                    variant="desktop"
                    onNavigate={closeMenu}
                  />
                </li>
                <li className="replica-nav-products-mobile-li">
                  <ReplicaProductsMenu
                    variant="mobile"
                    linkStyle={linkStyle}
                    onNavigate={closeMenu}
                  />
                </li>
                {trail.map((item, i) => {
                  const current = i === trail.length - 1;
                  return (
                    <li key={item.href + i}>
                      <Link
                        href={item.href}
                        className={`nav-trail-link${current ? " active" : ""}`}
                        aria-current={current ? "page" : undefined}
                        title={item.label}
                        style={linkStyle}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
                {sibling && (
                  <li>
                    <Link
                      href={sibling.href}
                      className="nav-trail-link"
                      title={sibling.label}
                      style={linkStyle}
                      onClick={closeMenu}
                    >
                      {sibling.label}
                    </Link>
                  </li>
                )}
                {showBlogs && (
                  <li>
                    <Link href="/blog" style={linkStyle} onClick={closeMenu}>
                      Blog
                    </Link>
                  </li>
                )}
              </>
            ) : (
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
                    linkStyle={linkStyle}
                    onNavigate={closeMenu}
                  />
                </li>
                <li>
                  <Link href="/blog" style={linkStyle} onClick={closeMenu}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className={currentPage === "about" ? "active" : undefined}
                    style={linkStyle}
                    onClick={closeMenu}
                  >
                    About
                  </Link>
                </li>
              </>
            )}
            <li className="replica-nav-mobile-cta-li">
              <div className="replica-nav-currency-mobile">
                <CurrencySwitcher dark={dark} style={linkStyle} />
              </div>
              <Link href="/cart" style={linkStyle} onClick={goCartMobile}>
                Cart
              </Link>
              <Link href="/login" style={linkStyle} onClick={closeMenu}>
                Sign in
              </Link>
              <Link
                href="/contact-us"
                className="replica-nav-mobile-cta"
                style={linkStyle}
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </li>
          </ul>
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
