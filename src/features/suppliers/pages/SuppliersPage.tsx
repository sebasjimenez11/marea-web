import { Button } from '../../../components/ui/Button';
import { SuppliersTable } from '../components/SuppliersTable';

export function SuppliersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-white">Proveedores</h2>
        <Button type="button">Nuevo proveedor</Button>
      </div>
      <SuppliersTable />
    </div>
  );
}
