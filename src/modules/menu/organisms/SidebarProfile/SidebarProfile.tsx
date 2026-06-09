import { Button } from '@/components/common';
import { ProfileInfo } from '@/modules/menu/molecules';

const SidebarProfile = () => {
  return (
    <div className="space-y-5 border-t border-white/8 px-5 py-5">
      <Button className="w-full justify-center" size="md">
        + New Entry
      </Button>
      <ProfileInfo name="Angel Admin" email="operations@poolbar.app" />
      <div className="space-y-3 text-sm text-text-muted">
        <button type="button" className="block transition hover:text-text-primary">
          Settings
        </button>
        <button type="button" className="block transition hover:text-text-primary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarProfile;
