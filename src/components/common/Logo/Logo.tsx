export interface LogoProps {
  variant?: 'full' | 'icon';
  onClick?: () => void;
}

const Logo = ({ variant = 'full', onClick }: LogoProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-3 rounded-2xl text-left transition hover:opacity-90"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4d9fff] text-sm font-black tracking-[0.2em] text-[#0f172a] shadow-sm">
        PB
      </span>
      {variant === 'full' && (
        <span className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d7e6ff]">
            PoolBar
          </span>
          <span className="text-xs text-text-muted">Manager Console</span>
        </span>
      )}
    </button>
  );
};

export default Logo;
