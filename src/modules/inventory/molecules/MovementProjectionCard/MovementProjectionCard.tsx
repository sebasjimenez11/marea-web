import { formatStock } from '@/modules/inventory/lib';
import type { ProjectedStock } from '@/modules/inventory/lib';

export interface MovementProjectionCardProps {
  projection: ProjectedStock | null;
}

const MovementProjectionCard = ({ projection }: MovementProjectionCardProps) => (
  <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(19,26,36,1)_0%,rgba(15,20,28,1)_100%)] p-4">
    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
      Prevision de inventario
    </span>

    {projection ? (
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-text-muted">Stock anterior</p>
          <p className="text-sm text-text-secondary">
            {formatStock(projection.current.cases, projection.current.units)}
          </p>
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-text-secondary">
          -&gt;
        </div>

        <div className="text-right">
          <p className="text-xs text-[#7eb7ff]">Nuevo stock</p>
          <p className="text-base font-semibold text-white">
            {formatStock(projection.next.cases, projection.next.units)}
          </p>
        </div>
      </div>
    ) : (
      <p className="mt-3 text-sm text-[#f0a0a0]">
        La salida supera el stock disponible. Ajusta la cantidad para continuar.
      </p>
    )}
  </div>
);

export default MovementProjectionCard;
