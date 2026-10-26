import { Router } from 'express';
import { asyncHandler } from '../lib/asyncHandler.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { ordersToCsv, salesReport } from '../services/reports.service.js';

const router = Router();

router.use(requireAuth, requireRoles('admin'));

router.get(
  '/summary',
  asyncHandler(async (_req, res) => {
    const report = await salesReport();
    const { orders: _orders, ...summary } = report;
    res.json({ data: { summary } });
  }),
);

router.get(
  '/orders.csv',
  asyncHandler(async (_req, res) => {
    const report = await salesReport();
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="corebolt-orders.csv"');
    res.send(ordersToCsv(report.orders));
  }),
);

export default router;
