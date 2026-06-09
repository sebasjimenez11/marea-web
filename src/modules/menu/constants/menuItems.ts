import type { MenuSection } from '../types/menu.types';

export const menuItems: MenuSection[] = [
  {
    id: 'principal',
    title: 'Operación',
    items: [
      {
        label: 'Dashboard',
        href: '/dashboard',
      },
      {
        label: 'Productos',
        href: '/productos',
      },
      {
        label: 'Inventario',
        href: '/inventario',
      },
      {
        label: 'Proveedores',
        href: '/proveedores',
      },
    ],
  },
  {
    id: 'comercial',
    title: 'Ventas',
    items: [
      {
        label: 'Pedidos',
        href: '/pedidos',
      },
      {
        label: 'Facturas',
        href: '/facturas',
      },
      {
        label: 'Caja',
        href: '/caja',
      },
    ],
  },
];
