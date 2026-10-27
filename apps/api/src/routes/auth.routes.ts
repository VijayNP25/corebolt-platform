import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from '@corebolt/shared';
import { z } from 'zod';
import { env } from '../config/env.js';
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
    auth.setAuthCookies(res, result.accessToken, result.refreshToken);
    res.status(201).json({
      data: {
        user: result.user,
        ...(env.NODE_ENV === 'production' ? {} : { verifyUrl: result.verifyUrl }),
      },
    });
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

router.patch(
  '/me',
  requireAuth,
  validate(updateProfileSchema),
  asyncHandler(async (req, res) => {
    const user = await auth.updateProfile(req.user!.sub, req.body);
    res.json({ data: { user } });
  }),
);

router.post(
  '/verify-email',
  optionalAuth,
  validate(z.object({ token: z.string().min(1) })),
  asyncHandler(async (req, res) => {
    const user = await auth.verifyEmail(req.body.token);
    if (req.user?.sub === user.id) {
      const tokens = await auth.startSession(user.id, {
        userAgent: req.get('user-agent') ?? undefined,
        ipAddress: req.ip,
      });
      auth.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
    }
    res.json({ data: { user } });
  }),
);

router.post(
  '/forgot-password',
  authLimiter,
  validate(forgotPasswordSchema),
  asyncHandler(async (req, res) => {
    await auth.requestPasswordReset(req.body.email);
    res.json({
      data: {
        message: 'If an account exists for that email, a reset link is on its way.',
      },
    });
  }),
);

router.post(
  '/reset-password',
  authLimiter,
  validate(resetPasswordSchema),
  asyncHandler(async (req, res) => {
    await auth.resetPassword(req.body.token, req.body.password);
    res.json({ data: { reset: true } });
  }),
);

router.post(
  '/resend-verification',
  authLimiter,
  requireAuth,
  asyncHandler(async (req, res) => {
    const result = await auth.resendVerification(req.user!.sub);
    res.json({
      data: {
        alreadyVerified: result.alreadyVerified,
        ...(env.NODE_ENV === 'production' || !result.verifyUrl
          ? {}
          : { verifyUrl: result.verifyUrl }),
      },
    });
  }),
);

export default router;
