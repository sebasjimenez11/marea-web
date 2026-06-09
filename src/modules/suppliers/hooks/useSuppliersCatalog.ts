import { useMemo, useState } from 'react';
import { createSupplierFromInput } from '@/modules/suppliers/lib';
import type { CreateSupplierInput, Supplier } from '@/modules/suppliers/types';

export interface UseSuppliersCatalogResult {
  suppliers: Supplier[];
  handleCreateSupplier: (supplierInput: CreateSupplierInput) => void;
}

export const useSuppliersCatalog = (baseSuppliers: Supplier[] = []): UseSuppliersCatalogResult => {
  const [createdSuppliers, setCreatedSuppliers] = useState<Supplier[]>([]);

  const suppliers = useMemo(
    () => [...createdSuppliers, ...baseSuppliers],
    [baseSuppliers, createdSuppliers],
  );

  const handleCreateSupplier = (supplierInput: CreateSupplierInput) => {
    const nextSupplier = createSupplierFromInput(supplierInput);
    setCreatedSuppliers(current => [nextSupplier, ...current]);
  };

  return {
    suppliers,
    handleCreateSupplier,
  };
};
