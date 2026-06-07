import { Table } from '../../../components/ui/Table';

export function SupplierOrderTable() {
  return (
    <Table>
      <thead className="bg-slate-900 text-slate-400">
        <tr>
          <th className="px-4 py-3">Proveedor</th>
          <th className="px-4 py-3">Estado</th>
          <th className="px-4 py-3">Creado</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t border-slate-800 text-slate-300">
          <td className="px-4 py-3" colSpan={3}>
            Pedidos preparados para sugeridos, recepcion y cancelacion.
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
