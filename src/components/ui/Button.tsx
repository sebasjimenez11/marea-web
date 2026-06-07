import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const classes =
    variant === 'primary'
      ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
      : 'border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800';

  return (
    <button
      className={`rounded-md px-3 py-2 text-sm font-semibold transition ${classes} ${className}`}
      {...props}
    />
  );
}
