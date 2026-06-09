import { IconTile, TableRowActionButton } from '@/components/common';
import { SupplierStatusBadge } from '@/modules/suppliers/atoms';
import { SupplierIdentity } from '@/modules/suppliers/molecules';
import type { Supplier } from '@/modules/suppliers/types';

export interface SupplierTableRowProps {
  supplier: Supplier;
}

const SupplierTableRow = ({ supplier }: SupplierTableRowProps) => {
  return (
    <tr className="border-t border-white/8 transition hover:bg-white/[0.03]">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <IconTile className="text-[#9ec7ff]">◈</IconTile>
          <SupplierIdentity name={supplier.name} />
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-text-secondary">{supplier.phone}</td>
      <td className="px-4 py-4 text-sm text-text-secondary">{supplier.email}</td>
      <td className="px-4 py-4">
        <SupplierStatusBadge status={supplier.status} />
      </td>
      <td className="px-4 py-4 text-right">
        <TableRowActionButton type="button">
          Editar
        </TableRowActionButton>
      </td>
    </tr>
  );
};

export default SupplierTableRow;
