export interface MenuItemProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}
