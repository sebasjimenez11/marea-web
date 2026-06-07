import { apiClient } from '../../lib/api-client';
import { InventoryItem } from './types';

export function getInventoryItems() {
  return apiClient<{ data: InventoryItem[]; meta: { total: number } }>(
    '/inventory-items',
  );
}
