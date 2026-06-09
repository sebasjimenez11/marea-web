export interface MovementStepperFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const MovementStepperField = ({ label, value, onChange }: MovementStepperFieldProps) => (
  <label className="space-y-2">
    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
      {label}
    </span>
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0f141c] px-3 py-3">
      <button
        type="button"
        className="text-lg text-text-secondary transition hover:text-white"
        onClick={() => onChange(Math.max(0, value - 1))}
        aria-label={`Reducir ${label.toLowerCase()}`}
      >
        -
      </button>
      <span className="min-w-10 text-center text-sm font-semibold text-white">{value}</span>
      <button
        type="button"
        className="text-lg text-text-secondary transition hover:text-white"
        onClick={() => onChange(value + 1)}
        aria-label={`Aumentar ${label.toLowerCase()}`}
      >
        +
      </button>
    </div>
  </label>
);

export default MovementStepperField;
