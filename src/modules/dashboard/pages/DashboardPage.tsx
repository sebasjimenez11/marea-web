import { WorkspacePage } from '@/components/layout';
import { DashboardTemplate } from '@/modules/dashboard/templates';

const DashboardPage = () => {
  return (
    <WorkspacePage contextLabel="Panel operativo">
      <DashboardTemplate />
    </WorkspacePage>
  );
};

export default DashboardPage;
