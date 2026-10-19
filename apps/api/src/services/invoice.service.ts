/**
 * PDF invoice generation (decision 35 = PDF emailed + downloadable).
 * v1 returns a simple HTML invoice string; swap for puppeteer/pdfkit later.
 */
import type { Order, OrderItem } from '../db/schema.js';
import { formatMoney } from '@corebolt/shared';

export function buildInvoiceHtml(order: Order, items: OrderItem[]): string {
  const currency = order.currency as 'INR' | 'USD';
  const lines = items
    .map(
      (i) =>
        `<tr><td>${escapeHtml(i.productName)}</td><td>${i.quantity}</td><td>${formatMoney(
          i.unitPrice,
          currency,
        )}</td><td>${formatMoney(i.lineTotal, currency)}</td></tr>`,
    )
    .join('');

  return `<!doctype html>
<html>
<head><meta charset="utf-8"/><title>Invoice ${order.orderNumber}</title>
<style>
  body{font-family:system-ui,sans-serif;color:#111;padding:32px}
  h1{font-size:20px;margin:0 0 8px}
  table{width:100%;border-collapse:collapse;margin-top:24px}
  th,td{border-bottom:1px solid #ddd;padding:8px;text-align:left;font-size:14px}
  .muted{color:#666;font-size:13px}
</style>
</head>
<body>
  <h1>COREBOLT Invoice</h1>
  <p class="muted">Order ${escapeHtml(order.orderNumber)} · ${currency}</p>
  <p class="muted">Kakinada, India · sales@core-bolt.com · 9849035858</p>
  <table>
    <thead><tr><th>Item</th><th>Qty</th><th>Unit</th><th>Total</th></tr></thead>
    <tbody>${lines}</tbody>
  </table>
  <p><strong>Subtotal:</strong> ${formatMoney(order.subtotal, currency)}</p>
  <p><strong>Shipping:</strong> ${formatMoney(order.shippingTotal, currency)}</p>
  <p><strong>Tax:</strong> ${formatMoney(order.taxTotal, currency)}</p>
  <p><strong>Grand total:</strong> ${formatMoney(order.grandTotal, currency)}</p>
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
