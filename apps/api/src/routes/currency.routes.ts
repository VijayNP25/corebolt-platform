import { Router } from 'express';
import { fxMarkupSchema } from '@corebolt/shared';
import { asyncHandler } from '../lib/asyncHandler.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import * as currencyService from '../services/currency.service.js';

const router = Router();

router.get(
  '/rate',
  asyncHandler(async (_req, res) => {
    const fx = await currencyService.getActiveFx();
    res.json({ data: { fx } });
  }),
);

router.post(
  '/refresh',
  requireAuth,
  requireRoles('admin'),
  asyncHandler(async (_req, res) => {
    const fx = await currencyService.refreshFromExchangeRateApi();
    res.json({ data: { fx } });
  }),
);

router.patch(
  '/markup',
  requireAuth,
  requireRoles('admin'),
  validate(fxMarkupSchema),
  asyncHandler(async (req, res) => {
    const fx = await currencyService.updateMarkupPercent(req.body.markupPercent);
    res.json({ data: { fx } });
  }),
);

export default router;
