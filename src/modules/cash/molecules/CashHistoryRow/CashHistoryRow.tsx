import { TableRowActionButton } from '@/components/common';
import { CashClosureStatusBadge } from '@/modules/cash/atoms';
import { formatCashCurrency, getCashVariance } from '@/modules/cash/lib';
import type { CashClosureHistoryItem } from '@/modules/cash/types';

export interface CashHistoryRowProps {
  item: CashClosureHistoryItem;
}

const CashHistoryRow = ({ item }: CashHistoryRowProps) => {
  const variance = getCashVariance(item);

  return (
    <tr className="border-t border-white/6 transition hover:bg-white/[0.02]">
      <td className="px-4 py-4 text-sm font-medium text-white">{item.shiftLabel}</td>
      <td className="px-4 py-4 text-sm text-text-primary">{item.responsibleName}</td>
      <td className="px-4 py-4 text-sm text-text-secondary">
        {formatCashCurrency(item.expectedTotal)}
      </td>
      <td className={`px-4 py-4 text-sm font-medium ${variance < 0 ? 'text-[#f0a0a0]' : 'text-white'}`}>
        {formatCashCurrency(item.actualTotal)}
      </td>
      <td className="px-4 py-4 text-sm">
        <CashClosureStatusBadge item={item} />
      </td>
      <td className="px-4 py-4">
        <div className="flex justify-end">
          <TableRowActionButton aria-label="Ver cierre" title="Ver cierre">
            ◉
          </TableRowActionButton>
        </div>
      </td>
    </tr>
  );
};

export default CashHistoryRow;
