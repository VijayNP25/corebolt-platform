import { desc } from 'drizzle-orm';
import type { OrderStatus } from '@corebolt/shared';
import { db } from '../db/client.js';
import { orders } from '../db/schema.js';
import { moneyAdd } from '../lib/money.js';

const STATUSES: OrderStatus[] = [
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
  'RETURNED',
];

function sum(values: string[]) {
  return values.length ? moneyAdd(...values) : '0.00';
}

export async function salesReport() {
  const rows = await db.query.orders.findMany({
    orderBy: [desc(orders.createdAt)],
    with: { user: true },
  });

  const paid = rows.filter((row) => row.paymentStatus === 'paid');
  const byStatus = Object.fromEntries(
    STATUSES.map((status) => [status, rows.filter((row) => row.status === status).length]),
  ) as Record<OrderStatus, number>;

  return {
    orderCount: rows.length,
    paidCount: paid.length,
    byStatus,
    paidInr: sum(paid.filter((row) => row.currency === 'INR').map((row) => row.grandTotal)),
    paidUsd: sum(paid.filter((row) => row.currency === 'USD').map((row) => row.grandTotal)),
    paidInrRollup: sum(paid.map((row) => row.grandTotalInr)),
    orders: rows.map((row) => ({
      orderNumber: row.orderNumber,
      createdAt: row.createdAt instanceof Date ? row.createdAt : new Date(row.createdAt),
      status: row.status,
      paymentStatus: row.paymentStatus,
      currency: row.currency,
      grandTotal: row.grandTotal,
      grandTotalInr: row.grandTotalInr,
      customerName: row.user?.name ?? '',
      customerEmail: row.user?.email ?? '',
    })),
  };
}

export function ordersToCsv(
  rows: Awaited<ReturnType<typeof salesReport>>['orders'],
) {
  const header = [
    'orderNumber',
    'createdAt',
    'status',
    'paymentStatus',
    'currency',
    'grandTotal',
    'grandTotalInr',
    'customerName',
    'customerEmail',
  ];
  const lines = rows.map((row) =>
    [
      row.orderNumber,
      row.createdAt.toISOString(),
      row.status,
      row.paymentStatus,
      row.currency,
      row.grandTotal,
      row.grandTotalInr,
      row.customerName,
      row.customerEmail,
    ]
      .map(csvCell)
      .join(','),
  );
  return [header.join(','), ...lines].join('\n');
}

function csvCell(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}
