'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<{
    orders?: number;
    enquiries?: number;
    products?: number;
  }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [orders, enquiries, products] = await Promise.allSettled([
          apiFetch<{ data: { orders: unknown[] } }>('/orders'),
          apiFetch<{ data: { enquiries: unknown[] } }>('/enquiries'),
          apiFetch<{ data: { items: unknown[]; total: number } }>('/products', {
            searchParams: { pageSize: 1 },
          }),
        ]);
        setStats({
          orders:
            orders.status === 'fulfilled'
              ? (orders.value.data.orders?.length ?? 0)
              : undefined,
          enquiries:
            enquiries.status === 'fulfilled'
              ? (enquiries.value.data.enquiries?.length ?? 0)
              : undefined,
          products:
            products.status === 'fulfilled'
              ? products.value.data.total
              : undefined,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load');
      }
    })();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { label: 'Orders', value: stats.orders },
        { label: 'Enquiries', value: stats.enquiries },
        { label: 'Products', value: stats.products },
      ].map((card) => (
        <div key={card.label} className="cb-shell-card">
          <h2>{card.label}</h2>
          <p className="text-3xl font-semibold">
            {card.value === undefined ? '—' : card.value}
          </p>
        </div>
      ))}
      {error && (
        <p className="cb-auth-error sm:col-span-3">
          Admin API requires staff/admin session. {error}
        </p>
      )}
    </div>
  );
}
