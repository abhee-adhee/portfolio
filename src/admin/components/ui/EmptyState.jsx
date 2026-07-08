import React from 'react';
import { FileQuestion } from 'lucide-react';

export function EmptyState({ title = "No data found", description = "Get started by creating a new entry.", action, /* eslint-disable-next-line no-unused-vars */ /* eslint-disable-next-line no-unused-vars */ icon: Icon = FileQuestion }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 dark:border-[#27272a] rounded-xl bg-gray-50/50 dark:bg-[#18181b]/50">
      <div className="w-12 h-12 mb-4 rounded-full bg-gray-100 dark:bg-[#27272a] flex items-center justify-center">
        <Icon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
        {description}
      </p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}
