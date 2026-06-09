import type { CreateProductInput, Product, ProductFilters, ProductStatus } from '@/modules/products/types';

export const createInitialProductForm = (
  suppliers: string[],
  categories: string[],
): CreateProductInput => ({
  name: '',
  size: '',
  category: categories[0] ?? '',
  supplier: suppliers[0] ?? '',
  unitsPerCase: 24,
  stockCases: 0,
  minimumStock: 5,
  targetStock: 20,
  costPrice: 0,
  salePrice: 0,
  isActive: true,
  notes: '',
});

export const resolveProductStatus = (productInput: CreateProductInput): ProductStatus => {
  if (productInput.stockCases <= 0) {
    return 'out-of-stock';
  }

  if (productInput.stockCases <= productInput.minimumStock) {
    return 'low-stock';
  }

  return 'in-stock';
};

export const createProductFromInput = (productInput: CreateProductInput): Product => ({
  id: `prod-${crypto.randomUUID()}`,
  name: productInput.name,
  size: productInput.size,
  category: productInput.category,
  supplier: productInput.supplier,
  stockCases: productInput.stockCases,
  stockUnits: 0,
  status: resolveProductStatus(productInput),
  suggestedOrderCases:
    productInput.stockCases < productInput.targetStock
      ? productInput.targetStock - productInput.stockCases
      : null,
});

export const getProductStatusLabel = (status: ProductStatus) => {
  switch (status) {
    case 'in-stock':
      return 'En Stock';
    case 'low-stock':
      return 'Bajo Stock';
    case 'out-of-stock':
      return 'Sin Stock';
    default:
      return status;
  }
};

export const getProductStatusVariant = (status: ProductStatus) => {
  switch (status) {
    case 'in-stock':
      return 'success';
    case 'low-stock':
      return 'warning';
    case 'out-of-stock':
      return 'error';
    default:
      return 'default';
  }
};

export const formatProductStock = (product: Product) =>
  `${product.stockCases} cajas${product.stockUnits ? ` + ${product.stockUnits} uds` : ' + 0 uds'}`;

export const formatSuggestedOrder = (cases: number | null) =>
  cases === null ? '-' : `${cases} cajas`;

export const filterProducts = (products: Product[], filters: ProductFilters) => {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return products.filter(product => {
    const matchesSearch =
      !normalizedSearch ||
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.size.toLowerCase().includes(normalizedSearch);

    const matchesSupplier =
      filters.supplier === 'Todos' || product.supplier === filters.supplier;

    const matchesCategory =
      filters.category === 'Todas' || product.category === filters.category;

    return matchesSearch && matchesSupplier && matchesCategory;
  });
};
