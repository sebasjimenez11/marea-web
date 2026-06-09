import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  open: boolean;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  maxWidthClassName?: string;
}

const Modal = ({
  open,
  title,
  subtitle,
  children,
  footer,
  onClose,
  maxWidthClassName = 'max-w-[650px]',
}: ModalProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`animate-panel-in relative z-10 w-full ${maxWidthClassName} rounded-2xl border border-white/12 bg-[#1d222b] shadow-[0_30px_80px_rgba(0,0,0,0.45)]`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h2 id="modal-title" className="text-2xl font-semibold tracking-[-0.03em] text-text-primary">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            className="rounded-lg px-2 py-1 text-text-muted transition hover:bg-white/[0.05] hover:text-text-primary"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-5">{children}</div>

        {footer && (
          <div className="flex justify-end gap-3 border-t border-white/10 px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
