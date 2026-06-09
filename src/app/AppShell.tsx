/**
 * AppShell
 * 
 * Componente de layout raíz que proporciona la estructura principal de la aplicación
 * Contiene la Sidebar, renderiza dinámicamente las páginas mediante React Router Outlet
 * y proporciona acceso global a modales de confirmación mediante el contexto
 */

import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/modules/menu';
import { ConfirmationModal } from '@/components/common';
import { ConfirmContextProvider, ConfirmContext } from '@/app/context/ConfirmContext';

/**
 * Componente contenedor del modal de confirmación
 * Se conecta al contexto para mostrar/ocultar según el estado
 */
const ConfirmationModalContainer = () => {
  const context = useContext(ConfirmContext);

  if (!context) return null;

  const { isOpen, config, isLoading, handleConfirm, handleCancel } = context;

  if (!config) return null;

  return (
    <ConfirmationModal
      isOpen={isOpen}
      title={config.title}
      description={config.description}
      type={config.type}
      confirmLabel={config.confirmLabel}
      cancelLabel={config.cancelLabel}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      isLoading={isLoading}
    />
  );
};

/**
 * Contenido principal del layout
 * Separado para poder estar dentro del ConfirmContextProvider
 */
const AppShellContent = () => {
  return (
    <>
      <div className="min-h-screen bg-app">
        <div className="flex min-h-screen w-full">
          <Sidebar />

          {/* 
            Outlet renderiza las páginas hijas según la ruta actual
            Proporciona scroll independiente para el contenido de las páginas
          */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>

      {/* 
        Modal de confirmación global
        Se renderiza a nivel raíz para estar disponible en toda la aplicación
      */}
      <ConfirmationModalContainer />
    </>
  );
};

/**
 * AppShell envuelto con el proveedor de contexto
 * Proporciona acceso global a la funcionalidad de confirmación mediante useConfirm hook
 */
const AppShell = () => {
  return (
    <ConfirmContextProvider>
      <AppShellContent />
    </ConfirmContextProvider>
  );
};

export default AppShell;
