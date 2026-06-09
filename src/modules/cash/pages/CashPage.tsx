import { WorkspacePage } from '@/components/layout';
import { CashTemplate } from '@/modules/cash/templates';

const CashPage = () => {
  return (
    <WorkspacePage contextLabel="Gestión de caja">
      <CashTemplate />
    </WorkspacePage>
  );
};

export default CashPage;
