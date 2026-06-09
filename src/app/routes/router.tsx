/**
 * Router Configuration
 * 
 * Configuración completa de enrutamiento usando React Router DOM v6+
 * Implementa Data Router API con createBrowserRouter
 * Incluye lazy loading, manejo de errores y estructura escalable
 */

import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import AppShell from '../AppShell';
import { PageLoader, RouteErrorState } from '@/components/common';

// ============================================================================
// LAZY LOADING DE PÁGINAS
// ============================================================================

/**
 * Composición escalable de páginas lazy-loaded
 * Cada módulo expone su página en su carpeta `pages`
 */
const DashboardPage = lazy(() =>
  import('@/modules/dashboard').then((module) => ({
    default: module.DashboardPage,
  })),
);

const ProductsPage = lazy(() =>
  import('@/modules/products').then((module) => ({
    default: module.ProductsPage,
  })),
);

const InventoryPage = lazy(() =>
  import('@/modules/inventory').then((module) => ({
    default: module.InventoryPage,
  })),
);

const SuppliersPage = lazy(() =>
  import('@/modules/suppliers').then((module) => ({
    default: module.SuppliersPage,
  })),
);

const OrdersPage = lazy(() =>
  import('@/modules/orders').then((module) => ({
    default: module.OrdersPage,
  })),
);

const InvoicesPage = lazy(() =>
  import('@/modules/invoices').then((module) => ({
    default: module.InvoicesPage,
  })),
);

const CashPage = lazy(() =>
  import('@/modules/cash').then((module) => ({
    default: module.CashPage,
  })),
);

// ============================================================================
// COMPONENTE SUSPENSE WRAPPER
// ============================================================================

/**
 * withSuspense
 * 
 * Higher Order Component que envuelve componentes en Suspense
 * Proporciona un fallback de carga elegante para todas las páginas lazy-loaded
 */
const withSuspense = (Component: React.ComponentType) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
};

// ============================================================================
// ERROR HANDLER PARA RUTAS
// ============================================================================

/**
 * RouteErrorBoundary Component
 * 
 * Maneja errores de rutas (404, errores de renderizado, etc.)
 * Se utiliza como errorElement en la ruta raíz
 */
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

// ============================================================================
// DEFINICIÓN ESCALABLE DE RUTAS DE MÓDULOS
// ============================================================================

/**
 * moduleRoutes
 * 
 * Array independiente y escalable de rutas de los módulos de la aplicación
 * Facilita agregar, modificar o eliminar rutas sin tocar la estructura principal
 * 
 * NOTA: Para agregar una nueva ruta:
 * 1. Agregar el lazy import del módulo arriba
 * 2. Agregar un objeto a este array con { path, element: withSuspense(...) }
 */
const moduleRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: withSuspense(DashboardPage),
  },
  {
    path: 'productos',
    element: withSuspense(ProductsPage),
  },
  {
    path: 'inventario',
    element: withSuspense(InventoryPage),
  },
  {
    path: 'proveedores',
    element: withSuspense(SuppliersPage),
  },
  {
    path: 'pedidos',
    element: withSuspense(OrdersPage),
  },
  {
    path: 'facturas',
    element: withSuspense(InvoicesPage),
  },
  {
    path: 'caja',
    element: withSuspense(CashPage),
  },
];

// ============================================================================
// DEFINICIÓN DE RUTAS PRINCIPALES
// ============================================================================

/**
 * routes
 * 
 * Estructura de rutas principal con layout raíz y rutas hijas
 * El array moduleRoutes se inyecta como children de la ruta raíz
 */
const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    errorElement: <RouteErrorBoundary />,
    children: [
      // Redirección por defecto de raíz a dashboard
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },

      // Rutas de módulos inyectadas
      ...moduleRoutes,

      // Comodín para capturar rutas no encontradas (404)
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

// ============================================================================
// CREACIÓN DEL ROUTER
// ============================================================================

/**
 * router
 * 
 * Instancia del router configurado con Data Router API
 * Listo para usar con RouterProvider en el punto de entrada
 */
export const router = createBrowserRouter(routes);
