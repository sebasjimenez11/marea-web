/**
 * ConfirmationModal
 * 
 * Componente de modal de confirmación reutilizable y escalable
 * Soporta múltiples tipos (danger, warning, info) con estilos dinámicos
 * Implementa transiciones suaves y está completamente tipado
 */

import { useEffect } from 'react';
import { Button } from '../Button';

export type ConfirmationType = 'danger' | 'warning' | 'info';

export interface ConfirmationModalProps {
  /** Modal abierto o cerrado */
  isOpen: boolean;
  /** Título del modal */
  title: string;
  /** Descripción o mensaje del modal */
  description: string;
  /** Tipo de confirmación (afecta los colores) */
  type?: ConfirmationType;
  /** Etiqueta del botón de confirmación */
  confirmLabel?: string;
  /** Etiqueta del botón de cancelación */
  cancelLabel?: string;
  /** Callback cuando se confirma */
  onConfirm: () => void;
  /** Callback cuando se cancela */
  onCancel: () => void;
  /** Estado de carga (deshabilita botones) */
  isLoading?: boolean;
}

/**
 * Mapeo de colores por tipo de confirmación
 */
const colorConfig = {
  danger: {
    icon: '⚠️',
    confirmButton: 'bg-red-600 hover:bg-red-700',
    border: 'border-red-500/30',
  },
  warning: {
    icon: '⚡',
    confirmButton: 'bg-amber-600 hover:bg-amber-700',
    border: 'border-amber-500/30',
  },
  info: {
    icon: 'ℹ️',
    confirmButton: 'bg-blue-600 hover:bg-blue-700',
    border: 'border-blue-500/30',
  },
} as const;

const ConfirmationModal = ({
  isOpen,
  title,
  description,
  type = 'info',
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmationModalProps) => {
  const config = colorConfig[type];

  /**
   * Cerrar modal al presionar ESC
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  /**
   * Prevenir scroll cuando el modal está abierto
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay oscuro con desenfoque */}
      <div
        className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-200"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        aria-describedby="confirmation-description"
      >
        {/* Modal Content */}
        <div
          className={`w-full max-w-sm space-y-6 rounded-lg border bg-slate-900 p-6 shadow-2xl transition-all duration-200 ${config.border}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon + Title */}
          <div className="space-y-3 text-center">
            <div className="flex justify-center text-4xl">{config.icon}</div>
            <h2
              id="confirmation-title"
              className="text-xl font-semibold text-slate-100"
            >
              {title}
            </h2>
          </div>

          {/* Description */}
          <p
            id="confirmation-description"
            className="text-center text-slate-400"
          >
            {description}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 sm:justify-end">
            <Button
              onClick={onCancel}
              variant="secondary"
              disabled={isLoading}
              className="flex-1 sm:flex-none"
            >
              {cancelLabel}
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 text-white transition-colors sm:flex-none ${config.confirmButton}`}
              aria-busy={isLoading}
            >
              {isLoading ? 'Procesando...' : confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
