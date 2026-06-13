import { api } from '@/app/api';
import {
  mapCatalogItemToProduct,
  mapCreateProductInputToCatalogPayload,
  type CatalogItemDto,
} from '@/modules/products/services/products.mappers';
import type { ApiResponse, CreateProductInput, Product, ProductsData } from '@/modules/products/types';
import type { Supplier } from '@/modules/suppliers/types';

interface ApiListPayload<T> {
  data: T[];
  meta: {
    total: number;
    page?: number;
    limit?: number;
  };
}

interface ApiDataPayload<T> {
  data: T;
}

const createSuccessResponse = <T,>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

const createErrorResponse = <T,>(message: string): ApiResponse<T> => ({
  success: false,
  error: {
    code: 'CATALOG_ERROR',
    message,
  },
});

export const getProductsData = async (
  signal?: AbortSignal,
): Promise<ApiResponse<ProductsData>> => {
  const [itemsResponse, categoriesResponse, suppliersResponse] = await Promise.all([
    api.get<ApiListPayload<CatalogItemDto>>('/catalog/items', { active: true, limit: 100 }, { signal }),
    api.get<ApiDataPayload<string[]>>('/catalog/items/categories', undefined, { signal }),
    api.get<ApiListPayload<Supplier>>('/catalog/suppliers', { active: true, limit: 100 }, { signal }),
  ]);

  if (!itemsResponse.success || !itemsResponse.data) {
    return createErrorResponse(
      itemsResponse.error?.message || 'No se pudieron cargar los productos',
    );
  }

  if (!categoriesResponse.success || !categoriesResponse.data) {
    return createErrorResponse(
      categoriesResponse.error?.message || 'No se pudieron cargar las categorias',
    );
  }

  if (!suppliersResponse.success || !suppliersResponse.data) {
    return createErrorResponse(
      suppliersResponse.error?.message || 'No se pudieron cargar los proveedores',
    );
  }

  const products = itemsResponse.data.data.map(mapCatalogItemToProduct);
  const suppliers = suppliersResponse.data.data.map(supplier => supplier.name);

  return createSuccessResponse({
    products,
    suppliers: ['Todos', ...suppliers],
    categories: ['Todas', ...categoriesResponse.data.data],
  });
};

export const createProduct = async (
  productInput: CreateProductInput,
  signal?: AbortSignal,
): Promise<ApiResponse<Product>> => {
  const response = await api.post<
    ApiDataPayload<CatalogItemDto>,
    ReturnType<typeof mapCreateProductInputToCatalogPayload>
  >('/catalog/items', mapCreateProductInputToCatalogPayload(productInput), { signal });

  if (!response.success || !response.data?.data) {
    return {
      success: false,
      error: response.error || {
        code: 'CREATE_PRODUCT_ERROR',
        message: 'No se pudo crear el producto',
      },
    };
  }

  return createSuccessResponse(mapCatalogItemToProduct(response.data.data));
};
