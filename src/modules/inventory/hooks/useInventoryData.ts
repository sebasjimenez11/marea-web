import { useState } from 'react';
import { useAsyncResource, type UseAsyncResourceResult } from '@/app/hooks';
import {
  getDraftTotalUnits,
  normalizeStock,
  resolveInventoryStatus,
} from '@/modules/inventory/lib';
import { getInventoryData } from '@/modules/inventory/services';
import type { InventoryData, InventoryMovementDraft } from '@/modules/inventory/types';

interface UseInventoryDataReturn extends UseAsyncResourceResult<InventoryData> {
  applyMovement: (draft: InventoryMovementDraft) => void;
}

export const useInventoryData = (): UseInventoryDataReturn => {
  const resource = useAsyncResource(getInventoryData);
  const [localData, setLocalData] = useState<InventoryData | null>(null);

  const data = localData ?? resource.data;

  const applyMovement = (draft: InventoryMovementDraft) => {
    setLocalData(current => {
      const source = current ?? resource.data;

      if (!source) {
        return current;
      }

      return {
        items: source.items.map(item => {
          if (item.id !== draft.itemId) {
            return item;
          }

          const delta = getDraftTotalUnits(draft, item.unitsPerCase);
          const currentTotal = (item.cases * item.unitsPerCase) + item.units;
          const nextTotal = draft.type === 'entry'
            ? currentTotal + delta
            : Math.max(0, currentTotal - delta);
          const nextStock = normalizeStock(nextTotal, item.unitsPerCase);

          return {
            ...item,
            ...nextStock,
            status: resolveInventoryStatus(nextTotal, item.unitsPerCase),
            lastMovement: {
              type: draft.type,
              quantity: delta,
              description: draft.comment?.trim() || undefined,
            },
          };
        }),
      };
    });
  };

  return {
    ...resource,
    data,
    applyMovement,
  };
};
