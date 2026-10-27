import { Router } from 'express';
import { z } from 'zod';
import { currencySchema, pricingTypeSchema } from '@corebolt/shared';
import { NotFoundError } from '../lib/errors.js';
import { asyncHandler } from '../lib/asyncHandler.js';
import { routeParam } from '../lib/params.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { recordAudit } from '../services/audit.service.js';
import * as productsService from '../services/products.service.js';

const router = Router();

const listQuerySchema = z.object({
  q: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  categorySlug: z.string().min(1).max(200).optional(),
  pricingType: pricingTypeSchema.optional(),
  sort: z.enum(['name', 'price']).optional(),
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().max(300).optional(),
  currency: currencySchema.optional(),
  includeInactive: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => v === 'true')
    .pipe(z.boolean().optional()),
});

type ListQuery = z.infer<typeof listQuerySchema>;

const adminBodySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  sku: z.string().nullable().optional(),
  categoryId: z.string().uuid().nullable().optional(),
  description: z.string().nullable().optional(),
  shortDescription: z.string().nullable().optional(),
  pricingType: pricingTypeSchema,
  priceInr: z.string().nullable().optional(),
  shippingInr: z.string().optional(),
  shippingUsd: z.string().optional(),
  imageUrl: z
    .union([z.string().max(2000), z.literal('')])
    .nullable()
    .optional()
    .transform((v) => (v === '' ? null : v)),
  images: z.array(z.string()).optional(),
  specs: z.record(z.unknown()).optional(),
  relatedProductIds: z.array(z.string().uuid()).optional(),
  isActive: z.boolean().optional(),
});

router.get(
  '/',
  validate(listQuerySchema, 'query'),
  asyncHandler(async (req, res) => {
    const data = await productsService.listProducts(req.query as unknown as ListQuery);
    res.json({ data });
  }),
);

router.get(
  '/admin/list',
  requireAuth,
  requireRoles('admin'),
  validate(listQuerySchema, 'query'),
  asyncHandler(async (req, res) => {
    const data = await productsService.adminListProducts({
      ...(req.query as unknown as ListQuery),
      includeInactive: true,
    });
    res.json({ data });
  }),
);

router.post(
  '/',
  requireAuth,
  requireRoles('admin'),
  validate(adminBodySchema),
  asyncHandler(async (req, res) => {
    const product = await productsService.createProduct(req.body);
    if (!product) throw new NotFoundError('Product not found');
    await recordAudit({
      actorUserId: req.user!.sub,
      action: 'product.created',
      entityType: 'product',
      entityId: product.id,
      metadata: { name: product.name },
      ipAddress: req.ip,
    });
    res.status(201).json({ data: { product } });
  }),
);

router.patch(
  '/id/:id',
  requireAuth,
  requireRoles('admin'),
  validate(adminBodySchema.partial()),
  asyncHandler(async (req, res) => {
    const product = await productsService.updateProduct(
      routeParam(req.params.id, 'id'),
      req.body,
    );
    if (!product) throw new NotFoundError('Product not found');
    await recordAudit({
      actorUserId: req.user!.sub,
      action: 'product.updated',
      entityType: 'product',
      entityId: product.id,
      metadata: { name: product.name },
      ipAddress: req.ip,
    });
    res.json({ data: { product } });
  }),
);

router.get(
  '/:slug',
  validate(z.object({ currency: currencySchema.optional() }), 'query'),
  asyncHandler(async (req, res) => {
    const currency = (req.query.currency as 'INR' | 'USD' | undefined) ?? 'INR';
    const product = await productsService.getProductBySlug(
      routeParam(req.params.slug, 'slug'),
      currency,
    );
    res.json({ data: { product } });
  }),
);

export default router;
