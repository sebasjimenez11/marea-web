import type { CreateProductInput, Product, ProductStatus } from '@/modules/products/types';

export interface CatalogItemDto {
  id: string;
  name: string;
  sku: string | null;
  category: string | null;
  description: string | null;
  unit: string;
  unitsPerPackage: number;
  currentUnits: number;
  minimumUnits: number;
  targetUnits: number;
  costPriceCents: number | null;
  salePriceCents: number | null;
  active: boolean;
}

export interface CreateCatalogItemPayload {
  name: string;
  category?: string;
  description?: string;
  unit?: string;
  unitsPerPackage: number;
  currentUnits: number;
  minimumUnits: number;
  targetUnits: number;
  costPriceCents?: number;
  salePriceCents?: number;
  active: boolean;
}

const resolveStatus = (item: CatalogItemDto): ProductStatus => {
  if (item.currentUnits <= 0) {
    return 'out-of-stock';
  }

  if (item.minimumUnits > 0 && item.currentUnits <= item.minimumUnits) {
    return 'low-stock';
  }

  return 'in-stock';
};

const toCents = (amount: number) => Math.round(amount * 100);

export const mapCatalogItemToProduct = (item: CatalogItemDto): Product => {
  const unitsPerPackage = Math.max(item.unitsPerPackage, 1);
  const missingUnits = Math.max(item.targetUnits - item.currentUnits, 0);

  return {
    id: item.id,
    name: item.name,
    size: item.unit || 'unit',
    category: item.category || 'Sin categoria',
    supplier: 'Sin proveedor',
    stockCases: Math.floor(item.currentUnits / unitsPerPackage),
    stockUnits: item.currentUnits % unitsPerPackage,
    status: resolveStatus(item),
    suggestedOrderCases: missingUnits > 0 ? Math.ceil(missingUnits / unitsPerPackage) : null,
  };
};

export const mapCreateProductInputToCatalogPayload = (
  input: CreateProductInput,
): CreateCatalogItemPayload => {
  const unitsPerPackage = Math.max(input.unitsPerCase, 1);

  return {
    name: input.name,
    category: input.category || undefined,
    description: input.notes || undefined,
    unit: input.size || 'unit',
    unitsPerPackage,
    currentUnits: input.stockCases * unitsPerPackage,
    minimumUnits: input.minimumStock * unitsPerPackage,
    targetUnits: input.targetStock * unitsPerPackage,
    costPriceCents: input.costPrice > 0 ? toCents(input.costPrice) : undefined,
    salePriceCents: input.salePrice > 0 ? toCents(input.salePrice) : undefined,
    active: input.isActive,
  };
};

