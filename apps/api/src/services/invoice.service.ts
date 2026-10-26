/**
 * Customer invoice. HTML so rupee amounts and product names stay intact.
 * Open the file and print it if a PDF copy is needed. GSTIN is not printed yet.
 */
import type { Order, OrderItem } from '../db/schema.js';
import { formatMoney } from '@corebolt/shared';

type AddressSnap = {
  label?: string | null;
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  phone?: string | null;
};

export function buildInvoiceHtml(order: Order, items: OrderItem[]): string {
  const currency = order.currency as 'INR' | 'USD';
  const placed = order.createdAt instanceof Date ? order.createdAt : new Date(order.createdAt);
  const address = (order.shippingAddressSnapshot ?? {}) as AddressSnap;
  const shipTo = [
    address.label,
    address.line1,
    address.line2,
    [address.city, address.state].filter(Boolean).join(', '),
    [address.postalCode, address.country].filter(Boolean).join(' '),
    address.phone,
  ]
    .filter((line): line is string => Boolean(line && line.trim()))
    .map((line) => escapeHtml(line))
    .join('<br/>');
  const lines = items
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.productName.trim())}</td><td>${item.quantity}</td><td>${formatMoney(
          item.unitPrice,
          currency,
        )}</td><td>${formatMoney(item.lineTotal, currency)}</td></tr>`,
    )
    .join('');
  const taxLabel = currency === 'INR' && Number(order.taxTotal) > 0 ? 'GST (18%)' : 'Tax';

  return `<!doctype html>
<html>
<head><meta charset="utf-8"/><title>Invoice ${escapeHtml(order.orderNumber)}</title>
<style>
  body{font-family:system-ui,sans-serif;color:#111;padding:32px;max-width:760px;margin:0 auto}
  h1{font-size:22px;margin:0}
  table{width:100%;border-collapse:collapse;margin:24px 0}
  th,td{border-bottom:1px solid #ddd;padding:8px;text-align:left;font-size:14px}
  .muted{color:#555;font-size:13px}
  .totals{margin-left:auto;width:260px}
  .totals div{display:flex;justify-content:space-between;padding:4px 0;font-size:14px}
  .totals .grand{font-weight:700;border-top:1px solid #111;margin-top:6px;padding-top:8px}
</style>
</head>
<body>
  <h1>CORE BOLT</h1>
  <p class="muted">Invoice · Kakinada, India · sales@core-bolt.com · 9849035858</p>
  <p><strong>${escapeHtml(order.orderNumber)}</strong><br/>
  ${escapeHtml(placed.toLocaleString('en-IN'))}<br/>
  Status: ${escapeHtml(order.status)} · Payment: ${escapeHtml(order.paymentStatus)}</p>
  <p><strong>Ship to</strong><br/>${shipTo || '—'}</p>
  <table>
    <thead><tr><th>Item</th><th>Qty</th><th>Unit</th><th>Total</th></tr></thead>
    <tbody>${lines}</tbody>
  </table>
  <div class="totals">
    <div><span>Subtotal</span><span>${formatMoney(order.subtotal, currency)}</span></div>
    <div><span>Shipping</span><span>${formatMoney(order.shippingTotal, currency)}</span></div>
    <div><span>${taxLabel}</span><span>${formatMoney(order.taxTotal, currency)}</span></div>
    <div class="grand"><span>Total</span><span>${formatMoney(order.grandTotal, currency)}</span></div>
  </div>
  <p class="muted">This file is your receipt for the order. Print it if you want a PDF copy.</p>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
