import { apiClient } from '../../lib/api-client';
import { InventoryMovement } from './types';

export function getInventoryMovements() {
  return apiClient<{ data: InventoryMovement[]; meta: { total: number } }>(
    '/inventory-movements',
  );
}
