import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({ children, className, ...props }) {
  return (
    <div 
      className={twMerge(
        clsx(
          "admin-card",
          className
        )
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={twMerge(clsx("px-5 py-4 border-b border-white/5", className))} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={twMerge(clsx("text-[15px] font-semibold text-white", className))} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={twMerge(clsx("p-5", className))} {...props}>
      {children}
    </div>
  );
}
