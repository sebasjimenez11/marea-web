import { DataTableCard, EmptyState, TableHeaderCell } from '@/components/common';
import { SupplierTableRow } from '@/modules/suppliers/molecules';
import type { Supplier } from '@/modules/suppliers/types';

export interface SuppliersTableProps {
  suppliers: Supplier[];
  totalSuppliers: number;
}

const SuppliersTable = ({ suppliers, totalSuppliers }: SuppliersTableProps) => {
  if (!suppliers.length) {
    return (
      <EmptyState
        title="Sin proveedores"
        message="Todavía no hay proveedores registrados."
      />
    );
  }

  return (
    <DataTableCard summary={`Mostrando ${suppliers.length} de ${totalSuppliers} proveedores`}>
      <table className="min-w-full">
        <thead>
          <tr>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Teléfono</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
            <TableHeaderCell align="right">Acciones</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(supplier => (
            <SupplierTableRow key={supplier.id} supplier={supplier} />
          ))}
        </tbody>
      </table>
    </DataTableCard>
  );
};

export default SuppliersTable;
