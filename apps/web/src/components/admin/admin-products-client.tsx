'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import { apiFetch } from '@/lib/api';
import { getMe } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import AdminProductForm, {
  emptyProductForm,
  formFromProduct,
  toApiBody,
  type AdminCategoryOption,
  type AdminProductRow,
  type ProductFormValues,
} from '@/components/admin/admin-product-form';

type EditorState =
  | { mode: 'closed' }
  | { mode: 'create'; values: ProductFormValues }
  | { mode: 'edit'; id: string; values: ProductFormValues };

export default function AdminProductsClient() {
  const { toast } = useToast();
  const [items, setItems] = useState<AdminProductRow[]>([]);
  const [categories, setCategories] = useState<AdminCategoryOption[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [authHint, setAuthHint] = useState<string | null>(null);
  const [editor, setEditor] = useState<EditorState>({ mode: 'closed' });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setAuthHint(null);
    try {
      const me = await getMe();
      if (!me) {
        setAuthHint('Sign in as admin to manage products.');
        setItems([]);
        setTotal(0);
        return;
      }
      if (me.role !== 'admin') {
        setAuthHint('Product create/edit requires an admin account.');
        setItems([]);
        setTotal(0);
        return;
      }

      const [productsRes, catsRes] = await Promise.all([
        apiFetch<{
          data: { items: AdminProductRow[]; total: number };
        }>('/products/admin/list', {
          searchParams: { pageSize: 200, q: q.trim() || undefined },
        }),
        apiFetch<{ data: { items: AdminCategoryOption[] } }>(
          '/categories/admin/list',
        ).catch(() =>
          apiFetch<{ data: { items: AdminCategoryOption[] } }>('/categories'),
        ),
      ]);

      setItems(productsRes.data.items);
      setTotal(productsRes.data.total);
      setCategories(catsRes.data.items ?? []);
    } catch (e) {
      setAuthHint(
        e instanceof Error
          ? e.message
          : 'Could not load products from the API.',
      );
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    const t = setTimeout(() => {
      void load();
    }, q ? 250 : 0);
    return () => clearTimeout(t);
  }, [load, q]);

  const categoryName = useMemo(() => {
    const map = new Map(categories.map((c) => [c.id, c.name]));
    return (id: string | null) => (id ? (map.get(id) ?? id.slice(0, 8)) : '—');
  }, [categories]);

  const openCreate = () => {
    setFormError(null);
    setEditor({ mode: 'create', values: emptyProductForm() });
  };

  const openEdit = (p: AdminProductRow) => {
    setFormError(null);
    setEditor({ mode: 'edit', id: p.id, values: formFromProduct(p) });
  };

  const closeEditor = () => {
    setFormError(null);
    setEditor({ mode: 'closed' });
  };

  const save = async (values: ProductFormValues) => {
    setSubmitting(true);
    setFormError(null);
    try {
      const body = toApiBody(values);
      if (!body.name || !body.slug) {
        throw new Error('Name and slug are required.');
      }
      if (body.pricingType === 'FIXED' && !body.priceInr) {
        throw new Error('Enter an INR price for fixed-price products.');
      }

      if (editor.mode === 'create') {
        await apiFetch('/products', {
          method: 'POST',
          body: JSON.stringify(body),
        });
        toast({ title: 'Product created', description: body.name });
      } else if (editor.mode === 'edit') {
        await apiFetch(`/products/id/${editor.id}`, {
          method: 'PATCH',
          body: JSON.stringify(body),
        });
        toast({ title: 'Product updated', description: body.name });
      }
      closeEditor();
      await load();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="cb-shell-card flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="pq" className="text-sm block mb-1">
            Search catalogue{total ? ` (${total})` : ''}
          </label>
          <input
            id="pq"
            className="w-full border px-3 py-2"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name, slug, or SKU"
          />
        </div>
        <button
          type="button"
          className="border px-4 py-2 text-sm"
          onClick={() => void load()}
          disabled={loading}
        >
          Refresh
        </button>
        <button
          type="button"
          className="bg-[var(--g)] text-[var(--ink)] px-4 py-2 text-sm font-semibold"
          onClick={openCreate}
        >
          Add product
        </button>
      </div>

      {authHint ? (
        <div className="cb-shell-card text-sm text-[var(--ink2)]">
          <p className="m-0">{authHint}</p>
          <p className="mt-2 mb-0">
            <Link href="/login?next=/admin/products" className="underline">
              Sign in
            </Link>{' '}
            with{' '}
            <code className="text-xs">admin@core-bolt.com</code> if needed.
          </p>
        </div>
      ) : null}

      {editor.mode !== 'closed' ? (
        <AdminProductForm
          mode={editor.mode}
          initial={editor.values}
          categories={categories}
          submitting={submitting}
          error={formError}
          onSubmit={(v) => void save(v)}
          onCancel={closeEditor}
        />
      ) : null}

      <div className="cb-shell-card overflow-x-auto">
        {loading ? (
          <p className="text-sm text-[var(--ink3)] m-0">Loading products…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-[var(--ink3)] m-0">
            No products found. Use Add product to create one, or run{' '}
            <code className="text-xs">pnpm db:seed</code>.
          </p>
        ) : (
          <table className="cb-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td className="font-medium">{p.name}</td>
                  <td className="font-mono text-xs">{p.slug}</td>
                  <td>{categoryName(p.categoryId)}</td>
                  <td>
                    {p.pricingType === 'FIXED' && p.priceInr != null
                      ? `₹${Number(p.priceInr).toLocaleString('en-IN')}`
                      : 'Ask'}
                  </td>
                  <td>{p.isActive ? 'Active' : 'Hidden'}</td>
                  <td className="text-right whitespace-nowrap">
                    <button
                      type="button"
                      className="text-sm font-semibold text-[var(--g-dk)] underline"
                      onClick={() => openEdit(p)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
