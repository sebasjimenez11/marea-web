import { Button } from '../../../components/ui/Button';
import { SupplierOrderTable } from '../components/SupplierOrderTable';

export function SupplierOrdersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-white">Pedidos</h2>
        <Button type="button">Nuevo pedido</Button>
      </div>
      <SupplierOrderTable />
    </div>
  );
}
