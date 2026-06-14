import { api } from '@/app/api';
import {
  mapSuggestedGroupToCreateOrderPayload,
  mapSuggestedSupplierOrderToGroup,
  type CreateSupplierOrderPayload,
  type SupplierOrderDto,
  type SuggestedSupplierOrdersDto,
} from '@/modules/orders/services/orders.mappers';
import type { ApiResponse, OrdersData, SupplierOrderGroup } from '@/modules/orders/types';

interface ApiDataPayload<T> {
  data: T;
}

const createSuccessResponse = <T,>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

export const getOrdersData = async (
  signal?: AbortSignal,
): Promise<ApiResponse<OrdersData>> => {
  const response = await api.get<ApiDataPayload<SuggestedSupplierOrdersDto[]>>(
    '/purchasing/orders/suggested',
    undefined,
    { signal },
  );

  if (!response.success || !response.data?.data) {
    return {
      success: false,
      error: response.error || {
        code: 'ORDERS_ERROR',
        message: 'No se pudieron cargar los pedidos sugeridos',
      },
    };
  }

  return createSuccessResponse({
    suppliers: response.data.data.map(mapSuggestedSupplierOrderToGroup),
  });
};

export const createSupplierOrderFromSuggestion = async (
  group: SupplierOrderGroup,
  signal?: AbortSignal,
): Promise<ApiResponse<SupplierOrderDto>> => {
  const payload = mapSuggestedGroupToCreateOrderPayload(group);

  if (!payload) {
    return {
      success: false,
      error: {
        code: 'SUPPLIER_REQUIRED',
        message: 'Asigna proveedor a estos productos para generar un pedido.',
      },
    };
  }

  const response = await api.post<ApiDataPayload<SupplierOrderDto>, CreateSupplierOrderPayload>(
    '/purchasing/orders',
    payload,
    { signal },
  );

  if (!response.success || !response.data?.data) {
    return {
      success: false,
      error: response.error || {
        code: 'CREATE_ORDER_ERROR',
        message: 'No se pudo generar el pedido',
      },
    };
  }

  return createSuccessResponse(response.data.data);
};

export const receiveSupplierOrder = async (
  orderId: string,
  signal?: AbortSignal,
): Promise<ApiResponse<SupplierOrderDto>> => {
  const response = await api.post<ApiDataPayload<SupplierOrderDto>>(
    `/purchasing/orders/${orderId}/receive`,
    undefined,
    { signal },
  );

  if (!response.success || !response.data?.data) {
    return {
      success: false,
      error: response.error || {
        code: 'RECEIVE_ORDER_ERROR',
        message: 'No se pudo recibir el pedido',
      },
    };
  }

  return createSuccessResponse(response.data.data);
};

export const cancelSupplierOrder = async (
  orderId: string,
  signal?: AbortSignal,
): Promise<ApiResponse<SupplierOrderDto>> => {
  const response = await api.post<ApiDataPayload<SupplierOrderDto>>(
    `/purchasing/orders/${orderId}/cancel`,
    undefined,
    { signal },
  );

  if (!response.success || !response.data?.data) {
    return {
      success: false,
      error: response.error || {
        code: 'CANCEL_ORDER_ERROR',
        message: 'No se pudo cancelar el pedido',
      },
    };
  }

  return createSuccessResponse(response.data.data);
};
