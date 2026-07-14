import { useState, useRef, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';
import { showToast } from './Toast';
import { playSoundOn, playSoundOff } from '../utils/soundEngine';

const prefetchRoute = (path) => {
  const routes = {
    '/': () => import('../pages/Home'),
    '/projects': () => import('../pages/Projects'),
    '/education': () => import('../pages/Education'),
    '/experience': () => import('../pages/Experience'),
    '/about': () => import('../pages/About'),
    '/contact': () => import('../pages/Contact'),
  };
  if (routes[path]) routes[path]().catch(() => {});
};

const NAV_LINKS = [
  { label: 'HOME',       to: '/' },
  { label: 'PROJECTS',   to: '/projects' },
  { label: 'EDUCATION',  to: '/education' },
  { label: 'EXPERIENCE', to: '/experience' },
  { label: 'ABOUT',      to: '/about' },
  { label: 'CONTACT',    to: '/contact' },
];

// Sun icon
const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

// Moon icon
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Navbar() {
  const { theme, triggerRipple } = useTheme();
  const { soundOn, toggle: toggleSound, playSound } = useSound();
  const { pathname } = useLocation();
  const toggleRef = useRef(null);

  const handleToggle = useCallback(() => {
    if (toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      const cx = Math.round(rect.left + rect.width / 2);
      const cy = Math.round(rect.top  + rect.height / 2);
      triggerRipple(cx, cy);
    }
  }, [triggerRipple]);

  const handleSoundToggle = useCallback(() => {
    const next = !soundOn;
    if (!next) {
      playSoundOff();
      setTimeout(() => toggleSound(), 80);
    } else {
      toggleSound();
      setTimeout(() => playSoundOn(), 20);
    }
    showToast(
      next ? 'AUDIO_ENABLED' : 'AUDIO_DISABLED',
      { color: next ? '#4ade80' : '#ef4444', icon: next ? '🔊' : '🔇' }
    );
  }, [soundOn, toggleSound]);

  return (
    <>
      <motion.nav
        initial={{ y: 50, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="floating-dock"
      >
        <div className="dock-links">
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = pathname === to || (to !== '/' && pathname.startsWith(to));
            return (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => playSound('click')}
                onMouseEnter={() => {
                  playSound('hover');
                  prefetchRoute(to);
                }}
                className="dock-link"
              >
                {isActive && (
                  <motion.div
                    layoutId="dock-pill"
                    className="dock-pill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`dock-link-text ${isActive ? 'active' : ''}`}>
                  {label}
                </span>
              </NavLink>
            );
          })}
        </div>

        <div className="dock-divider" />

        <div className="dock-controls">
          <button
            ref={toggleRef}
            aria-label="Toggle theme"
            className="dock-icon-btn"
            onClick={e => {
              handleToggle();
              const icon = e.currentTarget.querySelector('span');
              if (icon) { icon.classList.add('toggle-spin'); setTimeout(() => icon.classList.remove('toggle-spin'), 450); }
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0,   scale: 1, opacity: 1 }}
                  exit={{    rotate:  90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <SunIcon />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90,  scale: 0, opacity: 0 }}
                  animate={{ rotate: 0,   scale: 1, opacity: 1 }}
                  exit={{    rotate: -90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <MoonIcon />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            aria-label={soundOn ? 'Disable sound' : 'Enable sound'}
            className="dock-icon-btn"
            onClick={e => {
              handleSoundToggle();
              const icon = e.currentTarget.querySelector('span');
              if (icon) { icon.classList.add('toggle-spin'); setTimeout(() => icon.classList.remove('toggle-spin'), 450); }
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={soundOn ? 'on' : 'off'}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{    scale: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ display: 'flex', alignItems: 'center', lineHeight: 1, fontSize: '0.8rem' }}
              >
                {soundOn ? '🔊' : '🔇'}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <style>{`
        .floating-dock {
          position: fixed;
          bottom: clamp(28px, 4vh, 40px);
          left: 50%;
          /* transform: translateX(-50%) is handled by Framer Motion to prevent centering bugs */
          z-index: 1000;
          background: rgba(12, 12, 16, 0.82);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(168, 85, 247, 0.18);
          border-radius: 40px;
          padding: 14px 26px;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: 
            0 16px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(168, 85, 247, 0.15);
          width: auto;
          white-space: nowrap;
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .floating-dock:hover {
          background: rgba(12, 12, 16, 0.88);
          border-color: rgba(168, 85, 247, 0.25);
        }

        .dock-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dock-link {
          position: relative;
          padding: 8px 16px;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          transition: transform 0.25s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .dock-link:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .dock-link-text {
          position: relative;
          z-index: 2;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          transition: color 0.25s ease;
        }

        .dock-link:hover .dock-link-text {
          color: rgba(255, 255, 255, 0.95);
        }

        .dock-link-text.active {
          color: #ffffff;
          font-weight: 500;
        }

        .dock-pill {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          z-index: 1;
          border-top: 1px solid rgba(168, 85, 247, 0.3);
          box-shadow: inset 0 1px 4px rgba(255, 255, 255, 0.03);
        }

        .dock-divider {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.12);
        }

        .dock-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dock-icon-btn {
          background: transparent;
          border: none;
          padding: 8px;
          border-radius: 50%;
          color: rgba(255, 255, 255, 0.7);
          cursor: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.25s ease, background 0.25s ease, transform 0.25s ease;
        }

        .dock-icon-btn:hover {
          color: rgba(255, 255, 255, 1);
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-2px) scale(1.02);
        }

        @media (max-width: 768px) {
          .floating-dock {
            padding: 10px 14px;
            gap: 0.75rem;
            max-width: 92vw;
            border-radius: 32px;
          }

          .dock-links {
            gap: 0.25rem;
            overflow-x: auto;
            -ms-overflow-style: none;
            scrollbar-width: none;
            /* Ensures scroll items don't stick strictly to the edge if centered */
            scroll-snap-type: x mandatory;
          }
          
          .dock-links::-webkit-scrollbar {
            display: none;
          }

          .dock-link {
            padding: 8px 12px;
            scroll-snap-align: start;
          }

          .dock-link-text {
            font-size: 0.6rem;
            letter-spacing: 0.08em;
          }
        }
        
        .light .floating-dock {
          background: rgba(255, 255, 255, 0.85);
          border-color: rgba(124, 58, 237, 0.15);
          box-shadow: 
            0 16px 40px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(124, 58, 237, 0.1);
        }
        
        .light .floating-dock:hover {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(124, 58, 237, 0.25);
        }
        
        .light .dock-link-text {
          color: rgba(0, 0, 0, 0.55);
        }
        
        .light .dock-link:hover .dock-link-text {
          color: rgba(0, 0, 0, 0.95);
        }
        
        .light .dock-link-text.active {
          color: #000000;
        }
        
        .light .dock-pill {
          background: rgba(0, 0, 0, 0.04);
          border-top: 1px solid rgba(124, 58, 237, 0.25);
          box-shadow: none;
        }
        
        .light .dock-divider {
          background: rgba(0, 0, 0, 0.12);
        }
        
        .light .dock-icon-btn {
          color: rgba(0, 0, 0, 0.6);
        }
        
        .light .dock-icon-btn:hover {
          color: rgba(0, 0, 0, 1);
          background: rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </>
  );
}
