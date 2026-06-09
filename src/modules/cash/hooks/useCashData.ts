import { useAsyncResource, type UseAsyncResourceResult } from '@/app/hooks';
import { getCashData } from '@/modules/cash/services';
import type { CashData } from '@/modules/cash/types';

export const useCashData = (): UseAsyncResourceResult<CashData> =>
  useAsyncResource(getCashData);
