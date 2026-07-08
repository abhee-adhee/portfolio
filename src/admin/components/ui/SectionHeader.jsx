import React from 'react';

export function SectionHeader({ title, description, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-[22px] font-semibold text-white tracking-tight font-sans">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-[13px] text-white/40 font-sans">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
