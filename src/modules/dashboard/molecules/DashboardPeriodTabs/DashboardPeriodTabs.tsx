const activePeriodButtonClassName = 'rounded-lg bg-[#14548d] px-3 py-1.5 text-[#d9ebff]';
const periodButtonClassName =
  'rounded-lg px-3 py-1.5 text-text-secondary transition hover:bg-white/[0.04] hover:text-text-primary';

const periods = [
  { label: 'Hoy', active: true },
  { label: 'Semana', active: false },
  { label: 'Mes', active: false },
];

const DashboardPeriodTabs = () => (
  <div className="flex items-center gap-1 text-sm">
    {periods.map(period => (
      <button
        key={period.label}
        className={period.active ? activePeriodButtonClassName : periodButtonClassName}
      >
        {period.label}
      </button>
    ))}
  </div>
);

export default DashboardPeriodTabs;
