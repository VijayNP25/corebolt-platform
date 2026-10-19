import { Router } from 'express';
import { eq } from 'drizzle-orm';
import { addressSchema } from '@corebolt/shared';
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

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const [deleted] = await db
      .delete(addresses)
      .where(eq(addresses.id, routeParam(req.params.id, 'id')))
      .returning();
    if (!deleted || deleted.userId !== req.user!.sub) {
      throw new NotFoundError('Address not found');
    }
    res.status(204).send();
  }),
);

export default router;
