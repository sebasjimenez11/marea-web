import type {
  DashboardData,
  DashboardStats,
  InvoiceItem,
  OrderItem,
  StockItem,
} from '@/modules/dashboard/types';

export interface DashboardSummaryDto {
  generatedAt: string;
  businessDate: string;
  inventory: {
    activeItemsCount: number;
    lowStockCount: number;
    outOfStockCount: number;
    lowStockItems: DashboardStockItemDto[];
    outOfStockItems: DashboardStockItemDto[];
  };
  purchasing: {
    totalDebtCents: number;
    openInvoicesCount: number;
    overdueInvoicesCount: number;
    pendingOrdersCount: number;
    overdueInvoices: DashboardOverdueInvoiceDto[];
  };
  cash: {
    totalIncomeCents: number;
    totalExpensesCents: number;
    dailyBalanceCents: number;
    cashDifferenceCents: number | null;
    isClosed: boolean;
  };
}

interface DashboardStockItemDto {
  id: string;
  name: string;
  sku: string | null;
  currentUnits: number;
  minimumUnits: number;
}

interface DashboardOverdueInvoiceDto {
  id: string;
  invoiceNumber: string | null;
  dueDate: string | null;
  pendingAmountCents: number;
  supplier: {
    id: string;
    name: string;
  };
}

const euros = (cents: number) => cents / 100;

const formatDate = (date: string | null) => {
  if (!date) {
    return '-';
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(date));
};

const getDaysOverdue = (date: string | null) => {
  if (!date) {
    return 0;
  }

  const today = new Date();
  const dueDate = new Date(date);
  const diffMs = today.getTime() - dueDate.getTime();

  return Math.max(0, Math.floor(diffMs / 86400000));
};

const mapStockItem = (item: DashboardStockItemDto, status: StockItem['status']): StockItem => ({
  id: item.id,
  name: item.name,
  stock: item.currentUnits,
  minimumStock: item.minimumUnits,
  status,
  sku: item.sku || undefined,
});

const mapOverdueInvoice = (invoice: DashboardOverdueInvoiceDto): InvoiceItem => ({
  id: invoice.id,
  client: invoice.supplier.name,
  amount: euros(invoice.pendingAmountCents),
  dueDate: formatDate(invoice.dueDate),
  daysOverdue: getDaysOverdue(invoice.dueDate),
  status: 'overdue',
});

const mapPendingOrders = (count: number, businessDate: string): OrderItem[] => {
  if (count <= 0) {
    return [];
  }

  return [
    {
      id: 'pending-orders-summary',
      orderNumber: `${count} pendiente${count === 1 ? '' : 's'}`,
      customer: 'Pedidos de proveedor',
      status: 'pending',
      date: formatDate(businessDate),
      items: count,
    },
  ];
};

export const mapDashboardSummaryToData = (summary: DashboardSummaryDto): DashboardData => {
  const stats: DashboardStats = {
    income: euros(summary.cash.totalIncomeCents),
    expenses: euros(summary.cash.totalExpensesCents),
    balance: euros(summary.cash.dailyBalanceCents),
  };

  return {
    stats,
    stockItems: [
      ...summary.inventory.outOfStockItems.map(item => mapStockItem(item, 'critical')),
      ...summary.inventory.lowStockItems.map(item => mapStockItem(item, 'low')),
    ],
    overdueInvoices: summary.purchasing.overdueInvoices.map(mapOverdueInvoice),
    pendingOrders: mapPendingOrders(summary.purchasing.pendingOrdersCount, summary.businessDate),
    isCashClosed: summary.cash.isClosed,
    cashDifference: summary.cash.cashDifferenceCents === null
      ? null
      : euros(summary.cash.cashDifferenceCents),
    totalSupplierDebt: euros(summary.purchasing.totalDebtCents),
    openInvoicesCount: summary.purchasing.openInvoicesCount,
    outOfStockCount: summary.inventory.outOfStockCount,
    lowStockCount: summary.inventory.lowStockCount,
  };
};

