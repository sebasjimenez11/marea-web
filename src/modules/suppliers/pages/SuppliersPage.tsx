import { WorkspacePage } from '@/components/layout';
import { SuppliersTemplate } from '@/modules/suppliers/templates';

const SuppliersPage = () => {
  return (
    <WorkspacePage contextLabel="Red de proveedores">
      <SuppliersTemplate />
    </WorkspacePage>
  );
};

export default SuppliersPage;
