"use client";

import { useMemo } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import ReplicaSiteLayout from "@/components/replica-pages/replica-site-layout";
import ReplicaInnerHero from "@/components/replica-pages/replica-inner-hero";
import ProductCard from "@/components/product-card";
import { categories } from "@/data/products";
import {
  ORDER_CATEGORIES,
  getPricedGroup,
  getPricedGroups,
  pricedGroupName,
} from "@/lib/lidar-order";
import { useSeo } from "@/lib/seo";
import { useServerNotFound } from "@/lib/redirect";
import { navSiblingForCategory } from "@/components/replica-home/replica-nav";
import "@/styles/replica-product-page.css";

export default function LidarOrderPage() {
  const { orderKey, manufacturerId } = useParams();
  const config = ORDER_CATEGORIES[orderKey ?? "lidar"] ?? ORDER_CATEGORIES.lidar;
  const manufacturers = useMemo(() => getPricedGroups(config.categoryId), [config.categoryId]);
  const selected = manufacturerId ? getPricedGroup(config.categoryId, manufacturerId) : undefined;
  const unknownManufacturer = Boolean(manufacturerId) && !selected;
  const products = selected
    ? selected.products
    : manufacturers.flatMap((manufacturer) => manufacturer.products);
  const category = categories.find((item) => item.id === config.categoryId);
  const title = selected ? config.groupTitle(selected.name) : config.title;

  useServerNotFound(unknownManufacturer);

  useSeo(
    unknownManufacturer
      ? null
      : {
          title: `${title} | CORE BOLT`,
          description: selected ? config.groupDescription(selected.name) : config.description,
          canonical: `https://www.core-bolt.com${
            selected ? `${config.path}/${selected.id}` : config.path
          }`,
        },
  );

  if (unknownManufacturer) {
    return (
      <ReplicaSiteLayout>
        <ReplicaInnerHero title={config.title} />
      </ReplicaSiteLayout>
    );
  }

  return (
    <ReplicaSiteLayout
      navTrail={[
        { label: config.brandsLabel, href: config.brandsHref },
        {
          label: selected ? selected.name : "Order",
          href: selected ? `${config.path}/${selected.id}` : config.path,
        },
      ]}
      navSibling={navSiblingForCategory(config.categoryId)}
    >
      <ReplicaInnerHero
        title={title}
        description={selected ? config.groupDescription(selected.name) : config.description}
        image={category?.image}
      />

      <main className="replica-site-main">
        <section className="replica-site-section" data-nav-tone="light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Link href={config.brandsHref} className="inline-flex items-center text-sm font-semibold">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {config.brandsLabel}
              </Link>
              {selected && (
                <Link href={config.path} className="inline-flex items-center text-sm font-semibold">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {config.allLabel}
                </Link>
              )}
            </div>

            <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by manufacturer">
              <Link
                href={config.path}
                className="btn lidar-order-chip"
                aria-current={selected ? undefined : "page"}
              >
                All
              </Link>
              {manufacturers.map((manufacturer) => {
                const active = manufacturer.id === selected?.id;
                return (
                  <Link
                    key={manufacturer.id}
                    href={`${config.path}/${manufacturer.id}`}
                    className="btn lidar-order-chip"
                    aria-current={active ? "page" : undefined}
                  >
                    {manufacturer.name}
                  </Link>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  addToCart
                  manufacturer={pricedGroupName(config.categoryId, product)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </ReplicaSiteLayout>
  );
}
