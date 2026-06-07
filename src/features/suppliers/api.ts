import { apiClient } from '../../lib/api-client';
import { Supplier } from './types';

export function getSuppliers() {
  return apiClient<{ data: Supplier[]; meta: { total: number } }>('/suppliers');
}
