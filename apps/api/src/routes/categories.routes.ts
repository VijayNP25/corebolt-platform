import { Router } from 'express';
import { asc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db/client.js';
import { categories } from '../db/schema.js';
import { asyncHandler } from '../lib/asyncHandler.js';
import { NotFoundError } from '../lib/errors.js';
import { routeParam } from '../lib/params.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

const bodySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable().optional(),
  parentId: z.string().uuid().nullable().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const rows = await db.query.categories.findMany({
      where: eq(categories.isActive, true),
      orderBy: [asc(categories.sortOrder), asc(categories.name)],
    });
    res.json({ data: { items: rows } });
  }),
);

router.get(
  '/admin/list',
  requireAuth,
  requireRoles('admin', 'staff'),
  asyncHandler(async (_req, res) => {
    const rows = await db.query.categories.findMany({
      orderBy: [asc(categories.sortOrder), asc(categories.name)],
    });
    res.json({ data: { items: rows } });
  }),
);

router.post(
  '/',
  requireAuth,
  requireRoles('admin'),
  validate(bodySchema),
  asyncHandler(async (req, res) => {
    const [row] = await db.insert(categories).values(req.body).returning();
    res.status(201).json({ data: { category: row } });
  }),
);

router.patch(
  '/:id',
  requireAuth,
  requireRoles('admin'),
  validate(bodySchema.partial()),
  asyncHandler(async (req, res) => {
    const id = routeParam(req.params.id, 'id');
    const [row] = await db
      .update(categories)
      .set(req.body)
      .where(eq(categories.id, id))
      .returning();
    if (!row) throw new NotFoundError('Category not found');
    res.json({ data: { category: row } });
  }),
);

export default router;
