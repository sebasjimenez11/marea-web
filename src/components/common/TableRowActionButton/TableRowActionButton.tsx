import { Button, type ButtonProps } from '../Button';

export type TableRowActionButtonProps = Omit<ButtonProps, 'size' | 'variant'>;

const TableRowActionButton = ({
  className = '',
  children,
  ...props
}: TableRowActionButtonProps) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      className={`rounded-lg bg-white/[0.03] px-2.5 py-1.5 text-xs text-text-secondary hover:text-text-primary ${className}`.trim()}
      {...props}
    >
      {children}
    </Button>
  );
};

export default TableRowActionButton;
