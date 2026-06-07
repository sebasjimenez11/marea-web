import { Table } from '../../../components/ui/Table';

export function InventoryMovementTable() {
  return (
    <Table>
      <thead className="bg-slate-900 text-slate-400">
        <tr>
          <th className="px-4 py-3">Producto</th>
          <th className="px-4 py-3">Tipo</th>
          <th className="px-4 py-3">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t border-slate-800 text-slate-300">
          <td className="px-4 py-3" colSpan={3}>
            Movimientos preparados para entradas, salidas, ajustes y mermas.
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
