import { useQuery } from '@tanstack/react-query';
import { getSuppliers } from '../api';

export function useSuppliers() {
  return useQuery({ queryKey: ['suppliers'], queryFn: getSuppliers });
}
