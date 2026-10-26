import { Router } from 'express';
import { asc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db/client.js';
import { categories } from '../db/schema.js';
import { recordAudit } from '../services/audit.service.js';
import { asyncHandler } from '../lib/asyncHandler.js';
import { NotFoundError } from '../lib/errors.js';
import { routeParam } from '../lib/params.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { syncCategoryToCatalog, syncNewSubcategory } from '../services/catalog-sync.js';

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

async function publishCategory(row: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  isActive: boolean;
}) {
  if (row.parentId) {
    const parent = await db.query.categories.findFirst({
      where: eq(categories.id, row.parentId),
    });
    if (parent) await syncNewSubcategory(row, parent.slug);
    return;
  }
  await syncCategoryToCatalog(row);
}

router.post(
  '/',
  requireAuth,
  requireRoles('admin'),
  validate(bodySchema),
  asyncHandler(async (req, res) => {
    const [row] = await db.insert(categories).values(req.body).returning();
    if (!row) throw new NotFoundError('Category not found');
    await publishCategory(row);
    await recordAudit({
      actorUserId: req.user!.sub,
      action: 'category.created',
      entityType: 'category',
      entityId: row.id,
      metadata: { name: row.name },
      ipAddress: req.ip,
    });
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
    const { slug: _slug, parentId: _parentId, ...changes } = req.body as z.infer<
      typeof bodySchema
    >;
    const [row] = await db
      .update(categories)
      .set(changes)
      .where(eq(categories.id, id))
      .returning();
    if (!row) throw new NotFoundError('Category not found');
    await publishCategory(row);
    await recordAudit({
      actorUserId: req.user!.sub,
      action: 'category.updated',
      entityType: 'category',
      entityId: row.id,
      metadata: { name: row.name },
      ipAddress: req.ip,
    });
    res.json({ data: { category: row } });
  }),
);

export default router;
