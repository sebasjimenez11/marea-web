export type SupplierInvoice = {
  id: string;
  supplierId: string;
  invoiceNumber?: string;
  invoiceDate: string;
  dueDate?: string;
  totalAmountCents: number;
  paidAmountCents: number;
  status: string;
};
