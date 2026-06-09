const baseButtonClassName =
  'rounded-lg border border-white/10 px-3 py-1.5 text-sm text-text-secondary transition hover:text-text-primary';

const PaginationButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={baseButtonClassName}
        aria-label="Página anterior"
      >
        ‹
      </button>
      <button
        type="button"
        className={baseButtonClassName}
        aria-label="Página siguiente"
      >
        ›
      </button>
    </div>
  );
};

export default PaginationButtons;
