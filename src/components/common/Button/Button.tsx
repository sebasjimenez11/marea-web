import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-[#4d9fff] text-[#0f172a] hover:bg-[#7eb7ff] active:bg-[#8fc0ff]',
  secondary:
    'border border-white/10 bg-white/4 text-[#c7d7f7] hover:bg-white/8 active:bg-white/10',
  danger: 'bg-[#f58a8a] text-[#1f1316] hover:bg-[#ffadad] active:bg-[#ffc0c0]',
  ghost: 'text-[#9ec7ff] hover:bg-[#4d9fff]/12 active:bg-[#4d9fff]/18',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="mr-2 animate-spin">⟳</span>}
      {children}
    </button>
  );
};

export default Button;
