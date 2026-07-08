import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import clsx from 'clsx';

export function StatCard({ label, value, trend, positive, icon: Icon, accentColor = 'purple' }) {
  const accentMap = {
    purple: { bg: 'rgba(168,85,247,0.12)', text: '#a855f7' },
    blue:   { bg: 'rgba(59,130,246,0.12)', text: '#3b82f6' },
    cyan:   { bg: 'rgba(6,182,212,0.12)',  text: '#06b6d4' },
    green:  { bg: 'rgba(34,197,94,0.12)',  text: '#22c55e' },
  };
  const accent = accentMap[accentColor] || accentMap.purple;

  return (
    <div className="admin-card relative overflow-hidden group">
      {/* Subtle accent glow in corner */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity"
        style={{ background: accent.bg }}
      />
      <div className="flex flex-col gap-3 relative z-10">
        <div className="flex items-center justify-between">
          <span className="admin-stat-card-label">{label}</span>
          {Icon && (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: accent.bg }}>
              <Icon className="w-4 h-4" style={{ color: accent.text }} />
            </div>
          )}
        </div>
        <div className="admin-stat-card-value">{value}</div>
        {trend && (
          <div className={clsx(
            "flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full self-start",
            positive === true  && "bg-green-500/10 text-green-400",
            positive === false && "bg-red-500/10 text-red-400",
            positive === null  && "bg-white/5 text-white/40"
          )}>
            {positive === true  && <TrendingUp  className="w-3 h-3" />}
            {positive === false && <TrendingDown className="w-3 h-3" />}
            {positive === null  && <Minus       className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}
