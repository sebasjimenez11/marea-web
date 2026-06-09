import { EmptyState } from '@/components/common';
import { SupplierOrdersCard } from '../SupplierOrdersCard';
import type { SupplierOrderGroup } from '@/modules/orders/types';

export interface OrdersSuppliersListProps {
  suppliers: SupplierOrderGroup[];
}

const OrdersSuppliersList = ({ suppliers }: OrdersSuppliersListProps) => {
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
        <SupplierOrdersCard key={supplier.id} supplier={supplier} />
      ))}
    </div>
  );
};

export default OrdersSuppliersList;
