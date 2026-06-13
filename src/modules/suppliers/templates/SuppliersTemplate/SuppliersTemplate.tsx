import { useState } from 'react';
import { Button, EmptyState, ErrorState, LoadingState, PageHeader } from '@/components/common';
import { useApiMutation } from '@/app/hooks';
import { useSuppliersCatalog, useSuppliersData } from '@/modules/suppliers/hooks';
import { SupplierCreateModal, SuppliersTable } from '@/modules/suppliers/organisms';
import { createSupplier } from '@/modules/suppliers/services';
import type { CreateSupplierInput } from '@/modules/suppliers/types';

const SuppliersTemplate = () => {
  const { data, isLoading, error, refetch } = useSuppliersData();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { suppliers } = useSuppliersCatalog(data?.suppliers ?? []);
  const createSupplierMutation = useApiMutation(createSupplier, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleCreateSupplier = async (supplierInput: CreateSupplierInput) => {
    const supplier = await createSupplierMutation.mutate(supplierInput);
    return Boolean(supplier);
  };

  const handleOpenCreateModal = () => {
    createSupplierMutation.reset();
    setIsCreateModalOpen(true);
  };

  if (isLoading) {
    return <LoadingState message="Cargando proveedores..." />;
  }

  if (error) {
    return <ErrorState title="Error al cargar proveedores" />;
  }

  if (!data) {
    return <EmptyState title="Sin datos de proveedores" />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Proveedores"
        subtitle="Gestiona los contactos y estado de tus distribuidores."
        action={
          <Button className="gap-2" onClick={handleOpenCreateModal}>
            <span aria-hidden="true">＋</span>
            Nuevo proveedor
          </Button>
        }
      />

      <SuppliersTable suppliers={suppliers} totalSuppliers={suppliers.length} />

      <SupplierCreateModal
        open={isCreateModalOpen}
        error={createSupplierMutation.error}
        isSaving={createSupplierMutation.isPending}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateSupplier}
      />
    </div>
  );
};

export default SuppliersTemplate;
