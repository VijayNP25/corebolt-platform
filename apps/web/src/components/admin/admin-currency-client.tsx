'use client';

import { useEffect, useState } from 'react';
import { formatMoney } from '@corebolt/shared';
import { apiFetch, ApiError } from '@/lib/api';
import { getMe } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

type FxPayload = {
  fx: {
    inrPerUsd: string;
    markupPercent: string;
    fetchedAt: string;
    source: string;
  };
  example: { inr: string; usd: string };
};

export default function AdminCurrencyClient() {
  const { toast } = useToast();
  const [payload, setPayload] = useState<FxPayload | null>(null);
  const [markup, setMarkup] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const res = await apiFetch<{ data: FxPayload }>('/currency/rate');
    setPayload(res.data);
    setMarkup(res.data.fx.markupPercent);
  };

  useEffect(() => {
    (async () => {
      try {
        const me = await getMe();
        setIsAdmin(me?.role === 'admin');
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load');
      }
    })();
  }, []);

  const saveMarkup = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      await apiFetch('/currency/markup', {
        method: 'PATCH',
        body: JSON.stringify({ markupPercent: markup.trim() }),
      });
      await load();
      toast({ title: 'Markup saved' });
    } catch (err) {
      toast({
        title: err instanceof ApiError ? err.message : 'Could not save the markup',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  const refresh = async () => {
    setBusy(true);
    try {
      await apiFetch('/currency/refresh', { method: 'POST' });
      await load();
      toast({ title: 'Rate refreshed' });
    } catch (err) {
      toast({
        title: err instanceof ApiError ? err.message : 'Could not refresh the rate',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  if (error) {
    return (
      <div className="cb-shell-card">
        <p className="cb-auth-error">{error}</p>
      </div>
    );
  }
  if (!payload) return <p className="lead">Loading…</p>;

  const fetched = new Date(payload.fx.fetchedAt);

  return (
    <div className="cb-shell-card">
      <h2>Exchange rate</h2>
      <p className="mt-2">1 USD = ₹{Number(payload.fx.inrPerUsd).toLocaleString('en-IN')}</p>
      <p className="text-sm text-[var(--ink3)] mt-1">
        Markup {payload.fx.markupPercent}% · {payload.fx.source}
        {Number.isNaN(fetched.getTime()) || fetched.getTime() === 0
          ? ''
          : ` · ${fetched.toLocaleString()}`}
      </p>
      <p className="text-sm mt-3">
        {formatMoney(payload.example.inr, 'INR')} at this rate is {formatMoney(payload.example.usd, 'USD')}.
      </p>
      {isAdmin ? (
        <form className="cb-auth-form mt-4" onSubmit={saveMarkup}>
          <label htmlFor="fx-markup">Markup percent</label>
          <input
            id="fx-markup"
            value={markup}
            required
            onChange={(event) => setMarkup(event.target.value)}
          />
          <button type="submit" disabled={busy}>
            {busy ? 'Saving…' : 'Save markup'}
          </button>
          <button type="button" className="underline text-sm text-left" disabled={busy} onClick={() => void refresh()}>
            Refresh rate from the exchange service
          </button>
        </form>
      ) : (
        <p className="text-sm mt-4">An admin can change the markup and refresh the rate.</p>
      )}
    </div>
  );
}
