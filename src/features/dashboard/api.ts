import { apiClient } from '../../lib/api-client';
import { DashboardSummary } from './types';

export function getDashboard(period = 'today') {
  return apiClient<{ data: DashboardSummary }>(`/dashboard?period=${period}`);
}
