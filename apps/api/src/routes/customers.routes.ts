import { Router } from 'express';
import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db/client.js';
import { users } from '../db/schema.js';
import { asyncHandler } from '../lib/asyncHandler.js';
import { NotFoundError } from '../lib/errors.js';
import { routeParam } from '../lib/params.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get(
  '/',
  requireAuth,
  requireRoles('admin', 'staff'),
  asyncHandler(async (_req, res) => {
    const rows = await db.query.users.findMany({
      where: eq(users.role, 'customer'),
      orderBy: [desc(users.createdAt)],
      columns: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        emailVerifiedAt: true,
        preferredCurrency: true,
        isActive: true,
        createdAt: true,
      },
    });
    res.json({ data: { items: rows } });
  }),
);

router.patch(
  '/:id',
  requireAuth,
  requireRoles('admin'),
  validate(z.object({ isActive: z.boolean() })),
  asyncHandler(async (req, res) => {
    const id = routeParam(req.params.id, 'id');
    const [row] = await db
      .update(users)
      .set({ isActive: req.body.isActive })
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        email: users.email,
        isActive: users.isActive,
      });
    if (!row) throw new NotFoundError('Customer not found');
    res.json({ data: { customer: row } });
  }),
);

export default router;