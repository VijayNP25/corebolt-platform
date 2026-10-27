import { and, eq } from 'drizzle-orm';
import crypto from 'node:crypto';
import type { Response } from 'express';
import { db } from '../db/client.js';
import { cartItems, carts, products } from '../db/schema.js';
import { ConflictError, NotFoundError, ValidationError } from '../lib/errors.js';
import { orderShippingFee } from '@corebolt/shared';
import { inrToUsd, moneyAdd, moneyMul } from '../lib/money.js';
import { getActiveFx } from './currency.service.js';
import { env } from '../config/env.js';

const GUEST_COOKIE = 'cb_guest';

export async function getOrCreateCart(opts: {
  userId?: string;
  guestToken?: string;
  currency?: 'INR' | 'USD';
  res?: Response;
}) {
  if (opts.userId) {
    let cart = await db.query.carts.findFirst({
      where: eq(carts.userId, opts.userId),
      with: { items: { with: { product: true } } },
    });
    if (!cart) {
      const [created] = await db
        .insert(carts)
        .values({
          userId: opts.userId,
          currency: opts.currency ?? 'INR',
        })
        .returning();
      if (!created) throw new Error('Failed to create cart');
      cart = await db.query.carts.findFirst({
        where: eq(carts.id, created.id),
        with: { items: { with: { product: true } } },
      });
    }
    return cart!;
  }

  let guestToken = opts.guestToken;
  if (!guestToken) {
    guestToken = crypto.randomBytes(24).toString('hex');
    if (opts.res) {
      opts.res.cookie(GUEST_COOKIE, guestToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: env.COOKIE_SECURE,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
      });
    }
  }

  let cart = await db.query.carts.findFirst({
    where: eq(carts.guestToken, guestToken),
    with: { items: { with: { product: true } } },
  });
  if (!cart) {
    const [created] = await db
      .insert(carts)
      .values({
        guestToken,
        currency: opts.currency ?? 'INR',
      })
      .returning();
    if (!created) throw new Error('Failed to create guest cart');
    cart = await db.query.carts.findFirst({
      where: eq(carts.id, created.id),
      with: { items: { with: { product: true } } },
    });
  }
  return cart!;
}

export async function mergeGuestCartIntoUser(
  guestToken: string,
  userId: string,
): Promise<void> {
  const guestCart = await db.query.carts.findFirst({
    where: eq(carts.guestToken, guestToken),
    with: { items: true },
  });
  if (!guestCart) return;

  const userCart = await getOrCreateCart({ userId });

  for (const item of guestCart.items) {
    const existing = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.cartId, userCart.id),
        eq(cartItems.productId, item.productId),
      ),
    });
    if (existing) {
      await db
        .update(cartItems)
        .set({ quantity: existing.quantity + item.quantity })
        .where(eq(cartItems.id, existing.id));
    } else {
      await db.insert(cartItems).values({
        cartId: userCart.id,
        productId: item.productId,
        quantity: item.quantity,
      });
    }
  }

  await db.delete(carts).where(eq(carts.id, guestCart.id));
}

export async function addCartItem(
  cartId: string,
  productId: string,
  quantity: number,
) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  });
  if (!product || !product.isActive) {
    throw new NotFoundError('Product not found');
  }
  if (product.pricingType !== 'FIXED') {
    throw new ValidationError('ON_REQUEST products cannot be added to cart');
  }

  const existing = await db.query.cartItems.findFirst({
    where: and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)),
  });

  if (existing) {
    const [updated] = await db
      .update(cartItems)
      .set({ quantity: existing.quantity + quantity })
      .where(eq(cartItems.id, existing.id))
      .returning();
    return updated;
  }

  const [created] = await db
    .insert(cartItems)
    .values({ cartId, productId, quantity })
    .returning();
  return created;
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  const [updated] = await db
    .update(cartItems)
    .set({ quantity })
    .where(eq(cartItems.id, itemId))
    .returning();
  if (!updated) throw new NotFoundError('Cart item not found');
  return updated;
}

export async function removeCartItem(itemId: string) {
  const [deleted] = await db
    .delete(cartItems)
    .where(eq(cartItems.id, itemId))
    .returning();
  if (!deleted) throw new NotFoundError('Cart item not found');
}

export async function setCartCurrency(cartId: string, currency: 'INR' | 'USD') {
  await db.update(carts).set({ currency }).where(eq(carts.id, cartId));
}

export async function serializeCart(cartId: string) {
  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, cartId),
    with: { items: { with: { product: true } } },
  });
  if (!cart) throw new NotFoundError('Cart not found');

  const currency = cart.currency;
  const fx = await getActiveFx();

  let subtotal = '0.00';

  const items = [];
  for (const item of cart.items) {
    const product = item.product;
    if (!product || product.pricingType !== 'FIXED' || !product.priceInr) {
      throw new ConflictError(`Cart contains non-purchasable product ${item.productId}`);
    }

    const unitPrice =
      currency === 'INR'
        ? product.priceInr
        : inrToUsd(product.priceInr, fx.inrPerUsd, fx.markupPercent);

    const lineTotal = moneyMul(unitPrice, item.quantity);
    subtotal = moneyAdd(subtotal, lineTotal);

    items.push({
      id: item.id,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      quantity: item.quantity,
      unitPrice,
      shippingUnit: '0.00',
      lineTotal,
      imageUrl: product.imageUrl,
    });
  }

  const shippingTotal = orderShippingFee(currency, items.length);

  return {
    id: cart.id,
    currency,
    items,
    subtotal,
    shippingTotal,
    itemCount: items.reduce((n, i) => n + i.quantity, 0),
  };
}

export { GUEST_COOKIE };
