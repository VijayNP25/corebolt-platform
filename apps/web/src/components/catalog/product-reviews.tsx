'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiFetch, ApiError } from '@/lib/api';
import { getMe } from '@/lib/auth';
import { slugify } from '@/lib/subcategory-products';
import { useToast } from '@/hooks/use-toast';

type Review = {
  id: string;
  rating: number;
  body: string;
  createdAt?: string;
  authorName?: string;
};

type ReviewableOrder = {
  id: string;
  orderNumber: string;
  productId: string;
};

export default function ProductReviews({ catalogId }: { catalogId: string }) {
  const slug = slugify(catalogId);
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [orders, setOrders] = useState<ReviewableOrder[]>([]);
  const [signedIn, setSignedIn] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const load = useCallback(async () => {
    const res = await apiFetch<{ data: { reviews: Review[] } }>(
      `/reviews/product/${encodeURIComponent(slug)}`,
    );
    setReviews(res.data.reviews ?? []);
    const me = await getMe();
    setSignedIn(Boolean(me));
    if (!me) {
      setOrders([]);
      return;
    }
    const eligible = await apiFetch<{ data: { orders: ReviewableOrder[] } }>(
      '/reviews/eligible',
      { searchParams: { slug } },
    );
    const items = eligible.data.orders ?? [];
    setOrders(items);
    setOrderId((current) => (items.some((order) => order.id === current) ? current : items[0]?.id ?? ''));
  }, [slug]);

  useEffect(() => {
    load()
      .then(() => setUnavailable(false))
      .catch(() => {
        setReviews([]);
        setUnavailable(true);
      });
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const purchase = orders.find((order) => order.id === orderId);
    if (!purchase) return;
    setSubmitting(true);
    try {
      await apiFetch('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          productId: purchase.productId,
          orderId: purchase.id,
          rating,
          body,
        }),
      });
      setBody('');
      toast({
        title: 'Review submitted',
        description: 'It appears on the product page after approval.',
      });
      await load();
    } catch (err) {
      toast({
        title: 'Could not submit the review',
        description: err instanceof ApiError ? err.message : 'Try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="wrap" style={{ paddingBottom: 80 }}>
      <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--ink)' }}>
        Reviews
      </h2>
      {reviews.length === 0 ? (
        <p className="text-sm mb-6">No published reviews yet.</p>
      ) : (
        <ul className="space-y-4 mb-8">
          {reviews.map((review) => (
            <li key={review.id} className="border border-black/10 p-4 bg-white">
              <div className="font-medium">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(Math.max(0, 5 - review.rating))}
              </div>
              <p className="text-sm mt-2">{review.body}</p>
              <p className="text-xs text-[var(--ink3)] mt-2">
                {review.authorName ?? 'Customer'}
                {review.createdAt ? ` · ${new Date(review.createdAt).toLocaleDateString()}` : ''}
              </p>
            </li>
          ))}
        </ul>
      )}

      {orders.length > 0 ? (
        <form className="cb-auth-form max-w-lg" onSubmit={submit}>
          <h3 className="font-semibold">Write a review</h3>
          <p className="text-sm text-[var(--ink3)]">
            This purchase has been delivered. The review is published after approval.
          </p>
          {orders.length > 1 ? (
            <>
              <label htmlFor="review-order">Order</label>
              <select
                id="review-order"
                value={orderId}
                onChange={(event) => setOrderId(event.target.value)}
              >
                {orders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.orderNumber}
                  </option>
                ))}
              </select>
            </>
          ) : null}
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} stars
              </option>
            ))}
          </select>
          <label htmlFor="review-body">Review</label>
          <textarea
            id="review-body"
            rows={4}
            value={body}
            required
            onChange={(event) => setBody(event.target.value)}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit for approval'}
          </button>
        </form>
      ) : unavailable ? (
        <p className="text-sm text-[var(--ink3)]">Reviews are unavailable right now.</p>
      ) : (
        <p className="text-sm text-[var(--ink3)]">
          {signedIn
            ? 'A review opens after this product is delivered.'
            : 'Sign in to review a delivered purchase.'}
        </p>
      )}
    </section>
  );
}
