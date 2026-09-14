import React from 'react';
import { FolderGit2 } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  actionTo?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionTo,
  icon
}) => {
  return (
    <div className="text-center py-16 px-4 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20 light:border-zinc-300 light:bg-zinc-50">
      <div className="w-12 h-12 rounded-xl bg-zinc-800/80 text-zinc-400 mx-auto flex items-center justify-center mb-4 light:bg-zinc-200 light:text-zinc-600">
        {icon || <FolderGit2 className="w-6 h-6" />}
      </div>
      <h3 className="text-lg font-medium text-zinc-200 mb-1 light:text-zinc-800">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-sm mx-auto mb-6 light:text-zinc-600">{description}</p>
      {actionText && actionTo && (
        <a
          href={actionTo}
          className="inline-flex items-center text-sm font-medium text-brand-400 hover:text-brand-300 hover:underline"
        >
          {actionText} →
        </a>
      )}
    </div>
  );
};
