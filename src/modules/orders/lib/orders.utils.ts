import type { OrdersSummary, SupplierOrderGroup } from '@/modules/orders/types';

export const formatOrdersCurrency = (value: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

export const getOrdersSummary = (suppliers: SupplierOrderGroup[]): OrdersSummary => ({
  totalSuggestedProducts: suppliers.reduce((total, supplier) => total + supplier.items.length, 0),
  affectedSuppliers: suppliers.filter(supplier => supplier.supplierStatus === 'active').length,
  estimatedValue: suppliers.reduce((total, supplier) => total + supplier.estimatedValue, 0),
});

export const filterSupplierOrders = (suppliers: SupplierOrderGroup[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return suppliers;
  }

  return suppliers
    .map(supplier => ({
      ...supplier,
      items: supplier.items.filter(item =>
        `${supplier.supplierName} ${item.productName}`.toLowerCase().includes(normalizedQuery),
      ),
    }))
    .filter(supplier => supplier.items.length > 0);
};

export const getSupplierOrderIcon = (icon: SupplierOrderGroup['icon']) => {
  switch (icon) {
    case 'truck':
      return '↪';
    case 'star':
      return '★';
    case 'warehouse':
      return '◫';
    default:
      return '•';
  }
};
