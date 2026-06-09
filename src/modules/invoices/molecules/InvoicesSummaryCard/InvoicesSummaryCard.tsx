import { Card, Muted } from '@/components/common';

export interface InvoicesSummaryCardProps {
  label: string;
  value: string;
  detail: string;
  detailToneClassName?: string;
}

const InvoicesSummaryCard = ({
  label,
  value,
  detail,
  detailToneClassName = 'text-text-secondary',
}: InvoicesSummaryCardProps) => (
  <Card className="animate-panel-in space-y-3 bg-[#18233d] p-5">
    <Muted className="uppercase tracking-[0.14em]">{label}</Muted>
    <div className="space-y-1">
      <p className="text-4xl font-semibold text-white">{value}</p>
      <p className={`text-sm ${detailToneClassName}`}>{detail}</p>
    </div>
  </Card>
);

export default InvoicesSummaryCard;
