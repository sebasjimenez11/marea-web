import { useQuery } from '@tanstack/react-query';
import { getInventoryMovements } from '../api';

export function useInventoryMovements() {
  return useQuery({
    queryKey: ['inventory-movements'],
    queryFn: getInventoryMovements,
  });
}
