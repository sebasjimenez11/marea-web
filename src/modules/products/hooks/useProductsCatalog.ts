import { useMemo, useState } from 'react';
import { createProductFromInput } from '@/modules/products/lib';
import type { CreateProductInput, Product } from '@/modules/products/types';

export interface UseProductsCatalogResult {
  products: Product[];
  suppliers: string[];
  categories: string[];
  handleCreateProduct: (productInput: CreateProductInput) => void;
}

export const useProductsCatalog = (baseProducts: Product[] = []): UseProductsCatalogResult => {
  const [createdProducts, setCreatedProducts] = useState<Product[]>([]);

  const products = useMemo(
    () => [...createdProducts, ...baseProducts],
    [baseProducts, createdProducts],
  );

  const suppliers = useMemo(
    () => ['Todos', ...new Set(products.map(product => product.supplier))],
    [products],
  );

  const categories = useMemo(
    () => ['Todas', ...new Set(products.map(product => product.category))],
    [products],
  );

  const handleCreateProduct = (productInput: CreateProductInput) => {
    const nextProduct = createProductFromInput(productInput);
    setCreatedProducts(current => [nextProduct, ...current]);
  };

  return {
    products,
    suppliers,
    categories,
    handleCreateProduct,
  };
};
