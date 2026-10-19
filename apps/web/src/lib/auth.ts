import { apiFetch, type ApiUser } from './api';

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
  return res.data.user;
}

export async function register(input: {
  email: string;
  password: string;
  name: string;
  phone?: string;
}): Promise<ApiUser> {
  const res = await apiFetch<{ data: { user: ApiUser } }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return res.data.user;
}

export async function logout(): Promise<void> {
  await apiFetch<void>('/auth/logout', { method: 'POST' });
}
