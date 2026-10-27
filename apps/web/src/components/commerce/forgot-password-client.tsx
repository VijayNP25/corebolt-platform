'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { requestPasswordReset } from '@/lib/auth';

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const next = await requestPasswordReset(email);
      setMessage(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send a reset link.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cb-shell-card max-w-md">
      <form className="cb-auth-form" onSubmit={onSubmit} noValidate>
        <label htmlFor="reset-email">Email</label>
        <input
          id="reset-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
          placeholder="you@company.com"
        />
        {message ? <p className="text-sm">{message}</p> : null}
        {error ? <p className="cb-auth-error">{error}</p> : null}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Please wait…' : 'Send reset link'}
        </button>
      </form>
      <p className="text-sm mt-6">
        <Link href="/login" className="underline text-[var(--g-text)]">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
