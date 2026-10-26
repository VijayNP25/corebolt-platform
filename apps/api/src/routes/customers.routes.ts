import { Router } from 'express';
import { and, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db/client.js';
import { orders, users } from '../db/schema.js';
import { recordAudit } from '../services/audit.service.js';
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
    const counts = await db
      .select({
        userId: orders.userId,
        count: sql<number>`count(*)::int`,
      })
      .from(orders)
      .groupBy(orders.userId);
    const orderCount = new Map(counts.map((row) => [row.userId, row.count]));
    res.json({
      data: {
        items: rows.map((row) => ({
          ...row,
          orderCount: orderCount.get(row.id) ?? 0,
        })),
      },
    });
  }),
);

router.patch(
  '/:id',
  requireAuth,
  requireRoles('admin'),
  validate(z.object({ isActive: z.boolean() })),
  asyncHandler(async (req, res) => {
    const id = routeParam(req.params.id, 'id');
    const existing = await db.query.users.findFirst({
      where: and(eq(users.id, id), eq(users.role, 'customer')),
    });
    if (!existing) throw new NotFoundError('Customer not found');
    const [row] = await db
      .update(users)
      .set({ isActive: req.body.isActive })
      .where(eq(users.id, id))
      .returning();
    if (!row) throw new NotFoundError('Customer not found');
    await recordAudit({
      actorUserId: req.user!.sub,
      action: row.isActive ? 'customer.activated' : 'customer.deactivated',
      entityType: 'customer',
      entityId: row.id,
      metadata: { email: row.email, name: row.name },
      ipAddress: req.ip,
    });
    res.json({
      data: {
        customer: { id: row.id, email: row.email, name: row.name, isActive: row.isActive },
      },
    });
  }),
);

export default router;