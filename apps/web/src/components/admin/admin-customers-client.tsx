'use client';

import { useEffect, useState } from 'react';
import { apiFetch, ApiError } from '@/lib/api';
import { getMe } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  emailVerifiedAt: string | null;
  preferredCurrency: string | null;
  isActive: boolean;
  createdAt: string;
  orderCount: number;
};

export default function AdminCustomersClient() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    const res = await apiFetch<{ data: { items: Customer[] } }>('/customers');
    setCustomers(res.data.items ?? []);
  };

  useEffect(() => {
    (async () => {
      try {
        const me = await getMe();
        setIsAdmin(me?.role === 'admin');
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const setActive = async (customer: Customer, isActive: boolean) => {
    if (!isActive && !window.confirm(`Deactivate ${customer.email}? They will not be able to sign in.`)) {
      return;
    }
    setBusyId(customer.id);
    try {
      await apiFetch(`/customers/${customer.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive }),
      });
      setCustomers((current) =>
        current.map((item) => (item.id === customer.id ? { ...item, isActive } : item)),
      );
      toast({ title: isActive ? 'Customer activated' : 'Customer deactivated' });
    } catch (err) {
      toast({
        title: err instanceof ApiError ? err.message : 'Could not update the customer',
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
        <p className="text-sm mt-2">Sign in as admin or staff to view customers.</p>
      </div>
    );
  }
  if (!customers.length) {
    return (
      <div className="cb-shell-card">
        <p>No customer accounts yet.</p>
      </div>
    );
  }

  return (
    <div className="cb-shell-card overflow-x-auto">
      <table className="cb-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Orders</th>
            <th>Joined</th>
            <th>Status</th>
            {isAdmin ? <th /> : null}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>
                <div className="font-medium">{customer.name}</div>
                <div className="text-xs text-[var(--ink3)]">{customer.email}</div>
              </td>
              <td>{customer.phone || '—'}</td>
              <td>{customer.orderCount}</td>
              <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
              <td>{customer.isActive ? 'Active' : 'Deactivated'}</td>
              {isAdmin ? (
                <td>
                  <button
                    type="button"
                    className="underline text-sm"
                    disabled={busyId === customer.id}
                    onClick={() => void setActive(customer, !customer.isActive)}
                  >
                    {customer.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
