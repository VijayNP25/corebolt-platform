import { Router } from 'express';
import { checkoutSchema } from '@corebolt/shared';
import { asyncHandler } from '../lib/asyncHandler.js';
import { requireAuth, requireVerifiedEmail } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import * as checkoutService from '../services/checkout.service.js';

const router = Router();

router.post(
  '/',
  requireAuth,
  requireVerifiedEmail,
  validate(checkoutSchema),
  asyncHandler(async (req, res) => {
    const result = await checkoutService.checkout({
      userId: req.user!.sub,
      currency: req.body.currency,
      shippingAddressId: req.body.shippingAddressId,
      billingAddressId: req.body.billingAddressId,
      notes: req.body.notes,
    });
    res.status(201).json({ data: result });
  }),
);

export default router;
