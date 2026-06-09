import { WorkspacePage } from '@/components/layout';
import { InvoicesTemplate } from '@/modules/invoices/templates';

const InvoicesPage = () => {
  return (
    <WorkspacePage contextLabel="Control financiero">
      <InvoicesTemplate />
    </WorkspacePage>
  );
};

export default InvoicesPage;
