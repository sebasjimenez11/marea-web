import { TableRowActionButton } from '@/components/common';
import { InvoiceStatusBadge } from '@/modules/invoices/atoms';
import { formatInvoiceCurrency } from '@/modules/invoices/lib';
import type { InvoiceItem } from '@/modules/invoices/types';

export interface InvoiceTableRowProps {
  invoice: InvoiceItem;
  onPay?: (invoice: InvoiceItem) => void;
}

const rowAccentClassName: Record<InvoiceItem['status'], string> = {
  pending: 'hover:bg-white/[0.02]',
  paid: 'hover:bg-sky-400/[0.03]',
  partial: 'hover:bg-sky-400/[0.03]',
  overdue: 'bg-[#241d33] hover:bg-[#2b2340]',
};

const InvoiceTableRow = ({ invoice, onPay }: InvoiceTableRowProps) => (
  <tr className={`border-t border-white/6 transition ${rowAccentClassName[invoice.status]}`}>
    <td className="px-4 py-4 text-sm font-medium text-white">{invoice.invoiceNumber}</td>
    <td className="px-4 py-4 text-sm text-text-primary">{invoice.supplier}</td>
    <td className="px-4 py-4 text-sm text-text-secondary">{invoice.issuedDate}</td>
    <td className="px-4 py-4 text-sm text-[#d8a38f]">{invoice.dueDate}</td>
    <td className="px-4 py-4 text-sm font-medium text-white">
      {formatInvoiceCurrency(invoice.totalAmount)}
      {invoice.status === 'partial' && (
        <div className="mt-1 text-xs font-normal text-text-secondary">
          Pendiente {formatInvoiceCurrency(invoice.pendingAmount)}
        </div>
      )}
    </td>
    <td className="px-4 py-4 text-sm">
      <InvoiceStatusBadge status={invoice.status} />
    </td>
    <td className="px-4 py-4">
      <div className="flex justify-end gap-1">
        <TableRowActionButton aria-label="Ver factura" title="Ver factura">
          ◫
        </TableRowActionButton>
        <TableRowActionButton aria-label="Editar factura" title="Editar factura">
          ✎
        </TableRowActionButton>
        {invoice.status !== 'paid' && (
          <TableRowActionButton
            aria-label="Pagar factura"
            title="Pagar factura"
            onClick={() => onPay?.(invoice)}
          >
            €
          </TableRowActionButton>
        )}
      </div>
    </td>
  </tr>
);

export default InvoiceTableRow;
