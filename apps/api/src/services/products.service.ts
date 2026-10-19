import { and, eq, ilike, or, sql } from 'drizzle-orm';
import { db } from '../db/client.js';
import { products, type Product } from '../db/schema.js';
import { NotFoundError } from '../lib/errors.js';
import { convertProductPrice } from './currency.service.js';

export interface ProductListQuery {
  q?: string;
  categoryId?: string;
  pricingType?: 'FIXED' | 'ON_REQUEST';
  page?: number;
  pageSize?: number;
  currency?: 'INR' | 'USD';
}

export async function listProducts(query: ProductListQuery) {
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, query.pageSize ?? 24));
  const currency = query.currency ?? 'INR';

  const conditions = [eq(products.isActive, true)];
  if (query.categoryId) {
    conditions.push(eq(products.categoryId, query.categoryId));
  }
  if (query.pricingType) {
    conditions.push(eq(products.pricingType, query.pricingType));
  }
  if (query.q) {
    const term = `%${query.q}%`;
    conditions.push(
      or(
        ilike(products.name, term),
        ilike(products.slug, term),
        ilike(products.shortDescription, term),
      )!,
    );
  }

  const where = and(...conditions);
  const rows = await db.query.products.findMany({
    where,
    limit: pageSize,
    offset: (page - 1) * pageSize,
    orderBy: (p, { asc }) => [asc(p.name)],
  });

  const countRows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products)
    .where(where);

  const items = await Promise.all(rows.map((p) => serializeProduct(p, currency)));

  return {
    items,
    page,
    pageSize,
    total: countRows[0]?.count ?? 0,
  };
}

export async function getProductBySlug(slug: string, currency: 'INR' | 'USD' = 'INR') {
  const product = await db.query.products.findFirst({
    where: and(eq(products.slug, slug), eq(products.isActive, true)),
  });
  if (!product) throw new NotFoundError('Product not found');
  return serializeProduct(product, currency);
}

export async function getProductById(id: string) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });
  if (!product) throw new NotFoundError('Product not found');
  return product;
}

export async function serializeProduct(product: Product, currency: 'INR' | 'USD') {
  const displayPrice =
    product.pricingType === 'FIXED'
      ? await convertProductPrice(product.priceInr, currency)
      : null;

  const shipping =
    currency === 'USD' ? product.shippingUsd : product.shippingInr;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    description: product.description,
    shortDescription: product.shortDescription,
    pricingType: product.pricingType,
    currency,
    price: displayPrice,
    priceInr: product.priceInr,
    shipping,
    shippingInr: product.shippingInr,
    shippingUsd: product.shippingUsd,
    imageUrl: product.imageUrl,
    images: product.images,
    specs: product.specs,
    categoryId: product.categoryId,
    relatedProductIds: product.relatedProductIds,
    isActive: product.isActive,
  };
}

export type AdminProductInput = {
  name: string;
  slug: string;
  sku?: string | null;
  categoryId?: string | null;
  description?: string | null;
  shortDescription?: string | null;
  pricingType: 'FIXED' | 'ON_REQUEST';
  priceInr?: string | null;
  shippingInr?: string;
  shippingUsd?: string;
  imageUrl?: string | null;
  images?: string[];
  specs?: Record<string, unknown>;
  relatedProductIds?: string[];
  isActive?: boolean;
};

export async function adminListProducts(query: ProductListQuery & { includeInactive?: boolean }) {
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, query.pageSize ?? 50));
  const conditions = [];
  if (!query.includeInactive) conditions.push(eq(products.isActive, true));
  if (query.categoryId) conditions.push(eq(products.categoryId, query.categoryId));
  if (query.pricingType) conditions.push(eq(products.pricingType, query.pricingType));
  if (query.q) {
    const term = `%${query.q}%`;
    conditions.push(
      or(ilike(products.name, term), ilike(products.slug, term), ilike(products.sku, term))!,
    );
  }
  const where = conditions.length ? and(...conditions) : undefined;
  const rows = await db.query.products.findMany({
    where,
    limit: pageSize,
    offset: (page - 1) * pageSize,
    orderBy: (p, { desc }) => [desc(p.updatedAt)],
  });
  const countRows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products)
    .where(where);
  return {
    items: rows,
    page,
    pageSize,
    total: countRows[0]?.count ?? 0,
  };
}

export async function createProduct(input: AdminProductInput) {
  if (input.pricingType === 'ON_REQUEST' && input.priceInr) {
    input.priceInr = null;
  }
  const [row] = await db
    .insert(products)
    .values({
      name: input.name,
      slug: input.slug,
      sku: input.sku ?? null,
      categoryId: input.categoryId ?? null,
      description: input.description ?? null,
      shortDescription: input.shortDescription ?? null,
      pricingType: input.pricingType,
      priceInr: input.pricingType === 'FIXED' ? (input.priceInr ?? null) : null,
      shippingInr: input.shippingInr ?? '0',
      shippingUsd: input.shippingUsd ?? '0',
      imageUrl: input.imageUrl ?? null,
      images: input.images ?? [],
      specs: input.specs ?? {},
      relatedProductIds: input.relatedProductIds ?? [],
      isActive: input.isActive ?? true,
      searchVector: [input.name, input.description, input.shortDescription]
        .filter(Boolean)
        .join(' '),
    })
    .returning();
  return row;
}

export async function updateProduct(id: string, input: Partial<AdminProductInput>) {
  const existing = await getProductById(id);
  const pricingType = input.pricingType ?? existing.pricingType;
  const [row] = await db
    .update(products)
    .set({
      ...(input.name != null ? { name: input.name } : {}),
      ...(input.slug != null ? { slug: input.slug } : {}),
      ...(input.sku !== undefined ? { sku: input.sku } : {}),
      ...(input.categoryId !== undefined ? { categoryId: input.categoryId } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.shortDescription !== undefined
        ? { shortDescription: input.shortDescription }
        : {}),
      ...(input.pricingType != null ? { pricingType: input.pricingType } : {}),
      ...(input.priceInr !== undefined || input.pricingType
        ? {
            priceInr:
              pricingType === 'ON_REQUEST' ? null : (input.priceInr ?? existing.priceInr),
          }
        : {}),
      ...(input.shippingInr != null ? { shippingInr: input.shippingInr } : {}),
      ...(input.shippingUsd != null ? { shippingUsd: input.shippingUsd } : {}),
      ...(input.imageUrl !== undefined ? { imageUrl: input.imageUrl } : {}),
      ...(input.images != null ? { images: input.images } : {}),
      ...(input.specs != null ? { specs: input.specs } : {}),
      ...(input.relatedProductIds != null
        ? { relatedProductIds: input.relatedProductIds }
        : {}),
      ...(input.isActive != null ? { isActive: input.isActive } : {}),
    })
    .where(eq(products.id, id))
    .returning();
  return row;
}
