import { useAsyncResource, type UseAsyncResourceResult } from '@/app/hooks';
import { getDashboardData } from '@/modules/dashboard/services';
import type { DashboardData } from '@/modules/dashboard/types';

export const useDashboardData = (): UseAsyncResourceResult<DashboardData> =>
  useAsyncResource(getDashboardData);
