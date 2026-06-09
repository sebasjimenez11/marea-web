import { Card, Muted } from '@/components/common';

export interface CashMetricCardProps {
  title: string;
  value: string;
  detail: string;
  className?: string;
}

const CashMetricCard = ({ title, value, detail, className = '' }: CashMetricCardProps) => (
  <Card className={`animate-panel-in space-y-3 p-5 ${className}`.trim()}>
    <Muted className="uppercase tracking-[0.14em]">{title}</Muted>
    <div className="space-y-2">
      <p className="text-4xl font-semibold text-white">{value}</p>
      <p className="text-sm text-text-secondary">{detail}</p>
    </div>
  </Card>
);

export default CashMetricCard;
