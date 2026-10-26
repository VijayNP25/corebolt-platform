import { Router } from 'express';
import { fxMarkupSchema } from '@corebolt/shared';
import { asyncHandler } from '../lib/asyncHandler.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { inrToUsd } from '../lib/money.js';
import { recordAudit } from '../services/audit.service.js';
import * as currencyService from '../services/currency.service.js';

const router = Router();

router.get(
  '/rate',
  asyncHandler(async (_req, res) => {
    const fx = await currencyService.getActiveFx();
    res.json({
      data: {
        fx,
        example: {
          inr: '100000.00',
          usd: inrToUsd('100000', fx.inrPerUsd, fx.markupPercent),
        },
      },
    });
  }),
);

router.post(
  '/refresh',
  requireAuth,
  requireRoles('admin'),
  asyncHandler(async (req, res) => {
    const fx = await currencyService.refreshFromExchangeRateApi();
    await recordAudit({
      actorUserId: req.user!.sub,
      action: 'currency.rate_refreshed',
      entityType: 'currency',
      metadata: { inrPerUsd: fx.inrPerUsd, markupPercent: fx.markupPercent },
      ipAddress: req.ip,
    });
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
    await recordAudit({
      actorUserId: req.user!.sub,
      action: 'currency.markup_updated',
      entityType: 'currency',
      metadata: { markupPercent: fx.markupPercent },
      ipAddress: req.ip,
    });
    res.json({ data: { fx } });
  }),
);

export default router;
