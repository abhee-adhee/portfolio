import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function LoadingSkeleton({ className, ...props }) {
  return (
    <div 
      className={twMerge(clsx("admin-skeleton", className))} 
      {...props} 
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="admin-card">
      <div className="flex justify-between items-center mb-4">
        <LoadingSkeleton className="h-3 w-24 rounded" />
        <LoadingSkeleton className="h-8 w-8 rounded-lg" />
      </div>
      <LoadingSkeleton className="h-7 w-32 mb-3 rounded" />
      <LoadingSkeleton className="h-3 w-44 rounded" />
    </div>
  );
}
