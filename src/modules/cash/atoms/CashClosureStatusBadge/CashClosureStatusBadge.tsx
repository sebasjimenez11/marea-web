import { Badge } from '@/components/common';
import {
  getCashClosureStatusLabel,
  getCashClosureStatusVariant,
} from '@/modules/cash/lib';
import type { CashClosureHistoryItem } from '@/modules/cash/types';

export interface CashClosureStatusBadgeProps {
  item: CashClosureHistoryItem;
}

const CashClosureStatusBadge = ({ item }: CashClosureStatusBadgeProps) => (
  <Badge
    variant={getCashClosureStatusVariant(item.status)}
    size="sm"
  >
    {getCashClosureStatusLabel(item.status, item.expectedTotal, item.actualTotal)}
  </Badge>
);

export default CashClosureStatusBadge;
