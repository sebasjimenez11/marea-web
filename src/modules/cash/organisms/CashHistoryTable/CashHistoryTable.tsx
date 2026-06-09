import { DataTableCard, TableHeaderCell } from '@/components/common';
import { CashHistoryRow } from '@/modules/cash/molecules';
import type { CashClosureHistoryItem } from '@/modules/cash/types';

export interface CashHistoryTableProps {
  items: CashClosureHistoryItem[];
}

const CashHistoryTable = ({ items }: CashHistoryTableProps) => (
  <DataTableCard
    title="Histórico de Cierres Recientes"
    summary={`Mostrando ${items.length} de ${items.length} cierres`}
  >
    <table className="min-w-full">
      <thead>
        <tr>
          <TableHeaderCell>Fecha / Turno</TableHeaderCell>
          <TableHeaderCell>Responsable</TableHeaderCell>
          <TableHeaderCell>Total Esperado</TableHeaderCell>
          <TableHeaderCell>Total Real</TableHeaderCell>
          <TableHeaderCell>Estado</TableHeaderCell>
          <TableHeaderCell align="right">Acción</TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <CashHistoryRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  </DataTableCard>
);

export default CashHistoryTable;
