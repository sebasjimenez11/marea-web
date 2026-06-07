import { useQuery } from '@tanstack/react-query';
import { getSupplierInvoices } from '../api';

export function useSupplierInvoices() {
  return useQuery({
    queryKey: ['supplier-invoices'],
    queryFn: getSupplierInvoices,
  });
}
