import { Badge } from '@/components/common';
import { getSupplierStatusLabel, getSupplierStatusVariant } from '@/modules/suppliers/lib';
import type { SupplierStatus } from '@/modules/suppliers/types';

export interface SupplierStatusBadgeProps {
  status: SupplierStatus;
}

const SupplierStatusBadge = ({ status }: SupplierStatusBadgeProps) => {
  return (
    <Badge variant={getSupplierStatusVariant(status)} size="sm">
      {getSupplierStatusLabel(status)}
    </Badge>
  );
};

export default SupplierStatusBadge;
