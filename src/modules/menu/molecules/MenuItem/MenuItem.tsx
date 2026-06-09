import type { MenuItemProps } from './MenuItem.types';
import { MenuLink } from '@/modules/menu/atoms';

const MenuItem = ({ label, href, icon, isActive = false, onClick }: MenuItemProps) => {
  return (
    <div>
      <MenuLink label={label} href={href} icon={icon} isActive={isActive} onClick={onClick} />
    </div>
  );
};

export default MenuItem;
