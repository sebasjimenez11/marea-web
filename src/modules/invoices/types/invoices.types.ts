export type InvoiceStatus = 'pending' | 'partial' | 'paid' | 'overdue';
export type InvoicePaymentMethod = 'CASH' | 'CARD' | 'BIZUM' | 'BANK_TRANSFER' | 'OTHER';

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  supplier: string;
  issuedDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  status: InvoiceStatus;
}

export interface InvoicesData {
  invoices: InvoiceItem[];
  summary: InvoicesSummary;
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

export interface PayInvoiceInput {
  invoiceId: string;
  amount: number;
  paymentMethod?: InvoicePaymentMethod;
  note?: string;
}

export type { ApiResponse } from '@/app/api';
