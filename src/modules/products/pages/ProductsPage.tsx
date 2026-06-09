import { WorkspacePage } from '@/components/layout';
import { ProductsTemplate } from '@/modules/products/templates';

const ProductsPage = () => {
  return (
    <WorkspacePage contextLabel="Catálogo y stock">
      <ProductsTemplate />
    </WorkspacePage>
  );
};

export default ProductsPage;
