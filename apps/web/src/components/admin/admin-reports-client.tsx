'use client';

import { useEffect, useState } from 'react';
import { formatMoney, type OrderStatus } from '@corebolt/shared';
import { API_URL, apiFetch, ApiError } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

type Summary = {
  orderCount: number;
  paidCount: number;
  byStatus: Record<OrderStatus, number>;
  paidInr: string;
  paidUsd: string;
  paidInrRollup: string;
};

export default function AdminReportsClient() {
  const { toast } = useToast();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    apiFetch<{ data: { summary: Summary } }>('/reports/summary')
      .then((res) => setSummary(res.data.summary))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'));
  }, []);

  const download = async () => {
    setDownloading(true);
    try {
      const res = await fetch(`${API_URL}/reports/orders.csv`, { credentials: 'include' });
      if (!res.ok) throw new ApiError('Could not download the order report', res.status);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'corebolt-orders.csv';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : 'Could not download the order report',
        variant: 'destructive',
      });
    } finally {
      setDownloading(false);
    }
  };

  if (error) {
    return (
      <div className="cb-shell-card">
        <p className="cb-auth-error">{error}</p>
        <p className="text-sm mt-2">Sign in as admin to view reports.</p>
      </div>
    );
  }
  if (!summary) return <p className="lead">Loading…</p>;

  const statuses = Object.entries(summary.byStatus).filter(([, count]) => count > 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="cb-shell-card">
          <h2>Paid in INR</h2>
          <p className="text-2xl font-semibold">{formatMoney(summary.paidInr, 'INR')}</p>
        </div>
        <div className="cb-shell-card">
          <h2>Paid in USD</h2>
          <p className="text-2xl font-semibold">{formatMoney(summary.paidUsd, 'USD')}</p>
        </div>
        <div className="cb-shell-card">
          <h2>Paid, in INR</h2>
          <p className="text-2xl font-semibold">{formatMoney(summary.paidInrRollup, 'INR')}</p>
          <p className="text-sm text-[var(--ink3)] mt-1">USD orders included at the rate saved on each order.</p>
        </div>
      </div>
      <div className="cb-shell-card">
        <h2>
          {summary.orderCount} orders · {summary.paidCount} paid
        </h2>
        <ul className="text-sm mt-3 space-y-1">
          {statuses.map(([status, count]) => (
            <li key={status}>
              {status} · {count}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-4 bg-[var(--g)] text-white px-4 py-2 font-semibold"
          disabled={downloading}
          onClick={() => void download()}
        >
          {downloading ? 'Preparing…' : 'Download orders CSV'}
        </button>
      </div>
    </div>
  );
}
