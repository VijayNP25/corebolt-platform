'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { getMe } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

type Review = {
  id: string;
  rating: number;
  body: string;
  status: string;
  createdAt?: string;
  authorName?: string;
};

export default function ProductReviews({
  productId,
  productSlug,
}: {
  productId: string;
  productSlug: string;
}) {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState('');
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch<{ data: { reviews: Review[] } }>(
          `/reviews/product/${encodeURIComponent(productId)}`,
        );
        setReviews(res.data.reviews ?? []);
      } catch {
        setNote(
          'Reviews load from the API when Postgres is available. Verified purchasers only; admin approval required.',
        );
      }
    })();
  }, [productId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const me = await getMe();
    if (!me) {
      toast({
        title: 'Sign in required',
        description: 'Only verified purchasers can leave a review.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await apiFetch('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          productId,
          rating,
          body,
        }),
      });
      setBody('');
      toast({
        title: 'Review submitted',
        description: 'It will appear after admin approval.',
      });
    } catch (err) {
      // Local draft when API offline
      const draft = {
        id: `local-${Date.now()}`,
        productSlug,
        rating,
        body,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };
      const prev = JSON.parse(localStorage.getItem('corebolt.localReviews.v1') || '[]');
      localStorage.setItem(
        'corebolt.localReviews.v1',
        JSON.stringify([draft, ...(Array.isArray(prev) ? prev : [])]),
      );
      toast({
        title: 'Review saved locally',
        description:
          err instanceof Error
            ? `${err.message}. Draft kept until the API is online.`
            : 'Draft kept until the API is online.',
      });
      setBody('');
    }
  };

  return (
    <section className="wrap" style={{ paddingBottom: 80 }}>
      <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--ink)' }}>
        Reviews
      </h2>
      {note && <p className="text-sm text-[var(--ink3)] mb-4">{note}</p>}

      {reviews.length === 0 ? (
        <p className="text-sm mb-6">No published reviews yet.</p>
      ) : (
        <ul className="space-y-4 mb-8">
          {reviews.map((r) => (
            <li key={r.id} className="border border-black/10 p-4 bg-white">
              <div className="font-medium">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
              <p className="text-sm mt-2">{r.body}</p>
            </li>
          ))}
        </ul>
      )}

      <form className="cb-auth-form max-w-lg" onSubmit={submit}>
        <h3 className="font-semibold">Write a review</h3>
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
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
          onChange={(e) => setBody(e.target.value)}
          className="border px-3 py-2"
        />
        <button type="submit">Submit for moderation</button>
      </form>
    </section>
  );
}
