import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { playSound } = useSound();
  const { pathname } = useLocation();

  return (
    <nav aria-label="Main Navigation" className="floating-bottom-nav">
      {NAV_LINKS.map(({ label, to }) => {
        const isActive =
          to === '/'
            ? pathname === '/'
            : pathname === to || pathname.startsWith(to + '/');

        return (
          <NavLink
            key={to}
            to={to}
            onClick={() => playSound('click')}
            onMouseEnter={() => playSound('hover')}
            className={`floating-nav-link ${isActive ? 'active' : ''}`}
          >
            {isActive && (
              <motion.div
                layoutId="floatingNavActiveIndicator"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 9999,
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-color)',
                  zIndex: -1,
                }}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {isActive && (
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-primary)',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
              )}
              {label}
            </span>
          </NavLink>
        );
      })}

      <div
        style={{
          width: 1,
          height: 16,
          backgroundColor: 'var(--border-color)',
          margin: '0 3px',
          flexShrink: 0,
        }}
      />

      <button
        onClick={() => {
          playSound('click');
          toggleTheme();
        }}
        onMouseEnter={() => playSound('hover')}
        aria-label="Toggle visual theme"
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          transition: 'color 0.15s ease',
          flexShrink: 0,
        }}
        onMouseOver={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
        onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
      >
        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
      </button>
    </nav>
  );
}
