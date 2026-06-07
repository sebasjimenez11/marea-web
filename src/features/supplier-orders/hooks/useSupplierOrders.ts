import { useQuery } from '@tanstack/react-query';
import { getSupplierOrders } from '../api';

export function useSupplierOrders() {
  return useQuery({
    queryKey: ['supplier-orders'],
    queryFn: getSupplierOrders,
  });
}
