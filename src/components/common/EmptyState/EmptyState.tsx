import type { ReactNode } from 'react';
import { Heading3, Subtitle } from '../Typography';

export interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
  action?: ReactNode;
}

const EmptyState = ({
  title = 'Sin datos',
  message = 'No hay datos para mostrar en este momento.',
  icon = '📭',
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-96 text-center">
      <div className="text-6xl">{icon}</div>
      <Heading3>{title}</Heading3>
      <Subtitle>{message}</Subtitle>
    </div>
  );
};

export default EmptyState;
