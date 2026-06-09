import type { ReactNode } from 'react';
import { IconTile, Paragraph } from '@/components/common';
import { MetricLabel } from '@/modules/dashboard/atoms';

export interface PrimaryMetricCardProps {
  title: string;
  value: string;
  detail: string;
  icon: ReactNode;
  iconClassName?: string;
}

const PrimaryMetricCard = ({
  title,
  value,
  detail,
  icon,
  iconClassName = '',
}: PrimaryMetricCardProps) => {
  return (
    <article className="animate-panel-in rounded-2xl border border-white/8 bg-surface-1 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.16)]">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <MetricLabel className="mb-2">{title}</MetricLabel>
          <p className="text-[2rem] font-semibold tracking-[-0.04em] text-text-primary">{value}</p>
        </div>
        <IconTile className={iconClassName}>{icon}</IconTile>
      </div>
      <Paragraph className="text-xs text-[#9ec7ff]">{detail}</Paragraph>
    </article>
  );
};

export default PrimaryMetricCard;
