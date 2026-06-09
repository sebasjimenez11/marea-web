import { useState } from 'react';
import type { InventoryItem, InventoryMovementDraft, InventoryMovementType } from '@/modules/inventory/types';

type MovementMode = Extract<InventoryMovementType, 'entry' | 'exit'>;

export interface InventoryMovementModalState {
  item: InventoryItem | null;
  mode: MovementMode;
  cases: number;
  units: number;
  comment: string;
  open: boolean;
}

const initialMovementModalState: InventoryMovementModalState = {
  item: null,
  mode: 'entry',
  cases: 0,
  units: 0,
  comment: '',
  open: false,
};

export interface UseInventoryMovementModalResult {
  movementModal: InventoryMovementModalState;
  openMovementModal: (item: InventoryItem, mode: MovementMode) => void;
  closeMovementModal: () => void;
  setMovementMode: (mode: MovementMode) => void;
  setMovementCases: (cases: number) => void;
  setMovementUnits: (units: number) => void;
  setMovementComment: (comment: string) => void;
  resetAfterConfirm: (onConfirm: (draft: InventoryMovementDraft) => void) => (draft: InventoryMovementDraft) => void;
}

export const useInventoryMovementModal = (): UseInventoryMovementModalResult => {
  const [movementModal, setMovementModal] = useState<InventoryMovementModalState>(initialMovementModalState);

  const openMovementModal = (item: InventoryItem, mode: MovementMode) => {
    setMovementModal({
      item,
      mode,
      cases: 0,
      units: 0,
      comment: '',
      open: true,
    });
  };

  const closeMovementModal = () => {
    setMovementModal(current => ({
      ...current,
      open: false,
    }));
  };

  const setMovementMode = (mode: MovementMode) => {
    setMovementModal(current => ({ ...current, mode }));
  };

  const setMovementCases = (cases: number) => {
    setMovementModal(current => ({ ...current, cases }));
  };

  const setMovementUnits = (units: number) => {
    setMovementModal(current => ({ ...current, units }));
  };

  const setMovementComment = (comment: string) => {
    setMovementModal(current => ({ ...current, comment }));
  };

  const resetAfterConfirm = (onConfirm: (draft: InventoryMovementDraft) => void) => (draft: InventoryMovementDraft) => {
    onConfirm(draft);
    closeMovementModal();
  };

  return {
    movementModal,
    openMovementModal,
    closeMovementModal,
    setMovementMode,
    setMovementCases,
    setMovementUnits,
    setMovementComment,
    resetAfterConfirm,
  };
};
