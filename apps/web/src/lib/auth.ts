import { apiFetch, type ApiUser } from './api';

export const AUTH_CHANGED_EVENT = 'corebolt-auth-changed';

function notifyAuthChanged() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export async function getMe(): Promise<ApiUser | null> {
  try {
    const res = await apiFetch<{ data: { user: ApiUser } }>('/auth/me');
    return res.data.user;
  } catch {
    return null;
  }
}

export async function login(email: string, password: string): Promise<ApiUser> {
  const res = await apiFetch<{ data: { user: ApiUser } }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  notifyAuthChanged();
  return res.data.user;
}

const VERIFY_URL_KEY = 'corebolt.verifyUrl';

export function storedVerifyUrl(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(VERIFY_URL_KEY);
}

export function storeVerifyUrl(url: string | null) {
  if (typeof window === 'undefined') return;
  if (url) sessionStorage.setItem(VERIFY_URL_KEY, url);
  else sessionStorage.removeItem(VERIFY_URL_KEY);
}

export async function register(input: {
  email: string;
  password: string;
  name: string;
  phone?: string;
}): Promise<ApiUser> {
  const res = await apiFetch<{ data: { user: ApiUser; verifyUrl?: string } }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  storeVerifyUrl(res.data.verifyUrl ?? null);
  notifyAuthChanged();
  return res.data.user;
}

export async function requestPasswordReset(email: string): Promise<string> {
  const res = await apiFetch<{ data: { message: string } }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return res.data.message;
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await apiFetch('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, password }),
  });
}

export async function logout(): Promise<void> {
  await apiFetch<void>('/auth/logout', { method: 'POST' });
  notifyAuthChanged();
}
