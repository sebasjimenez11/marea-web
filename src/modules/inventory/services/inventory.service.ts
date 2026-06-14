import { api } from '@/app/api';
import type { CatalogItemDto } from '@/modules/products/services/products.mappers';
import {
  mapCatalogItemToInventoryItem,
  mapInventoryDraftToStockMovementPayload,
  type CreateStockMovementPayload,
  type StockMovementDto,
} from '@/modules/inventory/services/inventory.mappers';
import type { ApiResponse, InventoryData, InventoryItem, InventoryMovementDraft } from '@/modules/inventory/types';

interface ApiListPayload<T> {
  data: T[];
  meta: {
    total: number;
    page?: number;
    limit?: number;
  };
}

interface ApiDataPayload<T> {
  data: T;
}

const createSuccessResponse = <T,>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

const createErrorResponse = <T,>(message: string): ApiResponse<T> => ({
  success: false,
  error: {
    code: 'INVENTORY_ERROR',
    message,
  },
});

const getLastMovementByItemId = (movements: StockMovementDto[]) => {
  const movementByItemId = new Map<string, StockMovementDto>();

  movements.forEach(movement => {
    if (!movementByItemId.has(movement.productId)) {
      movementByItemId.set(movement.productId, movement);
    }
  });

  return movementByItemId;
};

export const getInventoryData = async (
  signal?: AbortSignal,
): Promise<ApiResponse<InventoryData>> => {
  const [itemsResponse, movementsResponse] = await Promise.all([
    api.get<ApiListPayload<CatalogItemDto>>('/catalog/items', { active: true, limit: 100 }, { signal }),
    api.get<ApiListPayload<StockMovementDto>>('/stock/movements', { limit: 100 }, { signal }),
  ]);

  if (!itemsResponse.success || !itemsResponse.data) {
    return createErrorResponse(
      itemsResponse.error?.message || 'No se pudo cargar el inventario',
    );
  }

  if (!movementsResponse.success || !movementsResponse.data) {
    return createErrorResponse(
      movementsResponse.error?.message || 'No se pudieron cargar los movimientos',
    );
  }

  const lastMovementByItemId = getLastMovementByItemId(movementsResponse.data.data);

  return createSuccessResponse({
    items: itemsResponse.data.data.map(item =>
      mapCatalogItemToInventoryItem(item, lastMovementByItemId.get(item.id)),
    ),
  });
};

export const createInventoryMovement = async (
  draft: InventoryMovementDraft,
  items: InventoryItem[],
  signal?: AbortSignal,
): Promise<ApiResponse<InventoryItem>> => {
  const item = items.find(currentItem => currentItem.id === draft.itemId);

  if (!item) {
    return createErrorResponse('Producto no encontrado en inventario');
  }

  const endpoint = draft.type === 'entry'
    ? '/stock/movements/entry'
    : '/stock/movements/exit';

  const response = await api.post<ApiDataPayload<StockMovementDto>, CreateStockMovementPayload>(
    endpoint,
    mapInventoryDraftToStockMovementPayload(draft, item),
    { signal },
  );

  if (!response.success || !response.data?.data) {
    return {
      success: false,
      error: response.error || {
        code: 'CREATE_INVENTORY_MOVEMENT_ERROR',
        message: 'No se pudo registrar el movimiento',
      },
    };
  }

  return createSuccessResponse(item);
};
