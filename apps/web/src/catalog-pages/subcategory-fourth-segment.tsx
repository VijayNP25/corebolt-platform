import { Redirect, useParams } from "wouter";
import CategoryPage from "@/catalog-pages/category";
import ProductPage from "@/catalog-pages/product";
import NotFound from "@/catalog-pages/not-found";
import { useServerRedirect } from "@/lib/redirect";
import {
  buildProductPath,
  findSubcategoryBySlug,
  findProductInSubcategory,
  findProductGroupPath,
  getNestedProductGroup,
  locateProduct,
} from "@/lib/subcategory-products";

/**
 * /:categoryId/:subcategoryId/:a/:b
 * — nested group listing (e.g. gige-cameras + area-scan-cameras) → Category
 * — flat group + product (e.g. gmsl2 + productId) → Product
 */
export default function SubcategoryFourthSegment() {
  const { categoryId, subcategoryId, a, b } = useParams<{
    categoryId: string;
    subcategoryId: string;
    a: string;
    b: string;
  }>();

  const sub =
    categoryId && subcategoryId
      ? findSubcategoryBySlug(categoryId, subcategoryId)
      : undefined;

  // Resolve the product (if any) and whether `a` matches its immediate
  // (leaf) group unconditionally, up front — so every hook below runs in
  // the same order on every render, regardless of what the data looks like.
  const prod =
    sub && b ? findProductInSubcategory(sub, b) : undefined;
  const path = sub && prod ? findProductGroupPath(sub, prod.id) : null;
  const isLeafGroupMatch = !!(path?.length && path[path.length - 1] === a);

  let redirectTarget: string | null = null;
  if (categoryId && subcategoryId && a && b) {
    const current = `/${categoryId}/${subcategoryId}/${a}/${b}`;
    if (!sub) {
      const located = locateProduct(b);
      if (located) {
        const canonical = buildProductPath(located.product);
        if (canonical !== current) {
          redirectTarget = canonical;
        }
      }
    } else if (prod && !isLeafGroupMatch) {
      // The product exists in this subcategory, but `a` isn't its
      // immediate group (e.g. a leaf-only or otherwise stale URL) —
      // send the browser to the canonical path.
      const canonical = buildProductPath(prod);
      if (canonical !== current) {
        redirectTarget = canonical;
      }
    }
  }
  // Called exactly once, unconditionally — never inside a branch.
  useServerRedirect(redirectTarget);

  if (!categoryId || !subcategoryId || !a || !b) {
    return <NotFound />;
  }

  if (!sub) {
    if (redirectTarget) {
      return <Redirect to={redirectTarget} />;
    }
    return <NotFound />;
  }

  if (getNestedProductGroup(sub, a, b)) {
    return (
      <CategoryPage productGroupId={a} nestedProductGroupId={b} />
    );
  }

  if (prod) {
    if (isLeafGroupMatch) {
      return <ProductPage />;
    }
    if (redirectTarget) {
      return <Redirect to={redirectTarget} />;
    }
  }

  return <NotFound />;
}