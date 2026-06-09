import type { InventoryMovementType } from '@/modules/inventory/types';

type MovementMode = Extract<InventoryMovementType, 'entry' | 'exit'>;

export interface MovementModeToggleProps {
  value: MovementMode;
  onChange: (mode: MovementMode) => void;
}

const movementLabels: Record<MovementMode, string> = {
  entry: 'Entrada',
  exit: 'Salida',
};

const movementModes: MovementMode[] = ['entry', 'exit'];

const MovementModeToggle = ({ value, onChange }: MovementModeToggleProps) => (
  <div className="rounded-xl border border-white/10 bg-[#111720] p-1">
    <div className="grid grid-cols-2 gap-1">
      {movementModes.map(option => (
        <button
          key={option}
          type="button"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            value === option
              ? 'bg-[#4d9fff] text-[#081425]'
              : 'text-text-secondary hover:bg-white/6 hover:text-white'
          }`}
          onClick={() => onChange(option)}
        >
          {movementLabels[option]}
        </button>
      ))}
    </div>
  </div>
);

export default MovementModeToggle;
