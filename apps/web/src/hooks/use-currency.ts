'use client';

import { useCallback, useEffect, useState } from 'react';
import type { CurrencyCode } from '@corebolt/shared';
import { CURRENCY_COOKIE, DEFAULT_CURRENCY, parseCurrency } from '@/lib/currency';

function readCookie(): CurrencyCode {
  if (typeof document === 'undefined') return DEFAULT_CURRENCY;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${CURRENCY_COOKIE}=`));
  return parseCurrency(match?.split('=')[1]);
}

export function useCurrency() {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);

  useEffect(() => {
    setCurrencyState(readCookie());
  }, []);

  const setCurrency = useCallback((next: CurrencyCode) => {
    document.cookie = `${CURRENCY_COOKIE}=${next}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    setCurrencyState(next);
    // Soft reload so server components pick up the cookie.
    window.location.reload();
  }, []);

  return { currency, setCurrency };
}
