import { Redirect, useParams } from "wouter";
import CategoryPage from "@/catalog-pages/category";
import ProductPage from "@/catalog-pages/product";
import NotFound from "@/catalog-pages/not-found";
import { useServerRedirect } from "@/lib/redirect";
import {
  buildProductPath,
  findSubcategoryBySlug,
  findProductInSubcategory,
  isTopLevelProductGroupSlug,
  locateProduct,
} from "@/lib/subcategory-products";

/**
 * Handles /:categoryId/:subcategoryId/:slug
 * — product id (flat or grouped subcategories) → Product
 * — product group id (e.g. gmsl3) → Category listing for that group
 */
export default function SubcategoryThirdSegment() {
  const { categoryId, subcategoryId, slug } = useParams<{
    categoryId: string;
    subcategoryId: string;
    slug: string;
  }>();

  const sub =
    categoryId && subcategoryId
      ? findSubcategoryBySlug(categoryId, subcategoryId)
      : undefined;

  let redirectTarget: string | null = null;
  if (categoryId && subcategoryId && slug && !sub) {
    const located = locateProduct(slug);
    if (located) {
      const canonical = buildProductPath(located.product);
      const current = `/${categoryId}/${subcategoryId}/${slug}`;
      if (canonical !== current) {
        redirectTarget = canonical;
      }
    }
  }
  useServerRedirect(redirectTarget);

  if (!categoryId || !subcategoryId || !slug) {
    return <NotFound />;
  }

  if (!sub) {
    if (redirectTarget) {
      return <Redirect to={redirectTarget} />;
    }
    return <NotFound />;
  }

  if (findProductInSubcategory(sub, slug)) {
    return <ProductPage />;
  }

  if (isTopLevelProductGroupSlug(sub, slug)) {
    return <CategoryPage productGroupId={slug} />;
  }

  return <NotFound />;
}
