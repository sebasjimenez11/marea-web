import { Button } from '../../../components/ui/Button';
import { InventoryMovementTable } from '../components/InventoryMovementTable';

export function InventoryMovementsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-white">Movimientos</h2>
        <Button type="button">Nuevo movimiento</Button>
      </div>
      <InventoryMovementTable />
    </div>
  );
}
