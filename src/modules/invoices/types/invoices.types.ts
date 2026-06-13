export type InvoiceStatus = 'pending' | 'paid' | 'overdue';

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  supplier: string;
  issuedDate: string;
  dueDate: string;
  totalAmount: number;
  status: InvoiceStatus;
}

export interface InvoicesData {
  invoices: InvoiceItem[];
}

export interface InvoicesSummary {
  pendingAmount: number;
  currentMonthAmount: number;
  incomingInvoicesCount: number;
}

export interface InvoiceFilters {
  search: string;
  status: 'all' | InvoiceStatus;
}

export type { ApiResponse } from '@/app/api';
