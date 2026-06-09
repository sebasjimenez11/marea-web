import { Badge, Card, EmptyState, Muted, Paragraph } from '@/components/common';
import { getOrderStatusLabel, getOrderStatusVariant } from '@/modules/dashboard/lib';
import { PanelHeader } from '@/modules/dashboard/molecules';
import type { OrderItem } from '@/modules/dashboard/types';

interface PendingOrdersSectionProps {
  orders: OrderItem[];
}

const PendingOrdersSection = ({ orders }: PendingOrdersSectionProps) => {
  if (!orders.length) return <EmptyState title="Sin pedidos pendientes" />;

  return (
    <Card className="animate-panel-in p-0">
      <PanelHeader title="Pedidos Pendientes" />
      <div className="space-y-1 p-3">
        {orders.map(item => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-4 rounded-xl px-3 py-3 transition hover:bg-white/[0.03]"
          >
            <div className="min-w-0">
              <Paragraph className="font-medium text-[#dbe9ff]">#{item.orderNumber}</Paragraph>
              <Paragraph className="truncate text-text-secondary">{item.customer}</Paragraph>
            </div>
            <div className="text-right">
              <Badge variant={getOrderStatusVariant(item.status)} size="sm">
                {getOrderStatusLabel(item.status)}
              </Badge>
              <Muted className="mt-2">{item.date}</Muted>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PendingOrdersSection;
