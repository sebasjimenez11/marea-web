import { formatCashCurrency } from '@/modules/cash/lib';

export interface CashCountFieldProps {
  label: string;
  value: number;
  count: number;
  onChange: (count: number) => void;
}

const CashCountField = ({ label, value, count, onChange }: CashCountFieldProps) => (
  <div className="grid grid-cols-[72px_72px_1fr] items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-3">
    <span className="text-sm font-medium text-text-primary">€ {label}</span>

    <input
      type="number"
      min={0}
      value={count}
      onChange={event => onChange(Number(event.target.value))}
      className="h-9 rounded-lg border border-white/10 bg-[#151a22] px-2 text-center text-sm text-white outline-none transition focus:border-[#4d9fff]"
    />

    <span className="text-right text-sm font-semibold text-[#8fb7ff]">
      {formatCashCurrency(value * count)}
    </span>
  </div>
);

export default CashCountField;
