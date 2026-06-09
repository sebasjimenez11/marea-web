import type { ReactNode } from 'react';

export interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const Heading1 = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`text-3xl font-semibold tracking-[-0.03em] text-text-primary ${className}`}>{children}</h1>
);

export const Heading2 = ({ children, className = '' }: TypographyProps) => (
  <h2 className={`text-3xl font-bold text-text-primary ${className}`}>{children}</h2>
);

export const Heading3 = ({ children, className = '' }: TypographyProps) => (
  <h3 className={`text-2xl font-bold text-text-primary ${className}`}>{children}</h3>
);

export const Heading4 = ({ children, className = '' }: TypographyProps) => (
  <h4 className={`text-xl font-semibold tracking-[-0.02em] text-text-primary ${className}`}>{children}</h4>
);

export const Paragraph = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-sm text-text-primary ${className}`}>{children}</p>
);

export const Subtitle = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-sm text-text-secondary ${className}`}>{children}</p>
);

export const Muted = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-sm text-text-muted ${className}`}>{children}</p>
);
