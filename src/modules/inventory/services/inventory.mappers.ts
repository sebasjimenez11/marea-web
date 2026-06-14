import type { CatalogItemDto } from '@/modules/products/services/products.mappers';
import type { InventoryItem, InventoryMovementDraft, InventoryMovementType } from '@/modules/inventory/types';

export type StockMovementDtoType = 'ENTRY' | 'EXIT' | 'ADJUSTMENT' | 'WASTE' | 'PURCHASE';

export interface StockMovementDto {
  id: string;
  productId: string;
  type: StockMovementDtoType;
  quantityUnits: number;
  previousUnits: number;
  newUnits: number;
  note: string | null;
  createdAt: string;
}

export interface CreateStockMovementPayload {
  itemId: string;
  quantityUnits: number;
  note?: string;
}

const normalizeStock = (totalUnits: number, unitsPerPackage: number) => ({
  cases: Math.floor(totalUnits / unitsPerPackage),
  units: totalUnits % unitsPerPackage,
});

const getMovementType = (type: StockMovementDtoType): InventoryMovementType => {
  switch (type) {
    case 'ENTRY':
    case 'PURCHASE':
      return 'entry';
    case 'EXIT':
    case 'WASTE':
      return 'exit';
    case 'ADJUSTMENT':
    default:
      return 'manual';
  }
};

const getMinutesAgo = (createdAt: string) => {
  const createdTime = new Date(createdAt).getTime();

  if (Number.isNaN(createdTime)) {
    return undefined;
  }

  return Math.max(0, Math.round((Date.now() - createdTime) / 60000));
};

export const mapCatalogItemToInventoryItem = (
  item: CatalogItemDto,
  lastMovement?: StockMovementDto,
): InventoryItem => {
  const unitsPerCase = Math.max(item.unitsPerPackage, 1);
  const stock = normalizeStock(item.currentUnits, unitsPerCase);
  const status = item.minimumUnits > 0 && item.currentUnits <= item.minimumUnits
    ? 'critical'
    : 'healthy';

  return {
    id: item.id,
    name: item.name,
    reference: item.sku || item.id,
    size: item.unit || 'unit',
    unitsPerCase,
    cases: stock.cases,
    units: stock.units,
    status,
    lastMovement: lastMovement
      ? {
          type: getMovementType(lastMovement.type),
          quantity: lastMovement.quantityUnits,
          minutesAgo: getMinutesAgo(lastMovement.createdAt),
          description: lastMovement.note || undefined,
        }
      : {
          type: 'manual',
          quantity: 0,
          description: 'Sin movimientos recientes',
        },
  };
};

export const mapInventoryDraftToStockMovementPayload = (
  draft: InventoryMovementDraft,
  item: InventoryItem,
): CreateStockMovementPayload => {
  const quantityUnits = (draft.cases * item.unitsPerCase) + draft.units;

  return {
    itemId: draft.itemId,
    quantityUnits,
    note: draft.comment?.trim() || undefined,
  };
};

