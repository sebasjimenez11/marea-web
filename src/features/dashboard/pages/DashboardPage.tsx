import { Badge } from '../../../components/ui/Badge';
import { Card } from '../../../components/ui/Card';
import { DashboardStatGrid } from '../components/DashboardStatGrid';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
          <p className="mt-1 text-sm text-slate-400">
            Resumen operativo preparado para conectar con la API.
          </p>
        </div>
        <Badge>Hoy</Badge>
      </div>
      <DashboardStatGrid />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="text-sm font-semibold text-white">Alertas de stock</h3>
          <p className="mt-3 text-sm text-slate-400">
            Bajo stock y sin stock se implementaran en la fase de inventario.
          </p>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-white">Caja diaria</h3>
          <p className="mt-3 text-sm text-slate-400">
            El cierre usara movimientos y calculos de caja del backend.
          </p>
        </Card>
      </div>
    </div>
  );
}
