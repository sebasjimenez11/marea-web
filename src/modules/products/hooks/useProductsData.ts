import { useAsyncResource, type UseAsyncResourceResult } from '@/app/hooks';
import { getProductsData } from '@/modules/products/services';
import type { ProductsData } from '@/modules/products/types';

export const useProductsData = (): UseAsyncResourceResult<ProductsData> =>
  useAsyncResource(getProductsData);
