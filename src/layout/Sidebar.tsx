import { NavLink } from 'react-router';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/inventory-items', label: 'Inventario' },
  { to: '/inventory-movements', label: 'Movimientos' },
  { to: '/suppliers', label: 'Proveedores' },
  { to: '/supplier-orders', label: 'Pedidos' },
  { to: '/supplier-invoices', label: 'Facturas' },
  { to: '/cash', label: 'Caja' },
];

export function Sidebar() {
  return (
    <aside className="border-slate-800 bg-[#111820] lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:border-r">
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <span className="text-lg font-semibold tracking-normal text-white">
          Marea
        </span>
      </div>
      <nav className="flex gap-2 overflow-x-auto px-4 py-3 lg:block lg:space-y-1 lg:overflow-visible">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'block rounded-md px-3 py-2 text-sm font-medium transition',
                isActive
                  ? 'bg-cyan-500/15 text-cyan-200'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
