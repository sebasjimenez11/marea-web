import { Badge } from '@/components/common';

export interface OrderSuggestionBadgeProps {
  value: string;
}

const OrderSuggestionBadge = ({ value }: OrderSuggestionBadgeProps) => (
  <Badge variant="primary" size="sm" className="font-semibold">
    {value}
  </Badge>
);

export default OrderSuggestionBadge;
