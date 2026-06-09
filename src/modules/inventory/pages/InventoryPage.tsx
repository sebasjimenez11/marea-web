import { WorkspacePage } from '@/components/layout';
import { InventoryTemplate } from '@/modules/inventory/templates';

const InventoryPage = () => {
  return (
    <WorkspacePage contextLabel="Control de inventario">
      <InventoryTemplate />
    </WorkspacePage>
  );
};

export default InventoryPage;
