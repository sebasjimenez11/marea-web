import { useMemo } from 'react';
import type { Product } from '@/modules/products/types';

export interface UseProductsCatalogResult {
  products: Product[];
  suppliers: string[];
  categories: string[];
}

export const useProductsCatalog = (
  baseProducts: Product[] = [],
  baseSuppliers: string[] = [],
  baseCategories: string[] = [],
): UseProductsCatalogResult => {
  const suppliers = useMemo(
    () => baseSuppliers.length ? baseSuppliers : ['Todos'],
    [baseSuppliers],
  );

  const categories = useMemo(
    () => baseCategories.length ? baseCategories : ['Todas'],
    [baseCategories],
  );

  return {
    products: baseProducts,
    suppliers,
    categories,
  };
};
