'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import { apiFetch } from '@/lib/api';
import { getMe } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
};

type FormValues = {
  name: string;
  slug: string;
  description: string;
  parentId: string;
  sortOrder: string;
  isActive: boolean;
};

type EditorState =
  | { mode: 'closed' }
  | { mode: 'create'; values: FormValues }
  | { mode: 'edit'; id: string; values: FormValues };

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 180);
}

function emptyForm(): FormValues {
  return {
    name: '',
    slug: '',
    description: '',
    parentId: '',
    sortOrder: '0',
    isActive: true,
  };
}

function formFromCategory(row: CategoryRow): FormValues {
  return {
    name: row.name,
    slug: row.slug,
    description: row.description ?? '',
    parentId: row.parentId ?? '',
    sortOrder: String(row.sortOrder ?? 0),
    isActive: row.isActive,
  };
}

export default function AdminCategoriesClient() {
  const { toast } = useToast();
  const [items, setItems] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [authHint, setAuthHint] = useState<string | null>(null);
  const [editor, setEditor] = useState<EditorState>({ mode: 'closed' });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setAuthHint(null);
    try {
      const me = await getMe();
      if (!me) {
        setAuthHint('Sign in as admin to manage categories.');
        setItems([]);
        return;
      }
      if (me.role !== 'admin') {
        setAuthHint('Category create/edit requires an admin account.');
        setItems([]);
        return;
      }
      const res = await apiFetch<{ data: { items: CategoryRow[] } }>('/categories/admin/list');
      setItems(res.data.items ?? []);
    } catch (e) {
      setAuthHint(e instanceof Error ? e.message : 'Could not load categories.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const nameById = useMemo(() => new Map(items.map((item) => [item.id, item.name])), [items]);

  const openCreate = () => {
    setFormError(null);
    setSlugTouched(false);
    setEditor({ mode: 'create', values: emptyForm() });
  };

  const openEdit = (row: CategoryRow) => {
    setFormError(null);
    setSlugTouched(true);
    setEditor({ mode: 'edit', id: row.id, values: formFromCategory(row) });
  };

  const save = async (values: FormValues) => {
    setSubmitting(true);
    setFormError(null);
    try {
      const name = values.name.trim();
      const slug = values.slug.trim() || slugify(name);
      if (!name || !slug) throw new Error('Name and slug are required.');
      const description = values.description.trim() || null;
      const sortOrder = Number(values.sortOrder);
      if (!Number.isFinite(sortOrder)) throw new Error('Sort order must be a number.');

      if (editor.mode === 'create') {
        const parent = items.find((item) => item.id === values.parentId);
        const childSlug = parent && slug.startsWith(`${parent.slug}--`) ? slug.slice(parent.slug.length + 2) : slug;
        const storedSlug = parent ? `${parent.slug}--${childSlug}`.slice(0, 200) : slug;
        await apiFetch('/categories', {
          method: 'POST',
          body: JSON.stringify({
            name,
            slug: storedSlug,
            description,
            parentId: values.parentId || null,
            sortOrder,
            isActive: values.isActive,
          }),
        });
        toast({ title: 'Category created', description: name });
      } else if (editor.mode === 'edit') {
        await apiFetch(`/categories/${editor.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            name,
            description,
            sortOrder,
            isActive: values.isActive,
          }),
        });
        toast({ title: 'Category updated', description: name });
      }
      setEditor({ mode: 'closed' });
      await load();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const values = editor.mode === 'closed' ? null : editor.values;
  const setValue = (key: keyof FormValues, raw: string | boolean) => {
    setEditor((current) => {
      if (current.mode === 'closed') return current;
      const next = { ...current.values, [key]: raw } as FormValues;
      if (key === 'name' && !slugTouched && typeof raw === 'string') {
        next.slug = slugify(raw);
      }
      return { ...current, values: next };
    });
  };

  return (
    <div className="space-y-4">
      <div className="cb-shell-card flex flex-wrap gap-3 items-center justify-between">
        <p className="text-sm text-[var(--ink2)] m-0">
          Names and descriptions here are the ones shown in the shop menu.
        </p>
        <button
          type="button"
          className="bg-[var(--g)] text-[var(--ink)] px-4 py-2 text-sm font-semibold"
          onClick={openCreate}
        >
          Add category
        </button>
      </div>

      {authHint ? (
        <div className="cb-shell-card text-sm text-[var(--ink2)]">
          <p className="m-0">{authHint}</p>
          <p className="mt-2 mb-0">
            <Link href="/login?next=/admin/categories" className="underline">
              Sign in
            </Link>{' '}
            with <code className="text-xs">admin@core-bolt.com</code> if needed.
          </p>
        </div>
      ) : null}

      {values && editor.mode !== 'closed' ? (
        <form
          className="cb-shell-card space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void save(values);
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold m-0">
              {editor.mode === 'create' ? 'Add category' : 'Edit category'}
            </h2>
            <button
              type="button"
              className="text-sm text-[var(--ink3)] underline"
              onClick={() => setEditor({ mode: 'closed' })}
            >
              Cancel
            </button>
          </div>
          {formError ? (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">
              {formError}
            </p>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="block mb-1 font-medium">Name *</span>
              <input
                className="w-full border px-3 py-2"
                value={values.name}
                onChange={(event) => setValue('name', event.target.value)}
                required
                maxLength={200}
              />
            </label>
            <label className="block text-sm">
              <span className="block mb-1 font-medium">Slug</span>
              <input
                className="w-full border px-3 py-2 font-mono text-sm"
                value={values.slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setValue('slug', event.target.value);
                }}
                disabled={editor.mode === 'edit'}
                required
                maxLength={200}
              />
            </label>
            <label className="block text-sm">
              <span className="block mb-1 font-medium">Parent</span>
              <select
                className="w-full border px-3 py-2 bg-white"
                value={values.parentId}
                disabled={editor.mode === 'edit'}
                onChange={(event) => setValue('parentId', event.target.value)}
              >
                <option value="">Top level</option>
                {items
                  .filter((item) => !item.parentId && item.id !== (editor.mode === 'edit' ? editor.id : ''))
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="block mb-1 font-medium">Sort order</span>
              <input
                className="w-full border px-3 py-2"
                type="number"
                value={values.sortOrder}
                onChange={(event) => setValue('sortOrder', event.target.value)}
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="block mb-1 font-medium">Description</span>
              <textarea
                className="w-full border px-3 py-2 min-h-[80px]"
                value={values.description}
                onChange={(event) => setValue('description', event.target.value)}
              />
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={values.isActive}
                onChange={(event) => setValue('isActive', event.target.checked)}
              />
              Active (shown in the shop menu)
            </label>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-[var(--g)] text-[var(--ink)] px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
          >
            {submitting ? 'Saving…' : editor.mode === 'create' ? 'Create category' : 'Save changes'}
          </button>
        </form>
      ) : null}

      <div className="cb-shell-card overflow-x-auto">
        {loading ? (
          <p className="text-sm text-[var(--ink3)] m-0">Loading categories…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-[var(--ink3)] m-0">No categories yet.</p>
        ) : (
          <table className="cb-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Parent</th>
                <th>Sort</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="font-medium">{item.name}</td>
                  <td className="font-mono text-xs">{item.slug}</td>
                  <td>{item.parentId ? (nameById.get(item.parentId) ?? '—') : '—'}</td>
                  <td>{item.sortOrder}</td>
                  <td>{item.isActive ? 'Active' : 'Hidden'}</td>
                  <td className="text-right">
                    <button
                      type="button"
                      className="text-sm font-semibold text-[var(--g-dk)] underline"
                      onClick={() => openEdit(item)}
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
