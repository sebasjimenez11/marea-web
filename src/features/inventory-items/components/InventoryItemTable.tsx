import { Table } from '../../../components/ui/Table';

export function InventoryItemTable() {
  return (
    <Table>
      <thead className="bg-slate-900 text-slate-400">
        <tr>
          <th className="px-4 py-3">Producto</th>
          <th className="px-4 py-3">Categoria</th>
          <th className="px-4 py-3">Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t border-slate-800 text-slate-300">
          <td className="px-4 py-3" colSpan={3}>
            Inventario listo para la fase de CRUD.
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
