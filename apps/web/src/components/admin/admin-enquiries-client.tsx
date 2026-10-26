'use client';

import { useEffect, useState } from 'react';
import { apiFetch, ApiError } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

type EnquiryStatus = 'NEW' | 'CONTACTED' | 'BOOKED' | 'CLOSED' | 'SPAM' | 'REJECTED';

type Enquiry = {
  id: string;
  status: EnquiryStatus;
  name: string;
  email: string;
  mobile: string;
  company: string | null;
  topic: string | null;
  message: string | null;
  action: string | null;
  productName: string | null;
  products: string[] | null;
  systemCore: string | null;
  orderInformation: string | null;
  createdAt: string;
};

const FILTERS: Array<EnquiryStatus | 'ALL'> = [
  'ALL',
  'NEW',
  'CONTACTED',
  'BOOKED',
  'CLOSED',
  'SPAM',
  'REJECTED',
];

const NEXT_STEP: Partial<Record<EnquiryStatus, { status: EnquiryStatus; label: string }>> = {
  NEW: { status: 'CONTACTED', label: 'Mark contacted' },
  CONTACTED: { status: 'BOOKED', label: 'Mark booked' },
  BOOKED: { status: 'CLOSED', label: 'Close' },
};

export default function AdminEnquiriesClient() {
  const { toast } = useToast();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filter, setFilter] = useState<EnquiryStatus | 'ALL'>('ALL');
  const [openId, setOpenId] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    const res = await apiFetch<{ data: { enquiries: Enquiry[] } }>('/enquiries');
    setEnquiries(res.data.enquiries ?? []);
  };

  useEffect(() => {
    load()
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const changeStatus = async (enquiry: Enquiry, status: EnquiryStatus) => {
    if ((status === 'SPAM' || status === 'REJECTED') && !window.confirm(`Mark ${enquiry.name} as ${status}?`)) {
      return;
    }
    setBusyId(enquiry.id);
    try {
      await apiFetch(`/enquiries/${enquiry.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, note: note.trim() || undefined }),
      });
      setNote('');
      await load();
      toast({ title: `${enquiry.name} is now ${status}` });
    } catch (err) {
      toast({
        title: err instanceof ApiError ? err.message : 'Could not update the enquiry',
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
        <p className="text-sm mt-2">Sign in as admin or staff to read enquiries.</p>
      </div>
    );
  }

  const visible = enquiries.filter((enquiry) => filter === 'ALL' || enquiry.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            className="border px-3 py-1 text-sm"
            style={item === filter ? { background: 'var(--g)', color: '#fff', borderColor: 'var(--g)' } : undefined}
            onClick={() => setFilter(item)}
          >
            {item === 'ALL' ? `All ${enquiries.length}` : item}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <div className="cb-shell-card">
          <p>No enquiries in this view.</p>
        </div>
      ) : (
        visible.map((enquiry) => {
          const open = openId === enquiry.id;
          const next = NEXT_STEP[enquiry.status];
          const openPipeline = enquiry.status === 'NEW' || enquiry.status === 'CONTACTED' || enquiry.status === 'BOOKED';
          const products = [
            enquiry.productName,
            ...(enquiry.products ?? []),
          ].filter((item): item is string => Boolean(item));
          return (
            <article key={enquiry.id} className="cb-shell-card">
              <button
                type="button"
                className="w-full text-left"
                onClick={() => {
                  setOpenId(open ? null : enquiry.id);
                  setNote('');
                }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-base">
                    {enquiry.name} · {enquiry.status}
                  </h2>
                  <span className="text-sm text-[var(--ink3)]">
                    {new Date(enquiry.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-[var(--ink3)] mt-1">
                  {enquiry.email} · {enquiry.mobile}
                  {enquiry.company ? ` · ${enquiry.company}` : ''}
                </p>
                <p className="text-sm mt-1">
                  {[enquiry.action, enquiry.topic, products[0]].filter(Boolean).join(' · ') || 'General enquiry'}
                </p>
              </button>
              {open ? (
                <div className="mt-4 text-sm space-y-2">
                  {enquiry.message ? <p>{enquiry.message}</p> : null}
                  {products.length > 0 ? <p>Products: {products.join(', ')}</p> : null}
                  {enquiry.systemCore ? <p>System: {enquiry.systemCore}</p> : null}
                  {enquiry.orderInformation ? <p>Order information: {enquiry.orderInformation}</p> : null}
                  {openPipeline ? (
                    <>
                      <label htmlFor={`note-${enquiry.id}`}>Note</label>
                      <input
                        id={`note-${enquiry.id}`}
                        className="border px-3 py-2 w-full"
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                        placeholder="Optional note for the status history"
                      />
                      <div className="cb-order-actions">
                        {next ? (
                          <button
                            type="button"
                            disabled={busyId === enquiry.id}
                            onClick={() => void changeStatus(enquiry, next.status)}
                          >
                            {next.label}
                          </button>
                        ) : null}
                        {enquiry.status !== 'BOOKED' ? (
                          <button
                            type="button"
                            disabled={busyId === enquiry.id}
                            onClick={() => void changeStatus(enquiry, 'CLOSED')}
                          >
                            Close
                          </button>
                        ) : null}
                        <button
                          type="button"
                          className="danger"
                          disabled={busyId === enquiry.id}
                          onClick={() => void changeStatus(enquiry, 'SPAM')}
                        >
                          Spam
                        </button>
                        <button
                          type="button"
                          className="danger"
                          disabled={busyId === enquiry.id}
                          onClick={() => void changeStatus(enquiry, 'REJECTED')}
                        >
                          Reject
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })
      )}
    </div>
  );
}
