'use client';

import { useEffect, useState } from 'react';
import { formatMoney, type CurrencyCode, type OrderStatus } from '@corebolt/shared';
import { Link } from '@/i18n/routing';
import { API_URL, apiFetch, ApiError } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

type AddressSnap = {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  phone?: string | null;
};

type CustomerOrder = {
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: string;
  currency: CurrencyCode;
  subtotal: string;
  shippingTotal: string;
  taxTotal: string;
  grandTotal: string;
  createdAt: string;
  notes: string | null;
  carrier: string | null;
  trackingNumber: string | null;
  trackingUrl?: string | null;
  shippingAddressSnapshot: AddressSnap;
  items: {
    id: string;
    productName: string;
    quantity: number;
    lineTotal: string;
  }[];
  statusHistory: {
    id: string;
    toStatus: OrderStatus;
    note: string | null;
    createdAt: string;
  }[];
};

function addressLines(address: AddressSnap) {
  return [
    address.line1,
    address.line2,
    [address.city, address.state].filter(Boolean).join(', '),
    [address.postalCode, address.country].filter(Boolean).join(' '),
    address.phone,
  ].filter((line): line is string => Boolean(line && line.trim()));
}

export default function OrderDetailClient({ orderId }: { orderId: string }) {
  const { toast } = useToast();
  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch<{ data: { order: CustomerOrder } }>(`/orders/me/${orderId}`);
        setOrder(res.data.order);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not load this order');
      } finally {
        setLoading(false);
      }
    })();
  }, [orderId]);

  if (loading) return <p className="lead">Loading…</p>;

  if (error || !order) {
    return (
      <div className="cb-shell-card">
        <p className="cb-auth-error">{error ?? 'Order not found'}</p>
        <p className="mt-4">
          <Link href="/account" className="underline text-[var(--g-text)]">
            Back to My Account
          </Link>
        </p>
      </div>
    );
  }

  const downloadInvoice = async () => {
    setDownloading(true);
    try {
      const res = await fetch(`${API_URL}/orders/me/${orderId}/invoice`, {
        credentials: 'include',
      });
      if (!res.ok) throw new ApiError('Could not download the invoice', res.status);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `COREBOLT-${order.orderNumber}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : 'Could not download the invoice',
        variant: 'destructive',
      });
    } finally {
      setDownloading(false);
    }
  };

  const history = [...order.statusHistory].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return (
    <div className="cb-shell-card">
      <p className="text-sm mb-4">
        <Link href="/account" className="underline text-[var(--g-text)]">
          My Account
        </Link>
      </p>
      <h2>
        {order.orderNumber} · {order.status}
      </h2>
      <p className="text-sm text-[var(--ink3)]">
        {new Date(order.createdAt).toLocaleString()} · Payment {order.paymentStatus}
      </p>
      {order.status === 'PENDING' && order.paymentStatus !== 'paid' ? (
        <p className="text-sm mt-3">
          <Link href={`/checkout/pay/${orderId}`} className="underline text-[var(--g-text)]">
            Pay now
          </Link>
        </p>
      ) : null}
      <button
        type="button"
        className="mt-4 bg-[var(--g)] text-white px-4 py-2 text-sm font-semibold"
        disabled={downloading}
        onClick={() => void downloadInvoice()}
      >
        {downloading ? 'Preparing invoice…' : 'Download invoice'}
      </button>

      <div className="cb-order-detail mt-6">
        <div>
          <h3>Items</h3>
          <ul className="text-sm space-y-1">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.productName.trim()} × {item.quantity}
                <span className="text-[var(--ink3)]">
                  {' '}
                  · {formatMoney(item.lineTotal, order.currency)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="cb-order-money text-sm mt-4 space-y-1">
            <div className="flex justify-between gap-4">
              <dt>Subtotal</dt>
              <dd>{formatMoney(order.subtotal, order.currency)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Shipping</dt>
              <dd>{formatMoney(order.shippingTotal, order.currency)}</dd>
            </div>
            {Number(order.taxTotal) > 0 ? (
              <div className="flex justify-between gap-4">
                <dt>GST (18%)</dt>
                <dd>{formatMoney(order.taxTotal, order.currency)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-4 font-semibold">
              <dt>Total</dt>
              <dd>{formatMoney(order.grandTotal, order.currency)}</dd>
            </div>
          </dl>
          {history.length > 0 ? (
            <div className="mt-6">
              <h3>Status</h3>
              <ul className="text-sm space-y-1">
                {history.map((entry) => (
                  <li key={entry.id}>
                    {entry.toStatus}
                    <span className="text-[var(--ink3)]">
                      {' '}
                      · {new Date(entry.createdAt).toLocaleString()}
                      {entry.note ? ` · ${entry.note}` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="cb-order-address">
          <h3>Shipping address</h3>
          <p className="text-sm whitespace-pre-line">
            {addressLines(order.shippingAddressSnapshot).join('\n')}
          </p>
          {order.notes ? (
            <p className="text-sm mt-3">
              <span className="font-medium">Notes. </span>
              {order.notes}
            </p>
          ) : null}
          {order.carrier || order.trackingNumber ? (
            <div className="text-sm mt-4">
              <h3>Tracking</h3>
              <p>
                {[order.carrier, order.trackingNumber].filter(Boolean).join(' · ')}
              </p>
              {order.trackingUrl ? (
                <p>
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Track your shipment
                  </a>
                </p>
              ) : null}
            </div>
          ) : null}
          <p className="text-sm mt-4">
            To cancel or return this order, email{' '}
            <a href="mailto:sales@core-bolt.com">sales@core-bolt.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
