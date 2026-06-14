import { useState } from 'react';
import { EmptyState, ErrorState, LoadingState, PageHeader } from '@/components/common';
import { useApiMutation } from '@/app/hooks';
import { useInvoiceFilters, useInvoicesData } from '@/modules/invoices/hooks';
import { InvoicesFiltersBar } from '@/modules/invoices/molecules';
import { InvoicePaymentModal, InvoicesSummary, InvoicesTable } from '@/modules/invoices/organisms';
import { payInvoice } from '@/modules/invoices/services';
import type { InvoiceItem, PayInvoiceInput } from '@/modules/invoices/types';

const InvoicesTemplate = () => {
  const { data, isLoading, error, refetch } = useInvoicesData();
  const [invoiceToPay, setInvoiceToPay] = useState<InvoiceItem | null>(null);
  const { filters, filteredInvoices, setSearch, setStatus } = useInvoiceFilters(data?.invoices ?? []);
  const payInvoiceMutation = useApiMutation(payInvoice, {
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    return <LoadingState message="Cargando facturas..." />;
  }

  if (error) {
    return <ErrorState title="Error al cargar facturas" />;
  }

  if (!data) {
    return <EmptyState title="Sin datos de facturas" />;
  }

  const handleOpenPaymentModal = (invoice: InvoiceItem) => {
    payInvoiceMutation.reset();
    setInvoiceToPay(invoice);
  };

  const handlePayInvoice = async (input: PayInvoiceInput) => {
    const paidInvoice = await payInvoiceMutation.mutate(input);
    return Boolean(paidInvoice);
  };

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Facturas"
          subtitle="Controla pagos, vencimientos y recepción de facturas en un entorno oscuro y operativo."
        />

        <InvoicesSummary summary={data.summary} />

        <InvoicesFiltersBar
          search={filters.search}
          status={filters.status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />

        <InvoicesTable
          invoices={filteredInvoices}
          totalInvoices={data.invoices.length}
          onPayInvoice={handleOpenPaymentModal}
        />
      </div>

      <InvoicePaymentModal
        invoice={invoiceToPay}
        error={payInvoiceMutation.error}
        isSaving={payInvoiceMutation.isPending}
        open={Boolean(invoiceToPay)}
        onClose={() => setInvoiceToPay(null)}
        onPay={handlePayInvoice}
      />
    </>
  );
};

export default InvoicesTemplate;
