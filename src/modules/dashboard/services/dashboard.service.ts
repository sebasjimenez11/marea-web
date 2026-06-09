/**
 * Dashboard Service
 * Servicio centralizado para obtener datos del dashboard
 * Inicialmente con mocks, listo para conectar APIs
 */

import type {
  DashboardData,
  DashboardStats,
  StockItem,
  InvoiceItem,
  OrderItem,
  ApiResponse,
} from '@/modules/dashboard/types';

/**
 * Mock data para estadísticas
 */
const mockDashboardStats: DashboardStats = {
  income: 15420.50,
  expenses: 8230.75,
  balance: 7189.75,
};

/**
 * Mock data para stock crítico
 */
const mockCriticalStock: StockItem[] = [
  {
    id: '1',
    name: 'Cerveza Corona 355ml',
    stock: 5,
    minimumStock: 20,
    status: 'critical',
    sku: 'BEER-CORONA-355',
  },
  {
    id: '2',
    name: 'Vodka Premium',
    stock: 8,
    minimumStock: 15,
    status: 'low',
    sku: 'LIQ-VODKA-PREM',
  },
  {
    id: '3',
    name: 'Vasos de Vidrio 250ml',
    stock: 12,
    minimumStock: 50,
    status: 'critical',
    sku: 'GLASS-250',
  },
];

/**
 * Mock data para facturas vencidas
 */
const mockOverdueInvoices: InvoiceItem[] = [
  {
    id: '1',
    client: 'Juan García Restaurante',
    amount: 2500.00,
    dueDate: '2026-05-15',
    daysOverdue: 23,
    status: 'overdue',
  },
  {
    id: '2',
    client: 'María López Eventos',
    amount: 3200.00,
    dueDate: '2026-05-28',
    daysOverdue: 10,
    status: 'overdue',
  },
  {
    id: '3',
    client: 'Carlos Morales Catering',
    amount: 1800.00,
    dueDate: '2026-06-05',
    daysOverdue: 2,
    status: 'pending',
  },
];

/**
 * Mock data para pedidos pendientes
 */
const mockPendingOrders: OrderItem[] = [
  {
    id: '1',
    orderNumber: 'PED-001256',
    customer: 'Restaurante Central',
    status: 'pending',
    date: '2026-06-07',
    items: 12,
  },
  {
    id: '2',
    orderNumber: 'PED-001257',
    customer: 'Hotel Vista al Mar',
    status: 'in-progress',
    date: '2026-06-06',
    items: 25,
  },
  {
    id: '3',
    orderNumber: 'PED-001258',
    customer: 'Cafetería El Aroma',
    status: 'pending',
    date: '2026-06-05',
    items: 8,
  },
];

/**
 * Simulación de delay de API
 */
const MOCK_DELAY = 300;

/**
 * Utilidad para simular delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const createSuccessResponse = <T,>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

/**
 * Obtener estadísticas del dashboard
 */
export const getDashboardStats = async (): Promise<ApiResponse<DashboardStats>> => {
  await delay(MOCK_DELAY);
  return createSuccessResponse(mockDashboardStats);
};

/**
 * Obtener items con stock crítico
 */
export const getCriticalStock = async (): Promise<ApiResponse<StockItem[]>> => {
  await delay(MOCK_DELAY);
  return createSuccessResponse(mockCriticalStock);
};

/**
 * Obtener facturas vencidas
 */
export const getOverdueInvoices = async (): Promise<ApiResponse<InvoiceItem[]>> => {
  await delay(MOCK_DELAY);
  return createSuccessResponse(mockOverdueInvoices);
};

/**
 * Obtener pedidos pendientes
 */
export const getPendingOrders = async (): Promise<ApiResponse<OrderItem[]>> => {
  await delay(MOCK_DELAY);
  return createSuccessResponse(mockPendingOrders);
};

/**
 * Obtener todos los datos del dashboard en una sola carga
 */
export const getDashboardData = async (): Promise<ApiResponse<DashboardData>> => {
  await delay(MOCK_DELAY);

  return createSuccessResponse({
    stats: mockDashboardStats,
    stockItems: mockCriticalStock,
    overdueInvoices: mockOverdueInvoices,
    pendingOrders: mockPendingOrders,
  });
};
