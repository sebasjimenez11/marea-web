export interface MenuLinkProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}
