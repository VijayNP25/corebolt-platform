import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { loginSchema, registerSchema } from '@corebolt/shared';
import { z } from 'zod';
import { asyncHandler } from '../lib/asyncHandler.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import * as auth from '../services/auth.service.js';
import { mergeGuestCartIntoUser, GUEST_COOKIE } from '../services/cart.service.js';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMITED', message: 'Too many auth attempts' } },
});

router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  asyncHandler(async (req, res) => {
    const result = await auth.register(req.body);
    res.status(201).json({ data: { user: result.user } });
  }),
);

router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  optionalAuth,
  asyncHandler(async (req, res) => {
    const result = await auth.login(req.body.email, req.body.password, {
      userAgent: req.get('user-agent') ?? undefined,
      ipAddress: req.ip,
    });

    const guestToken = req.cookies?.[GUEST_COOKIE] as string | undefined;
    if (guestToken) {
      await mergeGuestCartIntoUser(guestToken, result.user.id);
      res.clearCookie(GUEST_COOKIE, { path: '/' });
    }

    auth.setAuthCookies(res, result.accessToken, result.refreshToken);
    res.json({ data: { user: result.user } });
  }),
);

router.post(
  '/refresh',
  asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.[auth.REFRESH_COOKIE] as string | undefined;
    if (!refreshToken) {
      res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'No refresh token' } });
      return;
    }
    const result = await auth.refreshSession(refreshToken, {
      userAgent: req.get('user-agent') ?? undefined,
      ipAddress: req.ip,
    });
    auth.setAuthCookies(res, result.accessToken, result.refreshToken);
    res.json({ data: { user: result.user } });
  }),
);

router.post(
  '/logout',
  asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.[auth.REFRESH_COOKIE] as string | undefined;
    await auth.logout(refreshToken);
    auth.clearAuthCookies(res);
    res.status(204).send();
  }),
);

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await auth.getUserById(req.user!.sub);
    res.json({ data: { user } });
  }),
);

router.post(
  '/verify-email',
  validate(z.object({ token: z.string().min(1) })),
  asyncHandler(async (req, res) => {
    const user = await auth.verifyEmail(req.body.token);
    res.json({ data: { user } });
  }),
);

export default router;
