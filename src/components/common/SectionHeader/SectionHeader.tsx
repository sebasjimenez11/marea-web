import type { ReactNode } from 'react';
import { Heading4 } from '../Typography';

export interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
}

const SectionHeader = ({ title, action }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
      <Heading4>{title}</Heading4>
      {action}
    </div>
  );
};

export default SectionHeader;
