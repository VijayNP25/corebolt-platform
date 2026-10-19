import { useParams } from "wouter";
import { findCategoryDirectProduct } from "@/lib/subcategory-products";
import CategoryPage from "@/catalog-pages/category";
import ProductPage from "@/catalog-pages/product";

// /:categoryId/:subcategoryId resolves to either a Subcategory listing
// (Category page) or a Product detail page when the second segment is a
// product that lives directly on the category (no subcategory tier).
// (Moved out of App.tsx so the product catalogue isn't in the entry chunk.)
export default function CategoryOrDirectProductWrapper() {
  const { categoryId, subcategoryId } = useParams<{
    categoryId: string;
    subcategoryId: string;
  }>();
  if (categoryId && subcategoryId) {
    const direct = findCategoryDirectProduct(categoryId, subcategoryId);
    if (direct) {
      return <ProductPage />;
    }
  }
  return <CategoryPage />;
}
