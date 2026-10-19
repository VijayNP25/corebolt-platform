import {
  categories,
  type Category,
  type Product,
  type Subcategory,
  type ProductGroup,
} from "@/data/products";

import { CATEGORY_ALIASES } from "@/lib/catalog-nav";

export type { ProductGroup };

/**
 * Converts a raw product id (which may contain brackets, spaces, mixed case —
 * e.g. "[8MP] SG8-ISX028C-G2G") into a clean, URL-safe slug
 * (e.g. "8mp-sg8-isx028c-g2g"). Used for generating outbound links/sitemap
 * URLs. Inbound lookups stay tolerant of the old raw-id format via
 * productIdsMatch, so no redirects are required for not-yet-indexed URLs.
 */
export function slugify(str: string): string {
  return str
    .replace(/[\[\]]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function flattenProductGroups(groups: ProductGroup[] | undefined): Product[] {
  if (!groups?.length) return [];
  const out: Product[] = [];
  for (const g of groups) {
    if (g.products?.length) out.push(...g.products);
    if (g.productGroups?.length)
      out.push(...flattenProductGroups(g.productGroups));
  }
  return out;
}

export function getSubcategoryProductsFlat(sub: Subcategory): Product[] {
  if (sub.productGroups?.length) {
    return flattenProductGroups(sub.productGroups);
  }
  return sub.products;
}

/** Path of group ids from root to the group that directly contains the product (leaf group). */
function findProductGroupPathInner(
  groups: ProductGroup[] | undefined,
  productId: string,
  prefix: string[],
): string[] | null {
  if (!groups?.length) return null;
  for (const g of groups) {
    if (g.products?.some((p) => productIdsMatch(p.id, productId))) {
      return [...prefix, g.id];
    }
    if (g.productGroups?.length) {
      const hit = findProductGroupPathInner(g.productGroups, productId, [
        ...prefix,
        g.id,
      ]);
      if (hit) return hit;
    }
  }
  return null;
}

export function findProductGroupPath(
  sub: Subcategory,
  productId: string,
): string[] | null {
  if (!sub.productGroups?.length) return null;
  return findProductGroupPathInner(sub.productGroups, productId, []);
}

/** Single segment for flat groups; joined "a/b" for nested (back-compat). */
export function findProductGroupId(
  sub: Subcategory,
  productId: string,
): string | null {
  const path = findProductGroupPath(sub, productId);
  if (!path?.length) return null;
  if (path.length === 1) return path[0] ?? null;
  return path.join("/");
}

export function buildProductPath(product: Product): string {
  const slug = slugify(product.id);
  const category = categories.find((c) => c.id === product.category);
  // Category-level product (no subcategory) — short URL.
  if (!product.subcategory) {
    return `/${product.category}/${slug}`;
  }
  const sub = category?.subcategories?.find((s) => s.id === product.subcategory);
  if (!sub) {
    return `/${product.category}/${product.subcategory}/${slug}`;
  }
  // Group-path lookup still uses the raw id internally (matches stored data as-is).
  const path = findProductGroupPath(sub, product.id);
  if (path?.length) {
    return `/${product.category}/${product.subcategory}/${path.join("/")}/${slug}`;
  }
  return `/${product.category}/${product.subcategory}/${slug}`;
}

export function findProductInSubcategory(
  sub: Subcategory,
  productId: string,
): Product | undefined {
  const id = resolveProductId(productId);
  const products = getSubcategoryProductsFlat(sub);
  return products.find((p) => productIdsMatch(p.id, id));
}

/** Legacy / mistyped category slugs → canonical category id */
// Category aliases live in lib/catalog-nav.ts (shared with the nav helpers).

/** Legacy / mistyped product ids → canonical product id */
const PRODUCT_ID_ALIASES: Record<string, string> = {
  "jetson-agx-thor-developr-kit-128gb": "jetson-agx-thor-developer-kit-128gb",
  "jetson-t5000-som-128gb": "jetson-t5000-SOM-128gb",
};

function productIdsMatch(storedId: string, queryId: string): boolean {
  return (
    storedId === queryId ||
    storedId.toLowerCase() === queryId.toLowerCase() ||
    slugify(storedId) === slugify(queryId)
  );
}

export function resolveProductId(productId: string): string {
  const trimmed = productId.trim();
  return PRODUCT_ID_ALIASES[trimmed.toLowerCase()] ?? trimmed;
}

/** Legacy / mistyped subcategory slugs per category */
const SUBCATEGORY_ALIASES: Record<string, Record<string, string>> = {
  "industrial-edge-computers": {
    "industrial-edge-box-pc": "industrial-edgebox-pc",
    "industrial-panel-pc": "industrial-panel-Pc",
  },
};

function resolveCategoryId(categoryId: string): string {
  return CATEGORY_ALIASES[categoryId] ?? categoryId;
}

function resolveSubcategoryId(
  categoryId: string,
  subcategoryId: string,
): string {
  const catId = resolveCategoryId(categoryId);
  return SUBCATEGORY_ALIASES[catId]?.[subcategoryId] ?? subcategoryId;
}

export function findSubcategoryBySlug(
  categoryId: string,
  subcategoryId: string,
): Subcategory | undefined {
  const cat = categories.find((c) => c.id === resolveCategoryId(categoryId));
  const subId = resolveSubcategoryId(categoryId, subcategoryId);
  return cat?.subcategories?.find((s) => s.id === subId);
}

/** Find a product that lives directly on a category (no subcategory tier). */
export function findCategoryDirectProduct(
  categoryId: string,
  productId: string,
): Product | undefined {
  const cat = categories.find((c) => c.id === resolveCategoryId(categoryId));
  const id = resolveProductId(productId);
  return cat?.products?.find((p) => productIdsMatch(p.id, id));
}

/** True when a category serves products directly (no subcategories). */
export function categoryHasDirectProducts(categoryId: string): boolean {
  const cat = categories.find((c) => c.id === resolveCategoryId(categoryId));
  return Boolean(cat?.products?.length && !cat.subcategories?.length);
}

/** True if slug is a direct child group of the subcategory (not nested only). */
export function isTopLevelProductGroupSlug(
  sub: Subcategory,
  slug: string,
): boolean {
  return !!sub.productGroups?.some((g) => g.id === slug);
}

export function getProductGroup(
  sub: Subcategory,
  groupId: string,
): ProductGroup | undefined {
  return sub.productGroups?.find((g) => g.id === groupId);
}

export function getNestedProductGroup(
  sub: Subcategory,
  parentGroupId: string,
  childGroupId: string,
): ProductGroup | undefined {
  const parent = getProductGroup(sub, parentGroupId);
  return parent?.productGroups?.find((c) => c.id === childGroupId);
}

/** Total products under a group (leaf products + all nested groups). */
export function countGroupProducts(g: ProductGroup): number {
  if (g.productGroups?.length) {
    return g.productGroups.reduce((n, c) => n + countGroupProducts(c), 0);
  }
  return g.products?.length ?? 0;
}

/** First product image under a group (including nested tiers). */
export function getProductGroupImage(g: ProductGroup, fallback = ""): string {
  const products = flattenProductGroups([g]);
  const withImage = products.find((p) => p.image);
  return withImage?.image ?? fallback;
}

/** Description for a group card (explicit group description, else meta, else first product). */
export function getProductGroupDescription(g: ProductGroup): string {
  if (g.description?.trim()) return g.description.trim();
  if (g.metaDescription?.trim()) return g.metaDescription.trim();
  const products = flattenProductGroups([g]);
  const desc = products.find((p) => p.description)?.description;
  if (desc?.trim()) return desc.trim();
  const n = countGroupProducts(g);
  return `Browse ${n} ${n === 1 ? "product" : "products"} in ${g.name}.`;
}

/** Short hero blurb for a product group page. */
export function getProductGroupHeroDescription(g: ProductGroup): string {
  if (g.description?.trim()) return g.description.trim();
  const meta = g.metaDescription?.trim();
  if (meta) {
    return meta.length > 240 ? `${meta.slice(0, 237).trim()}...` : meta;
  }
  return getProductGroupDescription(g);
}

export function getProductGroupPageTitle(
  g: ProductGroup,
  categoryName: string,
): string {
  return g.metaTitle?.trim() || `${g.name} - ${categoryName} | CORE BOLT`;
}

export function locateProduct(productId: string): {
  category: Category;
  /** Undefined for products that live directly on a category. */
  subcategory: Subcategory | undefined;
  product: Product;
  productGroupPath: string[] | null;
} | null {
  const resolved = resolveProductId(productId);
  for (const category of categories) {
    if (category.products?.length) {
      const direct = category.products.find((p) => productIdsMatch(p.id, resolved));
      if (direct) {
        return {
          category,
          subcategory: undefined,
          product: direct,
          productGroupPath: null,
        };
      }
    }
    for (const subcategory of category.subcategories ?? []) {
      const product = findProductInSubcategory(subcategory, resolved);
      if (product) {
        return {
          category,
          subcategory,
          product,
          productGroupPath: findProductGroupPath(subcategory, resolved),
        };
      }
    }
  }
  return null;
}

/** Flattened static catalog — used as API fallback during migrate. */
export function getAllProductsFlat(): Product[] {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const category of categories) {
    for (const product of category.products ?? []) {
      if (!seen.has(product.id)) {
        seen.add(product.id);
        out.push(product);
      }
    }
    for (const subcategory of category.subcategories ?? []) {
      for (const product of getSubcategoryProductsFlat(subcategory)) {
        if (!seen.has(product.id)) {
          seen.add(product.id);
          out.push(product);
        }
      }
    }
  }
  return out;
}

export function getAllProductsForContactForm(): {
  value: string;
  label: string;
}[] {
  return [
    ...categories.flatMap((category: Category) => [
      ...(category.products ?? []).map((product: Product) => ({
        value: product.id,
        label: `${product.name} (${category.name})`,
      })),
      ...(category.subcategories ?? []).flatMap((subcategory: Subcategory) =>
        getSubcategoryProductsFlat(subcategory).map((product: Product) => ({
          value: product.id,
          label: `${product.name} (${category.name})`,
        })),
      ),
    ]),
    { value: "other", label: "Other" },
  ];
}

export interface PerceptionKitProductOption {
  value: string;
  label: string;
}

/** All products under a category, flattened across subcategories/groups. */
function getCategoryProductsFlat(categoryId: string): Product[] {
  const category = categories.find((c: Category) => c.id === categoryId);
  if (!category) return [];

  return [
    ...(category.products ?? []),
    ...(category.subcategories ?? []).flatMap(
      (subcategory: Subcategory) => getSubcategoryProductsFlat(subcategory),
    ),
  ];
}

/** Sensing camera options for the Perception Kit modal. */
export function getSensingCameraOptionsForPerceptionKit(): PerceptionKitProductOption[] {
  const category = categories.find(
    (c: Category) => c.id === "vision-systems-cameras",
  );
  const subcategory = category?.subcategories?.find(
    (s) => s.id === "sensing-cameras",
  );

  if (!subcategory) return [];

  return getSubcategoryProductsFlat(subcategory).map((product: Product) => ({
    value: product.id,
    label: product.name,
  }));
}

/** All LiDAR options across subcategories and brands. */
export function getLidarOptionsForPerceptionKit(): PerceptionKitProductOption[] {
  return getCategoryProductsFlat("lidar").map((product: Product) => ({
    value: product.id,
    label: product.name,
  }));
}
