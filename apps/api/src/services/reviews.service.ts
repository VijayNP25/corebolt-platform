import { and, eq } from 'drizzle-orm';
import { db } from '../db/client.js';
import { orderItems, orders, reviews } from '../db/schema.js';
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

export async function listApprovedReviews(productId: string) {
  return db.query.reviews.findMany({
    where: and(eq(reviews.productId, productId), eq(reviews.status, 'APPROVED')),
  });
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
  return db.query.reviews.findMany({
    where: eq(reviews.status, 'PENDING'),
  });
}
