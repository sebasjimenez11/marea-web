import { Badge } from '@/components/common';
import { getProductStatusLabel, getProductStatusVariant } from '@/modules/products/lib';
import type { ProductStatus } from '@/modules/products/types';

export interface ProductsStatusBadgeProps {
  status: ProductStatus;
}

const ProductsStatusBadge = ({ status }: ProductsStatusBadgeProps) => {
  return (
    <Badge variant={getProductStatusVariant(status)} size="sm">
      {getProductStatusLabel(status)}
    </Badge>
  );
};

export default ProductsStatusBadge;
