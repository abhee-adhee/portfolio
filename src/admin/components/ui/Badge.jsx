import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const VARIANTS = {
  default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  primary: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
  danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800",
};

export function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span 
      className={twMerge(
        clsx(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          VARIANTS[variant] || VARIANTS.default,
          className
        )
      )} 
      {...props}
    >
      {children}
    </span>
  );
}
