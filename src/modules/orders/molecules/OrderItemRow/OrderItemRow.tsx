import { OrderSuggestionBadge } from '@/modules/orders/atoms';
import type { SuggestedOrderItem } from '@/modules/orders/types';

export interface OrderItemRowProps {
  item: SuggestedOrderItem;
}

const OrderItemRow = ({ item }: OrderItemRowProps) => (
  <tr className="border-t border-white/6 transition hover:bg-white/[0.02]">
    <td className="px-5 py-4 text-sm font-medium text-white">{item.productName}</td>
    <td className="px-5 py-4 text-sm text-[#d8a38f]">{item.currentStock}</td>
    <td className="px-5 py-4 text-sm text-text-primary">{item.targetStock}</td>
    <td className="px-5 py-4 text-right">
      <OrderSuggestionBadge value={item.suggestedOrder} />
    </td>
  </tr>
);

export default OrderItemRow;
