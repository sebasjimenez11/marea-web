import { Subtitle } from '../Typography';

export interface LoadingStateProps {
  message?: string;
  fullHeight?: boolean;
}

/**
 * LoadingState
 * 
 * Componente de carga para contenedores específicos.
 * Útil para estados de carga dentro de secciones de página.
 */
const LoadingState = ({
  message = 'Cargando...',
  fullHeight = true,
}: LoadingStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullHeight ? 'min-h-96' : 'py-12'
      }`}
    >
      <div className="animate-spin text-4xl">⟳</div>
      <Subtitle>{message}</Subtitle>
    </div>
  );
};

export default LoadingState;

/**
 * PageLoader
 * 
 * Componente de carga pantalla completa para Suspense fallback
 * Se utiliza cuando se cargan páginas completas lazy-loaded del router
 */
export const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Spinner animado */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />
        </div>
        {/* Texto de carga */}
        <p className="text-sm font-medium text-slate-300">Cargando...</p>
      </div>
    </div>
  );
};
