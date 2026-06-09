import { useMemo, useState } from 'react';
import { filterProducts } from '@/modules/products/lib';
import type { Product, ProductFilters } from '@/modules/products/types';

const initialFilters: ProductFilters = {
  search: '',
  supplier: 'Todos',
  category: 'Todas',
};

export interface UseProductsFiltersResult {
  filters: ProductFilters;
  filteredProducts: Product[];
  setSearch: (value: string) => void;
  setSupplier: (value: string) => void;
  setCategory: (value: string) => void;
}

export const useProductsFilters = (products: Product[]): UseProductsFiltersResult => {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const filteredProducts = useMemo(() => {
    if (!products.length) {
      return [];
    }

    return filterProducts(products, filters);
  }, [filters, products]);

  return {
    filters,
    filteredProducts,
    setSearch: value => setFilters(current => ({ ...current, search: value })),
    setSupplier: value => setFilters(current => ({ ...current, supplier: value })),
    setCategory: value => setFilters(current => ({ ...current, category: value })),
  };
};
