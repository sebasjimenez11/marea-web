import { useAsyncResource, type UseAsyncResourceResult } from '@/app/hooks';
import { getInventoryData } from '@/modules/inventory/services';
import type { InventoryData } from '@/modules/inventory/types';

export const useInventoryData = (): UseAsyncResourceResult<InventoryData> =>
  useAsyncResource(getInventoryData);
