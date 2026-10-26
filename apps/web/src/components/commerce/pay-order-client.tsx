'use client';

import { useEffect, useState } from 'react';
import { formatMoney, type CurrencyCode } from '@corebolt/shared';
import { Link, useRouter } from '@/i18n/routing';
import { apiFetch, ApiError } from '@/lib/api';

type PayOrder = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  currency: CurrencyCode;
  grandTotal: string;
};

export default function PayOrderClient({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [order, setOrder] = useState<PayOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch<{ data: { order: PayOrder } }>(`/orders/me/${orderId}`);
        setOrder(res.data.order);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not load this order');
      } finally {
        setLoading(false);
      }
    })();
  }, [orderId]);

  const pay = async () => {
    setPaying(true);
    setError(null);
    try {
      const res = await apiFetch<{ data: { order: PayOrder } }>(`/orders/me/${orderId}/pay`, {
        method: 'POST',
      });
      setOrder(res.data.order);
      router.push(`/account/orders/${orderId}`);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Payment was not completed');
      setPaying(false);
    }
  };

  if (loading) return <p className="lead">Loading payment…</p>;

  if (!order) {
    return (
      <div className="cb-shell-card">
        <p className="cb-auth-error">{error ?? 'Order not found'}</p>
      </div>
    );
  }

  const paid = order.paymentStatus === 'paid' || order.status !== 'PENDING';

  return (
    <div className="cb-shell-card max-w-xl">
      <h2>
        {order.orderNumber} · {formatMoney(order.grandTotal, order.currency)}
      </h2>
      {paid ? (
        <p className="text-sm mt-3">
          Payment received. The order is {order.status.toLowerCase()}.
        </p>
      ) : (
        <>
          <p className="text-sm mt-3">
            Pay this amount to confirm the order. On this computer the payment stays inside
            the shop until the bank keys are added.
          </p>
          <button
            type="button"
            className="cb-checkout-btn mt-5"
            disabled={paying}
            onClick={() => void pay()}
          >
            {paying ? 'Confirming payment…' : `Pay ${formatMoney(order.grandTotal, order.currency)}`}
          </button>
        </>
      )}
      {error ? <p className="cb-auth-error mt-4">{error}</p> : null}
      <p className="text-sm mt-5">
        <Link href={`/account/orders/${orderId}`} className="underline text-[var(--g-text)]">
          View order
        </Link>
      </p>
    </div>
  );
}
