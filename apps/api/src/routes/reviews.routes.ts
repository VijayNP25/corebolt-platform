import { Router } from 'express';
import { moderateReviewSchema, reviewSchema } from '@corebolt/shared';
import { asyncHandler } from '../lib/asyncHandler.js';
import { routeParam } from '../lib/params.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { recordAudit } from '../services/audit.service.js';
import * as reviewsService from '../services/reviews.service.js';

const router = Router();

router.get(
  '/product/:slug',
  asyncHandler(async (req, res) => {
    const items = await reviewsService.listApprovedReviewsBySlug(
      routeParam(req.params.slug, 'slug'),
    );
    res.json({ data: { reviews: items } });
  }),
);

router.get(
  '/eligible',
  requireAuth,
  asyncHandler(async (req, res) => {
    const slug = typeof req.query.slug === 'string' ? req.query.slug : '';
    const orders = await reviewsService.listReviewableOrders(req.user!.sub, slug);
    res.json({ data: { orders } });
  }),
);

router.post(
  '/',
  requireAuth,
  validate(reviewSchema),
  asyncHandler(async (req, res) => {
    const review = await reviewsService.createReview({
      userId: req.user!.sub,
      productId: req.body.productId,
      orderId: req.body.orderId,
      rating: req.body.rating,
      body: req.body.body,
    });
    res.status(201).json({ data: { review } });
  }),
);

router.get(
  '/pending',
  requireAuth,
  requireRoles('admin'),
  asyncHandler(async (_req, res) => {
    const items = await reviewsService.listPendingReviews();
    res.json({ data: { reviews: items } });
  }),
);

router.patch(
  '/:reviewId/moderate',
  requireAuth,
  requireRoles('admin'),
  validate(moderateReviewSchema),
  asyncHandler(async (req, res) => {
    const review = await reviewsService.moderateReview({
      reviewId: routeParam(req.params.reviewId, 'reviewId'),
      status: req.body.status,
      moderatorId: req.user!.sub,
    });
    await recordAudit({
      actorUserId: req.user!.sub,
      action: 'review.moderated',
      entityType: 'review',
      entityId: review.id,
      metadata: { status: review.status },
      ipAddress: req.ip,
    });
    res.json({ data: { review } });
  }),
);

export default router;
