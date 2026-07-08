import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

export function FormContainer({ title, description, children, onSubmit, actions }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit?.(e); }}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
        {actions && (
          <div className="px-6 py-4 bg-gray-50/50 dark:bg-[#18181b]/50 border-t border-gray-200 dark:border-[#27272a] flex justify-end gap-3">
            {actions}
          </div>
        )}
      </Card>
    </form>
  );
}
