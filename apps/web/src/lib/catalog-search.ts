import { categories, type Product } from '@/data/products';
import { buildProductPath, getAllProductsFlat } from '@/lib/subcategory-products';

export type CatalogSearchHit = {
  product: Product;
  href: string;
  group: string;
};

function products() {
  return getAllProductsFlat();
}

function compact(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function placement(product: Product) {
  const category = categories.find((item) => item.id === product.category);
  const subcategory = category?.subcategories?.find((item) => item.id === product.subcategory);
  return {
    category: category?.name ?? '',
    subcategory: subcategory?.name ?? '',
    group: [category?.name, subcategory?.name].filter(Boolean).join(' · '),
  };
}

export type CatalogSearchResult = {
  hits: CatalogSearchHit[];
  total: number;
};

/**
 * Match a shopper query against the same catalogue the shop shows.
 * Pass limit 0 to return every match.
 */
export function searchCatalog(query: string, limit = 8): CatalogSearchResult {
  const needle = compact(query);
  if (needle.length < 2) return { hits: [], total: 0 };

  const ranked = products()
    .map((product) => {
      const place = placement(product);
      const name = compact(product.name);
      const sku = compact(product.id);
      const category = compact(place.category);
      const subcategory = compact(place.subcategory);
      let score = 0;
      if (name.startsWith(needle)) score = 6;
      else if (name.includes(needle)) score = 5;
      else if (sku.startsWith(needle)) score = 4;
      else if (sku.includes(needle)) score = 3;
      else if (subcategory.includes(needle)) score = 2;
      else if (category.includes(needle)) score = 1;
      return { product, score, group: place.group };
    })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name));

  const sliced = limit > 0 ? ranked.slice(0, limit) : ranked;
  return {
    total: ranked.length,
    hits: sliced.map(({ product, group }) => ({
      product,
      href: buildProductPath(product),
      group,
    })),
  };
}

export type BrowsePrice = 'all' | 'fixed' | 'quote';
export type BrowseSort = 'name' | 'price';

export type BrowseQuery = {
  q?: string;
  categoryId?: string;
  price?: BrowsePrice;
  sort?: BrowseSort;
  page?: number;
  pageSize?: number;
};

function hasFixedPrice(product: Product) {
  return typeof product.price === 'number' && product.price > 0;
}

function toHit(product: Product): CatalogSearchHit {
  return {
    product,
    href: buildProductPath(product),
    group: placement(product).group,
  };
}

/** Categories shown in the shop filter. */
export function listBrowseCategories() {
  return categories
    .filter((category) => !category.hidden)
    .map((category) => ({ id: category.id, name: category.name }));
}

/** Filter, sort, and page the published catalogue. */
export function browseCatalog(query: BrowseQuery) {
  const pageSize = query.pageSize && query.pageSize > 0 ? query.pageSize : 24;
  const needle = query.q?.trim() ?? '';
  let hits =
    needle.length >= 2 ? searchCatalog(needle, 0).hits : products().map(toHit);

  if (query.categoryId) {
    hits = hits.filter((hit) => hit.product.category === query.categoryId);
  }
  if (query.price === 'fixed') {
    hits = hits.filter((hit) => hasFixedPrice(hit.product));
  } else if (query.price === 'quote') {
    hits = hits.filter((hit) => !hasFixedPrice(hit.product));
  }

  const sort = query.sort === 'price' ? 'price' : 'name';
  hits = [...hits].sort((a, b) => {
    if (sort === 'price') {
      const aPrice = hasFixedPrice(a.product) ? (a.product.price as number) : Number.POSITIVE_INFINITY;
      const bPrice = hasFixedPrice(b.product) ? (b.product.price as number) : Number.POSITIVE_INFINITY;
      if (aPrice !== bPrice) return aPrice - bPrice;
    }
    return a.product.name.localeCompare(b.product.name);
  });

  const total = hits.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, query.page ?? 1), total === 0 ? 1 : pageCount);
  const start = (page - 1) * pageSize;

  return {
    items: hits.slice(start, start + pageSize),
    total,
    page,
    pageCount,
    pageSize,
  };
}
