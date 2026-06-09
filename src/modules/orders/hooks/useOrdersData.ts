import { useAsyncResource, type UseAsyncResourceResult } from '@/app/hooks';
import { getOrdersData } from '@/modules/orders/services';
import type { OrdersData } from '@/modules/orders/types';

export const useOrdersData = (): UseAsyncResourceResult<OrdersData> =>
  useAsyncResource(getOrdersData);
