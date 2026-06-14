import { api } from '@/app/api';
import {
  mapDashboardSummaryToData,
  type DashboardSummaryDto,
} from '@/modules/dashboard/services/dashboard.mappers';
import type { ApiResponse, DashboardData } from '@/modules/dashboard/types';

interface ApiDataPayload<T> {
  data: T;
}

const createSuccessResponse = <T,>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

export const getDashboardData = async (
  signal?: AbortSignal,
): Promise<ApiResponse<DashboardData>> => {
  const response = await api.get<ApiDataPayload<DashboardSummaryDto>>(
    '/dashboard',
    undefined,
    { signal },
  );

  if (!response.success || !response.data?.data) {
    return {
      success: false,
      error: response.error || {
        code: 'DASHBOARD_ERROR',
        message: 'No se pudo cargar el dashboard',
      },
    };
  }

  return createSuccessResponse(mapDashboardSummaryToData(response.data.data));
};
