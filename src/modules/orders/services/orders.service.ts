import type { ApiResponse, OrdersData, SupplierOrderGroup } from '@/modules/orders/types';

const suppliers: SupplierOrderGroup[] = [
  {
    id: 'sup-order-1',
    supplierName: 'Distribuciones Sur',
    supplierStatus: 'active',
    icon: 'truck',
    estimatedValue: 640,
    items: [
      {
        id: 'order-item-1',
        productName: 'Cerveza Lager (Barril 50L)',
        currentStock: '1 barril',
        targetStock: '5 barriles',
        suggestedOrder: '4 barriles',
        suggestedCases: 4,
      },
      {
        id: 'order-item-2',
        productName: 'Vino Tinto Joven',
        currentStock: '2 cajas + 4 uds',
        targetStock: '6 cajas',
        suggestedOrder: '4 cajas',
        suggestedCases: 4,
      },
      {
        id: 'order-item-3',
        productName: 'Agua Mineral 500ml',
        currentStock: '0 cajas + 5 uds',
        targetStock: '10 cajas',
        suggestedOrder: '10 cajas',
        suggestedCases: 10,
      },
    ],
  },
  {
    id: 'sup-order-2',
    supplierName: 'Bebidas Premium',
    supplierStatus: 'active',
    icon: 'star',
    estimatedValue: 600,
    items: [
      {
        id: 'order-item-4',
        productName: 'Ginebra London Dry',
        currentStock: '1 caja + 2 uds',
        targetStock: '3 cajas',
        suggestedOrder: '2 cajas',
        suggestedCases: 2,
      },
      {
        id: 'order-item-5',
        productName: 'Vodka Premium',
        currentStock: '0 cajas + 3 uds',
        targetStock: '2 cajas',
        suggestedOrder: '2 cajas',
        suggestedCases: 2,
      },
      {
        id: 'order-item-6',
        productName: 'Tónica Indian',
        currentStock: '1 caja',
        targetStock: '3 cajas',
        suggestedOrder: '2 cajas',
        suggestedCases: 2,
      },
    ],
  },
];

const createSuccessResponse = <T,>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getOrdersData = async (): Promise<ApiResponse<OrdersData>> => {
  await delay(220);

  return createSuccessResponse({ suppliers });
};
