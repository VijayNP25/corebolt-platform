import { getNewRoute } from "@/lib/route-mapping";
// Nav-sized catalogue view (not lib/subcategory-products), so these helpers
// can be used on the homepage without pulling in the full product data.
import { navCategoryHasDirectProducts, LIDAR_RADAR_PAGE } from "@/lib/catalog-nav";

export function categorySelectionHref(categoryId: string): string {
  // Categories that serve products directly skip the subcategory tier.
  if (navCategoryHasDirectProducts(categoryId)) {
    return `/${categoryId}`;
  }
  const oldRoute = `/${categoryId}/subcategories`;
  return getNewRoute(oldRoute) || oldRoute;
}

export function subcategoryHref(categoryId: string, subcategoryId: string): string {
  const oldRoute = `/${categoryId}/${subcategoryId}`;
  return getNewRoute(oldRoute) || oldRoute;
}

export function productGroupHref(
  categoryId: string,
  subcategoryId: string,
  groupId: string,
  childGroupId?: string
): string {
  if (childGroupId) {
    return `/${categoryId}/${subcategoryId}/${groupId}/${childGroupId}`;
  }
  return `/${categoryId}/${subcategoryId}/${groupId}`;
}

/** Homepage computing section cards */
export const COMPUTING_LINKS = {
  edgeComputers: categorySelectionHref("edge-computers"),
  panelPc: categorySelectionHref("industrial-panel-pc"),
} as const;

/** Homepage vision section cards */
export const VISION_LINKS = {
  lidar: categorySelectionHref("lidar"),
  radar: categorySelectionHref("radar"),
  /** "3D LiDARs" page: LiDARs / Radars cards */
  lidarRadar: LIDAR_RADAR_PAGE,
  cameras: categorySelectionHref("vision-systems-cameras"),
} as const;
/** Perception Kits page */
export const PERCEPTION_KITS_LINK = "/perception-kits";