import type { MenuLinkProps } from './MenuLink.types';
import { Link } from 'react-router-dom';

const MenuLink = ({ label, href, icon, isActive = false, onClick }: MenuLinkProps) => {
  return (
    <Link
      to={href}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        isActive
          ? 'bg-[#14548d] text-[#d9ebff] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
          : 'text-text-secondary hover:bg-white/[0.04] hover:text-[#d9ebff]'
      }`}
      onClick={onClick}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs ${
          isActive
            ? 'border-white/10 bg-white/8 text-[#9ec7ff]'
            : 'border-transparent bg-white/[0.03] text-text-muted group-hover:border-white/8 group-hover:text-[#b8d5ff]'
        }`}
      >
        {icon ?? label.slice(0, 1)}
      </span>
      <span>{label}</span>
    </Link>
  );
};

export default MenuLink;
