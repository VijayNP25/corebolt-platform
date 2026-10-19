"use client";

import { useState } from "react";
import { Link, useLocation } from "@/lib/wouter-compat";
import { ChevronDown, ChevronLeft, Menu, X } from "lucide-react";
import { categories, type Product, type Subcategory, type ProductGroup } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getNewRoute } from "@/lib/route-mapping";
import { cn } from "@/lib/utils";
import { useHomeNavTone } from "@/components/home/use-home-nav-tone";

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  /** `categoryId/subcategoryId` when mobile shows productGroups under that sub */
  const [mobileGroupParent, setMobileGroupParent] = useState<string | null>(
    null
  );
  /** Nested productGroups under a top-level group (mobile): `${subKey}::${groupId}` */
  const [mobileNestedGroup, setMobileNestedGroup] = useState<string | null>(
    null
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const isHome = location === "/";
  const overLight = useHomeNavTone(isHome);

  const navLinkClass = cn(
    "text-sm font-medium transition-colors duration-300 cursor-pointer hover:underline hover:underline-offset-8",
    isHome && overLight
      ? "text-[#475569] hover:text-[#76b900] hover:decoration-[#76b900]"
      : "text-muted-foreground hover:text-primary hover:decoration-primary"
  );

  const productsTriggerClass = cn(
    "hover:underline hover:underline-offset-8 transition-colors duration-300 flex items-center",
    isHome && overLight
      ? "text-[#0f1419] hover:text-[#76b900]"
      : "text-white hover:text-primary"
  );

  const navigateToSection = (sectionId: string) => {
    if (location !== "/") {
      // If not on home page, navigate to home first
      setLocation("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileOpen(false); // Close mobile menu if open
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 border-b transition-all duration-300",
        isHome
          ? overLight
            ? "h-[72px] bg-white/95 backdrop-blur-xl border-[#e2e8e0] shadow-[0_2px_20px_rgba(15,20,25,0.08)]"
            : "h-[72px] bg-[#0a0d12]/90 backdrop-blur-xl border-border/60 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "h-16 bg-background border-border"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/">
            <div
              className="text-2xl font-bold cursor-pointer"
              style={{
                color: isHome && overLight ? "#0f1419" : "white",
                fontFamily: "Bank Gothic Medium BT",
                fontSize: "1.75rem",
              }}
            >
              CORE BOLT
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigateToSection("hero")}
              className={navLinkClass}
            >
              Home
            </button>

            <button
              onClick={() => navigateToSection("about")}
              className={navLinkClass}
            >
              About
            </button>

            <button
              onClick={() => navigateToSection("computing-platforms")}
              className={navLinkClass}
            >
              Computing
            </button>
            <button
              onClick={() => navigateToSection("perception-systems")}
              className={navLinkClass}
            >
              Vision
            </button>
            <button
              onClick={() => navigateToSection("integration-kits")}
              className={navLinkClass}
            >
              Kits
            </button>
            <button
              onClick={() => navigateToSection("applications")}
              className={navLinkClass}
            >
              Applications
            </button>

            {/* Products Dropdown */}
            {/* <div className="relative group">
              <button className="text-muted-foreground hover:text-primary hover:underline hover:underline-offset-8 hover:decoration-white transition-colors duration-300 flex items-center">
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                {categories.map((category) => (
                  <div key={category.id} className="relative group/item">
                    <Link href={`/${category.id}`}>
                      <span className="block px-4 py-3 text-sm text-black hover:bg-muted hover:text-primary transition-colors duration-300 flex items-center justify-between cursor-pointer">
                        {category.name} <ChevronRight className="h-4 w-4" />
                      </span>
                    </Link>

                    <div
                      className="absolute left-full top-0 ml-1 w-64 bg-white rounded-lg shadow-xl border border-border opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-20 
                      "
                    >
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/${category.id}/${sub.id}`}
                        >
                          <span className="block px-4 py-2 text-sm text-black hover:bg-muted hover:text-primary transition-colors duration-300 cursor-pointer">
                            {sub.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            <div className="relative group">
              <button className={productsTriggerClass}>
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {/* Main Dropdown - DARK THEME (right-aligned + submenus open left so deep tiers stay in view on md/lg) */}
              <div className="absolute right-0 mt-3 w-64 max-w-[min(16rem,calc(100vw-2rem))] bg-[#171b25] rounded-md shadow-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
                {categories.map((category) => {
                  const hasSubs = (category.subcategories?.length ?? 0) > 0;
                  const hasDirectProducts = (category.products?.length ?? 0) > 0;
                  const hasSubmenu = hasSubs || hasDirectProducts;
                  return (
                  <div key={category.id} className="relative group/item">
                    {hasDirectProducts && !hasSubs ? (
                      <Link href={`/${category.id}`}>
                        <span className="flex items-center justify-between px-4 py-3 text-sm text-white hover:bg-gray-800 hover:text-primary transition-colors cursor-pointer">
                          {category.name}
                          <ChevronLeft className="h-4 w-4 text-gray-400 group-hover/item:text-primary" />
                        </span>
                      </Link>
                    ) : (
                      <span className="flex items-center justify-between px-4 py-3 text-sm text-white hover:bg-gray-800 hover:text-primary transition-colors cursor-pointer">
                        {category.name}
                        {hasSubmenu && (
                          <ChevronLeft className="h-4 w-4 text-gray-400 group-hover/item:text-primary" />
                        )}
                      </span>
                    )}

                    {/* Submenu — direct products (no subcategory tier) */}
                    {!hasSubs && hasDirectProducts && (
                      <div className="absolute top-0 right-full mr-2 mt-1 w-64 max-w-[min(16rem,calc(100vw-2rem))] bg-[#171b25] rounded-md shadow-lg border border-gray-700 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-40">
                        {category.products!.map((p: Product) => (
                          <Link key={p.id} href={`/${category.id}/${p.id}`}>
                            <span className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-primary transition-colors cursor-pointer">
                              {p.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Submenu */}
                    {hasSubs && (
                      <div className="absolute top-0 right-full mr-2 mt-1 w-64 max-w-[min(16rem,calc(100vw-2rem))] bg-[#171b25] rounded-md shadow-lg border border-gray-700 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-40">
                        {category.subcategories!.map((sub: Subcategory) => {
                          const oldRoute = `/${category.id}/${sub.id}`;
                          const newRoute = getNewRoute(oldRoute);
                          const baseHref = newRoute || oldRoute;
                          const groups = sub.productGroups;

                          if (groups?.length) {
                            return (
                              <div
                                key={sub.id}
                                className="relative group/subrow"
                              >
                                <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-primary transition-colors cursor-default">
                                  <span className="pr-2">{sub.name}</span>
                                  <ChevronLeft className="h-4 w-4 shrink-0 text-gray-500 group-hover/subrow:text-primary" />
                                </div>
                                <div className="absolute top-0 right-full mr-2 w-56 max-w-[min(14rem,calc(100vw-2rem))] bg-[#171b25] rounded-md shadow-lg border border-gray-700 opacity-0 invisible group-hover/subrow:opacity-100 group-hover/subrow:visible transition-all duration-200 z-50">
                                  {groups.map((g: ProductGroup) =>
                                    g.productGroups?.length ? (
                                      <div
                                        key={g.id}
                                        className="relative group/nestedg"
                                      >
                                        <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-primary transition-colors cursor-default">
                                          <span className="pr-2">{g.name}</span>
                                          <ChevronLeft className="h-4 w-4 shrink-0 text-gray-500 group-hover/nestedg:text-primary" />
                                        </div>
                                        <div className="absolute top-0 right-full mr-2 w-56 max-w-[min(14rem,calc(100vw-2rem))] bg-[#171b25] rounded-md shadow-lg border border-gray-700 opacity-0 invisible group-hover/nestedg:opacity-100 group-hover/nestedg:visible transition-all duration-200 z-[60]">
                                          {g.productGroups.map((child) => (
                                            <Link
                                              key={child.id}
                                              href={`/${category.id}/${sub.id}/${g.id}/${child.id}`}
                                            >
                                              <span className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-primary transition-colors cursor-pointer">
                                                {child.name}
                                              </span>
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      <Link
                                        key={g.id}
                                        href={`/${category.id}/${sub.id}/${g.id}`}
                                      >
                                        <span className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-primary transition-colors cursor-pointer">
                                          {g.name}
                                        </span>
                                      </Link>
                                    )
                                  )}
                                </div>
                              </div>
                            );
                          }

                          return (
                            <Link key={sub.id} href={baseHref}>
                              <span className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-primary transition-colors cursor-pointer">
                                {sub.name}
                              </span>
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

            <Link href="/blog">
              <button className={navLinkClass}>Blog</button>
            </Link>
            <button
              type="button"
              onClick={() => navigateToSection("contact")}
              className="bg-primary text-primary-foreground font-semibold px-5 py-2 rounded-lg hover:bg-secondary transition-colors text-sm"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    isHome && overLight && "text-[#0f1419] hover:bg-[#76b900]/10"
                  )}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  <button
                    onClick={() => navigateToSection("hero")}
                    className="text-lg font-semibold text-left hover:text-primary transition-colors"
                  >
                    Home
                  </button>

                  <button
                    onClick={() => navigateToSection("about")}
                    className="text-lg font-semibold text-left hover:text-primary transition-colors"
                  >
                    About
                  </button>
                  <button
                    onClick={() => navigateToSection("computing-platforms")}
                    className="text-lg font-semibold text-left hover:text-primary transition-colors"
                  >
                    Computing
                  </button>
                  <button
                    onClick={() => navigateToSection("perception-systems")}
                    className="text-lg font-semibold text-left hover:text-primary transition-colors"
                  >
                    Vision
                  </button>
                  <button
                    onClick={() => navigateToSection("integration-kits")}
                    className="text-lg font-semibold text-left hover:text-primary transition-colors"
                  >
                    Kits
                  </button>
                  <button
                    onClick={() => navigateToSection("applications")}
                    className="text-lg font-semibold text-left hover:text-primary transition-colors"
                  >
                    Applications
                  </button>

                  <div>
                    <div className="text-lg font-semibold text-muted-foreground mb-2">
                      Products
                    </div>
                    <div className="flex flex-col gap-2">
                      {categories.map((category) => {
                        const isOpen = activeDropdown === category.id;
                        return (
                          <div key={category.id}>
                            <button
                              onClick={() => {
                                setActiveDropdown(isOpen ? null : category.id);
                                setMobileGroupParent(null);
                                setMobileNestedGroup(null);
                              }}
                              className="w-full text-left text-base font-medium text-muted-foreground hover:text-primary transition-colors flex justify-between items-center"
                            >
                              {category.name}
                              <ChevronDown
                                className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""
                                  }`}
                              />
                            </button>
                            {isOpen && (
                              <div className="ml-4 mt-2 flex flex-col gap-1">
                                {!category.subcategories?.length &&
                                  category.products?.map((p: Product) => (
                                    <Link
                                      key={p.id}
                                      href={`/${category.id}/${p.id}`}
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                                        {p.name}
                                      </span>
                                    </Link>
                                  ))}
                                {(category.subcategories ?? []).map((sub: Subcategory) => {
                                  const oldRoute = `/${category.id}/${sub.id}`;
                                  const newRoute = getNewRoute(oldRoute);
                                  const baseHref = newRoute || oldRoute;
                                  const subKey = `${category.id}/${sub.id}`;
                                  const groups = sub.productGroups;

                                  if (groups?.length) {
                                    const groupsOpen =
                                      mobileGroupParent === subKey;
                                    return (
                                      <div key={sub.id} className="flex flex-col">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const next = groupsOpen
                                              ? null
                                              : subKey;
                                            setMobileGroupParent(next);
                                            setMobileNestedGroup(null);
                                          }}
                                          className="w-full text-left text-sm text-muted-foreground hover:text-primary flex justify-between items-center py-0.5"
                                        >
                                          {sub.name}
                                          <ChevronDown
                                            className={`w-4 h-4 shrink-0 transition-transform ${groupsOpen ? "rotate-180" : ""}`}
                                          />
                                        </button>
                                        {groupsOpen && (
                                          <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-border pl-2">
                                            {groups.map((g: ProductGroup) => {
                                              const nestKey = `${subKey}::${g.id}`;
                                              const nestOpen =
                                                mobileNestedGroup === nestKey;
                                              if (g.productGroups?.length) {
                                                return (
                                                  <div key={g.id} className="flex flex-col">
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        setMobileNestedGroup(
                                                          nestOpen ? null : nestKey
                                                        )
                                                      }
                                                      className="w-full text-left text-sm text-muted-foreground hover:text-primary flex justify-between items-center py-0.5"
                                                    >
                                                      {g.name}
                                                      <ChevronDown
                                                        className={`w-4 h-4 shrink-0 transition-transform ${nestOpen ? "rotate-180" : ""}`}
                                                      />
                                                    </button>
                                                    {nestOpen && (
                                                      <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-border pl-2">
                                                        {g.productGroups.map(
                                                          (child) => (
                                                            <Link
                                                              key={child.id}
                                                              href={`/${category.id}/${sub.id}/${g.id}/${child.id}`}
                                                              onClick={() => {
                                                                setMobileOpen(false);
                                                                setMobileGroupParent(
                                                                  null
                                                                );
                                                                setMobileNestedGroup(
                                                                  null
                                                                );
                                                              }}
                                                            >
                                                              <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                                                                {child.name}
                                                              </span>
                                                            </Link>
                                                          )
                                                        )}
                                                      </div>
                                                    )}
                                                  </div>
                                                );
                                              }
                                              return (
                                                <Link
                                                  key={g.id}
                                                  href={`/${category.id}/${sub.id}/${g.id}`}
                                                  onClick={() => {
                                                    setMobileOpen(false);
                                                    setMobileGroupParent(null);
                                                    setMobileNestedGroup(null);
                                                  }}
                                                >
                                                  <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                                                    {g.name}
                                                  </span>
                                                </Link>
                                              );
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  }

                                  return (
                                    <Link
                                      key={sub.id}
                                      href={baseHref}
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                                        {sub.name}
                                      </span>
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

                  <Link href="/blog">
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-semibold text-left hover:text-primary transition-colors w-full"
                    >
                      Blog
                    </button>
                  </Link>

                  <button
                    onClick={() => navigateToSection("contact")}
                    className="bg-primary text-white text-center font-medium py-2 rounded-full hover:bg-primary/90 transition-all"
                  >
                    Contact Us
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
