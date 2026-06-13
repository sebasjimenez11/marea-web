export type SupplierStatus = 'active' | 'inactive';

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: SupplierStatus;
}

export interface CreateSupplierInput {
  name: string;
  phone: string;
  email: string;
  status: SupplierStatus;
}

export interface SuppliersData {
  suppliers: Supplier[];
}

export type { ApiResponse } from '@/app/api';
