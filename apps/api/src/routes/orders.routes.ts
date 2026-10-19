import { Router } from 'express';
import { updateOrderStatusSchema } from '@corebolt/shared';
import { z } from 'zod';
import { asyncHandler } from '../lib/asyncHandler.js';
import { routeParam } from '../lib/params.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import * as ordersService from '../services/orders.service.js';

const router = Router();

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const items = await ordersService.listOrdersForUser(req.user!.sub);
    res.json({ data: { orders: items } });
  }),
);

router.get(
  '/me/:orderId',
  requireAuth,
  asyncHandler(async (req, res) => {
    const order = await ordersService.getOrderForUser(
      routeParam(req.params.orderId, 'orderId'),
      req.user!.sub,
    );
    res.json({ data: { order } });
  }),
);

router.get(
  '/',
  requireAuth,
  requireRoles('admin', 'staff'),
  validate(
    z.object({
      status: updateOrderStatusSchema.shape.status.optional(),
    }),
    'query',
  ),
  asyncHandler(async (req, res) => {
    const items = await ordersService.listOrdersAdmin({
      status: req.query.status as never,
    });
    res.json({ data: { orders: items } });
  }),
);

router.patch(
  '/:orderId/status',
  requireAuth,
  requireRoles('admin', 'staff'),
  validate(updateOrderStatusSchema),
  asyncHandler(async (req, res) => {
    const order = await ordersService.updateOrderStatus({
      orderId: routeParam(req.params.orderId, 'orderId'),
      toStatus: req.body.status,
      actorUserId: req.user!.sub,
      actorRole: req.user!.role as 'admin' | 'staff',
      note: req.body.note,
      carrier: req.body.carrier,
      trackingNumber: req.body.trackingNumber,
    });
    res.json({ data: { order } });
  }),
);

export default router;
