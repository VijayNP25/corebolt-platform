import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { enquirySchema, updateEnquiryStatusSchema } from '@corebolt/shared';
import { NotFoundError } from '../lib/errors.js';
import { asyncHandler } from '../lib/asyncHandler.js';
import { routeParam } from '../lib/params.js';
import { optionalAuth, requireAuth, requireRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { recordAudit } from '../services/audit.service.js';
import * as enquiriesService from '../services/enquiries.service.js';

const router = Router();

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMITED', message: 'Too many enquiry submissions' } },
});

router.post(
  '/',
  enquiryLimiter,
  optionalAuth,
  validate(enquirySchema),
  asyncHandler(async (req, res) => {
    const enquiry = await enquiriesService.createEnquiry(req.body, req.user?.sub);
    res.status(201).json({ data: { enquiry } });
  }),
);

router.get(
  '/',
  requireAuth,
  requireRoles('admin', 'staff'),
  asyncHandler(async (_req, res) => {
    const items = await enquiriesService.listEnquiries();
    res.json({ data: { enquiries: items } });
  }),
);

router.get(
  '/:id',
  requireAuth,
  requireRoles('admin', 'staff'),
  asyncHandler(async (req, res) => {
    const enquiry = await enquiriesService.getEnquiry(routeParam(req.params.id, 'id'));
    res.json({ data: { enquiry } });
  }),
);

router.patch(
  '/:id/status',
  requireAuth,
  requireRoles('admin', 'staff'),
  validate(updateEnquiryStatusSchema),
  asyncHandler(async (req, res) => {
    const enquiry = await enquiriesService.updateEnquiryStatus({
      enquiryId: routeParam(req.params.id, 'id'),
      toStatus: req.body.status,
      actorUserId: req.user!.sub,
      note: req.body.note,
    });
    if (!enquiry) throw new NotFoundError('Enquiry not found');
    await recordAudit({
      actorUserId: req.user!.sub,
      action: 'enquiry.status_changed',
      entityType: 'enquiry',
      entityId: enquiry.id,
      metadata: { status: enquiry.status, name: enquiry.name },
      ipAddress: req.ip,
    });
    res.json({ data: { enquiry } });
  }),
);

export default router;
