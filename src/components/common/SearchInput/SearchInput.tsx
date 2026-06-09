import type { ChangeEvent, InputHTMLAttributes } from 'react';

export interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

const SearchInput = ({
  onSearch,
  className = '',
  ...props
}: SearchInputProps) => {
  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Buscar..."
        className={`w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 pl-10 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-border-active focus:bg-white/[0.05] focus:outline-none ${className}`}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onSearch?.(event.target.value)}
        {...props}
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
        🔍
      </span>
    </div>
  );
};

export default SearchInput;
