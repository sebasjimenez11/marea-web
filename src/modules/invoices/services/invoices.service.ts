import type { ApiResponse, InvoiceItem, InvoicesData } from '@/modules/invoices/types';

const invoices: InvoiceItem[] = [
  {
    id: 'invoice-1',
    invoiceNumber: 'FAC-2023-089',
    supplier: 'Distribuciones Sur',
    issuedDate: '12 Oct 2023',
    dueDate: '26 Oct 2023',
    totalAmount: 1250,
    status: 'pending',
  },
  {
    id: 'invoice-2',
    invoiceNumber: 'BPR-44502',
    supplier: 'Bebidas Premium',
    issuedDate: '05 Oct 2023',
    dueDate: '19 Oct 2023',
    totalAmount: 3400.75,
    status: 'paid',
  },
  {
    id: 'invoice-3',
    invoiceNumber: 'HL-9012',
    supplier: 'Hielos Locales',
    issuedDate: '20 Sep 2023',
    dueDate: '04 Oct 2023',
    totalAmount: 150,
    status: 'overdue',
  },
  {
    id: 'invoice-4',
    invoiceNumber: 'FAC-2023-117',
    supplier: 'Licores del Norte',
    issuedDate: '18 Oct 2023',
    dueDate: '31 Oct 2023',
    totalAmount: 820,
    status: 'pending',
  },
];

const createSuccessResponse = <T,>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getInvoicesData = async (): Promise<ApiResponse<InvoicesData>> => {
  await delay(200);

  return createSuccessResponse({ invoices });
};
