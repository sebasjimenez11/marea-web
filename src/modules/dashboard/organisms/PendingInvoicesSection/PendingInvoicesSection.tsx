import { Badge, Card, EmptyState, Muted, Paragraph } from '@/components/common';
import { formatCurrency } from '@/modules/dashboard/lib';
import { PanelHeader } from '@/modules/dashboard/molecules';
import type { InvoiceItem } from '@/modules/dashboard/types';

interface PendingInvoicesSectionProps {
  invoices: InvoiceItem[];
}

const PendingInvoicesSection = ({ invoices }: PendingInvoicesSectionProps) => {
  if (!invoices.length) return <EmptyState title="Sin facturas vencidas" />;

  return (
    <Card className="animate-panel-in p-0">
      <PanelHeader title="Facturas Vencidas" />
      <div className="space-y-1 p-3">
        {invoices.map(item => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-4 rounded-xl px-3 py-3 transition hover:bg-white/[0.03]"
          >
            <div className="min-w-0">
              <Paragraph className="truncate font-medium">{item.client}</Paragraph>
              <Muted>Venció hace {item.daysOverdue} días</Muted>
            </div>
            <div className="text-right">
              <Paragraph className="font-medium">{formatCurrency(item.amount)}</Paragraph>
              <Badge variant="error" size="sm" className="mt-2">
                {item.status === 'overdue' ? 'Vencida' : 'Pendiente'}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PendingInvoicesSection;
