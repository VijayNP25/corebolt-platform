'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { resetPassword } from '@/lib/auth';

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(
    token ? null : 'This page needs the link from your reset email.',
  );

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) return;
    setSubmitting(true);
    setError(null);
    try {
      await resetPassword(token, password);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reset the password.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="cb-shell-card max-w-md">
        <p className="text-sm">Your password is updated. Sign in with the new one.</p>
        <p className="text-sm mt-6">
          <Link href="/login" className="underline text-[var(--g-text)]">
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="cb-shell-card max-w-md">
      <form className="cb-auth-form" onSubmit={onSubmit} noValidate>
        <label htmlFor="new-password">New password</label>
        <input
          id="new-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          disabled={!token}
        />
        {error ? <p className="cb-auth-error">{error}</p> : null}
        <button type="submit" disabled={submitting || !token}>
          {submitting ? 'Please wait…' : 'Update password'}
        </button>
      </form>
      <p className="text-sm mt-6">
        <Link href="/forgot-password" className="underline text-[var(--g-text)]">
          Request a new link
        </Link>
      </p>
    </div>
  );
}
