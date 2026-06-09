import type { ReactNode } from 'react';

export interface IconTileProps {
  children: ReactNode;
  className?: string;
}

const IconTile = ({ children, className = '' }: IconTileProps) => {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-text-secondary ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default IconTile;
