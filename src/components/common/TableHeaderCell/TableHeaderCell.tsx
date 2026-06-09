import type { ReactNode } from 'react';

export interface TableHeaderCellProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
}

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const TableHeaderCell = ({ children, align = 'left' }: TableHeaderCellProps) => {
  return (
    <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8ea6cf] ${alignClasses[align]}`}>
      {children}
    </th>
  );
};

export default TableHeaderCell;
