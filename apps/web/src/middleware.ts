import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import {
  CURRENCY_COOKIE,
  DEFAULT_CURRENCY,
  parseCurrency,
} from './lib/currency';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Ensure currency cookie exists (INR default) for header switcher + API.
  const existing = request.cookies.get(CURRENCY_COOKIE)?.value;
  if (!existing) {
    response.cookies.set(CURRENCY_COOKIE, DEFAULT_CURRENCY, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  } else {
    // Normalize invalid values
    const parsed = parseCurrency(existing);
    if (parsed !== existing) {
      response.cookies.set(CURRENCY_COOKIE, parsed, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/(en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
