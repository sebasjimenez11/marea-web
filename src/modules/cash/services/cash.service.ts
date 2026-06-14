import { api } from '@/app/api';
import {
  getTodayBusinessDate,
  mapCashClosureToHistoryItem,
  mapCashData,
  mapCloseCashInputToPayload,
  type CashClosureDto,
  type CashMovementDto,
  type UpsertCashClosurePayload,
} from '@/modules/cash/services/cash.mappers';
import type { ApiResponse, CashClosureHistoryItem, CashData, CloseCashInput } from '@/modules/cash/types';

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
    code: 'CASH_ERROR',
    message,
  },
});

export const getCashData = async (
  signal?: AbortSignal,
): Promise<ApiResponse<CashData>> => {
  const today = getTodayBusinessDate();
  const [movementsResponse, closuresResponse, todayClosureResponse] = await Promise.all([
    api.get<ApiListPayload<CashMovementDto>>('/cash/movements', { businessDate: today, limit: 100 }, { signal }),
    api.get<ApiListPayload<CashClosureDto>>('/cash/closures', { limit: 10 }, { signal }),
    api.get<ApiDataPayload<CashClosureDto>>('/cash/closures/today', undefined, { signal }),
  ]);

  if (!movementsResponse.success || !movementsResponse.data) {
    return createErrorResponse(
      movementsResponse.error?.message || 'No se pudieron cargar los movimientos de caja',
    );
  }

  if (!closuresResponse.success || !closuresResponse.data) {
    return createErrorResponse(
      closuresResponse.error?.message || 'No se pudo cargar el historial de cierres',
    );
  }

  return createSuccessResponse(
    mapCashData({
      todayClosure: todayClosureResponse.success ? todayClosureResponse.data?.data ?? null : null,
      movements: movementsResponse.data.data,
      recentClosures: closuresResponse.data.data,
    }),
  );
};

export const closeCash = async (
  input: CloseCashInput,
  signal?: AbortSignal,
): Promise<ApiResponse<CashClosureHistoryItem>> => {
  const response = await api.post<ApiDataPayload<CashClosureDto>, UpsertCashClosurePayload>(
    '/cash/closures',
    mapCloseCashInputToPayload(input),
    { signal },
  );

  if (!response.success || !response.data?.data) {
    return {
      success: false,
      error: response.error || {
        code: 'CLOSE_CASH_ERROR',
        message: 'No se pudo guardar el cierre de caja',
      },
    };
  }

  return createSuccessResponse(mapCashClosureToHistoryItem(response.data.data));
};
