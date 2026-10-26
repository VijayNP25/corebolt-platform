'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { apiFetch, ApiError } from '@/lib/api';
import { storeVerifyUrl } from '@/lib/auth';

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'working' | 'confirmed' | 'failed'>(
    token ? 'working' : 'failed',
  );
  const [message, setMessage] = useState(
    token ? 'Confirming your email…' : 'This page needs the link from your confirmation email.',
  );

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        await apiFetch('/auth/verify-email', {
          method: 'POST',
          body: JSON.stringify({ token }),
        });
        storeVerifyUrl(null);
        if (!cancelled) {
          setStatus('confirmed');
          setMessage('Your email is confirmed. You can place an order.');
        }
      } catch (error) {
        if (!cancelled) {
          setStatus('failed');
          setMessage(
            error instanceof ApiError
              ? error.message
              : 'This confirmation link is invalid or expired.',
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="cb-shell-card max-w-xl">
      <h2>{status === 'confirmed' ? 'Email confirmed' : 'Email confirmation'}</h2>
      <p className={`text-sm mt-3 ${status === 'failed' ? 'cb-auth-error' : ''}`}>{message}</p>
      <p className="text-sm mt-5">
        <Link href="/account" className="underline text-[var(--g-text)]">
          Go to My Account
        </Link>
      </p>
    </div>
  );
}
