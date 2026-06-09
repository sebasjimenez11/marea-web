import { SelectMenu } from '@/components/common';

export interface FilterSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const FilterSelect = ({
  label,
  options,
  value,
  onChange,
  className = '',
}: FilterSelectProps) => {
  return (
    <label className={`inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-text-secondary ${className}`.trim()}>
      <span>{label}:</span>
      <SelectMenu
        value={value}
        options={options}
        onChange={onChange}
        className="min-w-44"
        triggerClassName="border-0 bg-transparent px-0 py-0 text-sm shadow-none hover:bg-transparent"
      />
    </label>
  );
};

export default FilterSelect;
