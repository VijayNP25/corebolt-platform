'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { getMe, logout } from '@/lib/auth';
import type { ApiUser } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { formatMoney, type CurrencyCode } from '@corebolt/shared';

type LocalOrder = {
  id: string;
  currency: CurrencyCode;
  totals: { total: string };
  createdAt: string;
  status: string;
  items: { name: string; quantity: number }[];
};

export default function AccountClient() {
  const { toast } = useToast();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [localOrders, setLocalOrders] = useState<LocalOrder[]>([]);

  useEffect(() => {
    getMe()
      .then(setUser)
      .finally(() => setLoading(false));
    try {
      const raw = localStorage.getItem('corebolt.localOrders.v1');
      setLocalOrders(raw ? (JSON.parse(raw) as LocalOrder[]) : []);
    } catch {
      setLocalOrders([]);
    }
  }, []);

  const onLogout = async () => {
    await logout();
    setUser(null);
    toast({ title: 'Signed out' });
  };

  if (loading) return <p className="lead">Loading…</p>;

  if (!user) {
    return (
      <div className="cb-shell-card">
        <h2>You are signed out</h2>
        <p className="lead mt-2">Sign in to view orders and manage your profile.</p>
        <p className="mt-4">
          <Link
            href="/login"
            className="inline-block bg-[var(--g)] text-white px-5 py-3 font-semibold"
          >
            Go to Sign in
          </Link>
        </p>
        <p className="text-sm mt-3">
          <Link href="/register" className="underline text-[var(--g-text)]">
            Create an account
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="cb-shell-card">
        <h2>Signed in</h2>
        <p>
          <strong>{user.name}</strong> · {user.email}
        </p>
        <p className="text-sm text-[var(--ink3)] mt-1">Role: {user.role}</p>
        {(user.role === 'admin' || user.role === 'staff') && (
          <p className="mt-3">
            <Link href="/admin" className="underline text-[var(--g-text)]">
              Open admin
            </Link>
          </p>
        )}
        <button type="button" className="mt-4 underline text-sm" onClick={onLogout}>
          Sign out
        </button>
      </div>

      <div className="cb-shell-card">
        <h2>My orders</h2>
        {localOrders.length === 0 ? (
          <p className="text-sm text-[var(--ink3)]">
            No orders yet. After checkout they appear here.
          </p>
        ) : (
          <ul className="space-y-3 mt-3">
            {localOrders.map((o) => (
              <li key={o.id} className="border border-black/10 p-3 text-sm">
                <div className="font-medium">
                  {o.id} · {o.status}
                </div>
                <div className="text-[var(--ink3)]">
                  {new Date(o.createdAt).toLocaleString()} ·{' '}
                  {formatMoney(o.totals.total, o.currency)}
                </div>
                <div className="mt-1">
                  {o.items.map((i) => `${i.name} × ${i.quantity}`).join(', ')}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
