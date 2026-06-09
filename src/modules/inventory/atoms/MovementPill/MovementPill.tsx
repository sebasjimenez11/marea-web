export interface MovementPillProps {
  label: string;
  className?: string;
}

const MovementPill = ({ label, className = '' }: MovementPillProps) => {
  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${className}`.trim()}>
      {label}
    </span>
  );
};

export default MovementPill;
