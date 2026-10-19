/**
 * Import the full CoreBolt catalogue from apps/web static data into the DB.
 * Run after migrate: `pnpm --filter api db:seed:catalog`
 */
import { eq } from 'drizzle-orm';
import * as schema from '../src/db/schema.js';
import {
  categories as sourceCategories,
  type Category,
  type Product,
  type ProductGroup,
  type Subcategory,
} from '../../web/src/data/products.ts';
import { explainDbConnectionError, openScriptDb } from './open-db.js';

const { categories, products } = schema;

function flattenGroups(groups: ProductGroup[] | undefined): Product[] {
  if (!groups?.length) return [];
  const out: Product[] = [];
  for (const g of groups) {
    if (g.products?.length) out.push(...g.products);
    if (g.productGroups?.length) out.push(...flattenGroups(g.productGroups));
  }
  return out;
}

function flattenSubcategory(sub: Subcategory): Product[] {
  if (sub.products?.length) return sub.products;
  return flattenGroups(sub.productGroups);
}

function getAllProductsFlat(): Product[] {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const category of sourceCategories as Category[]) {
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

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 200);
}

async function main() {
  const { db, close } = await openScriptDb();
  console.log('Seeding full catalogue from CoreBolt products.ts…');

  try {
    const categoryIdBySource = new Map<string, string>();

    for (const [index, cat] of (sourceCategories as Category[]).entries()) {
      const slug = cat.id || slugify(cat.name);
      let row = await db.query.categories.findFirst({
        where: eq(categories.slug, slug),
      });
      if (!row) {
        const [created] = await db
          .insert(categories)
          .values({
            name: cat.name,
            slug,
            description: cat.description ?? null,
            sortOrder: index + 1,
            isActive: true,
          })
          .returning();
        row = created;
        console.log(`Category created: ${slug}`);
      }
      categoryIdBySource.set(cat.id, row.id);

      for (const [sIndex, sub] of (cat.subcategories ?? []).entries()) {
        const subSlug = `${slug}--${sub.id || slugify(sub.name)}`;
        let subRow = await db.query.categories.findFirst({
          where: eq(categories.slug, subSlug),
        });
        if (!subRow) {
          const [created] = await db
            .insert(categories)
            .values({
              name: sub.name,
              slug: subSlug,
              parentId: row.id,
              sortOrder: sIndex + 1,
              isActive: true,
            })
            .returning();
          subRow = created;
        }
        categoryIdBySource.set(`${cat.id}/${sub.id}`, subRow.id);
      }
    }

    const all = getAllProductsFlat();
    let created = 0;
    let skipped = 0;

    for (const p of all) {
      const productSlug = slugify(p.id || p.name);
      const existing = await db.query.products.findFirst({
        where: eq(products.slug, productSlug),
      });
      if (existing) {
        skipped += 1;
        continue;
      }

      const categoryKey = p.subcategory
        ? `${p.category}/${p.subcategory}`
        : p.category;
      const categoryId =
        categoryIdBySource.get(categoryKey) ??
        categoryIdBySource.get(p.category) ??
        null;

      const hasPrice = p.price != null && Number(p.price) > 0;

      await db.insert(products).values({
        categoryId,
        name: p.name,
        slug: productSlug,
        sku: p.id,
        description: p.description ?? p.overview ?? null,
        shortDescription: p.overview?.slice(0, 280) ?? null,
        pricingType: hasPrice ? 'FIXED' : 'ON_REQUEST',
        priceInr: hasPrice ? Number(p.price).toFixed(2) : null,
        shippingInr: '0',
        shippingUsd: '0',
        imageUrl: p.image ?? null,
        images: p.images ?? (p.image ? [p.image] : []),
        specs: {
          features: p.features ?? [],
          metaTitle: p.metaTitle ?? null,
          metaDescription: p.metaDescription ?? null,
          metaKeywords: p.metaKeywords ?? null,
          sourceId: p.id,
          sourceCategory: p.category,
          sourceSubcategory: p.subcategory ?? null,
        },
        isActive: true,
        searchVector: [p.name, p.description, p.metaKeywords]
          .filter(Boolean)
          .join(' '),
      });
      created += 1;
    }

    console.log(
      `Catalogue seed done. created=${created} skipped=${skipped} totalSource=${all.length}`,
    );
  } finally {
    await close();
  }
}

main().catch((err) => {
  console.error(explainDbConnectionError(err));
  process.exit(1);
});
