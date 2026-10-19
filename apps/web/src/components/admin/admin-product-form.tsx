'use client';

import { useEffect, useState } from 'react';

export type AdminProductRow = {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  categoryId: string | null;
  description: string | null;
  shortDescription: string | null;
  pricingType: 'FIXED' | 'ON_REQUEST';
  priceInr: string | null;
  shippingInr: string;
  shippingUsd: string;
  imageUrl: string | null;
  isActive: boolean;
};

export type AdminCategoryOption = {
  id: string;
  name: string;
  slug: string;
};

export type ProductFormValues = {
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  pricingType: 'FIXED' | 'ON_REQUEST';
  priceInr: string;
  shippingInr: string;
  shippingUsd: string;
  imageUrl: string;
  isActive: boolean;
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200);
}

export function emptyProductForm(): ProductFormValues {
  return {
    name: '',
    slug: '',
    sku: '',
    categoryId: '',
    shortDescription: '',
    description: '',
    pricingType: 'FIXED',
    priceInr: '',
    shippingInr: '0',
    shippingUsd: '0',
    imageUrl: '',
    isActive: true,
  };
}

export function formFromProduct(p: AdminProductRow): ProductFormValues {
  return {
    name: p.name,
    slug: p.slug,
    sku: p.sku ?? '',
    categoryId: p.categoryId ?? '',
    shortDescription: p.shortDescription ?? '',
    description: p.description ?? '',
    pricingType: p.pricingType,
    priceInr: p.priceInr ?? '',
    shippingInr: p.shippingInr ?? '0',
    shippingUsd: p.shippingUsd ?? '0',
    imageUrl: p.imageUrl ?? '',
    isActive: p.isActive,
  };
}

/** Payload for POST /products or PATCH /products/id/:id */
export function toApiBody(values: ProductFormValues) {
  return {
    name: values.name.trim(),
    slug: values.slug.trim() || slugify(values.name),
    sku: values.sku.trim() || null,
    categoryId: values.categoryId || null,
    shortDescription: values.shortDescription.trim() || null,
    description: values.description.trim() || null,
    pricingType: values.pricingType,
    priceInr:
      values.pricingType === 'FIXED' && values.priceInr.trim()
        ? values.priceInr.trim()
        : null,
    shippingInr: values.shippingInr.trim() || '0',
    shippingUsd: values.shippingUsd.trim() || '0',
    imageUrl: values.imageUrl.trim() || null,
    isActive: values.isActive,
  };
}

export default function AdminProductForm({
  mode,
  initial,
  categories,
  submitting,
  error,
  onSubmit,
  onCancel,
}: {
  mode: 'create' | 'edit';
  initial: ProductFormValues;
  categories: AdminCategoryOption[];
  submitting: boolean;
  error: string | null;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');

  useEffect(() => {
    setValues(initial);
    setSlugTouched(mode === 'edit');
  }, [initial, mode]);

  const set =
    (key: keyof ProductFormValues) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const raw =
        e.target.type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setValues((prev) => {
        const next = { ...prev, [key]: raw } as ProductFormValues;
        if (key === 'name' && !slugTouched) {
          next.slug = slugify(String(raw));
        }
        return next;
      });
    };

  return (
    <form
      className="cb-shell-card space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-lg font-semibold m-0">
          {mode === 'create' ? 'Add product' : 'Edit product'}
        </h2>
        <button
          type="button"
          className="text-sm text-[var(--ink3)] underline"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>

      {error ? (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="block mb-1 font-medium">Name *</span>
          <input
            className="w-full border px-3 py-2"
            value={values.name}
            onChange={set('name')}
            required
            maxLength={255}
          />
        </label>
        <label className="block text-sm">
          <span className="block mb-1 font-medium">Slug *</span>
          <input
            className="w-full border px-3 py-2 font-mono text-sm"
            value={values.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set('slug')(e);
            }}
            required
            maxLength={255}
          />
        </label>
        <label className="block text-sm">
          <span className="block mb-1 font-medium">SKU</span>
          <input
            className="w-full border px-3 py-2"
            value={values.sku}
            onChange={set('sku')}
            maxLength={100}
          />
        </label>
        <label className="block text-sm">
          <span className="block mb-1 font-medium">Category</span>
          <select
            className="w-full border px-3 py-2 bg-white"
            value={values.categoryId}
            onChange={set('categoryId')}
          >
            <option value="">— None —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="block mb-1 font-medium">Pricing *</span>
          <select
            className="w-full border px-3 py-2 bg-white"
            value={values.pricingType}
            onChange={set('pricingType')}
          >
            <option value="FIXED">Fixed price (INR)</option>
            <option value="ON_REQUEST">Ask for price</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="block mb-1 font-medium">Price (INR)</span>
          <input
            className="w-full border px-3 py-2"
            type="number"
            min="0"
            step="0.01"
            disabled={values.pricingType === 'ON_REQUEST'}
            value={values.priceInr}
            onChange={set('priceInr')}
            placeholder={
              values.pricingType === 'ON_REQUEST' ? 'N/A' : 'e.g. 126270'
            }
          />
        </label>
        <label className="block text-sm">
          <span className="block mb-1 font-medium">Shipping (INR)</span>
          <input
            className="w-full border px-3 py-2"
            type="number"
            min="0"
            step="0.01"
            value={values.shippingInr}
            onChange={set('shippingInr')}
          />
        </label>
        <label className="block text-sm">
          <span className="block mb-1 font-medium">Shipping (USD)</span>
          <input
            className="w-full border px-3 py-2"
            type="number"
            min="0"
            step="0.01"
            value={values.shippingUsd}
            onChange={set('shippingUsd')}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="block mb-1 font-medium">Image URL</span>
          <input
            className="w-full border px-3 py-2"
            value={values.imageUrl}
            onChange={set('imageUrl')}
            placeholder="https://assets.core-bolt.com/..."
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="block mb-1 font-medium">Short description</span>
          <input
            className="w-full border px-3 py-2"
            value={values.shortDescription}
            onChange={set('shortDescription')}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="block mb-1 font-medium">Description</span>
          <textarea
            className="w-full border px-3 py-2 min-h-[100px]"
            value={values.description}
            onChange={set('description')}
          />
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={values.isActive}
            onChange={set('isActive')}
          />
          Active (visible in store)
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-[var(--g)] text-[var(--ink)] px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
        >
          {submitting
            ? 'Saving…'
            : mode === 'create'
              ? 'Create product'
              : 'Save changes'}
        </button>
        <button
          type="button"
          className="border px-5 py-2.5 text-sm"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
