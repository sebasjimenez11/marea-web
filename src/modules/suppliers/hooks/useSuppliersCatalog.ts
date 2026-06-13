import type { Supplier } from '@/modules/suppliers/types';

export interface UseSuppliersCatalogResult {
  suppliers: Supplier[];
}

export const useSuppliersCatalog = (baseSuppliers: Supplier[] = []): UseSuppliersCatalogResult => {
  return {
    suppliers: baseSuppliers,
  };
};
