import { EmptyState, ErrorState, LoadingState, PageHeader } from '@/components/common';
import { useInvoiceFilters, useInvoicesData } from '@/modules/invoices/hooks';
import { getInvoicesSummary } from '@/modules/invoices/lib';
import { InvoicesFiltersBar } from '@/modules/invoices/molecules';
import { InvoicesSummary, InvoicesTable } from '@/modules/invoices/organisms';

const InvoicesTemplate = () => {
  const { data, isLoading, error } = useInvoicesData();
  const { filters, filteredInvoices, setSearch, setStatus } = useInvoiceFilters(data?.invoices ?? []);

  if (isLoading) {
    return <LoadingState message="Cargando facturas..." />;
  }

  if (error) {
    return <ErrorState title="Error al cargar facturas" />;
  }

  if (!data) {
    return <EmptyState title="Sin datos de facturas" />;
  }

  const summary = getInvoicesSummary(data.invoices);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Facturas"
        subtitle="Controla pagos, vencimientos y recepción de facturas en un entorno oscuro y operativo."
      />

      <InvoicesSummary summary={summary} />

      <InvoicesFiltersBar
        search={filters.search}
        status={filters.status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <InvoicesTable invoices={filteredInvoices} totalInvoices={data.invoices.length} />
    </div>
  );
};

export default InvoicesTemplate;
