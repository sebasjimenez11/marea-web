import { Badge, Button, IconTile } from '@/components/common';
import { getSupplierOrderIcon } from '@/modules/orders/lib';
import type { SupplierOrderGroup } from '@/modules/orders/types';

export interface OrderSupplierHeaderProps {
  supplier: SupplierOrderGroup;
}

const OrderSupplierHeader = ({ supplier }: OrderSupplierHeaderProps) => (
  <div className="flex flex-col gap-4 border-b border-white/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-3">
      <IconTile className="bg-white/6 text-text-primary">
        <span aria-hidden="true">{getSupplierOrderIcon(supplier.icon)}</span>
      </IconTile>
      <div>
        <h3 className="text-lg font-semibold text-white">{supplier.supplierName}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm text-text-secondary">
            {supplier.items.length} productos sugeridos
          </span>
          <Badge variant={supplier.supplierStatus === 'active' ? 'success' : 'default'} size="sm">
            {supplier.supplierStatus === 'active' ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
      </div>
    </div>

    <Button className="gap-2 self-start sm:self-auto">
      <span aria-hidden="true">▷</span>
      Generar Pedido
    </Button>
  </div>
);

export default OrderSupplierHeader;
