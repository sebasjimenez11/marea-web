import { api } from '@/app/api';
import {
  mapCatalogSupplierToSupplier,
  mapCreateSupplierInputToCatalogPayload,
  type CatalogSupplierDto,
} from '@/modules/suppliers/services/suppliers.mappers';
import type { ApiResponse, CreateSupplierInput, Supplier, SuppliersData } from '@/modules/suppliers/types';

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

export const getSuppliersData = async (
  signal?: AbortSignal,
): Promise<ApiResponse<SuppliersData>> => {
  const response = await api.get<ApiListPayload<CatalogSupplierDto>>(
    '/catalog/suppliers',
    { limit: 100 },
    { signal },
  );

  if (!response.success || !response.data) {
    return {
      success: false,
      error: response.error || {
        code: 'SUPPLIERS_ERROR',
        message: 'No se pudieron cargar los proveedores',
      },
    };
  }

  return createSuccessResponse({
    suppliers: response.data.data.map(mapCatalogSupplierToSupplier),
  });
};

export const createSupplier = async (
  supplierInput: CreateSupplierInput,
  signal?: AbortSignal,
): Promise<ApiResponse<Supplier>> => {
  const response = await api.post<
    ApiDataPayload<CatalogSupplierDto>,
    ReturnType<typeof mapCreateSupplierInputToCatalogPayload>
  >(
    '/catalog/suppliers',
    mapCreateSupplierInputToCatalogPayload(supplierInput),
    { signal },
  );

  if (!response.success || !response.data?.data) {
    return {
      success: false,
      error: response.error || {
        code: 'CREATE_SUPPLIER_ERROR',
        message: 'No se pudo crear el proveedor',
      },
    };
  }

  return createSuccessResponse(mapCatalogSupplierToSupplier(response.data.data));
};
