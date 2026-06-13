import type { CreateSupplierInput, Supplier, SupplierStatus } from '@/modules/suppliers/types';

export interface CatalogSupplierDto {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  notes: string | null;
  active: boolean;
}

export interface CreateCatalogSupplierPayload {
  name: string;
  phone?: string;
  email?: string;
  active: boolean;
}

const mapStatus = (active: boolean): SupplierStatus => active ? 'active' : 'inactive';

export const mapCatalogSupplierToSupplier = (supplier: CatalogSupplierDto): Supplier => ({
  id: supplier.id,
  name: supplier.name,
  phone: supplier.phone || '',
  email: supplier.email || '',
  status: mapStatus(supplier.active),
});

export const mapCreateSupplierInputToCatalogPayload = (
  input: CreateSupplierInput,
): CreateCatalogSupplierPayload => ({
  name: input.name,
  phone: input.phone || undefined,
  email: input.email || undefined,
  active: input.status === 'active',
});

