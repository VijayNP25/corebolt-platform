import { categories, type Product } from "@/data/products";
import { getSubcategoryProductsFlat } from "@/lib/subcategory-products";

/** Main page of priced 3D LiDAR products. Manufacturer pages append `/${subcategoryId}`. */
export const LIDAR_ORDER_PATH = "/order-3d-lidar";
export const EDGE_ORDER_PATH = "/order-edge-computers";

export type PricedGroup = {
  id: string;
  name: string;
  products: Product[];
};

export type OrderCategory = {
  key: string;
  categoryId: string;
  path: string;
  brandsHref: string;
  brandsLabel: string;
  allLabel: string;
  title: string;
  description: string;
  groupTitle: (name: string) => string;
  groupDescription: (name: string) => string;
};

export const ORDER_CATEGORIES: Record<string, OrderCategory> = {
  lidar: {
    key: "lidar",
    categoryId: "lidar",
    path: LIDAR_ORDER_PATH,
    brandsHref: "/lidar-sensor-price-in-india",
    brandsLabel: "3D LiDAR brands",
    allLabel: "All priced LiDAR",
    title: "Order 3D LiDAR",
    description: "Priced 3D LiDAR sensors. Choose a manufacturer or browse every confirmed price.",
    groupTitle: (name) => `${name} LiDAR`,
    groupDescription: (name) => `Priced ${name} 3D LiDAR sensors.`,
  },
  "edge-computers": {
    key: "edge-computers",
    categoryId: "edge-computers",
    path: EDGE_ORDER_PATH,
    brandsHref: "/edge-computers/subcategories",
    brandsLabel: "Edge Computer series",
    allLabel: "All priced Edge Computers",
    title: "Order Edge Computers",
    description: "Priced Edge Computer products. Choose a series or browse every confirmed price.",
    groupTitle: (name) => name,
    groupDescription: (name) => `Priced ${name} products.`,
  },
};

/** A confirmed price is an existing numeric catalogue price greater than zero. */
export function hasConfirmedPrice(product: Product): boolean {
  return typeof product.price === "number" && Number.isFinite(product.price) && product.price > 0;
}

export function getPricedGroups(categoryId: string): PricedGroup[] {
  const category = categories.find((item) => item.id === categoryId);
  if (!category?.subcategories?.length) return [];

  return category.subcategories
    .map((subcategory) => ({
      id: subcategory.id,
      name: subcategory.name,
      products: getSubcategoryProductsFlat(subcategory).filter(hasConfirmedPrice),
    }))
    .filter((group) => group.products.length > 0);
}

export function getPricedGroup(categoryId: string, groupId: string): PricedGroup | undefined {
  return getPricedGroups(categoryId).find((group) => group.id === groupId);
}

export function pricedGroupName(categoryId: string, product: Product): string {
  if (!product.subcategory) return "";
  return getPricedGroup(categoryId, product.subcategory)?.name ?? "";
}

export type LidarManufacturer = PricedGroup;

export function getLidarOrderManufacturers(): PricedGroup[] {
  return getPricedGroups("lidar");
}

export function getLidarManufacturer(manufacturerId: string): PricedGroup | undefined {
  return getPricedGroup("lidar", manufacturerId);
}

export function lidarManufacturerName(product: Product): string {
  return pricedGroupName("lidar", product);
}
