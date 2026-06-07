import { createBrowserRouter, Navigate } from 'react-router';
import { AppLayout } from '../layout/AppLayout';
import { CashPage } from '../features/cash/pages/CashPage';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { InventoryItemsPage } from '../features/inventory-items/pages/InventoryItemsPage';
import { InventoryMovementsPage } from '../features/inventory-movements/pages/InventoryMovementsPage';
import { SupplierInvoicesPage } from '../features/supplier-invoices/pages/SupplierInvoicesPage';
import { SupplierOrdersPage } from '../features/supplier-orders/pages/SupplierOrdersPage';
import { SuppliersPage } from '../features/suppliers/pages/SuppliersPage';
import { NotFoundPage } from '../features/shared/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'suppliers', element: <SuppliersPage /> },
      { path: 'inventory-items', element: <InventoryItemsPage /> },
      { path: 'inventory-movements', element: <InventoryMovementsPage /> },
      { path: 'supplier-orders', element: <SupplierOrdersPage /> },
      { path: 'supplier-invoices', element: <SupplierInvoicesPage /> },
      { path: 'cash', element: <CashPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
