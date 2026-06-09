import { useAsyncResource, type UseAsyncResourceResult } from '@/app/hooks';
import { getInvoicesData } from '@/modules/invoices/services';
import type { InvoicesData } from '@/modules/invoices/types';

export const useInvoicesData = (): UseAsyncResourceResult<InvoicesData> =>
  useAsyncResource(getInvoicesData);
