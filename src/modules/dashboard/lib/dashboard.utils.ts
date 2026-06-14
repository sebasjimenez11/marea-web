import type { DashboardData, OrderItem, StockItem } from '@/modules/dashboard/types';

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(value);

export const getStockBadgeLabel = (item: StockItem) =>
  item.status === 'critical'
    ? `${item.stock} cajas + 2 uds`
    : `${item.stock} cajas + 0 uds`;

export const getOrderStatusLabel = (status: OrderItem['status']) => {
  switch (status) {
    case 'pending':
      return 'Pendiente';
    case 'in-progress':
      return 'Procesando';
    case 'completed':
      return 'Completado';
    case 'cancelled':
      return 'Cancelado';
    default:
      return status;
  }
};

export const getOrderStatusVariant = (status: OrderItem['status']) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'in-progress':
      return 'info';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

export interface DashboardPrimaryMetric {
  title: string;
  value: string;
  detail: string;
  iconClassName: string;
  icon: string;
}

export interface DashboardCompactMetric {
  label: string;
  value: number;
  toneClassName: string;
}

export interface DashboardSummaryMetrics {
  primaryMetrics: DashboardPrimaryMetric[];
  compactMetrics: DashboardCompactMetric[];
  cashDiff: number;
  supplierDebt: number;
}

export const getDashboardSummaryMetrics = (dashboardData: DashboardData): DashboardSummaryMetrics => {
  const { stats, pendingOrders } = dashboardData;
  const criticalProducts = dashboardData.outOfStockCount;
  const lowStockProducts = dashboardData.lowStockCount;
  const pendingInvoices = dashboardData.openInvoicesCount;
  const activeOrders = pendingOrders.filter(item => item.status !== 'completed').length;
  const cashDiff = dashboardData.cashDifference ?? 0;
  const supplierDebt = dashboardData.totalSupplierDebt;

  return {
    primaryMetrics: [
      {
        title: 'Ingresos hoy',
        value: formatCurrency(stats.income),
        detail: '+12% vs ayer',
        iconClassName: 'bg-[#4d9fff]/16 text-[#9ec7ff]',
        icon: '€',
      },
      {
        title: 'Egresos hoy',
        value: formatCurrency(stats.expenses),
        detail: 'Consumo operativo',
        iconClassName: 'bg-[#de8a00]/14 text-[#ffcc80]',
        icon: '↘',
      },
      {
        title: 'Balance hoy',
        value: formatCurrency(stats.balance),
        detail: 'Disponible en caja',
        iconClassName: 'bg-white/8 text-[#d6e7ff]',
        icon: '◫',
      },
    ],
    compactMetrics: [
      { label: 'Productos sin stock', value: criticalProducts, toneClassName: 'bg-[#f5b1aa]' },
      { label: 'Productos bajo stock', value: lowStockProducts, toneClassName: 'bg-[#ffc369]' },
      { label: 'Facturas pendientes', value: pendingInvoices, toneClassName: 'bg-[#9ec7ff]' },
      { label: 'Pedidos pendientes', value: activeOrders, toneClassName: 'bg-[#8fb7ff]' },
    ],
    cashDiff,
    supplierDebt,
  };
};
