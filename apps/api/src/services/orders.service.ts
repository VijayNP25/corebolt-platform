import { and, desc, eq } from 'drizzle-orm';
import type { OrderStatus } from '@corebolt/shared';
import { db } from '../db/client.js';
import { orders, orderStatusHistory, users } from '../db/schema.js';
import { ForbiddenError, NotFoundError, ValidationError } from '../lib/errors.js';
import { emailService } from './email.service.js';
import { isLocalStubPayment } from './payments/index.js';

const STAFF_TRANSITIONS: Partial<Record<OrderStatus, OrderStatus[]>> = {
  CONFIRMED: ['PROCESSING'],
  PROCESSING: ['SHIPPED'],
  SHIPPED: ['DELIVERED'],
};

const ADMIN_EXTRA: Partial<Record<OrderStatus, OrderStatus[]>> = {
  PENDING: ['CANCELLED'],
  CONFIRMED: ['CANCELLED', 'REFUNDED'],
  PROCESSING: ['CANCELLED', 'REFUNDED'],
  SHIPPED: ['RETURNED', 'REFUNDED'],
  DELIVERED: ['RETURNED', 'REFUNDED'],
};

export async function listOrdersForUser(userId: string) {
  return db.query.orders.findMany({
    where: eq(orders.userId, userId),
    orderBy: [desc(orders.createdAt)],
    with: { items: true },
  });
}

export async function getOrderForUser(orderId: string, userId: string) {
  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, orderId), eq(orders.userId, userId)),
    with: { items: true, statusHistory: true },
  });
  if (!order) throw new NotFoundError('Order not found');
  return order;
}

export async function listOrdersAdmin(opts?: { status?: OrderStatus }) {
  const rows = await db.query.orders.findMany({
    where: opts?.status ? eq(orders.status, opts.status) : undefined,
    orderBy: [desc(orders.createdAt)],
    with: { items: true, user: true },
  });

  return rows.map(({ user, ...order }) => ({
    ...order,
    customer: user
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        }
      : null,
  }));
}

export async function updateOrderStatus(input: {
  orderId: string;
  toStatus: OrderStatus;
  actorUserId: string;
  actorRole: 'admin' | 'staff' | 'customer';
  note?: string;
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
}) {
  if (input.actorRole === 'customer') {
    throw new ForbiddenError('Customers cannot change order status');
  }

  const order = await db.query.orders.findFirst({
    where: eq(orders.id, input.orderId),
  });
  if (!order) throw new NotFoundError('Order not found');

  const allowed = [
    ...(STAFF_TRANSITIONS[order.status] ?? []),
    ...(input.actorRole === 'admin' ? (ADMIN_EXTRA[order.status] ?? []) : []),
  ];

  if (!allowed.includes(input.toStatus)) {
    throw new ValidationError(
      `Cannot transition from ${order.status} to ${input.toStatus}`,
    );
  }

  const carrier = (input.carrier ?? order.carrier ?? '').trim();
  const trackingNumber = (input.trackingNumber ?? order.trackingNumber ?? '').trim();
  if (input.toStatus === 'SHIPPED' && (!carrier || !trackingNumber)) {
    throw new ValidationError('Carrier and tracking number are required to mark an order shipped');
  }

  const trackingUrl = (input.trackingUrl ?? order.trackingUrl ?? '').trim();

  const [updated] = await db
    .update(orders)
    .set({
      status: input.toStatus,
      carrier: carrier || null,
      trackingNumber: trackingNumber || null,
      trackingUrl: trackingUrl || null,
    })
    .where(eq(orders.id, order.id))
    .returning();

  await db.insert(orderStatusHistory).values({
    orderId: order.id,
    fromStatus: order.status,
    toStatus: input.toStatus,
    note: input.note,
    changedByUserId: input.actorUserId,
  });

  const user = await db.query.users.findFirst({
    where: eq(users.id, order.userId),
  });
  if (user && updated) {
    await emailService.sendOrderStatus({
      to: user.email,
      orderNumber: order.orderNumber,
      status: input.toStatus,
      carrier: updated.carrier,
      trackingNumber: updated.trackingNumber,
      trackingUrl: updated.trackingUrl,
      note: input.note,
    });
  }

  return updated;
}

/** Customer confirms a local order while the bank keys are still empty. */
export async function confirmStubPayment(orderId: string, userId: string) {
  const order = await getOrderForUser(orderId, userId);
  if (order.status !== 'PENDING' || order.paymentStatus === 'paid') {
    throw new ValidationError('This order is not waiting for payment');
  }
  if (!isLocalStubPayment(order.currency)) {
    throw new ValidationError('Payment is completed with the bank');
  }
  await markOrderPaid(order.id, order.paymentIntentId ?? undefined);
  return getOrderForUser(orderId, userId);
}

/** Called from payment webhooks: PENDING → CONFIRMED */
export async function markOrderPaid(orderId: string, paymentIntentId?: string) {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
  });
  if (!order) throw new NotFoundError('Order not found');

  if (order.status !== 'PENDING') {
    return order;
  }

  const [updated] = await db
    .update(orders)
    .set({
      status: 'CONFIRMED',
      paymentStatus: 'paid',
      paymentIntentId: paymentIntentId ?? order.paymentIntentId,
    })
    .where(eq(orders.id, order.id))
    .returning();

  await db.insert(orderStatusHistory).values({
    orderId: order.id,
    fromStatus: 'PENDING',
    toStatus: 'CONFIRMED',
    note: 'Payment confirmed via webhook',
  });

  const user = await db.query.users.findFirst({
    where: eq(users.id, order.userId),
  });
  if (user) {
    await emailService.sendOrderConfirmation(user.email, order.orderNumber);
  }

  return updated;
}

export async function markOrderPaymentFailed(orderId: string) {
  await db
    .update(orders)
    .set({ paymentStatus: 'failed' })
    .where(eq(orders.id, orderId));
}
