import { Badge } from '@/components/common';
import { getInvoiceStatusLabel, getInvoiceStatusVariant } from '@/modules/invoices/lib';
import type { InvoiceStatus } from '@/modules/invoices/types';

export interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

const InvoiceStatusBadge = ({ status }: InvoiceStatusBadgeProps) => (
  <Badge variant={getInvoiceStatusVariant(status)} size="sm">
    {getInvoiceStatusLabel(status)}
  </Badge>
);

export default InvoiceStatusBadge;
