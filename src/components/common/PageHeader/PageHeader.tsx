import type { ReactNode } from 'react';
import { Heading1, Subtitle } from '../Typography';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => {
  return (
    <div className="animate-fade-up flex flex-wrap items-start justify-between gap-4">
      <div>
        <Heading1>{title}</Heading1>
        {subtitle && <Subtitle className="mt-1.5">{subtitle}</Subtitle>}
      </div>
      {action && <div className="rounded-xl border border-white/8 bg-white/[0.03] p-1">{action}</div>}
    </div>
  );
};

export default PageHeader;
