'use client';

import { useMemo, useState } from 'react';
import { formatMoney } from '@corebolt/shared';
import { Link, useRouter } from '@/i18n/routing';
import { useCurrency } from '@/hooks/use-currency';
import { useLocalCart } from '@/hooks/use-local-cart';
import { sumLocalCart } from '@/lib/local-cart';
import { apiFetch } from '@/lib/api';
import { getMe } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

const ADDRESS_KEY = 'corebolt.checkoutAddress.v1';

type AddressDraft = {
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

const emptyAddress = (): AddressDraft => ({
  name: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'IN',
});

export default function CheckoutClient() {
  const { currency } = useCurrency();
  const { cart, clear } = useLocalCart();
  const totals = useMemo(() => sumLocalCart(cart, currency), [cart, currency]);
  const { toast } = useToast();
  const router = useRouter();
  const [address, setAddress] = useState<AddressDraft>(() => {
    if (typeof window === 'undefined') return emptyAddress();
    try {
      const raw = localStorage.getItem(ADDRESS_KEY);
      return raw ? ({ ...emptyAddress(), ...JSON.parse(raw) } as AddressDraft) : emptyAddress();
    } catch {
      return emptyAddress();
    }
  });
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (cart.items.length === 0) {
    return (
      <div className="cb-shell-card">
        <h2>Nothing to checkout</h2>
        <Link href="/cart" className="underline text-[var(--g-text)]">
          Back to cart
        </Link>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.name || !address.line1 || !address.city || !address.postalCode) {
      toast({
        title: 'Address incomplete',
        description: 'Name, address line, city and postal code are required.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(address));

    try {
      const me = await getMe();
      if (!me) {
        toast({
          title: 'Login required',
          description: 'Create an account or sign in before placing an order.',
          variant: 'destructive',
        });
        router.push('/login');
        return;
      }

      // Try real checkout when API + DB are available.
      try {
        const addr = await apiFetch<{ data: { address: { id: string } } }>(
          '/addresses',
          {
            method: 'POST',
            body: JSON.stringify({
              label: 'Checkout',
              line1: address.line1,
              line2: address.line2 || undefined,
              city: address.city,
              state: address.state || 'NA',
              postalCode: address.postalCode,
              country: address.country || 'IN',
              phone: address.phone || undefined,
              isDefault: true,
            }),
          },
        );
        await apiFetch('/checkout', {
          method: 'POST',
          body: JSON.stringify({
            currency,
            shippingAddressId: addr.data.address.id,
            notes: notes || undefined,
          }),
        });
        clear();
        toast({
          title: 'Order placed',
          description: 'Payment will complete via ICICI (INR) or Stripe (USD).',
        });
        router.push('/account');
        return;
      } catch {
        // Offline / no DB — store a local order receipt for UX continuity.
      }

      const receipt = {
        id: `LOCAL-${Date.now()}`,
        currency,
        totals,
        address,
        notes,
        items: cart.items,
        createdAt: new Date().toISOString(),
        status: 'PENDING_LOCAL',
      };
      const prev = JSON.parse(localStorage.getItem('corebolt.localOrders.v1') || '[]');
      localStorage.setItem(
        'corebolt.localOrders.v1',
        JSON.stringify([receipt, ...(Array.isArray(prev) ? prev : [])]),
      );
      clear();
      toast({
        title: 'Order saved locally',
        description:
          'API/database is offline. Order kept in this browser; re-submit after Postgres is up.',
      });
      router.push('/account');
    } finally {
      setSubmitting(false);
    }
  };

  const field = (key: keyof AddressDraft, label: string, required = false) => (
    <>
      <label htmlFor={key}>{label}</label>
      <input
        id={key}
        value={address[key]}
        required={required}
        onChange={(e) => setAddress((a) => ({ ...a, [key]: e.target.value }))}
      />
    </>
  );

  return (
    <div className="cb-shell-card grid gap-8 lg:grid-cols-2">
      <form className="cb-auth-form" onSubmit={onSubmit}>
        <h2>Shipping address</h2>
        {field('name', 'Full name', true)}
        {field('phone', 'Phone')}
        {field('line1', 'Address line 1', true)}
        {field('line2', 'Address line 2')}
        {field('city', 'City', true)}
        {field('state', 'State')}
        {field('postalCode', 'Postal code', true)}
        {field('country', 'Country code', true)}
        <label htmlFor="notes">Order notes</label>
        <input
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional"
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Placing order…' : `Pay ${formatMoney(totals.total, currency)}`}
        </button>
        <p className="text-xs text-[var(--ink3)]">
          Login required. INR → ICICI · USD → Stripe (when gateways are configured).
        </p>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-3">Order summary</h2>
        <ul className="space-y-2 text-sm mb-4">
          {cart.items.map((i) => (
            <li key={i.productId}>
              {i.name} × {i.quantity}
            </li>
          ))}
        </ul>
        <p>Subtotal: {formatMoney(totals.subtotal, currency)}</p>
        <p>Shipping: {formatMoney(totals.shipping, currency)}</p>
        {currency === 'INR' && <p>GST: {formatMoney(totals.tax, currency)}</p>}
        <p className="mt-2 font-semibold">Total: {formatMoney(totals.total, currency)}</p>
      </div>
    </div>
  );
}
