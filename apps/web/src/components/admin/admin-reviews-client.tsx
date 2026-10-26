'use client';

import { useEffect, useState } from 'react';
import { apiFetch, ApiError } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

type PendingReview = {
  id: string;
  rating: number;
  body: string;
  authorName: string;
  productName: string;
  createdAt: string;
};

export default function AdminReviewsClient() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<PendingReview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    const res = await apiFetch<{ data: { reviews: PendingReview[] } }>('/reviews/pending');
    setReviews(res.data.reviews ?? []);
  };

  useEffect(() => {
    load()
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load');
      })
      .finally(() => setLoading(false));
  }, []);

  const moderate = async (review: PendingReview, status: 'APPROVED' | 'REJECTED') => {
    setBusyId(review.id);
    try {
      await apiFetch(`/reviews/${review.id}/moderate`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      setReviews((current) => current.filter((item) => item.id !== review.id));
      toast({ title: status === 'APPROVED' ? 'Review published' : 'Review rejected' });
    } catch (err) {
      toast({
        title: err instanceof ApiError ? err.message : 'Could not update the review',
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
        <p className="text-sm mt-2">Sign in as admin to moderate reviews.</p>
      </div>
    );
  }
  if (!reviews.length) {
    return (
      <div className="cb-shell-card">
        <p>No reviews are waiting for approval.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <article key={review.id} className="cb-shell-card">
          <h2 className="text-base">
            {review.productName} · {review.rating} stars
          </h2>
          <p className="text-sm text-[var(--ink3)]">
            {review.authorName} · {new Date(review.createdAt).toLocaleString()}
          </p>
          <p className="text-sm mt-3">{review.body}</p>
          <div className="cb-order-actions">
            <button
              type="button"
              disabled={busyId === review.id}
              onClick={() => void moderate(review, 'APPROVED')}
            >
              Approve
            </button>
            <button
              type="button"
              className="danger"
              disabled={busyId === review.id}
              onClick={() => void moderate(review, 'REJECTED')}
            >
              Reject
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
