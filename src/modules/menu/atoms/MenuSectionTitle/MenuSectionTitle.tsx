import type { MenuSectionTitleProps } from './MenuSectionTitle.types';

const MenuSectionTitle = ({ title, subtitle }: MenuSectionTitleProps) => {
  return (
    <div className="space-y-1 px-2">
      <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
        {title}
      </h3>
      {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
    </div>
  );
};

export default MenuSectionTitle;
