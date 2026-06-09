import type { ApiResponse, Supplier, SuppliersData } from '@/modules/suppliers/types';

const suppliers: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Distribuciones Sur S.L.',
    phone: '+34 912 345 678',
    email: 'contacto@distsur.com',
    status: 'active',
  },
  {
    id: 'sup-2',
    name: 'Bebidas Premium S.A.',
    phone: '+34 600 111 222',
    email: 'pedidos@bebidaspremium.es',
    status: 'active',
  },
  {
    id: 'sup-3',
    name: 'Licores del Norte',
    phone: '+34 944 555 666',
    email: 'info@licoresnorte.com',
    status: 'inactive',
  },
];

const createSuccessResponse = <T,>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getSuppliersData = async (): Promise<ApiResponse<SuppliersData>> => {
  await delay(180);
  return createSuccessResponse({ suppliers });
};
