export interface DashboardStats {
  income: number;
  expenses: number;
  balance: number;
}

export interface StockItem {
  id: string;
  name: string;
  stock: number;
  minimumStock: number;
  status: 'critical' | 'low' | 'normal';
  sku?: string;
}

export interface InvoiceItem {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
  status: 'overdue' | 'pending' | 'paid';
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  customer: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  date: string;
  items: number;
}

export interface DashboardData {
  stats: DashboardStats;
  stockItems: StockItem[];
  overdueInvoices: InvoiceItem[];
  pendingOrders: OrderItem[];
  isCashClosed: boolean;
  cashDifference: number | null;
  totalSupplierDebt: number;
  openInvoicesCount: number;
  outOfStockCount: number;
  lowStockCount: number;
}
export type { ApiResponse } from '@/app/api';
