import type { ApiResponse, InventoryData, InventoryItem } from '@/modules/inventory/types';

const inventoryItems: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Gin Bombay Sapphire',
    reference: 'REF G-001',
    size: '70cl',
    unitsPerCase: 6,
    cases: 4,
    units: 8,
    status: 'healthy',
    lastMovement: {
      type: 'exit',
      quantity: 2,
      minutesAgo: 10,
    },
  },
  {
    id: 'inv-2',
    name: 'Cerveza Estrella Galicia',
    reference: 'REF B-042',
    size: '33cl',
    unitsPerCase: 24,
    cases: 0,
    units: 12,
    status: 'critical',
    lastMovement: {
      type: 'manual',
      quantity: 0,
      description: 'Stock crítico',
    },
  },
  {
    id: 'inv-3',
    name: 'Agua Mineral Bezoya',
    reference: 'REF W-011',
    size: '50cl',
    unitsPerCase: 12,
    cases: 12,
    units: 0,
    status: 'healthy',
    lastMovement: {
      type: 'manual',
      quantity: 0,
      description: 'Ajuste manual (ayer)',
    },
  },
];

const createSuccessResponse = <T,>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getInventoryData = async (): Promise<ApiResponse<InventoryData>> => {
  await delay(220);
  return createSuccessResponse({ items: inventoryItems });
};
