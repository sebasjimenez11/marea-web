import { apiClient } from '../../lib/api-client';
import { CashMovement, DailyCashClosure } from './types';

export function getCashMovements() {
  return apiClient<{ data: CashMovement[]; meta: { total: number } }>(
    '/cash-movements',
  );
}

export function getTodayCashClosure() {
  return apiClient<{ data: DailyCashClosure }>('/daily-cash-closures/today');
}
