import type { ReactNode } from 'react';
import { WorkspaceTopbar } from '../WorkspaceTopbar';

export interface WorkspacePageProps {
  contextLabel: string;
  children: ReactNode;
}

const WorkspacePage = ({ contextLabel, children }: WorkspacePageProps) => {
  return (
    <main className="flex-1 overflow-y-auto bg-app">
      <WorkspaceTopbar contextLabel={contextLabel} />
      <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        {children}
      </div>
    </main>
  );
};

export default WorkspacePage;
