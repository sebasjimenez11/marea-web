import { useQuery } from '@tanstack/react-query';
import { getInventoryItems } from '../api';

export function useInventoryItems() {
  return useQuery({
    queryKey: ['inventory-items'],
    queryFn: getInventoryItems,
  });
}
