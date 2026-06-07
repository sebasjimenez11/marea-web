import { PropsWithChildren } from 'react';

type ModalProps = PropsWithChildren<{
  title: string;
  open: boolean;
  onClose: () => void;
}>;

export function Modal({ title, open, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <section className="w-full max-w-lg rounded-lg border border-slate-800 bg-[#111820] p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            className="rounded-md px-2 py-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            type="button"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
