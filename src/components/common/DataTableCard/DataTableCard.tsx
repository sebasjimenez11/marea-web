import type { ReactNode } from 'react';
import { Card } from '../Card';
import { PaginationButtons } from '../PaginationButtons';
import { SectionHeader } from '../SectionHeader';
import { Paragraph } from '../Typography';

export interface DataTableCardProps {
  children: ReactNode;
  summary: string;
  title?: string;
}

const DataTableCard = ({ children, summary, title }: DataTableCardProps) => {
  return (
    <Card className="animate-panel-in p-0">
      {title && <SectionHeader title={title} />}

      <div className="overflow-x-auto">
        {children}
      </div>

      <div className="flex items-center justify-between border-t border-white/8 px-4 py-3">
        <Paragraph className="text-text-secondary">{summary}</Paragraph>
        <PaginationButtons />
      </div>
    </Card>
  );
};

export default DataTableCard;
