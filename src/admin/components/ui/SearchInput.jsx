import React from 'react';
import { Search } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function SearchInput({ className, placeholder = "Search...", ...props }) {
  return (
    <div className={twMerge(clsx("relative", className))}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        className={twMerge(
          clsx(
            "block w-full pl-10 pr-3 py-2 border rounded-lg text-sm transition-colors",
            "bg-white dark:bg-[#18181b]",
            "border-gray-300 dark:border-[#27272a]",
            "text-gray-900 dark:text-gray-100",
            "placeholder-gray-500 dark:placeholder-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:ring-blue-400/30"
          )
        )}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
