import { Button } from '../../../components/ui/Button';
import { CashMovementTable } from '../components/CashMovementTable';

export function CashPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-white">Caja</h2>
        <div className="flex gap-2">
          <Button type="button" variant="secondary">
            Cierre
          </Button>
          <Button type="button">Nuevo movimiento</Button>
        </div>
      </div>
      <CashMovementTable />
    </div>
  );
}
