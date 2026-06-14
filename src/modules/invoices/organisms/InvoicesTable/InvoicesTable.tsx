import { DataTableCard, EmptyState, TableHeaderCell } from '@/components/common';
import { InvoiceTableRow } from '@/modules/invoices/molecules';
import type { InvoiceItem } from '@/modules/invoices/types';

export interface InvoicesTableProps {
  invoices: InvoiceItem[];
  totalInvoices: number;
  onPayInvoice?: (invoice: InvoiceItem) => void;
}

const InvoicesTable = ({ invoices, totalInvoices, onPayInvoice }: InvoicesTableProps) => {
  if (!invoices.length) {
    return (
      <EmptyState
        title="Sin facturas"
        message="No hay facturas que coincidan con los filtros actuales."
      />
    );
  }

  return (
    <DataTableCard summary={`Mostrando ${invoices.length} de ${totalInvoices} facturas`}>
      <table className="min-w-full">
        <thead>
          <tr>
            <TableHeaderCell>Nº factura</TableHeaderCell>
            <TableHeaderCell>Proveedor</TableHeaderCell>
            <TableHeaderCell>Fecha</TableHeaderCell>
            <TableHeaderCell>Vencimiento</TableHeaderCell>
            <TableHeaderCell>Importe total</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
            <TableHeaderCell align="right">Acciones</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <InvoiceTableRow key={invoice.id} invoice={invoice} onPay={onPayInvoice} />
          ))}
        </tbody>
      </table>
    </DataTableCard>
  );
};

export default InvoicesTable;
