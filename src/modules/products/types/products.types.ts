export type ProductStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Product {
  id: string;
  name: string;
  size: string;
  category: string;
  supplier: string;
  stockCases: number;
  stockUnits: number;
  status: ProductStatus;
  suggestedOrderCases: number | null;
}

export interface ProductFilters {
  search: string;
  supplier: string;
  category: string;
}

export interface ProductsData {
  products: Product[];
  suppliers: string[];
  categories: string[];
}

export interface CreateProductInput {
  name: string;
  size: string;
  category: string;
  supplier: string;
  unitsPerCase: number;
  stockCases: number;
  minimumStock: number;
  targetStock: number;
  costPrice: number;
  salePrice: number;
  isActive: boolean;
  notes: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
