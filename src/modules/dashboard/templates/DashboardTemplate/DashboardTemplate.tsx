import type { ReactNode } from 'react';
import { AlertBanner, EmptyState, ErrorState, LoadingState, PageHeader } from '@/components/common';
import { useDashboardData } from '@/modules/dashboard/hooks';
import { DashboardPeriodTabs } from '@/modules/dashboard/molecules';
import {
  CriticalStockSection,
  DashboardStats,
  PendingInvoicesSection,
  PendingOrdersSection,
} from '@/modules/dashboard/organisms';

interface DashboardTemplateProps {
  children?: ReactNode;
}

const DashboardTemplate = ({ children }: DashboardTemplateProps) => {
  const { data, isLoading, error } = useDashboardData();

  if (isLoading) {
    return <LoadingState message="Cargando dashboard..." />;
  }

  if (error) {
    return <ErrorState title="Error al cargar el dashboard" />;
  }

  if (!data) {
    return <EmptyState title="Sin datos disponibles" />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Resumen general de operaciones del bar."
        action={<DashboardPeriodTabs />}
      />

      {!data.isCashClosed && (
        <AlertBanner
          type="warning"
          title="Cierre de Caja Pendiente"
          message="Sin cierre registrado. Realiza el cierre del turno anterior antes de iniciar operaciones formales."
        />
      )}

      <DashboardStats dashboardData={data} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.08fr_1.08fr_1fr]">
        <CriticalStockSection items={data.stockItems} />
        <PendingInvoicesSection invoices={data.overdueInvoices} />
        <PendingOrdersSection orders={data.pendingOrders} />
      </div>

      {children}
    </div>
  );
};

export default DashboardTemplate;
