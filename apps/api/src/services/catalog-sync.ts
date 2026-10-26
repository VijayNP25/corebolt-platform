import { eq } from 'drizzle-orm';
import { db } from '../db/client.js';
import { catalogSnapshots, categories, type Product } from '../db/schema.js';
import { STOREFRONT_CATALOG_KEY } from './catalog-publish.js';

type SnapProduct = {
  id?: string;
  name?: string;
  description?: string | null;
  overview?: string;
  price?: number | null;
  image?: string;
  images?: string[];
  category?: string;
  subcategory?: string;
  features?: string[];
  fileUrl?: string | null;
  hidden?: boolean;
};

type SnapGroup = {
  id?: string;
  name?: string;
  products?: SnapProduct[];
  productGroups?: SnapGroup[];
};

type SnapSubcategory = {
  id?: string;
  name?: string;
  description?: string;
  hidden?: boolean;
  products?: SnapProduct[];
  productGroups?: SnapGroup[];
};

type SnapCategory = {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  hidden?: boolean;
  products?: SnapProduct[];
  subcategories?: SnapSubcategory[];
};

export type CatalogCategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  isActive: boolean;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 200);
}

async function readSnapshot(): Promise<SnapCategory[] | null> {
  const row = await db.query.catalogSnapshots.findFirst({
    where: eq(catalogSnapshots.key, STOREFRONT_CATALOG_KEY),
  });
  if (!row || !Array.isArray(row.document)) return null;
  return row.document as SnapCategory[];
}

async function writeSnapshot(document: SnapCategory[], id: string) {
  await db
    .update(catalogSnapshots)
    .set({ document, updatedAt: new Date() })
    .where(eq(catalogSnapshots.id, id));
}

async function withSnapshot(mutate: (document: SnapCategory[]) => void) {
  const row = await db.query.catalogSnapshots.findFirst({
    where: eq(catalogSnapshots.key, STOREFRONT_CATALOG_KEY),
  });
  if (!row || !Array.isArray(row.document)) return;
  const document = row.document as SnapCategory[];
  mutate(document);
  await writeSnapshot(document, row.id);
}

function walkGroups(groups: SnapGroup[] | undefined, visit: (product: SnapProduct) => void) {
  for (const group of groups ?? []) {
    for (const product of group.products ?? []) visit(product);
    walkGroups(group.productGroups, visit);
  }
}

function eachProduct(document: SnapCategory[], visit: (product: SnapProduct) => void) {
  for (const category of document) {
    for (const product of category.products ?? []) visit(product);
    for (const subcategory of category.subcategories ?? []) {
      for (const product of subcategory.products ?? []) visit(product);
      walkGroups(subcategory.productGroups, visit);
    }
  }
}

function firstLeaf(groups: SnapGroup[]): SnapGroup | null {
  for (const group of groups) {
    if (group.productGroups?.length) {
      const nested = firstLeaf(group.productGroups);
      if (nested) return nested;
    }
    return group;
  }
  return null;
}

function priceOf(product: Product): number | null {
  if (product.pricingType !== 'FIXED' || product.priceInr == null) return null;
  const amount = Number(product.priceInr);
  return amount > 0 ? amount : null;
}

function applyProductFields(target: SnapProduct, product: Product) {
  target.name = product.name;
  if (product.description != null) target.description = product.description;
  target.price = priceOf(product);
  if (product.imageUrl) {
    target.image = product.imageUrl;
    if (Array.isArray(target.images) && target.images.length > 0) {
      target.images[0] = product.imageUrl;
    } else {
      target.images = [product.imageUrl];
    }
  }
  target.hidden = !product.isActive;
}

function findCategoryNode(document: SnapCategory[], slug: string) {
  const top = document.find((category) => category.id === slug);
  if (top) return { kind: 'category' as const, node: top };
  const splitAt = slug.indexOf('--');
  if (splitAt > 0) {
    const parent = document.find((category) => category.id === slug.slice(0, splitAt));
    const sub = parent?.subcategories?.find((item) => item.id === slug.slice(splitAt + 2));
    if (sub) return { kind: 'subcategory' as const, node: sub, parent };
  }
  for (const category of document) {
    const sub = category.subcategories?.find((item) => item.id === slug);
    if (sub) return { kind: 'subcategory' as const, node: sub, parent: category };
  }
  return null;
}

/** Copy a saved commerce product into the catalogue the website renders. */
export async function syncProductToCatalog(product: Product) {
  const document = await readSnapshot();
  if (!document) return;

  const specs = (product.specs ?? {}) as { sourceId?: string };
  const sourceId = typeof specs.sourceId === 'string' ? specs.sourceId : null;
  let found = false;
  eachProduct(document, (item) => {
    const id = typeof item.id === 'string' ? item.id : '';
    const matches = (sourceId && id === sourceId) || slugify(id) === product.slug;
    if (!matches) return;
    found = true;
    applyProductFields(item, product);
  });

  if (!found && product.isActive && product.categoryId) {
    const category = await db.query.categories.findFirst({
      where: eq(categories.id, product.categoryId),
    });
    if (category) {
      const node: SnapProduct = {
        id: product.slug,
        name: product.name,
        description: product.description,
        overview: product.shortDescription ?? undefined,
        price: priceOf(product),
        image: product.imageUrl ?? '',
        images: product.imageUrl ? [product.imageUrl] : [],
        features: [],
        fileUrl: null,
        hidden: false,
      };
      const placed = placeProduct(document, category.slug, category.parentId, node);
      found = placed;
    }
  }

  if (!found && !product.categoryId) return;

  const row = await db.query.catalogSnapshots.findFirst({
    where: eq(catalogSnapshots.key, STOREFRONT_CATALOG_KEY),
  });
  if (row) await writeSnapshot(document, row.id);
}

function placeProduct(
  document: SnapCategory[],
  slug: string,
  parentId: string | null,
  product: SnapProduct,
) {
  if (parentId) {
    const located = findCategoryNode(document, slug);
    if (located?.kind !== 'subcategory') return false;
    const sub = located.node;
    product.category = located.parent?.id;
    product.subcategory = sub.id;
    if (sub.productGroups?.length) {
      const leaf = firstLeaf(sub.productGroups);
      if (!leaf) return false;
      leaf.products = [...(leaf.products ?? []), product];
      return true;
    }
    sub.products = [...(sub.products ?? []), product];
    return true;
  }

  const top = document.find((category) => category.id === slug);
  if (!top) return false;
  product.category = top.id;
  top.products = [...(top.products ?? []), product];
  return true;
}

/** Copy a saved category into the catalogue the website renders. */
export async function syncCategoryToCatalog(category: CatalogCategoryRow) {
  await withSnapshot((document) => {
    const existing = findCategoryNode(document, category.slug);
    if (existing) {
      existing.node.name = category.name;
      if (category.description != null) existing.node.description = category.description;
      existing.node.hidden = !category.isActive;
      return;
    }

    if (category.parentId) return;

    document.push({
      id: category.slug,
      name: category.name,
      description: category.description ?? '',
      image: '',
      hidden: !category.isActive,
      products: [],
      subcategories: [],
    });
  });
}

/** Add a subcategory under its parent in the website catalogue. */
export async function syncNewSubcategory(
  category: CatalogCategoryRow,
  parentSlug: string,
) {
  await withSnapshot((document) => {
    if (findCategoryNode(document, category.slug)) {
      const existing = findCategoryNode(document, category.slug);
      if (!existing) return;
      existing.node.name = category.name;
      if (category.description != null) existing.node.description = category.description;
      existing.node.hidden = !category.isActive;
      return;
    }
    const parent = document.find((item) => item.id === parentSlug);
    if (!parent) return;
    const subId = category.slug.startsWith(`${parentSlug}--`)
      ? category.slug.slice(parentSlug.length + 2)
      : category.slug;
    parent.subcategories = [
      ...(parent.subcategories ?? []),
      {
        id: subId,
        name: category.name,
        description: category.description ?? '',
        hidden: !category.isActive,
        products: [],
      },
    ];
  });
}
