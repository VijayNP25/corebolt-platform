import { Link } from "@/lib/wouter-compat";
import { ArrowRight } from "lucide-react";
import CdnImage from "@/components/cdn-image";
import { locateProduct, buildProductPath } from "@/lib/subcategory-products";
import { blogRelatedProductIds } from "@/data/blog-related-products";

interface BlogRelatedProductsProps {
  slug: string;
}

const DESCRIPTION_TRUNCATE_LENGTH = 110;

function truncateDescription(text: string | null): string {
  if (!text) return "";
  if (text.length <= DESCRIPTION_TRUNCATE_LENGTH) return text;
  const truncated = text.slice(0, DESCRIPTION_TRUNCATE_LENGTH);
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  const cut =
    lastSpaceIndex > DESCRIPTION_TRUNCATE_LENGTH - 30
      ? truncated.slice(0, lastSpaceIndex)
      : truncated.trim();
  return cut + "...";
}

/**
 * "Featured Products" section shown near the end of a blog post. Renders a
 * 2-per-row grid of the products referenced in blog-related-products.ts; if
 * the count is odd, the last card is centered on its own row instead of
 * stretching full-width. Renders nothing when the post has no mapped
 * products (see blog-related-products.ts for why some posts are omitted).
 */
export default function BlogRelatedProducts({ slug }: BlogRelatedProductsProps) {
  const ids = blogRelatedProductIds[slug];
  if (!ids || ids.length === 0) return null;

  const items = ids
    .map((id) => locateProduct(id))
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) return null;

  const isOdd = items.length % 2 === 1;

  return (
    <div className="replica-related-products">
      <p className="replica-related-products-eyebrow">Featured Products</p>
      <div className="replica-related-products-grid">
        {items.map(({ category, product }, index) => {
          const isCentered = isOdd && index === items.length - 1;
          return (
            <Link
              key={product.id}
              href={buildProductPath(product)}
              className={
                "replica-related-product-card" +
                (isCentered ? " replica-related-product-card--centered" : "")
              }
            >
              <div className="replica-related-product-img">
                <CdnImage src={product.image} alt={product.name} loading="lazy" />
              </div>
              <div className="replica-related-product-body">
                <span className="replica-blog-tag">{category.name}</span>
                <h4>{product.name}</h4>
                {product.description && (
                  <p className="replica-related-product-desc">
                    {truncateDescription(product.description)}
                  </p>
                )}
                <div className="replica-related-product-footer">
                  <span className="replica-related-product-price">
                    {product.price
                      ? `₹${product.price.toLocaleString("en-IN")}`
                      : "Get Quote"}
                  </span>
                  <span className="replica-related-product-link">
                    View <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
