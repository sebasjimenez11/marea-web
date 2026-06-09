import type { ProfileInfoProps } from './ProfileInfo.types';
import { Avatar } from '@/components/common';

const ProfileInfo = ({ name, email, avatarSrc }: ProfileInfoProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={avatarSrc} alt={name} size="md" />
      <div className="min-w-0">
        <h4 className="truncate text-sm font-semibold text-text-primary">{name}</h4>
        {email && <p className="truncate text-sm text-text-muted">{email}</p>}
      </div>
    </div>
  );
};

export default ProfileInfo;
