/**
 * ConfirmContext
 * 
 * Contexto global para gestionar modales de confirmación
 * Proporciona un estado centralizado y acceso desacoplado desde cualquier componente
 */

import {
  createContext,
  useCallback,
  useState,
  type ReactNode,
} from 'react';
import type { ConfirmationType } from '@/components/common/ConfirmationModal';

/**
 * Configuración del modal de confirmación
 */
export interface ConfirmConfig {
  title: string;
  description: string;
  type?: ConfirmationType;
  confirmLabel?: string;
  cancelLabel?: string;
}

/**
 * Estado interno del contexto
 */
interface ConfirmContextValue {
  isOpen: boolean;
  config: ConfirmConfig | null;
  isLoading: boolean;
  confirm: (config: ConfirmConfig) => Promise<boolean>;
  handleConfirm: () => void;
  handleCancel: () => void;
  setIsLoading: (loading: boolean) => void;
}

/**
 * Crear contexto
 */
export const ConfirmContext = createContext<ConfirmContextValue | undefined>(
  undefined,
);

/**
 * Proveedor del contexto
 */
export interface ConfirmContextProviderProps {
  children: ReactNode;
}

export const ConfirmContextProvider = ({
  children,
}: ConfirmContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mantener un estado para el resolver externo
  const [resolveFn, setResolveFn] = useState<((value: boolean) => void) | null>(null);

  /**
   * Función principal que abre el modal y retorna una promesa
   */
  const confirm = useCallback(
    (confirmConfig: ConfirmConfig): Promise<boolean> => {
      return new Promise((resolve) => {
        setConfig(confirmConfig);
        setIsOpen(true);
        setIsLoading(false);
        setResolveFn(() => resolve);
      });
    },
    [],
  );

  /**
   * Manejar confirmación
   */
  const handleConfirm = useCallback(() => {
    resolveFn?.(true);
    setIsOpen(false);
    setConfig(null);
    setResolveFn(null);
  }, [resolveFn]);

  /**
   * Manejar cancelación
   */
  const handleCancel = useCallback(() => {
    resolveFn?.(false);
    setIsOpen(false);
    setConfig(null);
    setResolveFn(null);
  }, [resolveFn]);

  const value: ConfirmContextValue = {
    isOpen,
    config,
    isLoading,
    confirm,
    handleConfirm,
    handleCancel,
    setIsLoading,
  };

  return (
    <ConfirmContext.Provider value={value}>
      {children}
    </ConfirmContext.Provider>
  );
};

export default ConfirmContext;
