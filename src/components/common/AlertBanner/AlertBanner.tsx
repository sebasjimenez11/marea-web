import { useState } from 'react';
import { Heading4, Paragraph } from '../Typography';

export interface AlertBannerProps {
  type: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  message: string;
  closeable?: boolean;
  onClose?: () => void;
}

const typeClasses: Record<
  AlertBannerProps['type'],
  { bg: string; border: string; text: string; title: string; icon: string }
> = {
  success: {
    bg: 'bg-green-900/20',
    border: 'border-green-600/50',
    text: 'text-green-100',
    title: 'text-green-50',
    icon: '✓',
  },
  warning: {
    bg: 'bg-[#4e1618]',
    border: 'border-[#c06a62]',
    text: 'text-[#f6c0ba]',
    title: 'text-[#ffd7d2]',
    icon: '⚠',
  },
  error: {
    bg: 'bg-red-900/20',
    border: 'border-red-600/50',
    text: 'text-red-100',
    title: 'text-red-50',
    icon: '✕',
  },
  info: {
    bg: 'bg-blue-900/20',
    border: 'border-blue-600/50',
    text: 'text-blue-100',
    title: 'text-blue-50',
    icon: 'ℹ',
  },
};

const AlertBanner = ({
  type = 'info',
  title,
  message,
  closeable = true,
  onClose,
}: AlertBannerProps) => {
  const styles = typeClasses[type];
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`animate-fade-up rounded-2xl border ${styles.bg} ${styles.border} p-4 ${styles.text}`}
      role="alert"
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 text-xl">{styles.icon}</div>
        <div className="flex-1">
          {title && <Heading4 className={styles.title}>{title}</Heading4>}
          <Paragraph className={styles.text}>{message}</Paragraph>
        </div>
        {closeable && (
          <button
            onClick={handleClose}
            className="mt-1 text-lg hover:opacity-70 transition-opacity"
            aria-label="Cerrar alerta"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertBanner;
