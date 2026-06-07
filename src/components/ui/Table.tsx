import { PropsWithChildren } from 'react';

export function Table({ children }: PropsWithChildren) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-800">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  );
}
