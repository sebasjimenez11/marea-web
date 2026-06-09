import type { ApiResponse, Product, ProductsData } from '@/modules/products/types';

const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Heineken',
    size: '33cl',
    category: 'Cerveza',
    supplier: 'Distribuciones Sur',
    stockCases: 10,
    stockUnits: 5,
    status: 'in-stock',
    suggestedOrderCases: null,
  },
  {
    id: 'prod-2',
    name: 'Coca-Cola',
    size: '33cl',
    category: 'Refresco',
    supplier: 'Bebidas Premium',
    stockCases: 2,
    stockUnits: 0,
    status: 'low-stock',
    suggestedOrderCases: 5,
  },
  {
    id: 'prod-3',
    name: 'Zumo Piña',
    size: '1L',
    category: 'Zumo',
    supplier: 'Frutas y Zumos Local',
    stockCases: 0,
    stockUnits: 0,
    status: 'out-of-stock',
    suggestedOrderCases: 3,
  },
  {
    id: 'prod-4',
    name: 'Estrella Galicia',
    size: '25cl',
    category: 'Cerveza',
    supplier: 'Distribuciones Sur',
    stockCases: 14,
    stockUnits: 8,
    status: 'in-stock',
    suggestedOrderCases: null,
  },
  {
    id: 'prod-5',
    name: 'Agua Mineral',
    size: '50cl',
    category: 'Agua',
    supplier: 'Bebidas Premium',
    stockCases: 4,
    stockUnits: 6,
    status: 'low-stock',
    suggestedOrderCases: 2,
  },
];

const createSuccessResponse = <T,>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProductsData = async (): Promise<ApiResponse<ProductsData>> => {
  await delay(250);

  return createSuccessResponse({
    products,
    suppliers: ['Todos', ...new Set(products.map(product => product.supplier))],
    categories: ['Todas', ...new Set(products.map(product => product.category))],
  });
};
