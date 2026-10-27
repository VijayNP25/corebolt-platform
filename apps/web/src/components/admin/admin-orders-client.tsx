'use client';

import { Fragment, useEffect, useState } from 'react';
import { formatMoney, type CurrencyCode, type OrderStatus } from '@corebolt/shared';
import { apiFetch } from '@/lib/api';
import { getMe } from '@/lib/auth';
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

type AdminOrder = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
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
  paymentStatus: string;
  shippingAddressSnapshot: AddressSnap;
  customer: { name: string; email: string; phone: string | null } | null;
  items: {
    id: string;
    productName: string;
    quantity: number;
    unitPrice: string;
    lineTotal: string;
  }[];
};

const NEXT_ACTIONS: Partial<
  Record<OrderStatus, { status: OrderStatus; label: string; adminOnly?: boolean }[]>
> = {
  PENDING: [{ status: 'CANCELLED', label: 'Cancel order', adminOnly: true }],
  CONFIRMED: [
    { status: 'PROCESSING', label: 'Mark processing' },
    { status: 'CANCELLED', label: 'Cancel order', adminOnly: true },
    { status: 'REFUNDED', label: 'Mark refunded', adminOnly: true },
  ],
  PROCESSING: [
    { status: 'SHIPPED', label: 'Mark shipped' },
    { status: 'CANCELLED', label: 'Cancel order', adminOnly: true },
    { status: 'REFUNDED', label: 'Mark refunded', adminOnly: true },
  ],
  SHIPPED: [
    { status: 'DELIVERED', label: 'Mark delivered' },
    { status: 'RETURNED', label: 'Mark returned', adminOnly: true },
    { status: 'REFUNDED', label: 'Mark refunded', adminOnly: true },
  ],
  DELIVERED: [
    { status: 'RETURNED', label: 'Mark returned', adminOnly: true },
    { status: 'REFUNDED', label: 'Mark refunded', adminOnly: true },
  ],
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

function shipTo(address: AddressSnap) {
  const place = [address.city, address.state].filter(Boolean).join(', ');
  return place || '—';
}

export default function AdminOrdersClient() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [carrier, setCarrier] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingUrl, setTrackingUrl] = useState('');

  const load = async () => {
    const res = await apiFetch<{ data: { orders: AdminOrder[] } }>('/orders');
    setOrders(res.data.orders);
  };

  useEffect(() => {
    (async () => {
      try {
        const me = await getMe();
        setRole(me?.role ?? null);
        await load();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const changeStatus = async (order: AdminOrder, status: OrderStatus) => {
    if (status === 'SHIPPED' && (!carrier.trim() || !trackingNumber.trim())) {
      toast({
        title: 'Tracking required',
        description: 'Enter the carrier and tracking number before marking this order shipped.',
        variant: 'destructive',
      });
      return;
    }
    if (status === 'CANCELLED' || status === 'RETURNED' || status === 'REFUNDED') {
      const ok = window.confirm(`${status === 'CANCELLED' ? 'Cancel' : status === 'RETURNED' ? 'Mark returned' : 'Mark refunded'} ${order.orderNumber}?`);
      if (!ok) return;
    }
    setBusyId(order.id);
    try {
      await apiFetch(`/orders/${order.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({
          status,
          ...(status === 'SHIPPED'
            ? {
                carrier: carrier.trim() || undefined,
                trackingNumber: trackingNumber.trim() || undefined,
                trackingUrl: trackingUrl.trim() || undefined,
              }
            : {}),
        }),
      });
      await load();
      toast({ title: `${order.orderNumber} is now ${status}` });
    } catch (e) {
      toast({
        title: e instanceof Error ? e.message : 'Could not update the order',
        variant: 'destructive',
      });
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <p className="lead">Loading…</p>;
  if (error) {
    return (
      <div className="cb-shell-card">
        <p className="cb-auth-error">{error}</p>
        <p className="text-sm mt-2">Sign in as admin or staff to load orders.</p>
      </div>
    );
  }
  if (!orders.length) {
    return (
      <div className="cb-shell-card">
        <p>No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="cb-shell-card overflow-x-auto">
      <table className="cb-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Ship to</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const open = openId === order.id;
            const actions = (NEXT_ACTIONS[order.status] ?? []).filter(
              (action) => !action.adminOnly || role === 'admin',
            );
            return (
              <Fragment key={order.id}>
                <tr
                  className={`cb-order-row${open ? ' is-open' : ''}`}
                  onClick={() => {
                    setOpenId(open ? null : order.id);
                    setCarrier(order.carrier ?? '');
                    setTrackingNumber(order.trackingNumber ?? '');
                    setTrackingUrl(order.trackingUrl ?? '');
                  }}
                >
                  <td>
                    <div className="font-medium">{order.orderNumber}</div>
                    <div className="text-xs text-[var(--ink3)]">
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <div>{order.customer?.name ?? '—'}</div>
                    <div className="text-xs text-[var(--ink3)]">{order.customer?.email}</div>
                  </td>
                  <td>
                    {order.items
                      .map((item) => `${item.productName.trim()} × ${item.quantity}`)
                      .join(', ')}
                  </td>
                  <td>{shipTo(order.shippingAddressSnapshot)}</td>
                  <td className="whitespace-nowrap">
                    {formatMoney(order.grandTotal, order.currency)}
                  </td>
                  <td>{order.status}</td>
                </tr>
                {open ? (
                  <tr key={`${order.id}-detail`}>
                    <td colSpan={6}>
                      <div className="cb-order-detail">
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
                          {(order.carrier || order.trackingNumber) && (
                            <p className="text-sm mt-3">
                              {[order.carrier, order.trackingNumber].filter(Boolean).join(' · ')}
                            </p>
                          )}
                          {order.status === 'PROCESSING' ? (
                            <div className="cb-order-actions">
                              <input
                                aria-label="Carrier"
                                placeholder="Carrier"
                                value={carrier}
                                onChange={(e) => setCarrier(e.target.value)}
                              />
                              <input
                                aria-label="Tracking number"
                                placeholder="Tracking number"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                              />
                              <input
                                aria-label="Tracking link"
                                placeholder="Tracking link (https://…)"
                                value={trackingUrl}
                                onChange={(e) => setTrackingUrl(e.target.value)}
                              />
                            </div>
                          ) : null}
                          {actions.length > 0 ? (
                            <div className="cb-order-actions">
                              {actions.map((action) => (
                                <button
                                  key={action.status}
                                  type="button"
                                  className={action.status === 'CANCELLED' ? 'danger' : undefined}
                                  disabled={busyId === order.id}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    void changeStatus(order, action.status);
                                  }}
                                >
                                  {action.label}
                                </button>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
