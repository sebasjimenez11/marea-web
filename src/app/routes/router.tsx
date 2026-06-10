import { Suspense, type ComponentType } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import AppShell from '../AppShell';
import { PageLoader, RouteErrorState } from '@/components/common';
import { appRoutes, DEFAULT_APP_PATH } from './routeConfig';

/**
 * withSuspense
 * 
 * Higher Order Component que envuelve componentes en Suspense
 * Proporciona un fallback de carga elegante para todas las páginas lazy-loaded
 */
const withSuspense = (Component: ComponentType) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
};

const RouteErrorBoundary = () => {
  return (
    <RouteErrorState
      status={500}
      statusText="Error del Servidor"
      message="Ocurrió un error inesperado al renderizar la página"
      showDevelopmentInfo={import.meta.env.DEV}
    />
  );
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to={DEFAULT_APP_PATH} replace />,
      },
      ...appRoutes.map(({ path, component }) => ({
        path: path.replace(/^\//, ''),
        element: withSuspense(component),
      })),

      {
        path: '*',
        element: (
          <RouteErrorState
            status={404}
            statusText="Not Found"
            message="La página que buscas no existe"
            showDevelopmentInfo={import.meta.env.DEV}
          />
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
