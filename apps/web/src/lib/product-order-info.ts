import { Product, ProductFeatureTable } from "@/data/products";

export interface OrderInformationOption {
  systemCore: string;
  modelNumber: string;
}

function isOrderInformationTableTitle(title: string): boolean {
  const normalized = title.toUpperCase();
  return (
    normalized.includes("ORDER INFORMATION") ||
    normalized.includes("ORDERING INFORMATION")
  );
}

function optionsFromFeatureTable(
  table: ProductFeatureTable
): OrderInformationOption[] {
  return table.rows
    .filter((row) => !row.sectionHeader && row.value?.trim())
    .map((row) => ({
      systemCore: row.parameter.trim(),
      modelNumber: row.value!.trim(),
    }));
}

export function getOrderInformationOptions(
  product: Pick<Product, "featureTables">
): OrderInformationOption[] {
  const table = product.featureTables?.find((featureTable) =>
    isOrderInformationTableTitle(featureTable.title)
  );

  if (!table) {
    return [];
  }

  return optionsFromFeatureTable(table);
}

export function formatOrderInformationSelection(
  modelNumber: string,
  options: OrderInformationOption[]
): string {
  const match = options.find((option) => option.modelNumber === modelNumber);
  if (!match) {
    return modelNumber;
  }
  return `${match.systemCore} (${match.modelNumber})`;
}

export function isOrderInformationTable(table: Pick<ProductFeatureTable, "title">) {
  return isOrderInformationTableTitle(table.title);
}

/** Reads a stated minimum quantity from the product copy, for example "MOQ 100". */
export function findMinimumOrder(product: {
  description?: string | null;
  overview?: string;
  metaDescription?: string;
}): number | null {
  const text = [product.description, product.overview, product.metaDescription]
    .filter(Boolean)
    .join(" ");
  const match = text.match(/MOQ\s+(\d+)/i);
  if (!match) return null;
  const quantity = Number(match[1]);
  return Number.isFinite(quantity) && quantity > 1 ? quantity : null;
}
