'use client';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { Link, useLocation } from '@/lib/wouter-compat';
import { API_URL, type ApiProduct } from '@/lib/api';

type SearchHit = {
  id: string;
  name: string;
  href: string;
  group?: string;
};

export default function CatalogSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchHit[]>([]);
  const [total, setTotal] = useState(0);
  const [searched, setSearched] = useState('');
  const [, navigate] = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = 'catalog-search-results';

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const needle = query.trim();
    if (needle.length < 2) {
      setResults([]);
      setTotal(0);
      setSearched('');
      return;
    }
    const handle = window.setTimeout(() => {
      const url = `${API_URL.replace(/\/$/, '')}/products?q=${encodeURIComponent(needle)}&pageSize=8`;
      fetch(url)
        .then(async (res) => {
          if (!res.ok) throw new Error('search failed');
          const body = (await res.json()) as {
            data?: { items?: ApiProduct[]; total?: number };
          };
          if (cancelled) return;
          const items = body.data?.items ?? [];
          setResults(
            items.map((product) => ({
              id: product.id,
              name: product.name,
              href: `/products/${product.slug}`,
              group: product.categoryName ?? undefined,
            })),
          );
          setTotal(body.data?.total ?? items.length);
          setSearched(needle);
        })
        .catch(async () => {
          try {
            const mod = await import('@/lib/catalog-search');
            if (cancelled) return;
            const found = mod.searchCatalog(needle, 8);
            setResults(
              found.hits.map((hit) => ({
                id: hit.product.id,
                name: hit.product.name,
                href: hit.href,
                group: hit.group,
              })),
            );
            setTotal(found.total);
            setSearched(needle);
          } catch {
            if (cancelled) return;
            setResults([]);
            setTotal(0);
            setSearched(needle);
          }
        });
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [open, query]);

  const close = () => {
    setOpen(false);
    setQuery('');
    setResults([]);
    setTotal(0);
    setSearched('');
  };

  const resultsHref = `/products?q=${encodeURIComponent(query.trim())}`;

  const openResults = () => {
    const needle = query.trim();
    if (needle.length < 2) return;
    navigate(resultsHref);
    close();
  };

  return (
    <div className="nav-search" ref={rootRef}>
      <button
        type="button"
        className="nav-icon-btn"
        aria-label="Search"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        <Search size={18} strokeWidth={1.75} aria-hidden />
        <span className="nav-icon-btn__label">Search</span>
      </button>
      {open ? (
        <div className="nav-search-panel">
          <input
            ref={inputRef}
            className="nav-search-input"
            type="search"
            value={query}
            placeholder="Search products"
            aria-label="Search products"
            aria-controls={listId}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                openResults();
              }
            }}
          />
          <div id={listId} className="nav-search-results">
            {query.trim().length < 2 ? (
              <p className="nav-search-empty">Type a product, category, or SKU</p>
            ) : searched !== query.trim() ? (
              <p className="nav-search-empty">Searching…</p>
            ) : results.length === 0 ? (
              <p className="nav-search-empty">No products found</p>
            ) : (
              <ul>
                {results.map((hit) => (
                  <li key={hit.id}>
                    <Link href={hit.href} className="nav-search-result" onClick={close}>
                      <span className="nav-search-name">{hit.name.trim()}</span>
                      {hit.group ? <span className="nav-search-group">{hit.group}</span> : null}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={resultsHref} className="nav-search-result" onClick={close}>
                    <span className="nav-search-name">
                      See all {total} result{total === 1 ? '' : 's'}
                    </span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
