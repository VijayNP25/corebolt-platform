import { eq, notInArray } from 'drizzle-orm';
import type { Db } from '../db/client.js';
import { catalogSnapshots, categories, products } from '../db/schema.js';
import { NotFoundError } from '../lib/errors.js';
import { db } from '../db/client.js';

export const STOREFRONT_CATALOG_KEY = 'storefront';

type SourceProduct = {
  id: string;
  name: string;
  description?: string | null;
  overview?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  price?: number | null;
  image?: string;
  images?: string[];
  category: string;
  subcategory?: string;
  features?: string[];
};

type SourceGroup = {
  products?: SourceProduct[];
  productGroups?: SourceGroup[];
};

type SourceSubcategory = {
  id: string;
  name: string;
  products?: SourceProduct[];
  productGroups?: SourceGroup[];
};

export type SourceCategory = {
  id: string;
  name: string;
  description?: string;
  subcategories?: SourceSubcategory[];
  products?: SourceProduct[];
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 200);
}

function flattenGroups(groups: SourceGroup[] | undefined): SourceProduct[] {
  if (!groups?.length) return [];
  const out: SourceProduct[] = [];
  for (const group of groups) {
    if (group.products?.length) out.push(...group.products);
    if (group.productGroups?.length) out.push(...flattenGroups(group.productGroups));
  }
  return out;
}

function flattenSubcategory(sub: SourceSubcategory): SourceProduct[] {
  if (sub.products?.length) return sub.products;
  return flattenGroups(sub.productGroups);
}

function allProducts(sourceCategories: SourceCategory[]): SourceProduct[] {
  const seen = new Set<string>();
  const out: SourceProduct[] = [];
  for (const category of sourceCategories) {
    for (const product of category.products ?? []) {
      if (!seen.has(product.id)) {
        seen.add(product.id);
        out.push(product);
      }
    }
    for (const subcategory of category.subcategories ?? []) {
      for (const product of flattenSubcategory(subcategory)) {
        if (!seen.has(product.id)) {
          seen.add(product.id);
          out.push(product);
        }
      }
    }
  }
  return out;
}

/**
 * Write the website catalogue into the database.
 * The snapshot is the tree the site renders. Product rows are the same items
 * for checkout. Existing shipping amounts are left unchanged.
 */
export async function publishStorefrontCatalog(database: Db, sourceCategories: SourceCategory[]) {
  const categoryIdBySource = new Map<string, string>();

  for (const [index, cat] of sourceCategories.entries()) {
    const slug = (cat.id || slugify(cat.name)).slice(0, 200);
    let row = await database.query.categories.findFirst({
      where: eq(categories.slug, slug),
    });
    if (!row) {
      const [created] = await database
        .insert(categories)
        .values({
          name: cat.name.slice(0, 200),
          slug,
          description: cat.description ?? null,
          sortOrder: index + 1,
          isActive: true,
        })
        .returning();
      row = created;
    } else {
      const [updated] = await database
        .update(categories)
        .set({
          name: cat.name.slice(0, 200),
          description: cat.description ?? null,
          sortOrder: index + 1,
          isActive: true,
        })
        .where(eq(categories.id, row.id))
        .returning();
      row = updated ?? row;
    }
    if (!row) continue;
    categoryIdBySource.set(cat.id, row.id);

    for (const [sIndex, sub] of (cat.subcategories ?? []).entries()) {
      const subSlug = `${slug}--${sub.id || slugify(sub.name)}`.slice(0, 200);
      let subRow = await database.query.categories.findFirst({
        where: eq(categories.slug, subSlug),
      });
      if (!subRow) {
        const [created] = await database
          .insert(categories)
          .values({
            name: sub.name.slice(0, 200),
            slug: subSlug,
            parentId: row.id,
            sortOrder: sIndex + 1,
            isActive: true,
          })
          .returning();
        subRow = created;
      } else {
        const [updated] = await database
          .update(categories)
          .set({
            name: sub.name.slice(0, 200),
            parentId: row.id,
            sortOrder: sIndex + 1,
            isActive: true,
          })
          .where(eq(categories.id, subRow.id))
          .returning();
        subRow = updated ?? subRow;
      }
      if (subRow) categoryIdBySource.set(`${cat.id}/${sub.id}`, subRow.id);
    }
  }

  const all = allProducts(sourceCategories);
  const slugs: string[] = [];
  let created = 0;
  let updated = 0;

  for (const product of all) {
    const productSlug = slugify(product.id || product.name);
    slugs.push(productSlug);
    const categoryKey = product.subcategory
      ? `${product.category}/${product.subcategory}`
      : product.category;
    const categoryId =
      categoryIdBySource.get(categoryKey) ?? categoryIdBySource.get(product.category) ?? null;
    const hasPrice = product.price != null && Number(product.price) > 0;
    const values = {
      categoryId,
      name: product.name.slice(0, 255),
      slug: productSlug,
      sku: product.id.slice(0, 100),
      description: product.description ?? product.overview ?? null,
      shortDescription: product.overview?.slice(0, 280) ?? null,
      pricingType: hasPrice ? ('FIXED' as const) : ('ON_REQUEST' as const),
      priceInr: hasPrice ? Number(product.price).toFixed(2) : null,
      imageUrl: product.image ?? null,
      images: product.images ?? (product.image ? [product.image] : []),
      specs: {
        features: product.features ?? [],
        metaTitle: product.metaTitle ?? null,
        metaDescription: product.metaDescription ?? null,
        metaKeywords: product.metaKeywords ?? null,
        sourceId: product.id,
        sourceCategory: product.category,
        sourceSubcategory: product.subcategory ?? null,
      },
      isActive: true,
      searchVector: [product.name, product.description, product.metaKeywords]
        .filter(Boolean)
        .join(' '),
    };

    const existing = await database.query.products.findFirst({
      where: eq(products.slug, productSlug),
    });
    if (existing) {
      await database.update(products).set(values).where(eq(products.id, existing.id));
      updated += 1;
    } else {
      await database.insert(products).values({
        ...values,
        shippingInr: '0',
        shippingUsd: '0',
      });
      created += 1;
    }
  }

  if (slugs.length) {
    await database
      .update(products)
      .set({ isActive: false })
      .where(notInArray(products.slug, slugs));
  }

  const snapshot = await database.query.catalogSnapshots.findFirst({
    where: eq(catalogSnapshots.key, STOREFRONT_CATALOG_KEY),
  });
  if (snapshot) {
    await database
      .update(catalogSnapshots)
      .set({ document: sourceCategories, updatedAt: new Date() })
      .where(eq(catalogSnapshots.id, snapshot.id));
  } else {
    await database.insert(catalogSnapshots).values({
      key: STOREFRONT_CATALOG_KEY,
      document: sourceCategories,
    });
  }

  return { created, updated, totalSource: all.length };
}

export async function getStorefrontCatalog() {
  const row = await db.query.catalogSnapshots.findFirst({
    where: eq(catalogSnapshots.key, STOREFRONT_CATALOG_KEY),
  });
  if (!row || !Array.isArray(row.document) || row.document.length === 0) {
    throw new NotFoundError('Storefront catalog is not published');
  }
  return row.document;
}
