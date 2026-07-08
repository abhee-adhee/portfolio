import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function ErrorState({ title = "Something went wrong", message = "There was an error loading the data. Please try again later.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
      <div className="w-12 h-12 mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-medium text-red-900 dark:text-red-200">{title}</h3>
      <p className="mt-1 text-sm text-red-600 dark:text-red-400 max-w-sm">
        {message}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-6 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
