import { z } from 'zod';

export const currencySchema = z.enum(['INR', 'USD']);
export const roleSchema = z.enum(['customer', 'admin', 'staff']);
export const pricingTypeSchema = z.enum(['FIXED', 'ON_REQUEST']);

export const orderStatusSchema = z.enum([
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
  'RETURNED',
]);

export const enquiryStatusSchema = z.enum([
  'NEW',
  'CONTACTED',
  'BOOKED',
  'CLOSED',
  'SPAM',
  'REJECTED',
]);

export const reviewStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED']);

/** Money as decimal string — never JS number. */
export const moneySchema = z
  .string()
  .regex(/^\d+(\.\d{1,4})?$/, 'Invalid money amount');

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(200),
  phone: z.string().min(6).max(20).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const addressSchema = z.object({
  label: z.string().max(100).optional(),
  line1: z.string().min(1).max(255),
  line2: z.string().max(255).optional(),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  postalCode: z.string().min(1).max(20),
  country: z.string().min(2).max(2).default('IN'),
  phone: z.string().min(6).max(20).optional(),
  isDefault: z.boolean().optional(),
});

export const cartItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1).max(999),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1).max(999),
});

export const checkoutSchema = z.object({
  currency: currencySchema,
  shippingAddressId: z.string().uuid(),
  billingAddressId: z.string().uuid().optional(),
  notes: z.string().max(2000).optional(),
});

export const enquirySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  mobile: z.string().min(6).max(20),
  company: z.string().max(200).optional(),
  topic: z.string().max(200).optional(),
  productIds: z.array(z.string().uuid()).optional(),
  products: z.array(z.string().max(200)).optional(),
  systemCore: z.string().max(500).optional(),
  orderInformation: z.string().max(500).optional(),
  message: z.string().max(5000).optional(),
  action: z.enum(['quote', 'order']).optional(),
  productId: z.string().uuid().optional(),
  productSlug: z.string().max(255).optional(),
  productName: z.string().max(255).optional(),
});

export const updateEnquiryStatusSchema = z.object({
  status: enquiryStatusSchema,
  note: z.string().max(2000).optional(),
});

export const updateOrderStatusSchema = z.object({
  status: orderStatusSchema,
  note: z.string().max(2000).optional(),
  carrier: z.string().max(100).optional(),
  trackingNumber: z.string().max(100).optional(),
});

export const reviewSchema = z.object({
  productId: z.string().uuid(),
  orderId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  body: z.string().min(1).max(5000),
});

export const moderateReviewSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
});

export const fxMarkupSchema = z.object({
  markupPercent: moneySchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type CartItemInput = z.infer<typeof cartItemSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type EnquiryInput = z.infer<typeof enquirySchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type Currency = z.infer<typeof currencySchema>;
export type Role = z.infer<typeof roleSchema>;
export type PricingType = z.infer<typeof pricingTypeSchema>;
export type OrderStatus = z.infer<typeof orderStatusSchema>;
export type EnquiryStatus = z.infer<typeof enquiryStatusSchema>;
