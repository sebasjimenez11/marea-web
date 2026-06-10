import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { MenuSection } from '@/modules/menu/types';

export interface AppRouteDefinition {
  key: string;
  label: string;
  path: string;
  sectionId: string;
  component: LazyExoticComponent<ComponentType>;
}

interface NavigationSectionDefinition {
  id: string;
  title: string;
}

const navigationSectionDefinitions: NavigationSectionDefinition[] = [
  { id: 'principal', title: 'Operación' },
  { id: 'comercial', title: 'Ventas' },
];

const loadRouteComponent = <TModule, TExportName extends keyof TModule & string>(
  loader: () => Promise<TModule>,
  exportName: TExportName,
) =>
  lazy(async () => {
    const module = await loader();

    return {
      default: module[exportName] as ComponentType,
    };
  });

export const appRoutes: AppRouteDefinition[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    sectionId: 'principal',
    component: loadRouteComponent(() => import('@/modules/dashboard'), 'DashboardPage'),
  },
  {
    key: 'products',
    label: 'Productos',
    path: '/productos',
    sectionId: 'principal',
    component: loadRouteComponent(() => import('@/modules/products'), 'ProductsPage'),
  },
  {
    key: 'inventory',
    label: 'Inventario',
    path: '/inventario',
    sectionId: 'principal',
    component: loadRouteComponent(() => import('@/modules/inventory'), 'InventoryPage'),
  },
  {
    key: 'suppliers',
    label: 'Proveedores',
    path: '/proveedores',
    sectionId: 'principal',
    component: loadRouteComponent(() => import('@/modules/suppliers'), 'SuppliersPage'),
  },
  {
    key: 'orders',
    label: 'Pedidos',
    path: '/pedidos',
    sectionId: 'comercial',
    component: loadRouteComponent(() => import('@/modules/orders'), 'OrdersPage'),
  },
  {
    key: 'invoices',
    label: 'Facturas',
    path: '/facturas',
    sectionId: 'comercial',
    component: loadRouteComponent(() => import('@/modules/invoices'), 'InvoicesPage'),
  },
  {
    key: 'cash',
    label: 'Caja',
    path: '/caja',
    sectionId: 'comercial',
    component: loadRouteComponent(() => import('@/modules/cash'), 'CashPage'),
  },
];

export const DEFAULT_APP_PATH = appRoutes[0]?.path ?? '/';

export const navigationSections: MenuSection[] = navigationSectionDefinitions.map((section) => ({
  id: section.id,
  title: section.title,
  items: appRoutes
    .filter((route) => route.sectionId === section.id)
    .map((route) => ({
      label: route.label,
      href: route.path,
    })),
}));
