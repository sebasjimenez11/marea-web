export interface SuggestedOrderItem {
  id: string;
  productName: string;
  currentStock: string;
  targetStock: string;
  suggestedOrder: string;
  suggestedCases: number;
}

export interface SupplierOrderGroup {
  id: string;
  supplierName: string;
  supplierStatus: 'active' | 'inactive';
  icon: 'truck' | 'star' | 'warehouse';
  estimatedValue: number;
  items: SuggestedOrderItem[];
}

export interface OrdersData {
  suppliers: SupplierOrderGroup[];
}

export interface OrdersSummary {
  totalSuggestedProducts: number;
  affectedSuppliers: number;
  estimatedValue: number;
}

export type { ApiResponse } from '@/app/api';
