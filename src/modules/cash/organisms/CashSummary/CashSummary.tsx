import { formatCashCurrency } from '@/modules/cash/lib';
import { CashMetricCard } from '@/modules/cash/molecules';
import type { CashDaySummary } from '@/modules/cash/types';

export interface CashSummaryProps {
  summary: CashDaySummary;
}

const CashSummary = ({ summary }: CashSummaryProps) => (
  <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_0.65fr_0.65fr]">
    <CashMetricCard
      title="Balance en Vivo (Total en Caja)"
      value={formatCashCurrency(summary.liveBalance)}
      detail="↗ +15% vs ayer"
      className="bg-[linear-gradient(135deg,#4d9fff_0%,#5ea6ff_45%,#357bd7_100%)]"
    />
    <CashMetricCard
      title="Ventas Efectivo"
      value={formatCashCurrency(summary.cashSales)}
      detail={`${summary.cashTransactions} transacciones`}
    />
    <CashMetricCard
      title="Ventas Tarjeta/TPV"
      value={formatCashCurrency(summary.cardSales)}
      detail={`${summary.cardTransactions} transacciones`}
    />
  </div>
);

export default CashSummary;
