import { formControlClassName } from '@/components/common';
import { formatCashCurrency } from '@/modules/cash/lib';

export interface CashCountSummaryProps {
  expectedAmount: number;
  countedBills: number;
  countedCoins: number;
  countedTotal: number;
  difference: number;
  notes: string;
  onNotesChange: (value: string) => void;
}

const CashCountSummary = ({
  expectedAmount,
  countedBills,
  countedCoins,
  countedTotal,
  difference,
  notes,
  onNotesChange,
}: CashCountSummaryProps) => {
  const differenceLabel = difference >= 0
    ? `+ ${formatCashCurrency(difference)}`
    : formatCashCurrency(difference);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs text-text-secondary">Efectivo Esperado</p>
        <p className="mt-2 text-3xl font-semibold text-white">
          {formatCashCurrency(expectedAmount)}
        </p>
      </div>

      <div className="rounded-2xl border border-[#4d9fff]/18 bg-[#1d2940] p-4">
        <p className="text-xs text-[#9ec7ff]">Total Efectivo Contado</p>
        <p className="mt-2 text-3xl font-semibold text-[#cfe4ff]">
          {formatCashCurrency(countedTotal)}
        </p>
        <div className="mt-4 space-y-1 text-sm text-text-secondary">
          <div className="flex justify-between">
            <span>Billetes</span>
            <span>{formatCashCurrency(countedBills)}</span>
          </div>
          <div className="flex justify-between">
            <span>Monedas</span>
            <span>{formatCashCurrency(countedCoins)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs text-text-secondary">Diferencia de Caja</p>
        <p className={`mt-2 text-2xl font-semibold ${difference >= 0 ? 'text-[#ffc369]' : 'text-[#f0a0a0]'}`}>
          {differenceLabel}
        </p>
        <p className="mt-2 text-sm text-text-secondary">
          {difference >= 0
            ? 'Sobrante detectado. Requiere nota en cierre.'
            : 'Faltante detectado. Requiere revisión antes de confirmar.'}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
          Notas de cierre (opcional)
        </p>
        <textarea
          value={notes}
          onChange={event => onNotesChange(event.target.value)}
          placeholder="Justificación de descuadres o incidencias..."
          className={`${formControlClassName} mt-3 min-h-24 resize-none`}
        />
      </div>
    </div>
  );
};

export default CashCountSummary;
