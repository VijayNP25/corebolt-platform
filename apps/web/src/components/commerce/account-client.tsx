'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { getMe, logout, storedVerifyUrl, storeVerifyUrl } from '@/lib/auth';
import { apiFetch, type ApiUser } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { formatMoney, type CurrencyCode } from '@corebolt/shared';

type ServerOrder = {
  id: string;
  orderNumber: string;
  status: string;
  currency: CurrencyCode;
  grandTotal: string;
  createdAt: string;
  items: { productName: string; quantity: number }[];
};

type SavedAddress = {
  id: string;
  label: string | null;
  phone: string | null;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

type AddressDraft = {
  label: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

const emptyAddress = (): AddressDraft => ({
  label: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'IN',
  isDefault: false,
});

export default function AccountClient() {
  const { toast } = useToast();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [serverOrders, setServerOrders] = useState<ServerOrder[]>([]);
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [draft, setDraft] = useState<AddressDraft>(emptyAddress);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [savingAddress, setSavingAddress] = useState(false);
  const [verifyUrl, setVerifyUrl] = useState<string | null>(null);
  const [sendingLink, setSendingLink] = useState(false);

  const loadAccount = async (me: ApiUser) => {
    setName(me.name);
    setPhone(me.phone ?? '');
    const [orderRes, addressRes] = await Promise.all([
      apiFetch<{ data: { orders: ServerOrder[] } }>('/orders/me').catch(() => ({
        data: { orders: [] as ServerOrder[] },
      })),
      apiFetch<{ data: { addresses: SavedAddress[] } }>('/addresses').catch(() => ({
        data: { addresses: [] as SavedAddress[] },
      })),
    ]);
    setServerOrders(orderRes.data.orders);
    setAddresses(addressRes.data.addresses);
  };

  useEffect(() => {
    getMe()
      .then(async (me) => {
        setUser(me);
        if (!me) return;
        if (me.emailVerified) storeVerifyUrl(null);
        else setVerifyUrl(storedVerifyUrl());
        await loadAccount(me);
      })
      .finally(() => setLoading(false));
  }, []);

  const sendConfirmation = async () => {
    setSendingLink(true);
    try {
      const res = await apiFetch<{ data: { alreadyVerified: boolean; verifyUrl?: string } }>(
        '/auth/resend-verification',
        { method: 'POST' },
      );
      if (res.data.alreadyVerified) {
        storeVerifyUrl(null);
        setVerifyUrl(null);
        setUser((current) => (current ? { ...current, emailVerified: true } : current));
        toast({ title: 'Email already confirmed' });
        return;
      }
      if (res.data.verifyUrl) {
        storeVerifyUrl(res.data.verifyUrl);
        setVerifyUrl(res.data.verifyUrl);
      }
      toast({ title: 'Confirmation link is ready' });
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : 'Could not send the confirmation link',
        variant: 'destructive',
      });
    } finally {
      setSendingLink(false);
    }
  };

  const onLogout = async () => {
    await logout();
    setUser(null);
    toast({ title: 'Signed out' });
  };

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setSavingProfile(true);
    try {
      const res = await apiFetch<{ data: { user: ApiUser } }>('/auth/me', {
        method: 'PATCH',
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });
      setUser(res.data.user);
      setName(res.data.user.name);
      setPhone(res.data.user.phone ?? '');
      toast({ title: 'Profile saved' });
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : 'Could not save the profile',
        variant: 'destructive',
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const saveAddress = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft.line1.trim() || !draft.city.trim() || !draft.postalCode.trim() || draft.country.trim().length !== 2) {
      toast({
        title: 'Address incomplete',
        description: 'Address line, city, postal code, and a 2-letter country code are required.',
        variant: 'destructive',
      });
      return;
    }
    const phoneValue = draft.phone.trim();
    if (phoneValue && phoneValue.length < 6) {
      toast({ title: 'Phone must be at least 6 characters', variant: 'destructive' });
      return;
    }
    const payload: Record<string, string | boolean | null> = {
      label: draft.label.trim() || 'Shipping',
      line1: draft.line1.trim(),
      line2: draft.line2.trim() || null,
      city: draft.city.trim(),
      state: draft.state.trim() || 'NA',
      postalCode: draft.postalCode.trim(),
      country: draft.country.trim().toUpperCase(),
      phone: phoneValue || null,
      isDefault: draft.isDefault,
    };
    if (!editingId) {
      if (!payload.phone) delete payload.phone;
      if (!payload.line2) delete payload.line2;
    }
    setSavingAddress(true);
    try {
      if (editingId) {
        await apiFetch(`/addresses/${editingId}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch('/addresses', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      const res = await apiFetch<{ data: { addresses: SavedAddress[] } }>('/addresses');
      setAddresses(res.data.addresses);
      setDraft(emptyAddress());
      setEditingId(null);
      toast({ title: editingId ? 'Address updated' : 'Address saved' });
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : 'Could not save the address',
        variant: 'destructive',
      });
    } finally {
      setSavingAddress(false);
    }
  };

  const removeAddress = async (address: SavedAddress) => {
    if (!window.confirm(`Remove ${address.label || 'this address'}?`)) return;
    try {
      await apiFetch(`/addresses/${address.id}`, { method: 'DELETE' });
      setAddresses((current) => current.filter((item) => item.id !== address.id));
      if (editingId === address.id) {
        setEditingId(null);
        setDraft(emptyAddress());
      }
      toast({ title: 'Address removed' });
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : 'Could not remove the address',
        variant: 'destructive',
      });
    }
  };

  if (loading) return <p className="lead">Loading…</p>;

  if (!user) {
    return (
      <div className="cb-shell-card">
        <h2>You are signed out</h2>
        <p className="lead mt-2">Sign in to view orders and manage your profile.</p>
        <p className="mt-4">
          <Link
            href="/login"
            className="inline-block bg-[var(--g)] text-white px-5 py-3 font-semibold"
          >
            Go to Sign in
          </Link>
        </p>
        <p className="text-sm mt-3">
          <Link href="/register" className="underline text-[var(--g-text)]">
            Create an account
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {user.emailVerified ? null : (
        <div className="cb-shell-card">
          <h2>Confirm your email</h2>
          <p className="text-sm mt-2">
            Open the confirmation link before you place an order. On this computer the link is shown
            here because mail stays in the shop log.
          </p>
          {verifyUrl ? (
            <p className="text-sm mt-3">
              <a href={verifyUrl} className="underline text-[var(--g-text)]">
                Open confirmation link
              </a>
            </p>
          ) : null}
          <button
            type="button"
            className="mt-4 bg-[var(--g)] text-white px-4 py-2 text-sm font-semibold"
            disabled={sendingLink}
            onClick={() => void sendConfirmation()}
          >
            {sendingLink ? 'Preparing link…' : 'Send the link again'}
          </button>
        </div>
      )}
      <div className="cb-shell-card">
        <h2>Profile</h2>
        <p className="text-sm text-[var(--ink3)]">{user.email}</p>
        <form className="cb-auth-form mt-4" onSubmit={saveProfile}>
          <label htmlFor="account-name">Name</label>
          <input id="account-name" value={name} required onChange={(event) => setName(event.target.value)} />
          <label htmlFor="account-phone">Phone</label>
          <input id="account-phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
          <button type="submit" disabled={savingProfile}>
            {savingProfile ? 'Saving…' : 'Save profile'}
          </button>
        </form>
        {(user.role === 'admin' || user.role === 'staff') && (
          <p className="mt-3">
            <Link href="/admin" className="underline text-[var(--g-text)]">
              Open admin
            </Link>
          </p>
        )}
        <button type="button" className="mt-4 underline text-sm" onClick={onLogout}>
          Sign out
        </button>
      </div>

      <div className="cb-shell-card">
        <h2>Addresses</h2>
        {addresses.length === 0 ? (
          <p className="text-sm text-[var(--ink3)] mt-2">No saved addresses yet.</p>
        ) : (
          <ul className="space-y-3 mt-3">
            {addresses.map((address) => (
              <li key={address.id} className="border border-black/10 p-3 text-sm">
                <div className="font-medium">
                  {address.label || 'Address'}
                  {address.isDefault ? ' · Default' : ''}
                </div>
                <p className="text-[var(--ink3)] mt-1">
                  {[address.line1, address.line2, address.city, address.state, address.postalCode, address.country]
                    .filter(Boolean)
                    .join(', ')}
                </p>
                <div className="cb-order-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(address.id);
                      setDraft({
                        label: address.label ?? '',
                        phone: address.phone ?? '',
                        line1: address.line1,
                        line2: address.line2 ?? '',
                        city: address.city,
                        state: address.state,
                        postalCode: address.postalCode,
                        country: address.country,
                        isDefault: address.isDefault,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button type="button" className="danger" onClick={() => void removeAddress(address)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <form className="cb-auth-form mt-4" onSubmit={saveAddress}>
          <h3 className="font-semibold">{editingId ? 'Edit address' : 'Add an address'}</h3>
          <label htmlFor="addr-label">Label</label>
          <input id="addr-label" value={draft.label} onChange={(event) => setDraft({ ...draft, label: event.target.value })} />
          <label htmlFor="addr-phone">Phone</label>
          <input id="addr-phone" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} />
          <label htmlFor="addr-line1">Address line 1</label>
          <input id="addr-line1" required value={draft.line1} onChange={(event) => setDraft({ ...draft, line1: event.target.value })} />
          <label htmlFor="addr-line2">Address line 2</label>
          <input id="addr-line2" value={draft.line2} onChange={(event) => setDraft({ ...draft, line2: event.target.value })} />
          <label htmlFor="addr-city">City</label>
          <input id="addr-city" required value={draft.city} onChange={(event) => setDraft({ ...draft, city: event.target.value })} />
          <label htmlFor="addr-state">State</label>
          <input id="addr-state" value={draft.state} onChange={(event) => setDraft({ ...draft, state: event.target.value })} />
          <label htmlFor="addr-postal">Postal code</label>
          <input id="addr-postal" required value={draft.postalCode} onChange={(event) => setDraft({ ...draft, postalCode: event.target.value })} />
          <label htmlFor="addr-country">Country code</label>
          <input id="addr-country" required maxLength={2} value={draft.country} onChange={(event) => setDraft({ ...draft, country: event.target.value })} />
          <label className="cb-check">
            <input
              type="checkbox"
              checked={draft.isDefault}
              onChange={(event) => setDraft({ ...draft, isDefault: event.target.checked })}
            />
            Use as my default address
          </label>
          <button type="submit" disabled={savingAddress}>
            {savingAddress ? 'Saving…' : editingId ? 'Update address' : 'Save address'}
          </button>
          {editingId ? (
            <button
              type="button"
              className="underline text-sm text-left"
              onClick={() => {
                setEditingId(null);
                setDraft(emptyAddress());
              }}
            >
              Cancel edit
            </button>
          ) : null}
        </form>
      </div>

      <div className="cb-shell-card">
        <h2>My orders</h2>
        {serverOrders.length === 0 ? (
          <p className="text-sm text-[var(--ink3)]">
            No orders yet. After checkout they appear here.
          </p>
        ) : (
          <ul className="space-y-3 mt-3">
            {serverOrders.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/account/orders/${order.id}`}
                  className="block border border-black/10 p-3 text-sm hover:border-[var(--g)]"
                >
                  <div className="font-medium">
                    {order.orderNumber} · {order.status}
                    {order.status === 'PENDING' ? ' · Waiting for payment' : ''}
                  </div>
                  <div className="text-[var(--ink3)]">
                    {new Date(order.createdAt).toLocaleString()} ·{' '}
                    {formatMoney(order.grandTotal, order.currency)}
                  </div>
                  <div className="mt-1">
                    {order.items
                      .map((item) => `${item.productName.trim()} × ${item.quantity}`)
                      .join(', ')}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
