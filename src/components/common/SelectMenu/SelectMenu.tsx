import { useEffect, useMemo, useRef, useState } from 'react';
import { IconChevron } from '../IconChevron';

export interface SelectMenuProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
}

const SelectMenu = ({
  value,
  options,
  onChange,
  placeholder = 'Seleccionar',
  className = '',
  triggerClassName = '',
}: SelectMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const displayValue = useMemo(() => {
    return options.find(option => option === value) ?? placeholder;
  }, [options, placeholder, value]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handlePointerDown);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`.trim()}>
      <button
        type="button"
        className={`flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-left text-sm text-text-primary transition hover:bg-white/[0.05] ${triggerClassName}`.trim()}
        onClick={() => setIsOpen(current => !current)}
      >
        <span className={value ? 'text-text-primary' : 'text-text-muted'}>{displayValue}</span>
        <IconChevron isOpen={isOpen} size="sm" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-full overflow-hidden rounded-xl border border-white/10 bg-[#20262f] shadow-[0_18px_40px_rgba(0,0,0,0.38)]">
          <div className="max-h-64 overflow-y-auto p-1.5">
            {options.map(option => {
              const isSelected = option === value;

              return (
                <button
                  key={option}
                  type="button"
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                    isSelected
                      ? 'bg-[#14548d] text-[#d9ebff]'
                      : 'text-text-secondary hover:bg-white/[0.05] hover:text-text-primary'
                  }`}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  <span>{option}</span>
                  {isSelected && <span className="text-xs text-[#9ec7ff]">Activo</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectMenu;
