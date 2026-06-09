import { Button, Card, formControlClassName } from '@/components/common';
import { formatCashCurrency } from '@/modules/cash/lib';

export interface CashClosePanelProps {
  initialFund: number;
}

const CashClosePanel = ({ initialFund }: CashClosePanelProps) => (
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
            Efectivo Real Contado
          </span>
          <input
            defaultValue="0.00"
            className={`${formControlClassName} min-w-[180px]`}
          />
        </label>

        <Button className="gap-2">
          <span aria-hidden="true">◉</span>
          Guardar Cierre
        </Button>
      </div>
    </div>
  </Card>
);

export default CashClosePanel;
