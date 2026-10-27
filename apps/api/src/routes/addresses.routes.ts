import { Router } from 'express';
import { and, eq } from 'drizzle-orm';
import { addressSchema, gstinSchema } from '@corebolt/shared';
import { z } from 'zod';
import { asyncHandler } from '../lib/asyncHandler.js';
import { routeParam } from '../lib/params.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { db } from '../db/client.js';
import { addresses } from '../db/schema.js';
import { NotFoundError } from '../lib/errors.js';

const router = Router();

router.use(requireAuth);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const items = await db.query.addresses.findMany({
      where: eq(addresses.userId, req.user!.sub),
    });
    res.json({ data: { addresses: items } });
  }),
);

router.post(
  '/',
  validate(addressSchema),
  asyncHandler(async (req, res) => {
    if (req.body.isDefault) {
      await db
        .update(addresses)
        .set({ isDefault: false })
        .where(eq(addresses.userId, req.user!.sub));
    }
    const [created] = await db
      .insert(addresses)
      .values({
        userId: req.user!.sub,
        label: req.body.label,
        company: req.body.company,
        gstin: req.body.gstin,
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country ?? 'IN',
        phone: req.body.phone,
        isDefault: req.body.isDefault ?? false,
      })
      .returning();
    res.status(201).json({ data: { address: created } });
  }),
);

const patchSchema = z
  .object({
    label: z.string().max(100).optional(),
    company: z.string().max(200).nullable().optional(),
    gstin: gstinSchema.nullable().optional(),
    line1: z.string().min(1).max(255).optional(),
    line2: z.string().max(255).nullable().optional(),
    city: z.string().min(1).max(100).optional(),
    state: z.string().min(1).max(100).optional(),
    postalCode: z.string().min(1).max(20).optional(),
    country: z.string().length(2).optional(),
    phone: z.string().min(6).max(20).nullable().optional(),
    isDefault: z.boolean().optional(),
  })
  .strict();

router.patch(
  '/:id',
  validate(patchSchema),
  asyncHandler(async (req, res) => {
    const id = routeParam(req.params.id, 'id');
    const existing = await db.query.addresses.findFirst({
      where: and(eq(addresses.id, id), eq(addresses.userId, req.user!.sub)),
    });
    if (!existing) throw new NotFoundError('Address not found');

    if (req.body.isDefault) {
      await db
        .update(addresses)
        .set({ isDefault: false })
        .where(eq(addresses.userId, req.user!.sub));
    }

    const [updated] = await db
      .update(addresses)
      .set(req.body)
      .where(eq(addresses.id, id))
      .returning();
    res.json({ data: { address: updated } });
  }),
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = routeParam(req.params.id, 'id');
    const existing = await db.query.addresses.findFirst({
      where: and(eq(addresses.id, id), eq(addresses.userId, req.user!.sub)),
    });
    if (!existing) throw new NotFoundError('Address not found');
    await db.delete(addresses).where(eq(addresses.id, id));
    res.status(204).send();
  }),
);

export default router;
