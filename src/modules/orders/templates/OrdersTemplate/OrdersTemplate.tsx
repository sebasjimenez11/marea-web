import { useMemo, useState } from 'react';
import { EmptyState, ErrorState, LoadingState, PageHeader, SearchInput } from '@/components/common';
import { useOrdersData } from '@/modules/orders/hooks';
import { filterSupplierOrders, getOrdersSummary } from '@/modules/orders/lib';
import { OrdersSummary, OrdersSuppliersList } from '@/modules/orders/organisms';

const OrdersTemplate = () => {
  const { data, isLoading, error } = useOrdersData();
  const [search, setSearch] = useState('');

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

      <OrdersSummary summary={summary} />
      <OrdersSuppliersList suppliers={filteredSuppliers} />
    </div>
  );
};

export default OrdersTemplate;
