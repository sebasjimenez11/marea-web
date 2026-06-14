import { api } from '@/app/api';
import {
  mapPayInvoiceInputToPayload,
  mapSupplierInvoiceToInvoiceItem,
  type PaySupplierInvoicePayload,
  type SupplierDebtSummaryDto,
  type SupplierInvoiceDto,
} from '@/modules/invoices/services/invoices.mappers';
import type { ApiResponse, InvoiceItem, InvoicesData, InvoicesSummary, PayInvoiceInput } from '@/modules/invoices/types';

interface ApiListPayload<T> {
  data: T[];
  meta: {
    total: number;
    page?: number;
    limit?: number;
  };
}

interface ApiDataPayload<T> {
  data: T;
}

const createSuccessResponse = <T,>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

const createErrorResponse = <T,>(message: string): ApiResponse<T> => ({
  success: false,
  error: {
    code: 'INVOICES_ERROR',
    message,
  },
});

const getCurrentMonthAmount = (invoices: SupplierInvoiceDto[]) => {
  const now = new Date();

  return invoices
    .filter(invoice => {
      const invoiceDate = new Date(invoice.invoiceDate);
      return invoiceDate.getMonth() === now.getMonth()
        && invoiceDate.getFullYear() === now.getFullYear();
    })
    .reduce((total, invoice) => total + invoice.totalAmountCents, 0) / 100;
};

export const getInvoicesData = async (
  signal?: AbortSignal,
): Promise<ApiResponse<InvoicesData>> => {
  const [invoicesResponse, debtResponse, overdueResponse] = await Promise.all([
    api.get<ApiListPayload<SupplierInvoiceDto>>('/purchasing/invoices', { limit: 100 }, { signal }),
    api.get<ApiDataPayload<SupplierDebtSummaryDto>>('/purchasing/invoices/debt-summary', undefined, { signal }),
    api.get<ApiDataPayload<SupplierInvoiceDto[]>>('/purchasing/invoices/overdue', undefined, { signal }),
  ]);

  if (!invoicesResponse.success || !invoicesResponse.data) {
    return createErrorResponse(
      invoicesResponse.error?.message || 'No se pudieron cargar las facturas',
    );
  }

  if (!debtResponse.success || !debtResponse.data?.data) {
    return createErrorResponse(
      debtResponse.error?.message || 'No se pudo cargar el resumen de deuda',
    );
  }

  if (!overdueResponse.success || !overdueResponse.data?.data) {
    return createErrorResponse(
      overdueResponse.error?.message || 'No se pudieron cargar las facturas vencidas',
    );
  }

  const invoices = invoicesResponse.data.data;
  const summary: InvoicesSummary = {
    pendingAmount: debtResponse.data.data.totalDebtCents / 100,
    currentMonthAmount: getCurrentMonthAmount(invoices),
    incomingInvoicesCount: overdueResponse.data.data.length,
  };

  return createSuccessResponse({
    invoices: invoices.map(mapSupplierInvoiceToInvoiceItem),
    summary,
  });
};

export const payInvoice = async (
  input: PayInvoiceInput,
  signal?: AbortSignal,
): Promise<ApiResponse<InvoiceItem>> => {
  const response = await api.post<ApiDataPayload<SupplierInvoiceDto>, PaySupplierInvoicePayload>(
    `/purchasing/invoices/${input.invoiceId}/pay`,
    mapPayInvoiceInputToPayload(input),
    { signal },
  );

  if (!response.success || !response.data?.data) {
    return {
      success: false,
      error: response.error || {
        code: 'PAY_INVOICE_ERROR',
        message: 'No se pudo registrar el pago',
      },
    };
  }

  return createSuccessResponse(mapSupplierInvoiceToInvoiceItem(response.data.data));
};
