import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

const TABS = [
  {
    id: 'internships',
    label: 'Internships',
    chapter: '01',
    count: 3,
    icon: Briefcase,
  },
  {
    id: 'events',
    label: 'Events & Workshops',
    chapter: '02',
    count: 3,
    icon: Calendar,
  },
  {
    id: 'education',
    label: 'Education',
    chapter: '03',
    count: 3,
    icon: GraduationCap,
  },
];

export default function JourneyTabs({ activeTab, onChange }) {
  const { playSound } = useSound();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3rem',
        width: '100%',
      }}
    >
      <div
        role="tablist"
        aria-label="Journey Sections"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px',
          borderRadius: '4px',
          background: 'var(--surface-muted)',
          border: '1px solid var(--border-subtle)',
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                playSound('click');
                onChange(tab.id);
              }}
              onMouseEnter={() => playSound('hover')}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: '2px',
                background: 'transparent',
                border: 'none',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.84rem',
                fontWeight: isActive ? 600 : 400,
                outline: 'none',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s ease',
                zIndex: 1,
              }}
            >
              {/* Sliding Active Background */}
              {isActive && (
                <motion.div
                  layoutId="activeJourneyTabIndicator"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '2px',
                    background: 'var(--surface-primary)',
                    border: '1px solid var(--border-strong)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    zIndex: -1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 34,
                  }}
                />
              )}

              {/* Chapter numeral */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontWeight: 600,
                }}
              >
                {tab.chapter}
              </span>

              <Icon
                size={14}
                style={{
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                }}
              />

              <span>{tab.label}</span>

              {/* Count */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  padding: '1px 6px',
                  borderRadius: '2px',
                  background: isActive ? 'var(--surface-muted)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
