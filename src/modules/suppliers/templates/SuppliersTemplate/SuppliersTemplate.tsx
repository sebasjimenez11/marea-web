import { useState } from 'react';
import { Button, EmptyState, ErrorState, LoadingState, PageHeader } from '@/components/common';
import { useSuppliersCatalog, useSuppliersData } from '@/modules/suppliers/hooks';
import { SupplierCreateModal, SuppliersTable } from '@/modules/suppliers/organisms';

const SuppliersTemplate = () => {
  const { data, isLoading, error } = useSuppliersData();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { suppliers, handleCreateSupplier } = useSuppliersCatalog(data?.suppliers ?? []);

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
          <Button className="gap-2" onClick={() => setIsCreateModalOpen(true)}>
            <span aria-hidden="true">＋</span>
            Nuevo proveedor
          </Button>
        }
      />

      <SuppliersTable suppliers={suppliers} totalSuppliers={suppliers.length} />

      <SupplierCreateModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateSupplier}
      />
    </div>
  );
};

export default SuppliersTemplate;
