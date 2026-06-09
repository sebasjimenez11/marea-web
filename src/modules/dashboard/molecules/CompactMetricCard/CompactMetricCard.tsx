import { MetricLabel } from '@/modules/dashboard/atoms';

export interface CompactMetricCardProps {
  label: string;
  value: number;
  toneClassName: string;
}

const CompactMetricCard = ({ label, value, toneClassName }: CompactMetricCardProps) => {
  return (
    <article className="animate-fade-up rounded-2xl border border-white/8 bg-surface-1 px-5 py-4">
      <div className="mb-3 flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${toneClassName}`} />
        <MetricLabel className="normal-case tracking-normal">{label}</MetricLabel>
      </div>
      <p className="text-4xl font-semibold tracking-[-0.04em] text-text-primary">{value}</p>
    </article>
  );
};

export default CompactMetricCard;
