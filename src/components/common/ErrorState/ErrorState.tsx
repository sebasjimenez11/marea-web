import { Button } from '../Button';
import { Heading3, Subtitle } from '../Typography';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

/**
 * ErrorState
 * 
 * Componente de error para contenedores específicos.
 * Útil para mostrar errores dentro de secciones de página.
 */
const ErrorState = ({
  title = 'Algo salió mal',
  message = 'Hubo un error al cargar los datos. Por favor, intenta de nuevo.',
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-96 text-center">
      <div className="text-6xl">⚠️</div>
      <Heading3>{title}</Heading3>
      <Subtitle>{message}</Subtitle>
      {onRetry && (
        <Button onClick={onRetry} variant="primary" size="md">
          Reintentar
        </Button>
      )}
    </div>
  );
};

export default ErrorState;

/**
 * RouteErrorState
 * 
 * Componente de error pantalla completa para capturar errores de rutas (404, etc.)
 * Se utiliza como errorElement en React Router para manejar navegaciones fallidas
 */
export interface RouteErrorStateProps {
  status?: number;
  statusText?: string;
  message?: string;
  showDevelopmentInfo?: boolean;
}

export const RouteErrorState = ({
  status = 500,
  statusText = 'Error',
  message = 'Ocurrió un error desconocido',
  showDevelopmentInfo = import.meta.env.DEV,
}: RouteErrorStateProps) => {
  const is404 = status === 404;

  const handleNavigateHome = () => {
    window.location.href = '/dashboard';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Código de error */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-blue-500">
            {is404 ? '404' : status}
          </h1>
          <h2 className="text-2xl font-semibold text-slate-100">
            {is404 ? 'Página no encontrada' : statusText || 'Oops, algo salió mal'}
          </h2>
        </div>

        {/* Descripción del error */}
        <p className="text-slate-400">
          {is404
            ? 'La página que buscas no existe o ha sido movida.'
            : message}
        </p>

        {/* Detalles del error (solo en desarrollo) */}
        {showDevelopmentInfo && !is404 && (
          <div className="rounded-lg bg-slate-800 p-4 text-left">
            <p className="text-xs font-mono text-red-400">{message}</p>
          </div>
        )}

        {/* Botones de navegación */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={handleNavigateHome}
            variant="primary"
            size="md"
            className="flex-1"
          >
            Ir al Dashboard
          </Button>
          <Button
            onClick={handleGoBack}
            variant="secondary"
            size="md"
            className="flex-1"
          >
            Volver atrás
          </Button>
        </div>
      </div>
    </div>
  );
};
