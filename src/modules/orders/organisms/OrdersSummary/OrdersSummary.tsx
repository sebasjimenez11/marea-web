import { formatOrdersCurrency } from '@/modules/orders/lib';
import { OrdersSummaryCard } from '@/modules/orders/molecules';
import type { OrdersSummary as OrdersSummaryType } from '@/modules/orders/types';

export interface OrdersSummaryProps {
  summary: OrdersSummaryType;
}

const OrdersSummary = ({ summary }: OrdersSummaryProps) => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <OrdersSummaryCard
      label="Total productos a pedir"
      value={String(summary.totalSuggestedProducts)}
      detail="Unidades (Cajas)"
    />
    <OrdersSummaryCard
      label="Proveedores afectados"
      value={String(summary.affectedSuppliers)}
      detail="Activos"
    />
    <OrdersSummaryCard
      label="Valor estimado"
      value={formatOrdersCurrency(summary.estimatedValue)}
      detail="Aprox."
    />
  </div>
);

export default OrdersSummary;
