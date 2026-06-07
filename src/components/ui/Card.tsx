import { HTMLAttributes } from 'react';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border border-slate-800 bg-[#111820] p-4 ${className}`}
      {...props}
    />
  );
}
