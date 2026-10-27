'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Headset,
  ShieldCheck,
  ShoppingCart,
} from 'lucide-react';
import CdnImage from '@/components/cdn-image';
import { Link } from '@/i18n/routing';
import { useLocalCart } from '@/hooks/use-local-cart';
import { useToast } from '@/hooks/use-toast';
import '@/styles/store-page.css';

export type StoreProduct = {
  id: string;
  name: string;
  href: string;
  slug: string;
  blurb: string;
  image: string | null;
  category: string;
  priceLabel: string;
  priceInr: string;
};

export type StoreCategory = {
  name: string;
  count: number;
  href: string;
  image: string;
};

const HERO_NAMES = [
  'hesai at-128',
  'jetson agx orin developer kit 64gb',
  'livox mid-360s',
  'vlp-16 puck',
];

function norm(value: string) {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

function pickHero(products: StoreProduct[]) {
  const chosen: StoreProduct[] = [];
  for (const needle of HERO_NAMES) {
    const hit = products.find((item) => norm(item.name).includes(needle));
    if (hit && !chosen.some((item) => item.id === hit.id)) chosen.push(hit);
  }
  for (const item of products) {
    if (chosen.length >= 4) break;
    if (!chosen.some((picked) => picked.id === item.id)) chosen.push(item);
  }
  return chosen.slice(0, 4);
}

function mixGrid(products: StoreProduct[]) {
  const buckets = new Map<string, StoreProduct[]>();
  for (const item of products) {
    const list = buckets.get(item.category) ?? [];
    list.push(item);
    buckets.set(item.category, list);
  }
  const lanes = [...buckets.values()];
  const mixed: StoreProduct[] = [];
  let index = 0;
  while (mixed.length < 8 && lanes.some((lane) => lane.length > index)) {
    for (const lane of lanes) {
      const item = lane[index];
      if (item) mixed.push(item);
      if (mixed.length >= 8) break;
    }
    index += 1;
  }
  return mixed;
}

export default function StoreExperience({
  products,
  categories,
  currencyNote,
}: {
  products: StoreProduct[];
  categories: StoreCategory[];
  currencyNote: string | null;
}) {
  const hero = useMemo(() => pickHero(products), [products]);
  const [slide, setSlide] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const { addItem } = useLocalCart();
  const { toast } = useToast();
  const active = hero[slide] ?? hero[0];

  useEffect(() => {
    if (hero.length < 2) return;
    const id = window.setInterval(() => {
      setSlide((current) => (current + 1) % hero.length);
    }, 5600);
    return () => window.clearInterval(id);
  }, [hero.length]);

  function addToCart(product: StoreProduct) {
    try {
      addItem({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        imageUrl: product.image,
        priceInr: product.priceInr,
        shippingInr: '0',
        shippingUsd: '0',
        quantity: 1,
      });
      setAddedId(product.id);
      window.setTimeout(() => setAddedId((current) => (current === product.id ? null : current)), 1200);
      toast({ title: 'Added to cart', description: product.name });
    } catch (error) {
      toast({
        title: 'Could not add',
        description: error instanceof Error ? error.message : 'Try again',
        variant: 'destructive',
      });
    }
  }

  if (!active) {
    return (
      <section className="cb-store">
        <div className="cb-store-wrap cb-store-empty">
          <h1>Store</h1>
          <p>No priced products are published yet.</p>
        </div>
      </section>
    );
  }

  return (
    <div className="cb-store">
      <section className="cb-store-wrap cb-hero" aria-roledescription="carousel">
        <div className="cb-hero-copy" key={active.id}>
          <h1>{active.name}</h1>
          <p className="cb-lead">{active.blurb}</p>
          <div className="cb-hero-actions">
            <Link href={active.href} className="cb-btn">
              Shop now
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <div className="cb-dots" role="tablist" aria-label="Featured products">
            {hero.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === slide}
                aria-label={item.name}
                className={index === slide ? 'is-on' : undefined}
                onClick={() => setSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="cb-hero-stage">
          <Link href={active.href} className="cb-hero-photo" key={active.id}>
            {active.image ? (
              <CdnImage src={active.image} alt={active.name} fetchPriority="high" />
            ) : (
              <span className="cb-photo-fallback">{active.name}</span>
            )}
          </Link>
        </div>
      </section>

      <section className="cb-store-wrap cb-cats" aria-labelledby="cb-cats-title">
        <div className="cb-section-head">
          <div>
            <p className="cb-kicker">
              <span className="cb-kicker-dot" />
              Shop by category
            </p>
            <h2 id="cb-cats-title">Browse by category</h2>
          </div>
          <div className="cb-arrows">
            <button type="button" aria-label="Previous categories" onClick={() => rowRef.current?.scrollBy({ left: -340, behavior: 'smooth' })}>
              <ChevronLeft size={18} />
            </button>
            <button type="button" aria-label="Next categories" onClick={() => rowRef.current?.scrollBy({ left: 340, behavior: 'smooth' })}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="cb-cat-row" ref={rowRef}>
          {categories.map((item) => (
            <Link key={item.name} href={item.href} className="cb-cat">
              <span className="cb-cat-photo">
                <CdnImage src={item.image} alt="" />
              </span>
              <strong>{item.name}</strong>
              <em>
                {item.count} {item.count === 1 ? 'priced item' : 'priced items'}
              </em>
            </Link>
          ))}
        </div>
      </section>

      <section className="cb-store-wrap cb-collection" id="cb-collection" aria-labelledby="cb-collection-title">
        <div className="cb-section-head">
          <div>
            <p className="cb-kicker">
              <span className="cb-kicker-dot" />
              Our collection
            </p>
            <h2 id="cb-collection-title">Explore priced products</h2>
          </div>
          <Link href="/products?price=fixed" className="cb-text-link">
            View all products
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
        <div className="cb-grid">
          {mixGrid(products).map((product) => (
            <article key={product.id} className="cb-card">
              <Link href={product.href} className="cb-card-media">
                <span className="cb-badge">{product.category}</span>
                {product.image ? (
                  <CdnImage src={product.image} alt={product.name} />
                ) : (
                  <span className="cb-photo-fallback">{product.name}</span>
                )}
              </Link>
              <div className="cb-card-body">
                <Link href={product.href}>
                  <h3>{product.name}</h3>
                </Link>
                <div className="cb-card-foot">
                  <p>
                    <strong>{product.priceLabel}</strong>
                    {currencyNote ? <small>{currencyNote}</small> : null}
                  </p>
                  <button
                    type="button"
                    className={addedId === product.id ? 'is-added' : undefined}
                    aria-label={`Add ${product.name} to cart`}
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cb-store-wrap cb-trust" aria-label="Shopping notes">
        <div>
          <ShoppingCart size={22} />
          <div>
            <strong>Add to cart</strong>
            <span>Priced products can be ordered</span>
          </div>
        </div>
        <div>
          <BadgeCheck size={22} />
          <div>
            <strong>Listed prices</strong>
            <span>{currencyNote ?? 'Shown in USD'}</span>
          </div>
        </div>
        <div>
          <ShieldCheck size={22} />
          <div>
            <strong>Secure checkout</strong>
            <span>Account required to order</span>
          </div>
        </div>
        <div>
          <Headset size={22} />
          <div>
            <strong>Engineering support</strong>
            <span>Talk to CORE BOLT before you buy</span>
          </div>
        </div>
      </section>
    </div>
  );
}
