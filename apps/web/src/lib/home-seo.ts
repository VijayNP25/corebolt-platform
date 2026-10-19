export const HOME_META = {
  title:
    "Edge Computers & Perception Kits for Robotics | CORE BOLT",
  description:
    "CORE BOLT delivers AI Edge Computers, Industrial Computing Platforms, and Perception Kits for  autonomous and automation application.",
  keywords:
    "edge AI computers for robotics, perception kit, industrial AI computing, LiDAR integration kit, autonomous robot hardware, NVIDIA Jetson industrial computer, industrial AI computing, perception systems, 3D LiDAR sensors, depth cameras, robotics integration kits, NVIDIA Jetson edge computing, edge ai platform, machine vision hardware, autonomous machine hardware, Edge Computers",
  ogImage:
    "https://assets.core-bolt.com/website-assets/COREBOLT.webp",
  canonical: "https://www.core-bolt.com/",
  // The actual homepage hero is a CSS background-image (see .hero-bg in
  // replica-home.css), so the browser can't discover it until the
  // stylesheet loads. Preloading it directly fixes LCP discovery time.
  preloadImage:
    "https://assets.core-bolt.com/website-assets/COREBOLT.webp",
  // Phones get a text-only hero (the photo is hidden by CSS below 769px),
  // so only tablets/desktops should preload it.
  preloadImageMedia: "(min-width: 769px)",
} as const;

/**
 * Homepage JSON-LD, passed to useSeo({ jsonLd }) so it is server-rendered into
 * <head> (crawlers see it without running JS).
 *
 * Organization + WebSite are NOT repeated here: client/index.html already
 * ships them site-wide, and emitting them twice showed up as duplicate
 * Organization/WebSite entities on the homepage.
 */
export function buildHomePageSchema(
  productLists: {
    computing: { name: string; url: string }[];
    perception: { name: string; url: string }[];
    integrationKits: { name: string; url: string }[];
  }
) {
  const base = HOME_META.canonical.replace(/\/$/, "");
  const list = (name: string, items: { name: string; url: string }[]) => ({
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url.startsWith("#")
        ? `${HOME_META.canonical}${item.url}`
        : `${base}${item.url}`,
    })),
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      list("Industrial Computing Platforms", productLists.computing),
      list("Advanced Perception & Vision Systems", productLists.perception),
      list("Ready-to-Deploy Integration Kits", productLists.integrationKits),
    ],
  };
}
