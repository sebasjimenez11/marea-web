import type { ReactNode } from 'react';

export interface FormFieldProps {
  label: string;
  children: ReactNode;
}

export const formControlClassName =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-border-active focus:bg-white/[0.05]';

const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <label className="space-y-2">
      <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
        {label}
      </span>
      {children}
    </label>
  );
};

export default FormField;
