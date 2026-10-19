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
