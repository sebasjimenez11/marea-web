import type { ReactNode } from 'react';
import { Avatar, SearchInput } from '@/components/common';

export interface WorkspaceTopbarProps {
  contextLabel?: string;
}

const IconButton = ({ children }: { children: ReactNode }) => {
  return (
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-text-secondary transition hover:border-white/12 hover:bg-white/[0.06] hover:text-text-primary"
    >
      {children}
    </button>
  );
};

const WorkspaceTopbar = ({ contextLabel = 'Panel operativo' }: WorkspaceTopbarProps) => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/8 bg-app/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8 xl:px-10">
      <div className="flex items-center justify-between gap-4">
        <div className="hidden md:block">
          <span className="text-sm font-medium text-text-muted">{contextLabel}</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <SearchInput className="w-44 sm:w-56 lg:w-72" />
          <IconButton>
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M10 3.5a4 4 0 0 0-4 4v1.1c0 .7-.2 1.4-.6 2L4.5 12h11l-.9-1.4a3.8 3.8 0 0 1-.6-2V7.5a4 4 0 0 0-4-4Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M8.5 14a1.7 1.7 0 0 0 3 0" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </IconButton>
          <IconButton>
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M8.2 8.1a1.9 1.9 0 1 1 3.3 1.2c-.8.7-1.5 1.1-1.5 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="10" cy="13.9" r=".8" fill="currentColor" />
            </svg>
          </IconButton>
          <Avatar alt="Angel Admin" size="sm" />
        </div>
      </div>
    </header>
  );
};

export default WorkspaceTopbar;
