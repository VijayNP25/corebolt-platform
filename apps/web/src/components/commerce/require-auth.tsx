'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { getMe } from '@/lib/auth';

/** Redirects to /login?next=… when the visitor is not signed in. */
export default function RequireAuth({
  children,
  nextPath,
  title = 'Sign in required',
  message = 'Please sign in to continue.',
}: {
  children: ReactNode;
  nextPath: string;
  title?: string;
  message?: string;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getMe().then((user) => {
      if (cancelled) return;
      if (!user) {
        router.replace(`/login?next=${encodeURIComponent(nextPath)}`);
        setOk(false);
      } else {
        setOk(true);
      }
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [router, nextPath]);

  if (!ready) {
    return <p className="lead">Checking sign-in…</p>;
  }

  if (!ok) {
    return (
      <div className="cb-shell-card">
        <h2>{title}</h2>
        <p className="lead mt-2">{message}</p>
        <Link
          href={`/login?next=${encodeURIComponent(nextPath)}`}
          className="inline-block mt-4 bg-[var(--g)] text-white px-5 py-3 font-semibold"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
