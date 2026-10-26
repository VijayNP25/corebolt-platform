import { Router } from 'express';
import { asyncHandler } from '../lib/asyncHandler.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';
import * as auditService from '../services/audit.service.js';

const router = Router();

router.get(
  '/',
  requireAuth,
  requireRoles('admin'),
  asyncHandler(async (_req, res) => {
    const entries = await auditService.listAuditLogs();
    res.json({ data: { entries } });
  }),
);

export default router;
