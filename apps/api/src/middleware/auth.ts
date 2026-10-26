import type { NextFunction, Request, Response } from 'express';
import type { Role } from '@corebolt/shared';
import { ForbiddenError, UnauthorizedError } from '../lib/errors.js';
import { verifyAccessToken, type AccessTokenPayload } from '../services/auth.service.js';

export type AuthUser = AccessTokenPayload;

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      guestToken?: string;
    }
  }
}

const ACCESS_COOKIE = 'cb_access';

export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  try {
    const token = extractAccessToken(req);
    if (token) {
      req.user = verifyAccessToken(token);
    }
  } catch {
    // ignore invalid token for optional auth
  }
  const guest = req.cookies?.cb_guest as string | undefined;
  if (guest) {
    req.guestToken = guest;
  }
  next();
}

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  try {
    const token = extractAccessToken(req);
    if (!token) {
      throw new UnauthorizedError();
    }
    req.user = verifyAccessToken(token);
    next();
  } catch {
    next(new UnauthorizedError());
  }
}

export function requireRoles(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new UnauthorizedError());
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(new ForbiddenError());
      return;
    }
    next();
  };
}

export function requireVerifiedEmail(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (!req.user) {
    next(new UnauthorizedError());
    return;
  }
  // SES is a stub in local development, so the verification email is never delivered.
  if (!req.user.emailVerified && process.env.NODE_ENV === 'production') {
    next(new ForbiddenError('Email verification required before checkout'));
    return;
  }
  next();
}

function extractAccessToken(req: Request): string | undefined {
  const cookieToken = req.cookies?.[ACCESS_COOKIE] as string | undefined;
  if (cookieToken) return cookieToken;

  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) {
    return header.slice(7);
  }
  return undefined;
}

export { ACCESS_COOKIE };
