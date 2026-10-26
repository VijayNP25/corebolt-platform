import { eq } from 'drizzle-orm';
import { env } from '../config/env.js';
import { db } from '../db/client.js';
import {
  addresses,
  carts,
  orderItems,
  orders,
  orderStatusHistory,
  users,
} from '../db/schema.js';
import { ForbiddenError, NotFoundError, ValidationError } from '../lib/errors.js';
import { moneyAdd, percentOf, usdToInr } from '../lib/money.js';
import { serializeCart } from './cart.service.js';
import { getActiveFx } from './currency.service.js';
import { emailService } from './email.service.js';
import { getPaymentProvider } from './payments/index.js';

export async function checkout(input: {
  userId: string;
  currency: 'INR' | 'USD';
  shippingAddressId: string;
  billingAddressId?: string;
  notes?: string;
  returnUrl?: string;
}) {
  const user = await db.query.users.findFirst({ where: eq(users.id, input.userId) });
  if (!user) throw new NotFoundError('User not found');
  if (!user.emailVerifiedAt && env.NODE_ENV === 'production') {
    throw new ForbiddenError('Email verification required before checkout');
  }

  const cart = await db.query.carts.findFirst({
    where: eq(carts.userId, input.userId),
  });
  if (!cart) throw new ValidationError('Cart is empty');

  await db.update(carts).set({ currency: input.currency }).where(eq(carts.id, cart.id));
  const serialized = await serializeCart(cart.id);
  if (serialized.items.length === 0) {
    throw new ValidationError('Cart is empty');
  }

  const shippingAddress = await db.query.addresses.findFirst({
    where: eq(addresses.id, input.shippingAddressId),
  });
  if (!shippingAddress || shippingAddress.userId !== input.userId) {
    throw new NotFoundError('Shipping address not found');
  }

  let billingSnapshot = addressSnapshot(shippingAddress);
  if (input.billingAddressId) {
    const billing = await db.query.addresses.findFirst({
      where: eq(addresses.id, input.billingAddressId),
    });
    if (!billing || billing.userId !== input.userId) {
      throw new NotFoundError('Billing address not found');
    }
    billingSnapshot = addressSnapshot(billing);
  }

  const taxTotal =
    input.currency === 'INR' ? percentOf(serialized.subtotal, env.GST_PERCENT) : '0.00';
  const grandTotal = moneyAdd(serialized.subtotal, serialized.shippingTotal, taxTotal);
  const fx = await getActiveFx();

  const grandTotalInr =
    input.currency === 'INR'
      ? grandTotal
      : usdToInr(grandTotal, fx.inrPerUsd, fx.markupPercent);

  const orderNumber = generateOrderNumber();

  const [order] = await db
    .insert(orders)
    .values({
      orderNumber,
      userId: input.userId,
      status: 'PENDING',
      currency: input.currency,
      subtotal: serialized.subtotal,
      shippingTotal: serialized.shippingTotal,
      taxTotal,
      grandTotal,
      grandTotalInr,
      fxRateUsed: fx.inrPerUsd,
      fxMarkupPercent: fx.markupPercent,
      shippingAddressSnapshot: addressSnapshot(shippingAddress),
      billingAddressSnapshot: billingSnapshot,
      paymentStatus: 'pending',
      notes: input.notes,
    })
    .returning();

  if (!order) throw new Error('Failed to create order');

  await db.insert(orderItems).values(
    serialized.items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      productName: item.name,
      productSlug: item.slug,
      unitPrice: item.unitPrice,
      shippingUnit: item.shippingUnit,
      quantity: item.quantity,
      lineTotal: item.lineTotal,
    })),
  );

  await db.insert(orderStatusHistory).values({
    orderId: order.id,
    fromStatus: null,
    toStatus: 'PENDING',
    note: 'Order created',
    changedByUserId: input.userId,
  });

  const provider = getPaymentProvider(input.currency);
  const payment = await provider.createPayment({
    orderId: order.id,
    orderNumber,
    amount: grandTotal,
    currency: input.currency,
    customerEmail: user.email,
    customerName: user.name,
    returnUrl: input.returnUrl ?? 'http://localhost:3000/checkout/return',
    metadata: { orderId: order.id },
  });

  await db
    .update(orders)
    .set({
      paymentProvider: provider.name,
      paymentIntentId: payment.paymentIntentId,
    })
    .where(eq(orders.id, order.id));

  // clear cart items
  await db.delete(carts).where(eq(carts.id, cart.id));

  await emailService.sendOrderReceived(user.email, orderNumber);

  return {
    order: {
      id: order.id,
      orderNumber,
      status: order.status,
      currency: input.currency,
      subtotal: serialized.subtotal,
      shippingTotal: serialized.shippingTotal,
      taxTotal,
      grandTotal,
      paymentStatus: 'pending',
    },
    payment,
  };
}

function addressSnapshot(addr: {
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string | null;
  label: string | null;
}) {
  return {
    label: addr.label,
    line1: addr.line1,
    line2: addr.line2,
    city: addr.city,
    state: addr.state,
    postalCode: addr.postalCode,
    country: addr.country,
    phone: addr.phone,
  };
}

function generateOrderNumber(): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(Math.random() * 900000 + 100000);
  return `CB${y}${m}${d}${rand}`;
}
