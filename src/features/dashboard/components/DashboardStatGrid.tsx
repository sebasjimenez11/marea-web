import { Card } from '../../../components/ui/Card';
import { formatCents } from '../../../lib/money';

const stats = [
  { label: 'Ingresos', value: formatCents(0) },
  { label: 'Egresos', value: formatCents(0) },
  { label: 'Balance', value: formatCents(0) },
  { label: 'Deuda proveedores', value: formatCents(0) },
];

export function DashboardStatGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <p className="text-sm text-slate-400">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}
