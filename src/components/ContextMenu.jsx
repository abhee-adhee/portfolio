import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function ContextMenu() {
  const [menu, setMenu] = useState(null); // { x, y } or null
  const [grain, setGrain] = useState(false);
  const [scanline, setScanline] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onContext = (e) => {
      e.preventDefault();
      setMenu({ x: e.clientX, y: e.clientY });
    };
    const onClose = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(null);
      }
    };
    window.addEventListener('contextmenu', onContext);
    window.addEventListener('mousedown', onClose);
    return () => {
      window.removeEventListener('contextmenu', onContext);
      window.removeEventListener('mousedown', onClose);
    };
  }, []);

  const actions = [
    {
      label: grain ? '⊡ DISABLE GRAIN' : '⊠ ENABLE GRAIN',
      action: () => { setGrain(g => !g); setMenu(null); }
    },
    {
      label: scanline ? '≡ DISABLE SCANLINE' : '≡ ENABLE SCANLINE',
      action: () => { setScanline(s => !s); setMenu(null); }
    },
    {
      label: '↺ RESET VIEW',
      action: () => { setGrain(false); setScanline(false); setMenu(null); }
    },
  ];

  return (
    <>
      {/* Global CSS effects based on state */}
      <style>{`
        ${grain ? `
          body::after {
            content: '';
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 99990;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
            background-repeat: repeat;
            animation: grainAnim 0.15s steps(1) infinite;
          }
          @keyframes grainAnim {
            0%  { background-position: 0 0; }
            20% { background-position: -80px -40px; }
            40% { background-position: 40px 80px; }
            60% { background-position: -60px 40px; }
            80% { background-position: 80px -60px; }
          }
        ` : ''}
        ${scanline ? `
          body::before {
            content: '';
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 99989;
            background: repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(0,245,255,0.025) 3px,
              rgba(0,245,255,0.025) 4px
            );
          }
        ` : ''}
      `}</style>

      {/* Custom context menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            ref={menuRef}
            key="ctx"
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.12 }}
            style={{
              position: 'fixed',
              left: menu.x, top: menu.y,
              zIndex: 99995,
              background: 'rgba(5,5,12,0.96)',
              border: '1px solid rgba(0,245,255,0.2)',
              borderRadius: 6,
              overflow: 'hidden',
              boxShadow: '0 0 40px rgba(0,245,255,0.06), 0 8px 32px rgba(0,0,0,0.5)',
              minWidth: 200,
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{
              padding: '6px 12px',
              fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
              color: 'rgba(0,245,255,0.3)', letterSpacing: '0.15em',
              borderBottom: '1px solid rgba(0,245,255,0.08)',
            }}>
              SYSTEM_OPTIONS
            </div>
            {actions.map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'transparent', border: 'none',
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                  color: 'var(--text-secondary)', letterSpacing: '0.08em',
                  padding: '10px 16px', cursor: 'pointer',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(0,245,255,0.06)';
                  e.currentTarget.style.color = 'var(--accent-cyan)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
