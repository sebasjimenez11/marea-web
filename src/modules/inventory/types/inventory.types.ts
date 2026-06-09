export type InventoryStatus = 'healthy' | 'critical';
export type InventoryMovementType = 'entry' | 'exit' | 'manual';

export interface InventoryItem {
  id: string;
  name: string;
  reference: string;
  size: string;
  unitsPerCase: number;
  cases: number;
  units: number;
  status: InventoryStatus;
  lastMovement: {
    type: InventoryMovementType;
    quantity: number;
    minutesAgo?: number;
    description?: string;
  };
}

export interface InventoryData {
  items: InventoryItem[];
}

export interface InventoryMovementDraft {
  itemId: string;
  type: Extract<InventoryMovementType, 'entry' | 'exit'>;
  cases: number;
  units: number;
  comment?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
