import type { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}: CardProps) => {
  return (
    <div
      className={`rounded-2xl border border-border-default/90 bg-surface-1 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] ${
        hoverable ? 'transition-all duration-200 hover:-translate-y-0.5 hover:border-border-active hover:bg-surface-2' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
