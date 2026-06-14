import { useState } from 'react';
import { AlertBanner, FormField, Modal, ModalActionButtons, formControlClassName } from '@/components/common';
import type { InvoiceItem, PayInvoiceInput } from '@/modules/invoices/types';

export interface InvoicePaymentModalProps {
  invoice: InvoiceItem | null;
  error?: Error | null;
  isSaving?: boolean;
  open: boolean;
  onClose: () => void;
  onPay: (input: PayInvoiceInput) => boolean | Promise<boolean>;
}

interface InvoicePaymentModalContentProps extends Omit<InvoicePaymentModalProps, 'invoice'> {
  invoice: InvoiceItem;
  isSaving: boolean;
}

const InvoicePaymentModalContent = ({
  invoice,
  error,
  isSaving,
  open,
  onClose,
  onPay,
}: InvoicePaymentModalContentProps) => {
  const [amount, setAmount] = useState(invoice.pendingAmount);
  const [paymentMethod, setPaymentMethod] = useState<PayInvoiceInput['paymentMethod']>('CASH');
  const [note, setNote] = useState('');
  const isInvalidAmount = amount <= 0 || amount > invoice.pendingAmount;

  const handleSubmit = async () => {
    if (isInvalidAmount) {
      return;
    }

    const wasPaid = await onPay({
      invoiceId: invoice.id,
      amount,
      paymentMethod,
      note,
    });

    if (wasPaid) {
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      title="Registrar pago"
      subtitle={`${invoice.invoiceNumber} · ${invoice.supplier}`}
      onClose={onClose}
      footer={
        <ModalActionButtons
          onCancel={onClose}
          confirmLabel={isSaving ? 'Registrando...' : 'Registrar pago'}
          confirmButtonProps={{
            onClick: handleSubmit,
            disabled: isInvalidAmount || isSaving,
            isLoading: isSaving,
          }}
        />
      }
    >
      <div className="space-y-5">
        {error && (
          <AlertBanner
            key={error.message}
            type="error"
            title="No se pudo registrar el pago"
            message={error.message}
          />
        )}

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-text-secondary">
          Pendiente: <span className="font-semibold text-white">{invoice.pendingAmount.toFixed(2)} €</span>
        </div>

        <FormField label="Importe a pagar (€)">
          <input
            type="number"
            min={0.01}
            max={invoice.pendingAmount}
            step="0.01"
            value={amount}
            onChange={event => setAmount(Number(event.target.value))}
            className={formControlClassName}
          />
        </FormField>

        <FormField label="Metodo de pago">
          <select
            value={paymentMethod}
            onChange={event => setPaymentMethod(event.target.value as PayInvoiceInput['paymentMethod'])}
            className={formControlClassName}
          >
            <option value="CASH">Efectivo</option>
            <option value="CARD">Tarjeta</option>
            <option value="BIZUM">Bizum</option>
            <option value="BANK_TRANSFER">Transferencia</option>
            <option value="OTHER">Otro</option>
          </select>
        </FormField>

        <FormField label="Nota">
          <textarea
            value={note}
            onChange={event => setNote(event.target.value)}
            className={`${formControlClassName} min-h-24 resize-none`}
            placeholder="Referencia o comentario del pago"
          />
        </FormField>
      </div>
    </Modal>
  );
};

const InvoicePaymentModal = ({
  invoice,
  error,
  isSaving = false,
  open,
  onClose,
  onPay,
}: InvoicePaymentModalProps) => {
  if (!invoice) {
    return (
      <Modal open={open} title="Registrar pago" onClose={onClose}>
        <div />
      </Modal>
    );
  }

  return (
    <InvoicePaymentModalContent
      key={invoice.id}
      invoice={invoice}
      error={error}
      isSaving={isSaving}
      open={open}
      onClose={onClose}
      onPay={onPay}
    />
  );
};

export default InvoicePaymentModal;
