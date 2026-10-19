import type { CurrencyCode } from '@corebolt/shared';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type ApiOptions = RequestInit & {
  currency?: CurrencyCode;
  searchParams?: Record<string, string | number | undefined | null>;
};

function buildUrl(path: string, searchParams?: ApiOptions['searchParams']) {
  const base = API_URL.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${base}${p}`);
  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      if (v !== undefined && v !== null && v !== '') {
        url.searchParams.set(k, String(v));
      }
    }
  }
  return url.toString();
}

export async function apiFetch<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { currency, searchParams, headers, ...init } = options;
  const params = { ...searchParams };
  if (currency) params.currency = currency;

  const res = await fetch(buildUrl(path, params), {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(currency ? { 'X-Currency': currency } : {}),
      ...headers,
    },
  });

  if (res.status === 204) {
    return undefined as T;
  }

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const err = body?.error;
    throw new ApiError(
      err?.message ?? `Request failed (${res.status})`,
      res.status,
      err?.code,
      err?.details,
    );
  }

  return body as T;
}

export type ApiProduct = {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  shortDescription: string | null;
  pricingType: 'FIXED' | 'ON_REQUEST';
  currency: CurrencyCode;
  price: string | null;
  priceInr: string | null;
  shipping: string | null;
  imageUrl: string | null;
  categoryId: string | null;
  isActive: boolean;
};

export type ApiUser = {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin' | 'staff';
  phone?: string | null;
};
