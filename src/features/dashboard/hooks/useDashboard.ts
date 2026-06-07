import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '../api';

export function useDashboard(period = 'today') {
  return useQuery({
    queryKey: ['dashboard', period],
    queryFn: () => getDashboard(period),
  });
}
