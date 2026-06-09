import type { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: 'bg-white/8 text-text-secondary ring-1 ring-white/8',
  primary: 'bg-[#4d9fff]/18 text-[#9ec7ff] ring-1 ring-[#4d9fff]/25',
  success: 'bg-emerald-400/14 text-emerald-300 ring-1 ring-emerald-400/20',
  warning: 'bg-amber-400/14 text-amber-300 ring-1 ring-amber-400/20',
  error: 'bg-rose-300/14 text-rose-200 ring-1 ring-rose-300/20',
  info: 'bg-sky-400/14 text-sky-300 ring-1 ring-sky-400/20',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-2.5 py-1 text-[11px]',
  md: 'px-3 py-1.5 text-xs',
  lg: 'px-4 py-2 text-sm',
};

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium tracking-[0.02em] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
