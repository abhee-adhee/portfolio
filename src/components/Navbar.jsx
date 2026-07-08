import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion,  AnimatePresence } from 'framer-motion';
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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

// Moon icon
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Navbar() {
  const { theme, triggerRipple } = useTheme();
  const { soundOn, toggle: toggleSound, playSound } = useSound();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
      // play off click BEFORE muting so it's audible
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: 'var(--navbar-height)',
          zIndex: 1000,
          transition: 'background 0.3s, backdrop-filter 0.3s, box-shadow 0.3s',
          background: scrolled
            ? 'rgba(10,10,15,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled
            ? '0 1px 0 var(--accent-subtle)'
            : 'none',
        }}
      >
        <nav
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={() => playSound('click')}
            onMouseEnter={() => playSound('hover')}
            style={{
              fontFamily: 'var(--font-dot-matrix)',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {/* Blinking online dot */}
            <span
              style={{
                width: 7, height: 7,
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 6px #4ade80',
                display: 'inline-block',
                animation: 'blink 2s ease-in-out infinite',
              }}
            />
            ABINAV.SYS
          </Link>

          {/* Center: desktop nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="hidden-mobile">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => playSound('click')}
                onMouseEnter={() => {
                  playSound('hover');
                  prefetchRoute(to);
                }}
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' nav-link-active' : '')
                }
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  paddingBottom: 2,
                  position: 'relative',
                })}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && <span className="nav-active-underline" style={{ width: '100%' }} />}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right: coords + theme toggle + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Coords */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
              }}
              className="hidden-mobile"
            >
              13.08°N 80.27°E
            </span>

            {/* Theme toggle */}
            <button
              ref={toggleRef}
              aria-label="Toggle theme"
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: 4,
                padding: '6px 8px',
                cursor: 'none',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                width: 34,
                height: 32,
                justifyContent: 'center',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = 'var(--accent-glow)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; }}
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

            {/* Sound toggle */}
            <button
              aria-label={soundOn ? 'Disable sound' : 'Enable sound'}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: 4,
                padding: '6px 8px',
                cursor: 'none',
                color: soundOn ? 'var(--accent-primary)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                width: 34,
                height: 32,
                justifyContent: 'center',
                fontSize: '0.85rem',
                transition: 'border-color 0.2s, box-shadow 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = 'var(--accent-glow)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; }}
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
                  style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}
                >
                  {soundOn ? '🔊' : '🔇'}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Hamburger - mobile only */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Open menu"
              className="show-mobile"
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: 4,
                padding: '6px 10px',
                cursor: 'none',
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
              }}
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'rgba(10,10,15,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              padding: '6rem 2rem 2rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--accent-primary)',
                marginBottom: '2rem',
                letterSpacing: '0.15em',
              }}
            >
              // NAVIGATION_MENU
            </div>
            {NAV_LINKS.map(({ label, to }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <NavLink
                  to={to}
                  end={to === '/'}
                  style={({ isActive }) => ({
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.2rem',
                    letterSpacing: '0.1em',
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '1rem 0',
                    borderBottom: '1px solid var(--border-color)',
                  })}
                >
                  &gt; {label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
