import { cookies } from 'next/headers';
import type { CurrencyCode } from '@corebolt/shared';
import { CURRENCY_COOKIE, parseCurrency } from './currency';

export async function getRequestCurrency(): Promise<CurrencyCode> {
  const jar = await cookies();
  return parseCurrency(jar.get(CURRENCY_COOKIE)?.value);
}
