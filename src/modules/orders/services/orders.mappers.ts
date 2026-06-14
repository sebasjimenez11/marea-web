import type { SupplierOrderGroup, SuggestedOrderItem } from '@/modules/orders/types';

export interface SuggestedSupplierOrdersDto {
  supplier: {
    id: string;
    name: string;
    active: boolean;
  } | null;
  items: Array<{
    itemId: string;
    name: string;
    sku: string | null;
    category: string | null;
    currentUnits: number;
    targetUnits: number;
    suggestedUnits: number;
  }>;
}

export interface CreateSupplierOrderPayload {
  supplierId: string;
  status: 'PENDING';
  items: Array<{
    itemId: string;
    quantityUnits: number;
  }>;
}

export interface SupplierOrderDto {
  id: string;
  supplierId: string;
  status: 'DRAFT' | 'PENDING' | 'RECEIVED' | 'CANCELLED';
}

const formatUnits = (units: number) => `${units} uds`;

const mapSuggestedItem = (item: SuggestedSupplierOrdersDto['items'][number]): SuggestedOrderItem => ({
  id: item.itemId,
  productName: item.name,
  currentStock: formatUnits(item.currentUnits),
  targetStock: formatUnits(item.targetUnits),
  suggestedOrder: formatUnits(item.suggestedUnits),
  suggestedCases: item.suggestedUnits,
});

export const mapSuggestedSupplierOrderToGroup = (
  suggestion: SuggestedSupplierOrdersDto,
  index: number,
): SupplierOrderGroup => {
  const supplier = suggestion.supplier;

  return {
    id: supplier?.id || `unassigned-supplier-${index}`,
    supplierId: supplier?.id ?? null,
    supplierName: supplier?.name || 'Sin proveedor asignado',
    supplierStatus: supplier?.active ? 'active' : 'inactive',
    icon: supplier ? 'truck' : 'warehouse',
    estimatedValue: 0,
    canGenerateOrder: Boolean(supplier?.id),
    generateDisabledReason: supplier?.id
      ? undefined
      : 'Asigna proveedor a estos productos para generar un pedido.',
    items: suggestion.items.map(mapSuggestedItem),
  };
};

export const mapSuggestedGroupToCreateOrderPayload = (
  group: SupplierOrderGroup,
): CreateSupplierOrderPayload | null => {
  if (!group.supplierId) {
    return null;
  }

  return {
    supplierId: group.supplierId,
    status: 'PENDING',
    items: group.items.map(item => ({
      itemId: item.id,
      quantityUnits: item.suggestedCases,
    })),
  };
};
