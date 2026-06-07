import { useQuery } from '@tanstack/react-query';
import { getCashMovements } from '../api';

export function useCashMovements() {
  return useQuery({
    queryKey: ['cash-movements'],
    queryFn: getCashMovements,
  });
}
