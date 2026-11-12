import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';

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
  const { theme } = useTheme();

  // Ensure high contrast against the green background in both themes
  const activeTextColor = theme === 'light' ? '#ffffff' : '#090d10';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3.5rem',
        width: '100%',
      }}
    >
      <div
        role="tablist"
        aria-label="Journey Sections"
        className="journey-tablist"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px',
          borderRadius: '14px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
          maxWidth: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
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
              className={`journey-tab-btn ${isActive ? 'active' : ''}`}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 22px',
                borderRadius: '10px',
                background: isActive ? 'var(--accent-primary)' : 'transparent',
                border: 'none',
                color: isActive ? activeTextColor : 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.94rem',
                fontWeight: isActive ? 700 : 500,
                outline: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.18s ease',
                zIndex: 1,
                boxShadow: isActive ? '0 2px 14px rgba(34, 197, 94, 0.35)' : 'none',
              }}
            >
              {/* Sliding Active Background */}
              {isActive && (
                <motion.div
                  layoutId="activeJourneyTabIndicator"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '10px',
                    backgroundColor: 'var(--accent-primary)',
                    zIndex: -1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 35,
                  }}
                />
              )}

              {/* Chapter numeral */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: isActive ? activeTextColor : 'var(--text-muted)',
                  fontWeight: 700,
                  opacity: isActive ? 0.8 : 1,
                }}
              >
                {tab.chapter}
              </span>

              <Icon
                size={16}
                strokeWidth={isActive ? 2.4 : 2}
                style={{
                  color: isActive ? activeTextColor : 'var(--text-secondary)',
                  flexShrink: 0,
                }}
              />

              <span style={{ letterSpacing: '-0.01em' }}>{tab.label}</span>

              {/* Count badge */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  backgroundColor: isActive ? 'rgba(0, 0, 0, 0.18)' : 'var(--bg-subtle)',
                  color: isActive ? activeTextColor : 'var(--text-secondary)',
                  border: isActive ? 'none' : '1px solid var(--border-color)',
                  marginLeft: '2px',
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <style>{`
        .journey-tab-btn:not(.active):hover {
          color: var(--text-primary) !important;
          background-color: var(--bg-subtle) !important;
        }
        @media (max-width: 640px) {
          .journey-tablist {
            width: 100% !important;
            justifyContent: space-between !important;
            gap: 4px !important;
            padding: 4px !important;
          }
          .journey-tab-btn {
            padding: 10px 12px !important;
            font-size: 0.82rem !important;
            gap: 6px !important;
            flex: 1 !important;
            justifyContent: center !important;
          }
          .journey-tab-btn svg {
            width: 14px !important;
            height: 14px !important;
          }
        }
        @media (max-width: 440px) {
          .journey-tab-btn span:first-of-type {
            display: none !important;
          }
          .journey-tab-btn {
            padding: 8px 8px !important;
            font-size: 0.78rem !important;
          }
        }
      `}</style>
    </div>
  );
}
