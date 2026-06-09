import type { BadgeProps } from '@/components/common';
import type { CreateSupplierInput, Supplier, SupplierStatus } from '@/modules/suppliers/types';

export const createInitialSupplierForm = (): CreateSupplierInput => ({
  name: '',
  phone: '',
  email: '',
  status: 'active',
});

export const createSupplierFromInput = (supplierInput: CreateSupplierInput): Supplier => ({
  id: `sup-${crypto.randomUUID()}`,
  ...supplierInput,
});

export const getSupplierStatusLabel = (status: SupplierStatus) => {
  switch (status) {
    case 'active':
      return 'Activo';
    case 'inactive':
      return 'Inactivo';
    default:
      return status;
  }
};

export const getSupplierStatusVariant = (status: SupplierStatus): BadgeProps['variant'] => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'default';
    default:
      return 'default';
  }
};
