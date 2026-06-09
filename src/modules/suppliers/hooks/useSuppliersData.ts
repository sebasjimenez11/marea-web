import { useAsyncResource, type UseAsyncResourceResult } from '@/app/hooks';
import { getSuppliersData } from '@/modules/suppliers/services';
import type { SuppliersData } from '@/modules/suppliers/types';

export const useSuppliersData = (): UseAsyncResourceResult<SuppliersData> =>
  useAsyncResource(getSuppliersData);
