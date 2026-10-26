import { and, desc, eq } from 'drizzle-orm';
import { db } from '../db/client.js';
import { orderItems, orders, products, reviews } from '../db/schema.js';
import { ForbiddenError, NotFoundError, ValidationError } from '../lib/errors.js';

export async function createReview(input: {
  userId: string;
  productId: string;
  orderId: string;
  rating: number;
  body: string;
}) {
  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, input.orderId), eq(orders.userId, input.userId)),
    with: { items: true },
  });
  if (!order) throw new NotFoundError('Order not found');

  if (order.status !== 'DELIVERED') {
    throw new ForbiddenError('Only delivered orders can be reviewed');
  }

  const purchased = order.items.some((i) => i.productId === input.productId);
  if (!purchased) {
    // also check via query in case productId null on snapshot
    const line = await db.query.orderItems.findFirst({
      where: and(
        eq(orderItems.orderId, input.orderId),
        eq(orderItems.productId, input.productId),
      ),
    });
    if (!line) {
      throw new ForbiddenError('You can only review products you purchased');
    }
  }

  if (input.rating < 1 || input.rating > 5) {
    throw new ValidationError('Rating must be 1–5');
  }

  const existing = await db.query.reviews.findFirst({
    where: and(
      eq(reviews.userId, input.userId),
      eq(reviews.productId, input.productId),
      eq(reviews.orderId, input.orderId),
    ),
  });
  if (existing) throw new ValidationError('You already reviewed this purchase');

  const [review] = await db
    .insert(reviews)
    .values({
      productId: input.productId,
      userId: input.userId,
      orderId: input.orderId,
      rating: input.rating,
      body: input.body,
      status: 'PENDING',
    })
    .returning();

  return review;
}

export async function listApprovedReviewsBySlug(slug: string) {
  const product = await db.query.products.findFirst({
    where: eq(products.slug, slug),
  });
  if (!product) return [];

  const rows = await db.query.reviews.findMany({
    where: and(eq(reviews.productId, product.id), eq(reviews.status, 'APPROVED')),
    with: { user: true },
    orderBy: [desc(reviews.createdAt)],
  });

  return rows.map((row) => ({
    id: row.id,
    rating: row.rating,
    body: row.body,
    createdAt: row.createdAt,
    authorName: row.user?.name ?? 'Customer',
  }));
}

export async function listReviewableOrders(userId: string, slug: string) {
  const product = await db.query.products.findFirst({
    where: eq(products.slug, slug),
  });
  if (!product) return [];

  const delivered = await db.query.orders.findMany({
    where: and(eq(orders.userId, userId), eq(orders.status, 'DELIVERED')),
    with: { items: true },
    orderBy: [desc(orders.createdAt)],
  });
  const mine = await db.query.reviews.findMany({
    where: and(eq(reviews.userId, userId), eq(reviews.productId, product.id)),
  });
  const reviewed = new Set(mine.map((row) => row.orderId));

  return delivered
    .filter((order) =>
      order.items.some(
        (item) => item.productId === product.id || item.productSlug === slug,
      ),
    )
    .filter((order) => !reviewed.has(order.id))
    .map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      productId: product.id,
    }));
}

export async function moderateReview(input: {
  reviewId: string;
  status: 'APPROVED' | 'REJECTED';
  moderatorId: string;
}) {
  const [updated] = await db
    .update(reviews)
    .set({
      status: input.status,
      moderatedByUserId: input.moderatorId,
      moderatedAt: new Date(),
    })
    .where(eq(reviews.id, input.reviewId))
    .returning();

  if (!updated) throw new NotFoundError('Review not found');
  return updated;
}

export async function listPendingReviews() {
  const rows = await db.query.reviews.findMany({
    where: eq(reviews.status, 'PENDING'),
    with: { user: true, product: true },
    orderBy: [desc(reviews.createdAt)],
  });
  return rows.map((row) => ({
    id: row.id,
    rating: row.rating,
    body: row.body,
    status: row.status,
    createdAt: row.createdAt,
    authorName: row.user?.name ?? 'Customer',
    productName: row.product?.name ?? 'Product',
  }));
}
