import { getDashboardSummaryMetrics } from '@/modules/dashboard/lib';
import {
  CompactMetricCard,
  DashboardOverviewCard,
  PrimaryMetricCard,
} from '@/modules/dashboard/molecules';
import type { DashboardData } from '@/modules/dashboard/types';

interface DashboardStatsProps {
  dashboardData: DashboardData;
}

const DashboardStats = ({ dashboardData }: DashboardStatsProps) => {
  const { primaryMetrics, compactMetrics, cashDiff, supplierDebt } =
    getDashboardSummaryMetrics(dashboardData);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        {primaryMetrics.map(metric => (
          <div key={metric.title} className="xl:col-span-3">
            <PrimaryMetricCard
              title={metric.title}
              value={metric.value}
              detail={metric.detail}
              iconClassName={metric.iconClassName}
              icon={<span className="text-lg">{metric.icon}</span>}
            />
          </div>
        ))}
        <DashboardOverviewCard cashDiff={cashDiff} supplierDebt={supplierDebt} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {compactMetrics.map(metric => (
          <CompactMetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            toneClassName={metric.toneClassName}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
