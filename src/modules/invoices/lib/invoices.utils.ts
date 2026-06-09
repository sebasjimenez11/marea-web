import type {
  InvoiceFilters,
  InvoiceItem,
  InvoicesSummary,
  InvoiceStatus,
} from '@/modules/invoices/types';

export const formatInvoiceCurrency = (value: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(value);

export const getInvoiceStatusLabel = (status: InvoiceStatus) => {
  switch (status) {
    case 'pending':
      return 'Pendiente';
    case 'paid':
      return 'Pagado';
    case 'overdue':
      return 'Vencido';
    default:
      return status;
  }
};

export const getInvoiceStatusVariant = (status: InvoiceStatus) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'paid':
      return 'info';
    case 'overdue':
      return 'error';
    default:
      return 'default';
  }
};

export const getInvoicesSummary = (invoices: InvoiceItem[]): InvoicesSummary => ({
  pendingAmount: invoices
    .filter(invoice => invoice.status !== 'paid')
    .reduce((total, invoice) => total + invoice.totalAmount, 0),
  currentMonthAmount: invoices.reduce((total, invoice) => total + invoice.totalAmount, 0) * 2.29,
  incomingInvoicesCount: 14,
});

export const filterInvoices = (invoices: InvoiceItem[], filters: InvoiceFilters) => {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return invoices.filter(invoice => {
    const matchesSearch =
      !normalizedSearch ||
      `${invoice.invoiceNumber} ${invoice.supplier}`.toLowerCase().includes(normalizedSearch);

    const matchesStatus =
      filters.status === 'all' || invoice.status === filters.status;

    return matchesSearch && matchesStatus;
  });
};
