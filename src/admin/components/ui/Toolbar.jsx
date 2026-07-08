import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Toolbar({ children, className, ...props }) {
  return (
    <div 
      className={twMerge(
        clsx(
          "flex items-center gap-2 p-2",
          "bg-gray-50/50 dark:bg-[#18181b]/50 rounded-lg",
          "border border-gray-200 dark:border-[#27272a]",
          className
        )
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
