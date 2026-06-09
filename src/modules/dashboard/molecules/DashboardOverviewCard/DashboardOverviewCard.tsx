import { Muted } from '@/components/common';
import { formatCurrency } from '@/modules/dashboard/lib';

export interface DashboardOverviewCardProps {
  cashDiff: number;
  supplierDebt: number;
}

const DashboardOverviewCard = ({ cashDiff, supplierDebt }: DashboardOverviewCardProps) => (
  <article className="animate-panel-in rounded-2xl border border-white/8 bg-surface-1 p-5 xl:col-span-3">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Muted className="mb-2 uppercase tracking-[0.14em]">Dif. de caja</Muted>
        <p className="text-right text-lg font-semibold text-[#f5b1aa]">
          {formatCurrency(cashDiff)}
        </p>
      </div>
      <div>
        <Muted className="mb-2 uppercase tracking-[0.14em]">Deuda prov.</Muted>
        <p className="text-right text-lg font-semibold text-[#ffc369]">
          {formatCurrency(supplierDebt)}
        </p>
      </div>
    </div>
  </article>
);

export default DashboardOverviewCard;
