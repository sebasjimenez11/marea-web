import { SidebarLogo, SidebarNavigation, SidebarProfile } from '@/modules/menu/organisms';

const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen w-full max-w-72 shrink-0 border-r border-white/8 bg-[#1a1f27] lg:flex lg:flex-col">
      <SidebarLogo />
      <SidebarNavigation />
      <SidebarProfile />
    </aside>
  );
};

export default Sidebar;
