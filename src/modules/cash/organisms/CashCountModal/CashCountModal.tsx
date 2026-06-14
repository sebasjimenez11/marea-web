import { AlertBanner, Modal, ModalActionButtons } from '@/components/common';
import { formatCashCurrency } from '@/modules/cash/lib';
import { CashCountSection, CashCountSummary } from '@/modules/cash/molecules';
import type { CashCountEntry } from '@/modules/cash/types';

export interface CashCountModalProps {
  open: boolean;
  expectedAmount: number;
  billEntries: CashCountEntry[];
  coinEntries: CashCountEntry[];
  countedBills: number;
  countedCoins: number;
  countedTotal: number;
  difference: number;
  notes: string;
  error?: Error | null;
  isSaving?: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  onPrint: () => void;
  onNotesChange: (value: string) => void;
  onBillChange: (label: string, count: number) => void;
  onCoinChange: (label: string, count: number) => void;
}

const CashCountModal = ({
  open,
  expectedAmount,
  billEntries,
  coinEntries,
  countedBills,
  countedCoins,
  countedTotal,
  difference,
  notes,
  error,
  isSaving = false,
  onClose,
  onConfirm,
  onPrint,
  onNotesChange,
  onBillChange,
  onCoinChange,
}: CashCountModalProps) => (
  <Modal
    open={open}
    title="Arqueo Detallado"
    subtitle="Caja Principal • Turno Tarde"
    onClose={onClose}
    maxWidthClassName="max-w-[980px]"
    footer={
      <ModalActionButtons
        onCancel={onClose}
        confirmLabel={isSaving ? 'Guardando...' : 'Confirmar Arqueo'}
        confirmButtonProps={{ onClick: onConfirm, isLoading: isSaving, disabled: isSaving }}
      />
    }
  >
    <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
      <div className="space-y-6 lg:border-r lg:border-white/10 lg:pr-6">
        {error && (
          <AlertBanner
            key={error.message}
            type="error"
            title="No se pudo guardar el cierre"
            message={error.message}
          />
        )}
        <CashCountSection title="Billetes" entries={billEntries} onChange={onBillChange} />
        <CashCountSection title="Monedas" entries={coinEntries} onChange={onCoinChange} />
      </div>

      <div className="space-y-4">
        <CashCountSummary
          expectedAmount={expectedAmount}
          countedBills={countedBills}
          countedCoins={countedCoins}
          countedTotal={countedTotal}
          difference={difference}
          notes={notes}
          onNotesChange={onNotesChange}
        />

        <button
          type="button"
          onClick={onPrint}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-text-secondary transition hover:bg-white/[0.05] hover:text-white"
        >
          Imprimir Arqueo • {formatCashCurrency(expectedAmount)}
        </button>
      </div>
    </div>
  </Modal>
);

export default CashCountModal;
