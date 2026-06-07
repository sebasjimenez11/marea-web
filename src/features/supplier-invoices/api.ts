import { apiClient } from '../../lib/api-client';
import { SupplierInvoice } from './types';

export function getSupplierInvoices() {
  return apiClient<{ data: SupplierInvoice[]; meta: { total: number } }>(
    '/supplier-invoices',
  );
}
