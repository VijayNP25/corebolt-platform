import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const roleEnum = pgEnum('user_role', ['customer', 'admin', 'staff']);
export const pricingTypeEnum = pgEnum('pricing_type', ['FIXED', 'ON_REQUEST']);
export const currencyEnum = pgEnum('currency_code', ['INR', 'USD']);
export const orderStatusEnum = pgEnum('order_status', [
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
  'RETURNED',
]);
export const enquiryStatusEnum = pgEnum('enquiry_status', [
  'NEW',
  'CONTACTED',
  'BOOKED',
  'CLOSED',
  'SPAM',
  'REJECTED',
]);
export const reviewStatusEnum = pgEnum('review_status', [
  'PENDING',
  'APPROVED',
  'REJECTED',
]);
export const paymentProviderEnum = pgEnum('payment_provider', ['icici', 'stripe']);
export const paymentStatusEnum = pgEnum('payment_status', [
  'pending',
  'authorized',
  'paid',
  'failed',
  'refunded',
]);

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull(),
    passwordHash: text('password_hash').notNull(),
    name: varchar('name', { length: 200 }).notNull(),
    phone: varchar('phone', { length: 20 }),
    role: roleEnum('role').notNull().default('customer'),
    emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
    preferredCurrency: currencyEnum('preferred_currency').default('INR'),
    isActive: boolean('is_active').notNull().default(true),
    ...timestamps,
  },
  (t) => [uniqueIndex('users_email_uidx').on(t.email)],
);

export const sessions = pgTable(
  'sessions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    refreshTokenHash: text('refresh_token_hash').notNull(),
    userAgent: text('user_agent'),
    ipAddress: varchar('ip_address', { length: 64 }),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
    ...timestamps,
  },
  (t) => [index('sessions_user_idx').on(t.userId)],
);

export const addresses = pgTable(
  'addresses',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    label: varchar('label', { length: 100 }),
    line1: varchar('line1', { length: 255 }).notNull(),
    line2: varchar('line2', { length: 255 }),
    city: varchar('city', { length: 100 }).notNull(),
    state: varchar('state', { length: 100 }).notNull(),
    postalCode: varchar('postal_code', { length: 20 }).notNull(),
    country: varchar('country', { length: 2 }).notNull().default('IN'),
    phone: varchar('phone', { length: 20 }),
    isDefault: boolean('is_default').notNull().default(false),
    ...timestamps,
  },
  (t) => [index('addresses_user_idx').on(t.userId)],
);

export const categories = pgTable(
  'categories',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 200 }).notNull(),
    slug: varchar('slug', { length: 200 }).notNull(),
    description: text('description'),
    parentId: uuid('parent_id'),
    sortOrder: integer('sort_order').notNull().default(0),
    isActive: boolean('is_active').notNull().default(true),
    ...timestamps,
  },
  (t) => [
    uniqueIndex('categories_slug_uidx').on(t.slug),
    index('categories_parent_idx').on(t.parentId),
  ],
);

export const products = pgTable(
  'products',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    categoryId: uuid('category_id').references(() => categories.id, {
      onDelete: 'set null',
    }),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    sku: varchar('sku', { length: 100 }),
    description: text('description'),
    shortDescription: text('short_description'),
    pricingType: pricingTypeEnum('pricing_type').notNull().default('FIXED'),
    /** Base price in INR — null when ON_REQUEST */
    priceInr: numeric('price_inr', { precision: 14, scale: 2 }),
    shippingInr: numeric('shipping_inr', { precision: 14, scale: 2 })
      .notNull()
      .default('0'),
    shippingUsd: numeric('shipping_usd', { precision: 14, scale: 2 })
      .notNull()
      .default('0'),
    imageUrl: text('image_url'),
    images: jsonb('images').$type<string[]>().default([]),
    specs: jsonb('specs').$type<Record<string, unknown>>().default({}),
    relatedProductIds: jsonb('related_product_ids').$type<string[]>().default([]),
    isActive: boolean('is_active').notNull().default(true),
    searchVector: text('search_vector'),
    ...timestamps,
  },
  (t) => [
    uniqueIndex('products_slug_uidx').on(t.slug),
    index('products_category_idx').on(t.categoryId),
    index('products_pricing_type_idx').on(t.pricingType),
  ],
);

export const exchangeRates = pgTable(
  'exchange_rates',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    baseCurrency: currencyEnum('base_currency').notNull().default('INR'),
    quoteCurrency: currencyEnum('quote_currency').notNull().default('USD'),
    /** Units of quote per 1 base, e.g. USD per 1 INR is unusual; we store INR→USD as USD per INR (rate) where 1 USD = rate INR often inverted — see currency service. Stored as: how many INR equal 1 USD (inr_per_usd). */
    rate: numeric('rate', { precision: 18, scale: 8 }).notNull(),
    markupPercent: numeric('markup_percent', { precision: 8, scale: 4 })
      .notNull()
      .default('2.5'),
    source: varchar('source', { length: 100 }).notNull().default('exchangerate-api'),
    fetchedAt: timestamp('fetched_at', { withTimezone: true }).notNull().defaultNow(),
    ...timestamps,
  },
  (t) => [
    index('exchange_rates_pair_idx').on(t.baseCurrency, t.quoteCurrency),
  ],
);

export const carts = pgTable(
  'carts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
    guestToken: varchar('guest_token', { length: 64 }),
    currency: currencyEnum('currency').notNull().default('INR'),
    ...timestamps,
  },
  (t) => [
    index('carts_user_idx').on(t.userId),
    uniqueIndex('carts_guest_token_uidx')
      .on(t.guestToken)
      .where(sql`${t.guestToken} IS NOT NULL`),
  ],
);

export const cartItems = pgTable(
  'cart_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    cartId: uuid('cart_id')
      .notNull()
      .references(() => carts.id, { onDelete: 'cascade' }),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'restrict' }),
    quantity: integer('quantity').notNull().default(1),
    ...timestamps,
  },
  (t) => [
    uniqueIndex('cart_items_cart_product_uidx').on(t.cartId, t.productId),
    index('cart_items_product_idx').on(t.productId),
  ],
);

export const orders = pgTable(
  'orders',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderNumber: varchar('order_number', { length: 32 }).notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    status: orderStatusEnum('status').notNull().default('PENDING'),
    currency: currencyEnum('currency').notNull(),
    subtotal: numeric('subtotal', { precision: 14, scale: 2 }).notNull(),
    shippingTotal: numeric('shipping_total', { precision: 14, scale: 2 })
      .notNull()
      .default('0'),
    taxTotal: numeric('tax_total', { precision: 14, scale: 2 }).notNull().default('0'),
    grandTotal: numeric('grand_total', { precision: 14, scale: 2 }).notNull(),
    /** INR equivalent of grand total for reporting */
    grandTotalInr: numeric('grand_total_inr', { precision: 14, scale: 2 }).notNull(),
    fxRateUsed: numeric('fx_rate_used', { precision: 18, scale: 8 }),
    fxMarkupPercent: numeric('fx_markup_percent', { precision: 8, scale: 4 }),
    shippingAddressSnapshot: jsonb('shipping_address_snapshot').notNull(),
    billingAddressSnapshot: jsonb('billing_address_snapshot'),
    paymentProvider: paymentProviderEnum('payment_provider'),
    paymentStatus: paymentStatusEnum('payment_status').notNull().default('pending'),
    paymentIntentId: varchar('payment_intent_id', { length: 255 }),
    carrier: varchar('carrier', { length: 100 }),
    trackingNumber: varchar('tracking_number', { length: 100 }),
    notes: text('notes'),
    ...timestamps,
  },
  (t) => [
    uniqueIndex('orders_order_number_uidx').on(t.orderNumber),
    index('orders_user_idx').on(t.userId),
    index('orders_status_idx').on(t.status),
  ],
);

export const orderItems = pgTable(
  'order_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    productId: uuid('product_id').references(() => products.id, {
      onDelete: 'set null',
    }),
    productName: varchar('product_name', { length: 255 }).notNull(),
    productSlug: varchar('product_slug', { length: 255 }).notNull(),
    unitPrice: numeric('unit_price', { precision: 14, scale: 2 }).notNull(),
    shippingUnit: numeric('shipping_unit', { precision: 14, scale: 2 })
      .notNull()
      .default('0'),
    quantity: integer('quantity').notNull(),
    lineTotal: numeric('line_total', { precision: 14, scale: 2 }).notNull(),
    ...timestamps,
  },
  (t) => [index('order_items_order_idx').on(t.orderId)],
);

export const orderStatusHistory = pgTable(
  'order_status_history',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    fromStatus: orderStatusEnum('from_status'),
    toStatus: orderStatusEnum('to_status').notNull(),
    note: text('note'),
    changedByUserId: uuid('changed_by_user_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('order_status_history_order_idx').on(t.orderId)],
);

export const enquiries = pgTable(
  'enquiries',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    status: enquiryStatusEnum('status').notNull().default('NEW'),
    name: varchar('name', { length: 200 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    mobile: varchar('mobile', { length: 20 }).notNull(),
    company: varchar('company', { length: 200 }),
    topic: varchar('topic', { length: 200 }),
    message: text('message'),
    action: varchar('action', { length: 20 }),
    productId: uuid('product_id').references(() => products.id, {
      onDelete: 'set null',
    }),
    productSlug: varchar('product_slug', { length: 255 }),
    productName: varchar('product_name', { length: 255 }),
    productIds: jsonb('product_ids').$type<string[]>().default([]),
    products: jsonb('products').$type<string[]>().default([]),
    systemCore: text('system_core'),
    orderInformation: text('order_information'),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    ...timestamps,
  },
  (t) => [
    index('enquiries_status_idx').on(t.status),
    index('enquiries_email_idx').on(t.email),
  ],
);

export const enquiryStatusHistory = pgTable(
  'enquiry_status_history',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    enquiryId: uuid('enquiry_id')
      .notNull()
      .references(() => enquiries.id, { onDelete: 'cascade' }),
    fromStatus: enquiryStatusEnum('from_status'),
    toStatus: enquiryStatusEnum('to_status').notNull(),
    note: text('note'),
    changedByUserId: uuid('changed_by_user_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('enquiry_status_history_enquiry_idx').on(t.enquiryId)],
);

export const reviews = pgTable(
  'reviews',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    rating: integer('rating').notNull(),
    body: text('body').notNull(),
    status: reviewStatusEnum('status').notNull().default('PENDING'),
    moderatedByUserId: uuid('moderated_by_user_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    moderatedAt: timestamp('moderated_at', { withTimezone: true }),
    ...timestamps,
  },
  (t) => [
    uniqueIndex('reviews_user_product_order_uidx').on(t.userId, t.productId, t.orderId),
    index('reviews_product_status_idx').on(t.productId, t.status),
  ],
);

export const auditLogs = pgTable(
  'audit_logs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    actorUserId: uuid('actor_user_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    action: varchar('action', { length: 100 }).notNull(),
    entityType: varchar('entity_type', { length: 100 }).notNull(),
    entityId: varchar('entity_id', { length: 100 }),
    metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),
    ipAddress: varchar('ip_address', { length: 64 }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('audit_logs_actor_idx').on(t.actorUserId),
    index('audit_logs_entity_idx').on(t.entityType, t.entityId),
  ],
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
  sessions: many(sessions),
  carts: many(carts),
  orders: many(orders),
  reviews: many(reviews),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  cartItems: many(cartItems),
  reviews: many(reviews),
}));

export const cartsRelations = relations(carts, ({ one, many }) => ({
  user: one(users, { fields: [carts.userId], references: [users.id] }),
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, { fields: [cartItems.cartId], references: [carts.id] }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems),
  statusHistory: many(orderStatusHistory),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Cart = typeof carts.$inferSelect;
export type Enquiry = typeof enquiries.$inferSelect;
