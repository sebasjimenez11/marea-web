import { Card, Muted } from '@/components/common';

export interface OrdersSummaryCardProps {
  label: string;
  value: string;
  detail: string;
}

const OrdersSummaryCard = ({ label, value, detail }: OrdersSummaryCardProps) => (
  <Card className="animate-panel-in space-y-3 p-5">
    <Muted className="uppercase tracking-[0.14em]">{label}</Muted>
    <div className="flex items-end gap-2">
      <span className="text-4xl font-semibold text-white">{value}</span>
      <span className="pb-1 text-sm text-text-secondary">{detail}</span>
    </div>
  </Card>
);

export default OrdersSummaryCard;
