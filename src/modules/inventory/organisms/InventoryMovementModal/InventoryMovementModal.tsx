import { useMemo } from 'react';
import { Modal, ModalActionButtons } from '@/components/common';
import { getProjectedStock } from '@/modules/inventory/lib';
import {
  MovementModeToggle,
  MovementProductSummary,
  MovementProjectionCard,
  MovementStepperField,
} from '@/modules/inventory/molecules';
import type { InventoryItem, InventoryMovementDraft, InventoryMovementType } from '@/modules/inventory/types';

type MovementMode = Extract<InventoryMovementType, 'entry' | 'exit'>;

export interface InventoryMovementModalProps {
  item: InventoryItem | null;
  mode: MovementMode;
  cases: number;
  units: number;
  comment: string;
  open: boolean;
  onClose: () => void;
  onModeChange: (mode: MovementMode) => void;
  onCasesChange: (value: number) => void;
  onUnitsChange: (value: number) => void;
  onCommentChange: (value: string) => void;
  onConfirm: (draft: InventoryMovementDraft) => void;
}

const InventoryMovementModal = ({
  item,
  mode,
  cases,
  units,
  comment,
  open,
  onClose,
  onModeChange,
  onCasesChange,
  onUnitsChange,
  onCommentChange,
  onConfirm,
}: InventoryMovementModalProps) => {
  const projection = useMemo(() => {
    if (!item) {
      return null;
    }

    return getProjectedStock(item, { type: mode, cases, units });
  }, [cases, item, mode, units]);

  const hasQuantity = (cases + units) > 0;
  const isInvalidExit = mode === 'exit' && projection === null;
  const isConfirmDisabled = !item || !hasQuantity || isInvalidExit;

  const handleConfirm = () => {
    if (!item || isConfirmDisabled) {
      return;
    }

    onConfirm({
      itemId: item.id,
      type: mode,
      cases,
      units,
      comment,
    });
  };

  return (
    <Modal
      open={open}
      title="Registrar Movimiento"
      onClose={onClose}
      footer={
        <ModalActionButtons
          onCancel={onClose}
          confirmLabel="Confirmar"
          confirmButtonProps={{ onClick: handleConfirm, disabled: isConfirmDisabled }}
        />
      }
    >
      {!item ? null : (
        <div className="space-y-5">
          <MovementModeToggle value={mode} onChange={onModeChange} />

          <MovementProductSummary item={item} />

          <div className="grid grid-cols-2 gap-3">
            <MovementStepperField label="Cajas" value={cases} onChange={onCasesChange} />
            <MovementStepperField label="Unidades sueltas" value={units} onChange={onUnitsChange} />
          </div>

          <label className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Comentarios (opcional)
            </span>
            <textarea
              value={comment}
              onChange={event => onCommentChange(event.target.value)}
              rows={3}
              placeholder="Ej: recepcion semanal, rotura o ajuste manual"
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0f141c] px-4 py-3 text-sm text-white outline-none transition placeholder:text-text-muted focus:border-[#4d9fff]"
            />
          </label>

          <MovementProjectionCard projection={projection} />
        </div>
      )}
    </Modal>
  );
};

export default InventoryMovementModal;
