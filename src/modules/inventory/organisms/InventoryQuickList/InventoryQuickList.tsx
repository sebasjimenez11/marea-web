import { Card, EmptyState } from '@/components/common';
import { InventoryCount, MovementPill } from '@/modules/inventory/atoms';
import {
  getInventoryStatusAccent,
  getMovementBadgeClasses,
  getMovementDescription,
} from '@/modules/inventory/lib';
import { InventoryActionGroup, InventoryCardHeader } from '@/modules/inventory/molecules';
import type { InventoryItem } from '@/modules/inventory/types';

export interface InventoryQuickListProps {
  items: InventoryItem[];
  onEntry: (item: InventoryItem) => void;
  onExit: (item: InventoryItem) => void;
}

const InventoryQuickList = ({ items, onEntry, onExit }: InventoryQuickListProps) => {
  if (!items.length) {
    return (
      <EmptyState
        title="Sin productos"
        message="No hay coincidencias para el filtro actual."
      />
    );
  }

  return (
    <div className="space-y-4">
      {items.map(item => (
        <Card
          key={item.id}
          className={`animate-panel-in border-l-4 p-4 ${getInventoryStatusAccent(item.status)}`}
        >
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-1 flex-col gap-4 xl:flex-row xl:items-center xl:gap-8">
              <InventoryCardHeader
                name={item.name}
                reference={item.reference}
                size={item.size}
              />
              <div className="space-y-2">
                <InventoryCount cases={item.cases} units={item.units} />
                <MovementPill
                  label={getMovementDescription(item)}
                  className={getMovementBadgeClasses(item.lastMovement.type)}
                />
              </div>
            </div>

            <InventoryActionGroup
              onEntry={() => onEntry(item)}
              onExit={() => onExit(item)}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default InventoryQuickList;
