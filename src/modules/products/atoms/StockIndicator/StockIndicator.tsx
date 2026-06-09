import { Paragraph } from '@/components/common';

export interface StockIndicatorProps {
  value: string;
  highlight?: boolean;
}

const StockIndicator = ({ value, highlight = false }: StockIndicatorProps) => {
  return (
    <Paragraph className={highlight ? 'font-medium text-[#f8b26a]' : 'font-medium'}>
      {value}
    </Paragraph>
  );
};

export default StockIndicator;
