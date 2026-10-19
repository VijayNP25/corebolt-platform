'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

type Props = {
  endpoint: string;
  dataKey: string;
  emptyLabel: string;
  columns: { key: string; label: string }[];
};

export default function AdminListStub({
  endpoint,
  dataKey,
  emptyLabel,
  columns,
}: Props) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch<{ data: Record<string, unknown> }>(endpoint);
        const raw = res.data[dataKey];
        const list = Array.isArray(raw)
          ? raw
          : Array.isArray((raw as { items?: unknown })?.items)
            ? ((raw as { items: Record<string, unknown>[] }).items)
            : [];
        setRows(list as Record<string, unknown>[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, [endpoint, dataKey]);

  if (loading) return <p className="lead">Loading…</p>;
  if (error) {
    return (
      <div className="cb-shell-card">
        <p className="cb-auth-error">{error}</p>
        <p className="text-sm mt-2">Sign in as admin/staff to load this view.</p>
      </div>
    );
  }

  if (!rows.length) {
    return (
      <div className="cb-shell-card">
        <p>{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="cb-shell-card overflow-x-auto">
      <table className="cb-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={String(row.id ?? i)}>
              {columns.map((c) => (
                <td key={c.key}>{String(row[c.key] ?? '—')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
