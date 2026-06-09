import type { ReactNode } from 'react';
import { SectionHeader } from '@/components/common';

export interface PanelHeaderProps {
  title: string;
  action?: ReactNode;
}

const PanelHeader = ({ title, action }: PanelHeaderProps) => {
  return <SectionHeader title={title} action={action} />;
};

export default PanelHeader;
