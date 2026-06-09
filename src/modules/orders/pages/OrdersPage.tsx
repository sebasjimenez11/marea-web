import { WorkspacePage } from '@/components/layout';
import { OrdersTemplate } from '@/modules/orders/templates';

const OrdersPage = () => {
  return (
    <WorkspacePage contextLabel="Reposición sugerida">
      <OrdersTemplate />
    </WorkspacePage>
  );
};

export default OrdersPage;
