import { Button } from '../../../components/ui/Button';
import { InventoryItemTable } from '../components/InventoryItemTable';

export function InventoryItemsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-white">Inventario</h2>
        <Button type="button">Nuevo producto</Button>
      </div>
      <InventoryItemTable />
    </div>
  );
}
