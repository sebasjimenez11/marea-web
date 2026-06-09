export interface MenuChild {
  label: string;
  href: string;
}

export interface MenuItem {
  label: string;
  href?: string;
  active?: boolean;
  children?: MenuChild[];
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface SidebarConfig {
  sections: MenuSection[];
  collapsed?: boolean;
}
