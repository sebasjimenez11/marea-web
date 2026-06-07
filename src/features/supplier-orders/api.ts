import { apiClient } from '../../lib/api-client';
import { SupplierOrder } from './types';

export function getSupplierOrders() {
  return apiClient<{ data: SupplierOrder[]; meta: { total: number } }>(
    '/supplier-orders',
  );
}
