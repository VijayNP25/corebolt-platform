import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ReplicaSiteLayout from '@/components/replica-pages/replica-site-layout';
import CdnImage from '@/components/cdn-image';
import {
  browseCatalog,
  listBrowseCategories,
  type BrowsePrice,
  type BrowseSort,
} from '@/lib/catalog-search';
import { loadPublishedCatalog } from '@/lib/published-catalog';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Products | CORE BOLT',
  description:
    'Browse CORE BOLT edge computers, LiDAR sensors, vision systems, and perception kits.',
};

type BrowseState = {
  q: string;
  category: string;
  price: BrowsePrice;
  sort: BrowseSort;
  page: number;
};

function readState(raw: {
  q?: string;
  category?: string;
  price?: string;
  sort?: string;
  page?: string;
}): BrowseState {
  const categories = new Set(listBrowseCategories().map((category) => category.id));
  const page = Number(raw.page);
  return {
    q: raw.q?.trim() ?? '',
    category: raw.category && categories.has(raw.category) ? raw.category : '',
    price: raw.price === 'fixed' || raw.price === 'quote' ? raw.price : 'all',
    sort: raw.sort === 'price' ? 'price' : 'name',
    page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
  };
}

function productsHref(state: BrowseState, page = state.page) {
  const params = new URLSearchParams();
  if (state.q) params.set('q', state.q);
  if (state.category) params.set('category', state.category);
  if (state.price !== 'all') params.set('price', state.price);
  if (state.sort !== 'name') params.set('sort', state.sort);
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `/products?${query}` : '/products';
}

function formatInr(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const { locale } = await params;
  const raw = await searchParams;
  setRequestLocale(locale);
  await loadPublishedCatalog();

  const state = readState(raw);
  const categories = listBrowseCategories();
  const shortQuery = state.q.length === 1;
  const result = shortQuery
    ? { items: [], total: 0, page: 1, pageCount: 1, pageSize: 24 }
    : browseCatalog({
        q: state.q,
        categoryId: state.category || undefined,
        price: state.price,
        sort: state.sort,
        page: state.page,
      });

  const from = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  const to = Math.min(result.page * result.pageSize, result.total);

  return (
    <ReplicaSiteLayout lightNav>
      <main className="cb-shell">
        <h1>{state.q ? 'Search' : 'Products'}</h1>
        <p className="lead">
          {shortQuery
            ? 'Type at least 2 characters.'
            : result.total === 0
              ? 'No products match.'
              : `Showing ${from}–${to} of ${result.total}. Prices in INR.`}
        </p>

        <form action={`/${locale}/products`} method="get" className="cb-shell-card flex flex-wrap gap-3 items-end">
          {state.q ? <input type="hidden" name="q" value={state.q} /> : null}
          <label className="text-sm">
            <span className="block mb-1 font-medium">Category</span>
            <select className="border px-3 py-2 bg-white" name="category" defaultValue={state.category}>
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="block mb-1 font-medium">Price</span>
            <select className="border px-3 py-2 bg-white" name="price" defaultValue={state.price}>
              <option value="all">All</option>
              <option value="fixed">Fixed price</option>
              <option value="quote">Ask for price</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="block mb-1 font-medium">Sort</span>
            <select className="border px-3 py-2 bg-white" name="sort" defaultValue={state.sort}>
              <option value="name">Name</option>
              <option value="price">Price, low to high</option>
            </select>
          </label>
          <button
            type="submit"
            className="bg-[var(--g)] text-[var(--ink)] px-4 py-2 text-sm font-semibold"
          >
            Apply
          </button>
          {state.category || state.price !== 'all' || state.sort !== 'name' ? (
            <Link href={state.q ? `/products?q=${encodeURIComponent(state.q)}` : '/products'} className="text-sm underline pb-2">
              Clear
            </Link>
          ) : null}
        </form>

        {result.items.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none m-0 p-0">
            {result.items.map((hit) => {
              const price =
                typeof hit.product.price === 'number' && hit.product.price > 0
                  ? hit.product.price
                  : null;
              return (
                <li key={hit.product.id}>
                  <Link href={hit.href} className="cb-shell-card block no-underline text-inherit h-full">
                    {hit.product.image ? (
                      <CdnImage
                        src={hit.product.image}
                        alt=""
                        className="w-full h-40 object-contain mb-3 bg-[#f7f7f7]"
                      />
                    ) : null}
                    <span className="block font-semibold">{hit.product.name.trim()}</span>
                    {hit.group ? (
                      <span className="block text-sm text-[var(--ink3)] mt-1">{hit.group}</span>
                    ) : null}
                    <span className="block text-sm mt-2">
                      {price != null ? formatInr(price) : 'Ask for price'}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}

        {result.pageCount > 1 ? (
          <nav className="flex flex-wrap gap-2 mt-6" aria-label="Pages">
            {result.page > 1 ? (
              <Link href={productsHref(state, result.page - 1)} className="border px-3 py-2 text-sm">
                Previous
              </Link>
            ) : null}
            {Array.from({ length: result.pageCount }, (_, index) => index + 1).map((page) => (
              <Link
                key={page}
                href={productsHref(state, page)}
                className={`border px-3 py-2 text-sm${page === result.page ? ' font-semibold bg-[var(--g)]' : ''}`}
                aria-current={page === result.page ? 'page' : undefined}
              >
                {page}
              </Link>
            ))}
            {result.page < result.pageCount ? (
              <Link href={productsHref(state, result.page + 1)} className="border px-3 py-2 text-sm">
                Next
              </Link>
            ) : null}
          </nav>
        ) : null}
      </main>
    </ReplicaSiteLayout>
  );
}
