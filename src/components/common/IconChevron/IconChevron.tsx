export interface IconChevronProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  isOpen?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const directionClasses = {
  up: 'rotate-180',
  down: 'rotate-0',
  left: '-rotate-90',
  right: 'rotate-90',
};

const IconChevron = ({ direction = 'down', size = 'md', isOpen = false }: IconChevronProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`${sizeClasses[size]} shrink-0 text-text-muted transition-transform ${
        isOpen ? 'rotate-180' : directionClasses[direction]
      }`}
    >
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconChevron;
