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

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
