/**
 * useConfirm Hook
 * 
 * Hook personalizado para acceder al contexto de confirmación
 * Proporciona una interfaz simple y segura para mostrar modales de confirmación
 */

import { useContext } from 'react';
import { ConfirmContext } from '@/app/context/ConfirmContext';
import type { ConfirmConfig } from '@/app/context/ConfirmContext';

/**
 * Hook para usar el contexto de confirmación
 * 
 * @throws Error si se usa fuera del proveedor ConfirmContextProvider
 * @returns Objeto con la función confirm
 * 
 * @example
 * ```typescript
 * const { confirm } = useConfirm();
 * 
 * const handleDelete = async () => {
 *   const isConfirmed = await confirm({
 *     title: '¿Eliminar?',
 *     description: 'Esta acción no se puede deshacer',
 *     type: 'danger'
 *   });
 *   
 *   if (isConfirmed) {
 *     // Ejecutar acción
 *   }
 * };
 * ```
 */
export const useConfirm = () => {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error(
      'useConfirm debe usarse dentro de un ConfirmContextProvider. ' +
      'Asegúrate de que ConfirmContextProvider está en el árbol de componentes.'
    );
  }

  const { confirm, setIsLoading } = context;

  return {
    /**
     * Muestra el modal de confirmación
     * 
     * @param config - Configuración del modal
     * @returns Promise<boolean> - true si se confirmó, false si se canceló
     */
    confirm: async (config: ConfirmConfig): Promise<boolean> => {
      return confirm(config);
    },

    /**
     * Establece el estado de carga del modal
     * Útil para mostrar "Procesando..." mientras se ejecuta una acción
     */
    setLoading: setIsLoading,
  };
};

export default useConfirm;
