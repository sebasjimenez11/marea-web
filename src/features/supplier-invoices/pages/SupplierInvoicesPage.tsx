import { Button } from '../../../components/ui/Button';
import { SupplierInvoiceTable } from '../components/SupplierInvoiceTable';

export function SupplierInvoicesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-white">Facturas</h2>
        <Button type="button">Nueva factura</Button>
      </div>
      <SupplierInvoiceTable />
    </div>
  );
}
