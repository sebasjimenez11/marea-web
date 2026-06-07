import { Table } from '../../../components/ui/Table';

export function SupplierInvoiceTable() {
  return (
    <Table>
      <thead className="bg-slate-900 text-slate-400">
        <tr>
          <th className="px-4 py-3">Factura</th>
          <th className="px-4 py-3">Estado</th>
          <th className="px-4 py-3">Importe</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t border-slate-800 text-slate-300">
          <td className="px-4 py-3" colSpan={3}>
            Facturas preparadas para deuda, vencidas y pagos.
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
