import { Button, SearchInput } from '@/components/common';
import type { InvoiceStatus } from '@/modules/invoices/types';

const filterOptions: Array<{ label: string; value: 'all' | InvoiceStatus }> = [
  { label: 'Todos los estados', value: 'all' },
  { label: 'Pendientes', value: 'pending' },
  { label: 'Pagadas', value: 'paid' },
  { label: 'Vencidas', value: 'overdue' },
];

export interface InvoicesFiltersBarProps {
  search: string;
  status: 'all' | InvoiceStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: 'all' | InvoiceStatus) => void;
}

const activeButtonClassName = 'border-[#4d9fff]/25 bg-[#4d9fff]/18 text-[#cfe4ff]';
const idleButtonClassName = 'border-white/10 bg-white/4 text-text-secondary hover:bg-white/8';

const InvoicesFiltersBar = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: InvoicesFiltersBarProps) => (
  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div className="w-full max-w-md">
      <SearchInput
        value={search}
        onSearch={onSearchChange}
        placeholder="Buscar facturas..."
        className="w-full"
      />
    </div>

    <div className="flex flex-wrap gap-2">
      {filterOptions.map(option => (
        <button
          key={option.value}
          type="button"
          className={`rounded-xl border px-4 py-2 text-sm transition ${status === option.value ? activeButtonClassName : idleButtonClassName}`}
          onClick={() => onStatusChange(option.value)}
        >
          {option.label}
        </button>
      ))}
      <Button className="gap-2">
        <span aria-hidden="true">⊕</span>
        Registrar Factura
      </Button>
    </div>
  </div>
);

export default InvoicesFiltersBar;
