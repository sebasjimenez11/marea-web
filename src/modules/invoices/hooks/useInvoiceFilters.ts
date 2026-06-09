import { useMemo, useState } from 'react';
import { filterInvoices } from '@/modules/invoices/lib';
import type { InvoiceFilters, InvoiceItem, InvoiceStatus } from '@/modules/invoices/types';

const initialFilters: InvoiceFilters = {
  search: '',
  status: 'all',
};

export interface UseInvoiceFiltersResult {
  filters: InvoiceFilters;
  filteredInvoices: InvoiceItem[];
  setSearch: (value: string) => void;
  setStatus: (value: 'all' | InvoiceStatus) => void;
}

export const useInvoiceFilters = (invoices: InvoiceItem[]): UseInvoiceFiltersResult => {
  const [filters, setFilters] = useState<InvoiceFilters>(initialFilters);

  const filteredInvoices = useMemo(() => filterInvoices(invoices, filters), [filters, invoices]);

  return {
    filters,
    filteredInvoices,
    setSearch: value => setFilters(current => ({ ...current, search: value })),
    setStatus: value => setFilters(current => ({ ...current, status: value })),
  };
};
