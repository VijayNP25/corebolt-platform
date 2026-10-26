import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import type { CookieOptions, Response } from 'express';
import type { Role } from '@corebolt/shared';
import { env } from '../config/env.js';
import { db } from '../db/client.js';
import { sessions, users, type User } from '../db/schema.js';
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../lib/errors.js';
import { emailService } from './email.service.js';

export const ACCESS_COOKIE = 'cb_access';
export const REFRESH_COOKIE = 'cb_refresh';

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: Role;
  emailVerified: boolean;
}

interface RefreshTokenPayload {
  sub: string;
  sid: string;
}

export async function register(input: {
  email: string;
  password: string;
  name: string;
  phone?: string;
}): Promise<{
  user: PublicUser;
  verifyUrl: string;
  accessToken: string;
  refreshToken: string;
}> {
  const existing = await db.query.users.findFirst({
    where: eq(users.email, input.email.toLowerCase()),
  });
  if (existing) {
    throw new ConflictError('Email already registered');
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const [user] = await db
    .insert(users)
    .values({
      email: input.email.toLowerCase(),
      passwordHash,
      name: input.name,
      phone: input.phone,
      role: 'customer',
    })
    .returning();

  if (!user) throw new Error('Failed to create user');

  const verifyToken = signEmailVerifyToken(user.id);
  const verifyUrl = buildVerifyUrl(verifyToken);
  await emailService.sendVerificationEmail(user.email, verifyUrl);

  const tokens = await issueTokens(user);
  return { user: toPublicUser(user), verifyUrl, ...tokens };
}

export async function resendVerification(
  userId: string,
): Promise<{ alreadyVerified: boolean; verifyUrl: string | null }> {
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user) throw new NotFoundError('User not found');
  if (user.emailVerifiedAt) return { alreadyVerified: true, verifyUrl: null };

  const verifyUrl = buildVerifyUrl(signEmailVerifyToken(user.id));
  await emailService.sendVerificationEmail(user.email, verifyUrl);
  return { alreadyVerified: false, verifyUrl };
}

export async function startSession(
  userId: string,
  meta?: { userAgent?: string; ipAddress?: string },
): Promise<{ accessToken: string; refreshToken: string }> {
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user || !user.isActive) throw new UnauthorizedError('User inactive');
  return issueTokens(user, meta);
}

export async function login(
  email: string,
  password: string,
  meta?: { userAgent?: string; ipAddress?: string },
): Promise<{ user: PublicUser; accessToken: string; refreshToken: string }> {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email.toLowerCase()),
  });
  if (!user || !user.isActive) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const { accessToken, refreshToken } = await issueTokens(user, meta);
  return { user: toPublicUser(user), accessToken, refreshToken };
}

export async function refreshSession(
  refreshToken: string,
  meta?: { userAgent?: string; ipAddress?: string },
): Promise<{ accessToken: string; refreshToken: string; user: PublicUser }> {
  let payload: RefreshTokenPayload;
  try {
    payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
  } catch {
    throw new UnauthorizedError('Invalid refresh token');
  }

  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, payload.sid),
  });
  if (!session || session.revokedAt || session.expiresAt < new Date()) {
    throw new UnauthorizedError('Session expired');
  }

  const hash = hashToken(refreshToken);
  if (session.refreshTokenHash !== hash) {
    throw new UnauthorizedError('Invalid refresh token');
  }

  const user = await db.query.users.findFirst({ where: eq(users.id, payload.sub) });
  if (!user || !user.isActive) {
    throw new UnauthorizedError('User inactive');
  }

  // rotate refresh token
  await db
    .update(sessions)
    .set({ revokedAt: new Date() })
    .where(eq(sessions.id, session.id));

  const tokens = await issueTokens(user, meta);
  return { ...tokens, user: toPublicUser(user) };
}

export async function logout(refreshToken?: string): Promise<void> {
  if (!refreshToken) return;
  try {
    const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
    await db
      .update(sessions)
      .set({ revokedAt: new Date() })
      .where(eq(sessions.id, payload.sid));
  } catch {
    // ignore
  }
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
    return payload;
  } catch {
    throw new UnauthorizedError('Invalid access token');
  }
}

export async function verifyEmail(token: string): Promise<PublicUser> {
  let payload: { sub: string; purpose: string };
  try {
    payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as {
      sub: string;
      purpose: string;
    };
  } catch {
    throw new ValidationError('Invalid or expired verification token');
  }
  if (payload.purpose !== 'email_verify') {
    throw new ValidationError('Invalid verification token');
  }

  const [user] = await db
    .update(users)
    .set({ emailVerifiedAt: new Date() })
    .where(eq(users.id, payload.sub))
    .returning();

  if (!user) throw new ValidationError('User not found');
  return toPublicUser(user);
}

export async function updateProfile(
  userId: string,
  input: { name: string; phone?: string },
): Promise<PublicUser> {
  const phone = input.phone?.trim() ?? '';
  if (phone && phone.length < 6) {
    throw new ValidationError('Phone must be at least 6 characters');
  }
  const [updated] = await db
    .update(users)
    .set({ name: input.name.trim(), phone: phone || null })
    .where(eq(users.id, userId))
    .returning();
  if (!updated) throw new NotFoundError('User not found');
  return toPublicUser(updated);
}

export async function getUserById(id: string): Promise<PublicUser | null> {
  const user = await db.query.users.findFirst({ where: eq(users.id, id) });
  return user ? toPublicUser(user) : null;
}

export function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
): void {
  const common: CookieOptions = {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: 'lax',
    domain: env.COOKIE_DOMAIN === 'localhost' ? undefined : env.COOKIE_DOMAIN,
    path: '/',
  };

  res.cookie(ACCESS_COOKIE, accessToken, {
    ...common,
    maxAge: parseTtlMs(env.JWT_ACCESS_TTL),
  });
  res.cookie(REFRESH_COOKIE, refreshToken, {
    ...common,
    maxAge: parseTtlMs(env.JWT_REFRESH_TTL),
  });
}

export function clearAuthCookies(res: Response): void {
  const common: CookieOptions = {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: 'lax',
    domain: env.COOKIE_DOMAIN === 'localhost' ? undefined : env.COOKIE_DOMAIN,
    path: '/',
  };
  res.clearCookie(ACCESS_COOKIE, common);
  res.clearCookie(REFRESH_COOKIE, common);
}

async function issueTokens(
  user: User,
  meta?: { userAgent?: string; ipAddress?: string },
): Promise<{ accessToken: string; refreshToken: string }> {
  const expiresAt = new Date(Date.now() + parseTtlMs(env.JWT_REFRESH_TTL));
  const [session] = await db
    .insert(sessions)
    .values({
      userId: user.id,
      refreshTokenHash: 'pending',
      userAgent: meta?.userAgent,
      ipAddress: meta?.ipAddress,
      expiresAt,
    })
    .returning();

  if (!session) throw new Error('Failed to create session');

  const accessToken = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      emailVerified: Boolean(user.emailVerifiedAt),
    } satisfies AccessTokenPayload,
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_TTL } as jwt.SignOptions,
  );

  const refreshToken = jwt.sign(
    { sub: user.id, sid: session.id } satisfies RefreshTokenPayload,
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_TTL } as jwt.SignOptions,
  );

  await db
    .update(sessions)
    .set({ refreshTokenHash: hashToken(refreshToken) })
    .where(eq(sessions.id, session.id));

  return { accessToken, refreshToken };
}

function buildVerifyUrl(token: string): string {
  const origin = env.WEB_ORIGIN.replace(/\/$/, '');
  return `${origin}/en/verify-email?token=${encodeURIComponent(token)}`;
}

function signEmailVerifyToken(userId: string): string {
  return jwt.sign(
    { sub: userId, purpose: 'email_verify' },
    env.JWT_ACCESS_SECRET,
    { expiresIn: '24h' },
  );
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function parseTtlMs(ttl: string): number {
  const match = /^(\d+)([smhd])$/.exec(ttl);
  if (!match) return 15 * 60 * 1000;
  const n = Number(match[1]);
  const unit = match[2];
  const mult =
    unit === 's' ? 1000 : unit === 'm' ? 60_000 : unit === 'h' ? 3_600_000 : 86_400_000;
  return n * mult;
}

export type PublicUser = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: Role;
  emailVerified: boolean;
  preferredCurrency: 'INR' | 'USD' | null;
};

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    role: user.role,
    emailVerified: Boolean(user.emailVerifiedAt),
    preferredCurrency: user.preferredCurrency,
  };
}

export function assertStaffOrAdmin(role: Role): void {
  if (role !== 'admin' && role !== 'staff') {
    throw new ForbiddenError();
  }
}
