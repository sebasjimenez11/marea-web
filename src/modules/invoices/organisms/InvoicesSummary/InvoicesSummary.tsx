import { formatInvoiceCurrency } from '@/modules/invoices/lib';
import { InvoicesSummaryCard } from '@/modules/invoices/molecules';
import type { InvoicesSummary as InvoicesSummaryType } from '@/modules/invoices/types';

export interface InvoicesSummaryProps {
  summary: InvoicesSummaryType;
}

const InvoicesSummary = ({ summary }: InvoicesSummaryProps) => (
  <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
    <InvoicesSummaryCard
      label="Pendientes de pago"
      value={formatInvoiceCurrency(summary.pendingAmount)}
      detail="Requiere atención"
      detailToneClassName="text-[#f0b0a2]"
    />
    <InvoicesSummaryCard
      label="Total mes actual"
      value={formatInvoiceCurrency(summary.currentMonthAmount)}
      detail="+ 3.2x vs mes anterior"
      detailToneClassName="text-[#8fb7ff]"
    />
    <InvoicesSummaryCard
      label="Facturas por recibir"
      value={String(summary.incomingInvoicesCount)}
      detail="Pedidos entregados"
      detailToneClassName="text-[#ffc369]"
    />
  </div>
);

export default InvoicesSummary;
