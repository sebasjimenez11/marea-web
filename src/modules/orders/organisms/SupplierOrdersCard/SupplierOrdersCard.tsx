import { Card, TableHeaderCell } from '@/components/common';
import { OrderItemRow, OrderSupplierHeader } from '@/modules/orders/molecules';
import type { SupplierOrderGroup } from '@/modules/orders/types';

export interface SupplierOrdersCardProps {
  supplier: SupplierOrderGroup;
  generatingSupplierId?: string | null;
  onGenerateOrder?: (supplier: SupplierOrderGroup) => void;
}

const SupplierOrdersCard = ({
  supplier,
  generatingSupplierId,
  onGenerateOrder,
}: SupplierOrdersCardProps) => {
  if (!supplier.items.length) {
    return null;
  }

  return (
    <Card className="animate-panel-in overflow-hidden p-0">
      <OrderSupplierHeader
        supplier={supplier}
        isGenerating={generatingSupplierId === supplier.id}
        onGenerateOrder={onGenerateOrder}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <TableHeaderCell>Producto</TableHeaderCell>
              <TableHeaderCell>Stock actual</TableHeaderCell>
              <TableHeaderCell>Stock objetivo</TableHeaderCell>
              <TableHeaderCell align="right">Sugerido a pedir</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {supplier.items.map(item => (
              <OrderItemRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default SupplierOrdersCard;
