import { EmptyState } from '@/components/common';
import { SupplierOrdersCard } from '../SupplierOrdersCard';
import type { SupplierOrderGroup } from '@/modules/orders/types';

export interface OrdersSuppliersListProps {
  suppliers: SupplierOrderGroup[];
  generatingSupplierId?: string | null;
  onGenerateOrder?: (supplier: SupplierOrderGroup) => void;
}

const OrdersSuppliersList = ({
  suppliers,
  generatingSupplierId,
  onGenerateOrder,
}: OrdersSuppliersListProps) => {
  if (!suppliers.length) {
    return (
      <EmptyState
        title="Sin pedidos sugeridos"
        message="No hay resultados para la búsqueda actual."
      />
    );
  }

  return (
    <div className="space-y-4">
      {suppliers.map(supplier => (
        <SupplierOrdersCard
          key={supplier.id}
          supplier={supplier}
          generatingSupplierId={generatingSupplierId}
          onGenerateOrder={onGenerateOrder}
        />
      ))}
    </div>
  );
};

export default OrdersSuppliersList;
