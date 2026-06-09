import { CashCountField } from '@/modules/cash/molecules';

interface CountEntry {
  label: string;
  value: number;
  count: number;
}

export interface CashCountSectionProps {
  title: string;
  entries: CountEntry[];
  onChange: (label: string, count: number) => void;
}

const CashCountSection = ({ title, entries, onChange }: CashCountSectionProps) => (
  <section className="space-y-4">
    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8fb7ff]">
      {title}
    </h3>

    <div className="grid gap-3 sm:grid-cols-2">
      {entries.map(entry => (
        <CashCountField
          key={entry.label}
          label={entry.label}
          value={entry.value}
          count={entry.count}
          onChange={count => onChange(entry.label, count)}
        />
      ))}
    </div>
  </section>
);

export default CashCountSection;
