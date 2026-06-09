const sizeClasses = {
  sm: 'h-9 w-9 text-sm',
  md: 'h-11 w-11 text-base',
  lg: 'h-14 w-14 text-lg',
};

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar = ({ src, alt = 'Avatar', size = 'md' }: AvatarProps) => {
  const initials = alt
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border-default bg-primary/10 font-semibold text-primary ${sizeClasses[size]}`}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span>{initials || 'AV'}</span>
      )}
    </div>
  );
};

export default Avatar;
