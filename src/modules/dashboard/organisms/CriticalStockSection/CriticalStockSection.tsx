import { Badge, Card, EmptyState, IconTile, Muted, PanelActionButton, Paragraph } from '@/components/common';
import { getStockBadgeLabel } from '@/modules/dashboard/lib';
import { PanelHeader } from '@/modules/dashboard/molecules';
import type { StockItem } from '@/modules/dashboard/types';

interface CriticalStockSectionProps {
  items: StockItem[];
}

const CriticalStockSection = ({ items }: CriticalStockSectionProps) => {
  if (!items.length) {
    return (
      <EmptyState
        title="Stock normal"
        message="Todos los productos tienen stock adecuado"
      />
    );
  }

  return (
    <Card className="animate-panel-in p-0">
      <PanelHeader
        title="Stock Crítico"
        action={
          <PanelActionButton type="button">
            Ver todo
          </PanelActionButton>
        }
      />
      <div className="space-y-2 p-3">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/[0.03]"
          >
            <IconTile>☐</IconTile>
            <div className="min-w-0 flex-1">
              <Paragraph className="truncate font-medium">{item.name}</Paragraph>
              <Muted>{item.stock}/{item.minimumStock} uds</Muted>
            </div>
            <Badge variant={item.status === 'critical' ? 'error' : 'warning'} size="sm">
              {getStockBadgeLabel(item)}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CriticalStockSection;
