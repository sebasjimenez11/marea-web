import type { ReactNode } from 'react';
import { Muted } from '@/components/common';

export interface MetricLabelProps {
  children: ReactNode;
  className?: string;
}

const MetricLabel = ({ children, className = '' }: MetricLabelProps) => {
  return (
    <Muted className={`uppercase tracking-[0.14em] ${className}`.trim()}>
      {children}
    </Muted>
  );
};

export default MetricLabel;
