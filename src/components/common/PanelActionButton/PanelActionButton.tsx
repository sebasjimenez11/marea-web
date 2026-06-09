import { Button, type ButtonProps } from '../Button';

export type PanelActionButtonProps = Omit<ButtonProps, 'variant' | 'size'>;

const PanelActionButton = ({
  className = '',
  children,
  ...props
}: PanelActionButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`px-0 py-0 text-sm text-[#9ec7ff] hover:bg-transparent hover:text-white ${className}`.trim()}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PanelActionButton;
