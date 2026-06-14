import { useMemo, useState } from 'react';
import { AlertBanner, EmptyState, ErrorState, LoadingState, PageHeader, SearchInput } from '@/components/common';
import { useApiMutation } from '@/app/hooks';
import { useOrdersData } from '@/modules/orders/hooks';
import { filterSupplierOrders, getOrdersSummary } from '@/modules/orders/lib';
import { OrdersSummary, OrdersSuppliersList } from '@/modules/orders/organisms';
import { createSupplierOrderFromSuggestion } from '@/modules/orders/services';
import type { SupplierOrderGroup } from '@/modules/orders/types';

const OrdersTemplate = () => {
  const { data, isLoading, error, refetch } = useOrdersData();
  const [search, setSearch] = useState('');
  const [generatingSupplierId, setGeneratingSupplierId] = useState<string | null>(null);
  const createOrderMutation = useApiMutation(createSupplierOrderFromSuggestion, {
    onSettled: () => {
      setGeneratingSupplierId(null);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const filteredSuppliers = useMemo(() => {
    if (!data) {
      return [];
    }

    return filterSupplierOrders(data.suppliers, search);
  }, [data, search]);

  if (isLoading) {
    return <LoadingState message="Cargando pedidos sugeridos..." />;
  }

  if (error) {
    return <ErrorState title="Error al cargar pedidos" />;
  }

  if (!data) {
    return <EmptyState title="Sin datos de pedidos" />;
  }

  const summary = getOrdersSummary(filteredSuppliers);

  const handleGenerateOrder = (supplier: SupplierOrderGroup) => {
    setGeneratingSupplierId(supplier.id);
    createOrderMutation.mutate(supplier);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pedidos Sugeridos"
        subtitle="Revisa faltantes por proveedor y genera reposiciones rápidamente."
      />

      <div className="max-w-md">
        <SearchInput
          value={search}
          onSearch={setSearch}
          placeholder="Buscar pedidos..."
          className="w-full"
        />
      </div>

      {createOrderMutation.error && (
        <AlertBanner
          key={createOrderMutation.error.message}
          type="error"
          title="No se pudo generar el pedido"
          message={createOrderMutation.error.message}
        />
      )}

      <OrdersSummary summary={summary} />
      <OrdersSuppliersList
        suppliers={filteredSuppliers}
        generatingSupplierId={generatingSupplierId}
        onGenerateOrder={handleGenerateOrder}
      />
    </div>
  );
};

export default OrdersTemplate;
