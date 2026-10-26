'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

type AuditEntry = {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  actor: { name: string; email: string } | null;
};

const ACTION_LABELS: Record<string, string> = {
  'order.status_changed': 'Order status changed',
  'enquiry.status_changed': 'Enquiry status changed',
  'review.moderated': 'Review moderated',
  'product.created': 'Product created',
  'product.updated': 'Product updated',
  'category.created': 'Category created',
  'category.updated': 'Category updated',
  'customer.activated': 'Customer activated',
  'customer.deactivated': 'Customer deactivated',
  'currency.markup_updated': 'Currency markup updated',
  'currency.rate_refreshed': 'Exchange rate refreshed',
};

function detail(entry: AuditEntry): string {
  const meta = entry.metadata;
  const parts = [
    meta.orderNumber,
    meta.name,
    meta.email,
    meta.status,
    meta.markupPercent != null ? `markup ${meta.markupPercent}%` : null,
    meta.inrPerUsd != null ? `INR per USD ${meta.inrPerUsd}` : null,
  ].filter((part) => part != null && String(part).trim() !== '');
  return parts.map(String).join(' · ');
}

export default function AdminAuditClient() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ data: { entries: AuditEntry[] } }>('/audit')
      .then((res) => setEntries(res.data.entries))
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load the audit log'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="lead">Loading…</p>;
  if (error) return <p className="cb-auth-error">{error}</p>;
  if (entries.length === 0) {
    return (
      <div className="cb-shell-card">
        <p className="text-sm m-0">No admin changes recorded yet.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {entries.map((entry) => (
        <li key={entry.id} className="cb-shell-card">
          <p className="font-medium m-0">
            {ACTION_LABELS[entry.action] ?? entry.action}
          </p>
          <p className="text-sm text-[var(--ink3)] mt-1 mb-0">
            {entry.actor ? `${entry.actor.name} · ${entry.actor.email}` : 'Unknown user'}
            {' · '}
            {new Date(entry.createdAt).toLocaleString('en-IN')}
          </p>
          {detail(entry) ? <p className="text-sm mt-2 mb-0">{detail(entry)}</p> : null}
        </li>
      ))}
    </ul>
  );
}
