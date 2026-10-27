/**
 * Customer tax invoice as a PDF. DejaVu Sans is bundled (assets/fonts) because the
 * built-in PDF fonts have no rupee sign.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import { formatMoney } from '@corebolt/shared';
import { env } from '../config/env.js';
import type { Order, OrderItem } from '../db/schema.js';
import type { TaxBreakdown } from '../lib/gst.js';

const FONT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../assets/fonts');
const REGULAR = path.join(FONT_DIR, 'DejaVuSans.ttf');
const BOLD = path.join(FONT_DIR, 'DejaVuSans-Bold.ttf');

type AddressSnap = {
  label?: string | null;
  company?: string | null;
  gstin?: string | null;
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  phone?: string | null;
};

function addressLines(a: AddressSnap | null | undefined): string[] {
  if (!a) return [];
  return [
    a.company,
    a.label,
    a.line1,
    a.line2,
    [a.city, a.state].filter(Boolean).join(', '),
    [a.postalCode, a.country].filter(Boolean).join(' '),
    a.phone ? `Phone: ${a.phone}` : null,
    a.gstin ? `GSTIN: ${a.gstin}` : null,
  ]
    .filter((l): l is string => Boolean(l && l.trim()))
    .map((l) => l.trim());
}

export function buildInvoicePdf(order: Order, items: OrderItem[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const currency = order.currency as 'INR' | 'USD';
    const money = (v: string) => formatMoney(v, currency);
    const placed = order.createdAt instanceof Date ? order.createdAt : new Date(order.createdAt);
    const tax = (order.taxBreakdown ?? null) as TaxBreakdown | null;
    const sellerGstin = tax?.sellerGstin || env.SELLER_GSTIN;

    const doc = new PDFDocument({ size: 'A4', margin: 40, info: { Title: `Invoice ${order.orderNumber}` } });
    const chunks: Buffer[] = [];
    doc.on('data', (c: Buffer) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const left = 40;
    const right = doc.page.width - 40;
    const width = right - left;

    // Header
    doc.font(BOLD).fontSize(20).text(env.SELLER_NAME, left, 40);
    doc.font(REGULAR).fontSize(9).fillColor('#555');
    doc.text(env.SELLER_ADDRESS);
    doc.text('sales@core-bolt.com · 9849035858 · www.core-bolt.com');
    if (sellerGstin) doc.text(`GSTIN: ${sellerGstin}`);
    doc.fillColor('#000');

    doc.font(BOLD).fontSize(16).text(currency === 'INR' ? 'TAX INVOICE' : 'INVOICE', left, 40, {
      width,
      align: 'right',
    });
    doc.font(REGULAR).fontSize(10);
    doc.text(`Invoice no: ${order.orderNumber}`, { width, align: 'right' });
    doc.text(`Date: ${placed.toLocaleDateString('en-IN')}`, { width, align: 'right' });
    doc.text(`Payment: ${order.paymentStatus}`, { width, align: 'right' });
    if (tax && tax.type !== 'NONE') {
      doc.text(`Place of supply: ${tax.placeOfSupply}`, { width, align: 'right' });
    }

    // Addresses
    const top = Math.max(doc.y, 120) + 16;
    const colW = width / 2 - 10;
    const bill = addressLines(order.billingAddressSnapshot as AddressSnap | null);
    const ship = addressLines(order.shippingAddressSnapshot as AddressSnap | null);
    doc.font(BOLD).fontSize(10).text('Bill to', left, top, { width: colW });
    doc.font(REGULAR).fontSize(9).text((bill.length ? bill : ship).join('\n') || '—', left, top + 14, { width: colW });
    const afterBill = doc.y;
    doc.font(BOLD).fontSize(10).text('Ship to', left + width / 2 + 10, top, { width: colW });
    doc.font(REGULAR).fontSize(9).text(ship.join('\n') || '—', left + width / 2 + 10, top + 14, { width: colW });
    let y = Math.max(afterBill, doc.y) + 20;

    // Items table
    const cols = { n: left, item: left + 24, qty: left + 300, unit: left + 345, amt: left + 435 };
    const drawHead = (at: number) => {
      doc.rect(left, at - 4, width, 20).fill('#f0f0f0').fillColor('#000');
      doc.font(BOLD).fontSize(9);
      doc.text('#', cols.n + 4, at, { width: 20 });
      doc.text('Item', cols.item, at, { width: 270 });
      doc.text('Qty', cols.qty, at, { width: 40, align: 'right' });
      doc.text('Unit price', cols.unit, at, { width: 85, align: 'right' });
      doc.text('Amount', cols.amt, at, { width: right - cols.amt, align: 'right' });
      return at + 24;
    };
    y = drawHead(y);
    doc.font(REGULAR).fontSize(9);
    items.forEach((item, i) => {
      const name = item.productName.trim();
      const h = doc.heightOfString(name, { width: 270 });
      if (y + h > doc.page.height - 160) {
        doc.addPage();
        y = drawHead(40);
        doc.font(REGULAR).fontSize(9);
      }
      doc.text(String(i + 1), cols.n + 4, y, { width: 20 });
      doc.text(name, cols.item, y, { width: 270 });
      doc.text(String(item.quantity), cols.qty, y, { width: 40, align: 'right' });
      doc.text(money(item.unitPrice), cols.unit, y, { width: 85, align: 'right' });
      doc.text(money(item.lineTotal), cols.amt, y, { width: right - cols.amt, align: 'right' });
      y += Math.max(h, 12) + 8;
      doc.moveTo(left, y - 4).lineTo(right, y - 4).strokeColor('#ddd').lineWidth(0.5).stroke();
    });

    // Totals
    if (y > doc.page.height - 180) {
      doc.addPage();
      y = 40;
    }
    y += 8;
    const rows: Array<[string, string, boolean?]> = [
      ['Subtotal (excl. GST)', money(order.subtotal)],
      ['Shipping', money(order.shippingTotal)],
    ];
    if (tax && tax.type === 'CGST_SGST') {
      rows.push([`CGST (${Number(tax.rate) / 2}%)`, money(tax.cgst)], [`SGST (${Number(tax.rate) / 2}%)`, money(tax.sgst)]);
    } else if (tax && tax.type === 'IGST') {
      rows.push([`IGST (${Number(tax.rate)}%)`, money(tax.igst)]);
    } else if (Number(order.taxTotal) > 0) {
      rows.push([currency === 'INR' ? 'GST' : 'Tax', money(order.taxTotal)]);
    }
    rows.push(['Total', money(order.grandTotal), true]);
    for (const [label, value, strong] of rows) {
      doc.font(strong ? BOLD : REGULAR).fontSize(strong ? 11 : 9.5);
      doc.text(label, left + 270, y, { width: 150 });
      doc.text(value, left + 420, y, { width: right - left - 420, align: 'right' });
      y += strong ? 20 : 15;
    }

    doc.font(REGULAR).fontSize(8).fillColor('#666');
    doc.text(
      'This is a computer-generated invoice. Prices are exclusive of GST; GST is shown above. ' +
        'For returns or warranty, email sales@core-bolt.com.',
      left,
      doc.page.height - 70,
      { width, align: 'center' },
    );

    doc.end();
  });
}
