import { Button, Card } from '@/components/common';
import { formatCashCurrency } from '@/modules/cash/lib';

export interface CashClosePanelProps {
  initialFund: number;
  expectedAmount: number;
  onOpenCount: () => void;
}

const CashClosePanel = ({ initialFund, expectedAmount, onOpenCount }: CashClosePanelProps) => (
  <Card className="animate-panel-in p-5">
    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-text-primary">
          ◔
        </div>
        <div>
          <p className="text-sm text-text-secondary">Fondo de Caja Inicial</p>
          <p className="text-2xl font-semibold text-white">{formatCashCurrency(initialFund)}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
            Efectivo esperado
          </p>
          <p className="text-lg font-semibold text-white">{formatCashCurrency(expectedAmount)}</p>
        </div>

        <Button className="gap-2" onClick={onOpenCount}>
          <span aria-hidden="true">◉</span>
          Guardar Cierre
        </Button>
      </div>
    </div>
  </Card>
);

export default CashClosePanel;
