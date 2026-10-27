'use client';

import { useEffect, useState } from 'react';
import { formatMoney, type CurrencyCode } from '@corebolt/shared';
import { Link, useRouter } from '@/i18n/routing';
import { useCurrency } from '@/hooks/use-currency';
import { useLocalCart } from '@/hooks/use-local-cart';
import { usePricedCart } from '@/hooks/use-priced-cart';
import { apiFetch, ApiError } from '@/lib/api';
import { getMe } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import CartLines from '@/components/commerce/cart-lines';
import CartSummary from '@/components/commerce/cart-summary';

type AddressDraft = {
  company: string;
  gstin: string;
  label: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type SavedAddress = AddressDraft & {
  id: string;
  isDefault: boolean;
};

const emptyAddress = (): AddressDraft => ({
  company: '',
  gstin: '',
  label: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'IN',
});

const NEW_ADDRESS = 'new';

async function resolveShippingAddress(input: {
  selectedId: string;
  address: AddressDraft;
  makeDefault: boolean;
}) {
  if (input.selectedId !== NEW_ADDRESS) {
    if (input.makeDefault) {
      await apiFetch(`/addresses/${input.selectedId}`, {
        method: 'PATCH',
        body: JSON.stringify({ isDefault: true }),
      });
    }
    return input.selectedId;
  }

  const phone = input.address.phone.trim();
  if (phone && phone.length < 6) {
    throw new ApiError('Phone must be at least 6 characters', 400);
  }

  const created = await apiFetch<{ data: { address: { id: string } } }>('/addresses', {
    method: 'POST',
    body: JSON.stringify({
      label: input.address.label.trim() || 'Shipping',
      company: input.address.company.trim() || undefined,
      gstin: input.address.gstin.trim().toUpperCase() || undefined,
      line1: input.address.line1.trim(),
      line2: input.address.line2.trim() || undefined,
      city: input.address.city.trim(),
      state: input.address.state.trim(),
      postalCode: input.address.postalCode.trim(),
      country: (input.address.country.trim() || 'IN').toUpperCase(),
      phone: phone || undefined,
      isDefault: input.makeDefault,
    }),
  });
  return created.data.address.id;
}

async function syncLocalCart(
  currency: CurrencyCode,
  items: { slug: string; quantity: number; name: string }[],
) {
  await apiFetch('/cart/currency', {
    method: 'PATCH',
    body: JSON.stringify({ currency }),
  });
  const current = await apiFetch<{
    data: { cart: { items: { id: string }[] } };
  }>('/cart');
  for (const item of current.data.cart.items) {
    await apiFetch(`/cart/items/${item.id}`, { method: 'DELETE' });
  }
  for (const item of items) {
    const found = await apiFetch<{
      data: { product: { id: string; pricingType: string } };
    }>(`/products/${encodeURIComponent(item.slug)}`);
    if (found.data.product.pricingType !== 'FIXED') {
      throw new ApiError(`${item.name} does not have a confirmed price`, 400);
    }
    await apiFetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        productId: found.data.product.id,
        quantity: item.quantity,
      }),
    });
  }
}

export default function CheckoutClient() {
  const { currency } = useCurrency();
  const { cart, clear } = useLocalCart();
  const priced = usePricedCart();
  const totals = priced.totals;
  const { toast } = useToast();
  const router = useRouter();
  const [address, setAddress] = useState<AddressDraft>(emptyAddress);
  const [saved, setSaved] = useState<SavedAddress[]>([]);
  const [selectedId, setSelectedId] = useState(NEW_ADDRESS);
  const [makeDefault, setMakeDefault] = useState(true);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [addressesReady, setAddressesReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    apiFetch<{ data: { addresses: Array<SavedAddress & { line2: string | null; phone: string | null; label: string | null; company: string | null; gstin: string | null }> } }>(
      '/addresses',
    )
      .then((res) => {
        if (cancelled) return;
        const items = (res.data.addresses ?? []).map((item) => ({
          id: item.id,
          company: item.company ?? '',
          gstin: item.gstin ?? '',
          label: item.label ?? '',
          phone: item.phone ?? '',
          line1: item.line1,
          line2: item.line2 ?? '',
          city: item.city,
          state: item.state,
          postalCode: item.postalCode,
          country: item.country,
          isDefault: item.isDefault,
        }));
        items.sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
        setSaved(items);
        const preferred = items.find((item) => item.isDefault) ?? items[0];
        setSelectedId(preferred?.id ?? NEW_ADDRESS);
        setMakeDefault(items.length === 0);
        setAddressesReady(true);
      })
      .catch(() => {
        if (!cancelled) setSaved([]);
        if (!cancelled) setAddressesReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
    if (!addressesReady) return;
    if (selectedId === NEW_ADDRESS) {
      const country = address.country.trim();
      if (!address.line1.trim() || !address.city.trim() || !address.postalCode.trim() || !address.state.trim() || country.length !== 2) {
        toast({
          title: 'Address incomplete',
          description: 'Address line, city, state, postal code, and a 2-letter country code are required.',
          variant: 'destructive',
        });
        return;
      }
    }

    setSubmitting(true);

    try {
      const me = await getMe();
      if (!me) {
        toast({
          title: 'Login required',
          description: 'Create an account or sign in before placing an order.',
          variant: 'destructive',
        });
        router.push('/login?next=/checkout');
        return;
      }

      try {
        const sellable = priced.cart.items.filter((item) => item.priceInr);
        if (sellable.length === 0) {
          throw new ApiError('Nothing in the cart has a confirmed price', 400);
        }
        await syncLocalCart(currency, sellable);
        const shippingAddressId = await resolveShippingAddress({
          selectedId,
          address,
          makeDefault,
        });
        const placed = await apiFetch<{
          data: { order: { id: string; orderNumber: string } };
        }>('/checkout', {
          method: 'POST',
          body: JSON.stringify({
            currency,
            shippingAddressId,
            notes: notes || undefined,
          }),
        });
        clear();
        router.push(`/checkout/pay/${placed.data.order.id}`);
        return;
      } catch (error) {
        toast({
          title: 'Could not place order',
          description:
            error instanceof ApiError
              ? error.message
              : 'The order was not placed. The shop has to confirm the current price first.',
          variant: 'destructive',
        });
        return;
      }
    } finally {
      setSubmitting(false);
    }
  };

  const field = (
    key: keyof AddressDraft,
    label: string,
    required = false,
    wide = false,
  ) => (
    <label className={wide ? 'wide' : undefined} htmlFor={key}>
      {label}
      <input
        id={key}
        value={address[key]}
        required={required}
        onChange={(e) => setAddress((current) => ({ ...current, [key]: e.target.value }))}
      />
    </label>
  );

  return (
    <div className="cb-cart-layout">
      <div className="space-y-5">
        <CartLines />
        <form id="cb-checkout" className="cb-cart-panel cb-ship-form" onSubmit={onSubmit}>
          <h2>Shipping address</h2>
          {!addressesReady ? (
            <p className="wide text-sm m-0">Loading saved addresses…</p>
          ) : saved.length > 0 ? (
            <div className="wide space-y-2">
              {saved.map((item) => (
                <label key={item.id} className="cb-ship-choice">
                  <input
                    type="radio"
                    name="saved-address"
                    checked={selectedId === item.id}
                    onChange={() => {
                      setSelectedId(item.id);
                      setMakeDefault(item.isDefault);
                    }}
                  />
                  <span>
                    <strong>{item.label || 'Address'}</strong>
                    {item.isDefault ? ' · Default' : ''}
                    <span className="block text-sm font-normal text-[#555]">
                      {[item.line1, item.line2, item.city, item.state, item.postalCode, item.country]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </span>
                </label>
              ))}
              <label className="cb-ship-choice">
                <input
                  type="radio"
                  name="saved-address"
                  checked={selectedId === NEW_ADDRESS}
                  onChange={() => {
                    setSelectedId(NEW_ADDRESS);
                    setMakeDefault(false);
                  }}
                />
                <span>Use a new address</span>
              </label>
            </div>
          ) : (
            <p className="wide text-sm m-0">No saved address yet. This one is stored on your account.</p>
          )}
          {addressesReady && selectedId === NEW_ADDRESS ? (
            <>
              {field('company', 'Company name (for business invoice)', false, true)}
              {field('gstin', 'GSTIN (optional, 15 characters)', false, true)}
              {field('label', 'Label (Home, Office)')}
              {field('phone', 'Phone')}
              {field('line1', 'Address line 1', true, true)}
              {field('line2', 'Address line 2', false, true)}
              {field('city', 'City', true)}
              {field('state', 'State', true)}
              {field('postalCode', 'Postal code', true)}
              {field('country', 'Country code', true)}
            </>
          ) : null}
          {addressesReady ? (
          <label className="wide cb-ship-check">
            <input
              type="checkbox"
              checked={makeDefault || saved.find((item) => item.id === selectedId)?.isDefault === true}
              disabled={saved.find((item) => item.id === selectedId)?.isDefault === true}
              onChange={(event) => setMakeDefault(event.target.checked)}
            />
            Use as my default address
          </label>
          ) : null}
          <label className="wide" htmlFor="notes">
            Order notes
            <input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional"
            />
          </label>
        </form>
      </div>
      <CartSummary
        action={
          <button
            type="submit"
            form="cb-checkout"
            className="cb-checkout-btn"
            disabled={submitting || !priced.ready || !addressesReady}
          >
            {submitting
              ? 'Placing order…'
              : priced.ready
                ? `Place order · ${formatMoney(totals.total, currency)}`
                : 'Confirming price…'}
          </button>
        }
        note={
          <>
            You are signed in. The address you choose is saved on your account.{" "}
            <Link href="/shipping-policy">Shipping and lead time</Link>
          </>
        }
      />
    </div>
  );
}
