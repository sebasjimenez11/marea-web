import { Button, type ButtonProps } from '../Button';

export interface ModalActionButtonsProps {
  cancelLabel?: string;
  confirmLabel: string;
  onCancel: () => void;
  confirmButtonProps?: Omit<ButtonProps, 'children'>;
}

const ModalActionButtons = ({
  cancelLabel = 'Cancelar',
  confirmLabel,
  onCancel,
  confirmButtonProps,
}: ModalActionButtonsProps) => {
  return (
    <>
      <Button variant="secondary" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button {...confirmButtonProps}>
        {confirmLabel}
      </Button>
    </>
  );
};

export default ModalActionButtons;
