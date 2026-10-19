import { desc, eq } from 'drizzle-orm';
import { env } from '../config/env.js';
import { db } from '../db/client.js';
import { exchangeRates } from '../db/schema.js';
import { inrToUsd, money, type MoneyString } from '../lib/money.js';
import { NotFoundError } from '../lib/errors.js';

export interface FxSnapshot {
  inrPerUsd: MoneyString;
  markupPercent: MoneyString;
  fetchedAt: Date;
  source: string;
}

/**
 * Rate storage convention: `rate` = INR per 1 USD (e.g. 83.50).
 * Effective sell rate with markup: inrPerUsd * (1 + markup/100).
 * USD price = round_whole(INR / effectiveRate).
 */
export async function getActiveFx(): Promise<FxSnapshot> {
  const row = await db.query.exchangeRates.findFirst({
    orderBy: [desc(exchangeRates.fetchedAt)],
  });

  if (!row) {
    // last-known fallback bootstrap
    return {
      inrPerUsd: '83.50',
      markupPercent: env.DEFAULT_FX_MARKUP_PERCENT,
      fetchedAt: new Date(0),
      source: 'fallback',
    };
  }

  return {
    inrPerUsd: row.rate,
    markupPercent: row.markupPercent,
    fetchedAt: row.fetchedAt,
    source: row.source,
  };
}

export async function convertProductPrice(
  priceInr: string | null,
  currency: 'INR' | 'USD',
): Promise<MoneyString | null> {
  if (priceInr == null) return null;
  if (currency === 'INR') return money(priceInr);
  const fx = await getActiveFx();
  return inrToUsd(priceInr, fx.inrPerUsd, fx.markupPercent);
}

export async function convertAmount(
  amountInr: string,
  currency: 'INR' | 'USD',
): Promise<{ amount: MoneyString; fx: FxSnapshot }> {
  const fx = await getActiveFx();
  if (currency === 'INR') {
    return { amount: money(amountInr), fx };
  }
  return {
    amount: inrToUsd(amountInr, fx.inrPerUsd, fx.markupPercent),
    fx,
  };
}

export async function refreshFromExchangeRateApi(): Promise<FxSnapshot> {
  const previous = await getActiveFx();
  const key = env.EXCHANGE_RATE_API_KEY;

  if (!key) {
    console.warn('[currency] EXCHANGE_RATE_API_KEY missing — keeping last-known rate');
    return previous;
  }

  try {
    const url = `${env.EXCHANGE_RATE_API_URL}/${key}/pair/USD/INR`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`ExchangeRate-API HTTP ${res.status}`);
    }
    const data = (await res.json()) as {
      result?: string;
      conversion_rate?: number;
    };
    if (data.result !== 'success' || typeof data.conversion_rate !== 'number') {
      throw new Error('Unexpected ExchangeRate-API response');
    }

    const [row] = await db
      .insert(exchangeRates)
      .values({
        baseCurrency: 'INR',
        quoteCurrency: 'USD',
        rate: money(data.conversion_rate),
        markupPercent: previous.markupPercent,
        source: 'exchangerate-api',
        fetchedAt: new Date(),
      })
      .returning();

    if (!row) throw new Error('Failed to persist FX rate');

    return {
      inrPerUsd: row.rate,
      markupPercent: row.markupPercent,
      fetchedAt: row.fetchedAt,
      source: row.source,
    };
  } catch (err) {
    console.error('[currency] FX fetch failed, using last-known', err);
    return previous;
  }
}

export async function updateMarkupPercent(markupPercent: string): Promise<FxSnapshot> {
  const current = await db.query.exchangeRates.findFirst({
    orderBy: [desc(exchangeRates.fetchedAt)],
  });
  if (!current) {
    throw new NotFoundError('No exchange rate row to update');
  }

  const [row] = await db
    .update(exchangeRates)
    .set({ markupPercent })
    .where(eq(exchangeRates.id, current.id))
    .returning();

  if (!row) throw new NotFoundError('Exchange rate not found');

  return {
    inrPerUsd: row.rate,
    markupPercent: row.markupPercent,
    fetchedAt: row.fetchedAt,
    source: row.source,
  };
}
