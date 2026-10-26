'use client';

import { useEffect, useState } from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { getMe, login, register } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

function safeNextPath(raw: string | null): string {
  if (!raw) return '/account';
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/account';
  return raw;
}

export default function LoginClient({
  initialMode = 'login',
}: {
  initialMode?: 'login' | 'register';
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = safeNextPath(searchParams.get('next'));
  const { toast } = useToast();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getMe()
      .then((user) => {
        if (user) router.replace(nextPath);
      })
      .finally(() => setChecking(false));
  }, [router, nextPath]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const user =
        mode === 'login'
          ? await login(email, password)
          : await register({ email, password, name });
      toast({
        title: mode === 'login' ? 'Signed in' : 'Account created',
        description:
          mode === 'login'
            ? user.email
            : 'Confirm your email from the link on your account before you place an order.',
      });
      router.push(nextPath);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not sign in. Is the API running with a seeded database?',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (checking) {
    return <p className="lead">Loading…</p>;
  }

  return (
    <div className="cb-shell-card max-w-md">
      <div className="flex gap-4 mb-6 text-sm border-b border-black/10 pb-3">
        <button
          type="button"
          className={mode === 'login' ? 'font-semibold text-[var(--g-text)]' : 'text-[var(--ink3)]'}
          onClick={() => setMode('login')}
        >
          Sign in
        </button>
        <button
          type="button"
          className={
            mode === 'register' ? 'font-semibold text-[var(--g-text)]' : 'text-[var(--ink3)]'
          }
          onClick={() => setMode('register')}
        >
          Create account
        </button>
      </div>

      <form className="cb-auth-form" onSubmit={onSubmit} noValidate>
        {mode === 'register' && (
          <>
            <label htmlFor="login-name">Name</label>
            <input
              id="login-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </>
        )}
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="you@company.com"
        />
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        />
        {error && <p className="cb-auth-error">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting
            ? 'Please wait…'
            : mode === 'login'
              ? 'Sign in'
              : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-[var(--ink3)] mt-6">
        Demo admin after seed:{' '}
        <code className="text-xs">admin@core-bolt.com</code> /{' '}
        <code className="text-xs">ChangeMeAdmin123!</code>
      </p>
      <p className="text-sm mt-3">
        <Link href="/account" className="underline text-[var(--g-text)]">
          Go to My Account
        </Link>
      </p>
    </div>
  );
}
