import type { InvoiceItem, InvoiceStatus, PayInvoiceInput } from '@/modules/invoices/types';

export type SupplierInvoiceDtoStatus = 'PENDING' | 'PARTIAL' | 'PAID';
export type PaymentMethodDto = 'CASH' | 'CARD' | 'BIZUM' | 'BANK_TRANSFER' | 'OTHER';

export interface SupplierInvoiceDto {
  id: string;
  supplierId: string;
  invoiceNumber: string | null;
  invoiceDate: string;
  dueDate: string | null;
  totalAmountCents: number;
  paidAmountCents: number;
  status: SupplierInvoiceDtoStatus;
  notes: string | null;
  supplier: {
    id: string;
    name: string;
    active: boolean;
  };
}

export interface SupplierDebtSummaryDto {
  totalDebtCents: number;
  totalPendingCents: number;
  totalPartialCents: number;
  suppliers: Array<{
    supplierId: string;
    supplierName: string;
    debtCents: number;
  }>;
}

export interface PaySupplierInvoicePayload {
  amountCents: number;
  paymentMethod?: PaymentMethodDto;
  paidAt?: string;
  note?: string;
}

const euros = (cents: number) => cents / 100;

const formatDate = (date: string | null) => {
  if (!date) {
    return '-';
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
};

const isOverdue = (invoice: SupplierInvoiceDto) => {
  if (!invoice.dueDate || invoice.status === 'PAID') {
    return false;
  }

  return new Date(invoice.dueDate).getTime() < Date.now();
};

const mapStatus = (invoice: SupplierInvoiceDto): InvoiceStatus => {
  if (isOverdue(invoice)) {
    return 'overdue';
  }

  switch (invoice.status) {
    case 'PAID':
      return 'paid';
    case 'PARTIAL':
      return 'partial';
    case 'PENDING':
    default:
      return 'pending';
  }
};

export const mapSupplierInvoiceToInvoiceItem = (invoice: SupplierInvoiceDto): InvoiceItem => ({
  id: invoice.id,
  invoiceNumber: invoice.invoiceNumber || invoice.id,
  supplier: invoice.supplier.name,
  issuedDate: formatDate(invoice.invoiceDate),
  dueDate: formatDate(invoice.dueDate),
  totalAmount: euros(invoice.totalAmountCents),
  paidAmount: euros(invoice.paidAmountCents),
  pendingAmount: euros(invoice.totalAmountCents - invoice.paidAmountCents),
  status: mapStatus(invoice),
});

export const mapPayInvoiceInputToPayload = (input: PayInvoiceInput): PaySupplierInvoicePayload => ({
  amountCents: Math.round(input.amount * 100),
  paymentMethod: input.paymentMethod,
  note: input.note?.trim() || undefined,
});

