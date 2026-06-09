import type {
  InventoryItem,
  InventoryMovementDraft,
  InventoryMovementType,
  InventoryStatus,
} from '@/modules/inventory/types';

export const filterInventoryItems = (items: InventoryItem[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return items;
  }

  return items.filter(item =>
    `${item.name} ${item.reference} ${item.size}`.toLowerCase().includes(normalizedQuery),
  );
};

export const getInventoryStatusAccent = (status: InventoryStatus) => {
  return status === 'critical'
    ? 'border-l-[#f0a0a0] bg-[linear-gradient(180deg,rgba(33,43,73,1)_0%,rgba(29,38,63,1)_100%)]'
    : 'border-l-[#3b6db0] bg-[linear-gradient(180deg,rgba(29,41,71,1)_0%,rgba(23,33,58,1)_100%)]';
};

export const getMovementLabel = (type: InventoryMovementType) => {
  switch (type) {
    case 'entry':
      return 'Entrada';
    case 'exit':
      return 'Salida';
    case 'manual':
      return 'Ajuste manual';
    default:
      return type;
  }
};

export const getMovementBadgeClasses = (type: InventoryMovementType) => {
  switch (type) {
    case 'entry':
      return 'bg-emerald-400/14 text-emerald-300';
    case 'exit':
      return 'bg-sky-400/14 text-sky-300';
    case 'manual':
      return 'bg-white/10 text-text-secondary';
    default:
      return 'bg-white/10 text-text-secondary';
  }
};

export const getMovementDescription = (item: InventoryItem) => {
  if (item.lastMovement.description) {
    return item.lastMovement.description;
  }

  const action = getMovementLabel(item.lastMovement.type).toLowerCase();
  const time = item.lastMovement.minutesAgo ? `hace ${item.lastMovement.minutesAgo} min` : 'reciente';
  return `${action}: ${item.lastMovement.quantity} uds (${time})`;
};

export const toTotalUnits = (item: Pick<InventoryItem, 'cases' | 'units' | 'unitsPerCase'>) =>
  (item.cases * item.unitsPerCase) + item.units;

export const normalizeStock = (totalUnits: number, unitsPerCase: number) => ({
  cases: Math.floor(totalUnits / unitsPerCase),
  units: totalUnits % unitsPerCase,
});

export const formatStock = (cases: number, units: number) => `${cases} cajas + ${units} uds`;

export const resolveInventoryStatus = (totalUnits: number, unitsPerCase: number): InventoryStatus =>
  totalUnits <= unitsPerCase ? 'critical' : 'healthy';

export const getDraftTotalUnits = (
  draft: Pick<InventoryMovementDraft, 'cases' | 'units'>,
  unitsPerCase: number,
) => (draft.cases * unitsPerCase) + draft.units;

export interface ProjectedStock {
  currentTotal: number;
  nextTotal: number;
  current: {
    cases: number;
    units: number;
  };
  next: {
    cases: number;
    units: number;
  };
}

export const getProjectedStock = (
  item: Pick<InventoryItem, 'cases' | 'units' | 'unitsPerCase'>,
  movement: Pick<InventoryMovementDraft, 'type' | 'cases' | 'units'>,
): ProjectedStock | null => {
  const currentTotal = toTotalUnits(item);
  const delta = getDraftTotalUnits(movement, item.unitsPerCase);
  const nextTotal = movement.type === 'entry'
    ? currentTotal + delta
    : currentTotal - delta;

  if (nextTotal < 0) {
    return null;
  }

  return {
    currentTotal,
    nextTotal,
    current: normalizeStock(currentTotal, item.unitsPerCase),
    next: normalizeStock(nextTotal, item.unitsPerCase),
  };
};
