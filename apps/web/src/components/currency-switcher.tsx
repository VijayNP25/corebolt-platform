'use client';

import type { CSSProperties } from 'react';
import type { CurrencyCode } from '@corebolt/shared';
import { useCurrency } from '@/hooks/use-currency';

/**
 * INR/USD toggle styled to sit in the replica nav (matches nav link tone).
 */
export default function CurrencySwitcher({
  dark,
  style,
}: {
  dark?: boolean;
  style?: CSSProperties;
}) {
  const { currency, setCurrency } = useCurrency();

  const btn = (code: CurrencyCode) => {
    const active = currency === code;
    return (
      <button
        type="button"
        key={code}
        className={`currency-switcher__btn${active ? ' is-active' : ''}`}
        aria-pressed={active}
        onClick={() => {
          if (!active) setCurrency(code);
        }}
      >
        {code}
      </button>
    );
  };

  return (
    <div
      className={`currency-switcher${dark ? ' currency-switcher--dark' : ''}`}
      role="group"
      aria-label="Currency"
      style={style}
    >
      {btn('INR')}
      <span className="currency-switcher__sep" aria-hidden>
        /
      </span>
      {btn('USD')}
    </div>
  );
}
