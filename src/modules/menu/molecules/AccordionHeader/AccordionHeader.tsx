import type { AccordionHeaderProps } from './AccordionHeader.types';
import { IconChevron } from '@/components/common';

const AccordionHeader = ({ title, isOpen = false, onClick }: AccordionHeaderProps) => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium text-text-secondary transition hover:bg-primary-50 hover:text-primary"
      onClick={onClick}
    >
      <span>{title}</span>
      <IconChevron isOpen={isOpen} />
    </button>
  );
};

export default AccordionHeader;
