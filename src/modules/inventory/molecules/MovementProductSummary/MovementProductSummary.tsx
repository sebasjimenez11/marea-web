import type { InventoryItem } from '@/modules/inventory/types';

export interface MovementProductSummaryProps {
  item: InventoryItem;
}

const MovementProductSummary = ({ item }: MovementProductSummaryProps) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
      Producto seleccionado
    </span>
    <div className="mt-2 space-y-1">
      <p className="text-base font-semibold text-white">{item.name}</p>
      <p className="text-sm text-text-secondary">
        Formato: Caja {item.unitsPerCase} uds / {item.size}
      </p>
    </div>
  </div>
);

export default MovementProductSummary;
