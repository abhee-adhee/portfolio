import { useState, useEffect, useCallback } from 'react';
import { motion,  AnimatePresence } from 'framer-motion';

/* ──────────────────────────────────────────────────────────
   PLACEHOLDER image — colored gradient with caption text.
   When real images are provided via src, it renders an <img>.
─────────────────────────────────────────────────────────── */
const GRAD = [
  'linear-gradient(135deg, #0d1b2a 0%, #0a2540 50%, #0d2137 100%)',
  'linear-gradient(135deg, #1a0d2e 0%, #2d1060 50%, #1a0d3a 100%)',
  'linear-gradient(135deg, #0d2e1a 0%, #0d4028 50%, #0a2e1a 100%)',
];

function Slide({ shot, index, classified }) {
  const isFakeSrc = !shot.src || shot.src.startsWith('/screenshots/');

  if (classified) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '1rem',
        background: '#0a0a0f',
        filter: 'blur(8px)',
        userSelect: 'none',
      }}>
        {/* classified is handled by the overlay wrapper */}
      </div>
    );
  }

  if (!isFakeSrc) {
    return (
      <img
        src={shot.src}
        alt={shot.caption}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    );
  }

  /* Gradient placeholder */
  return (
    <div style={{
      width: '100%', height: '100%',
      background: GRAD[index % GRAD.length],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--accent-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--accent-subtle) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />
      {/* Glow orb */}
      <div style={{
        position: 'absolute',
        width: '40%', paddingBottom: '40%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-secondary)', letterSpacing: '0.15em', marginBottom: 8, opacity: 0.6 }}>
          SCREENSHOT_{String(index + 1).padStart(2, '0')}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-border)', letterSpacing: '0.1em' }}>
          LOADING_ASSET...
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--accent-subtle)', letterSpacing: '0.08em', marginTop: 8, opacity: 0.5 }}>
          {shot.caption}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN CAROUSEL
─────────────────────────────────────────────────────────── */
export default function ScreenshotViewer({ screenshots = [], classified = false }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const total = screenshots.length;

  const go = useCallback((next) => {
    const dir = next > current ? 1 : -1;
    setDirection(dir);
    setCurrent((next + total) % total);
  }, [current, total]);

  const prev = useCallback(() => go(current - 1), [go, current]);
  const next = useCallback(() => go(current + 1), [go, current]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  if (total === 0) return null;

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* ── Terminal chrome bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 16px',
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid var(--border-color)',
        borderBottom: 'none',
        borderRadius: '10px 10px 0 0',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color: 'var(--text-muted)', marginLeft: 6, letterSpacing: '0.1em',
        }}>
          SCREENSHOT_VIEWER.exe
        </span>
        <span style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-primary)',
          letterSpacing: '0.08em',
        }}>
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* ── Main display (16:9 ratio) ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%', // 16:9
        background: '#0a0a0f',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-border)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
      >
        {/* Slide area */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <Slide shot={screenshots[current]} index={current} classified={classified} />
            </motion.div>
          </AnimatePresence>

          {/* CLASSIFIED overlay */}
          {classified && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 10,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              background: 'rgba(10,10,15,0.92)',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{
                fontSize: '2.5rem', filter: 'drop-shadow(0 0 12px rgba(239,68,68,0.5))',
              }}>🔒</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(239,68,68,0.8)', letterSpacing: '0.15em', fontWeight: 700 }}>
                ASSET_REDACTED
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                CLEARANCE_REQUIRED
              </div>
              <div style={{
                marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                color: 'rgba(239,68,68,0.4)', letterSpacing: '0.1em',
                border: '1px solid rgba(239,68,68,0.2)', padding: '4px 12px', borderRadius: 3,
              }}>
                CLASSIFICATION: LEVEL_04_RESTRICTED
              </div>
            </div>
          )}
        </div>

        {/* ← → Nav arrows */}
        {!classified && total > 1 && (
          <>
            <button
              onClick={prev}
              style={{
                position: 'absolute', left: 12, top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 20,
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                letterSpacing: '0.06em',
                background: 'rgba(10,10,15,0.75)',
                border: '1px solid var(--accent-border)',
                color: 'var(--accent-primary)',
                padding: '8px 12px', borderRadius: 4,
                cursor: 'none',
                backdropFilter: 'blur(6px)',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-subtle)'; e.currentTarget.style.boxShadow = 'var(--accent-glow)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,15,0.75)'; e.currentTarget.style.boxShadow = 'none'; }}
              aria-label="Previous screenshot"
            >
              [ &lt; ]
            </button>
            <button
              onClick={next}
              style={{
                position: 'absolute', right: 12, top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 20,
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                letterSpacing: '0.06em',
                background: 'rgba(10,10,15,0.75)',
                border: '1px solid var(--accent-border)',
                color: 'var(--accent-primary)',
                padding: '8px 12px', borderRadius: 4,
                cursor: 'none',
                backdropFilter: 'blur(6px)',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-subtle)'; e.currentTarget.style.boxShadow = 'var(--accent-glow)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,15,0.75)'; e.currentTarget.style.boxShadow = 'none'; }}
              aria-label="Next screenshot"
            >
              [ &gt; ]
            </button>
          </>
        )}

        {/* Caption bar at bottom */}
        {!classified && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 15,
            padding: '6px 16px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            color: 'var(--accent-secondary)', letterSpacing: '0.1em',
          }}>
            {screenshots[current]?.caption}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {!classified && total > 1 && (
        <div style={{
          display: 'flex', gap: '0.5rem',
          padding: '0.75rem',
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid var(--border-color)',
          borderTop: '1px solid var(--border-color)',
          borderRadius: '0 0 10px 10px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {screenshots.map((shot, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                flexShrink: 0,
                width: 72, height: 46,
                border: i === current
                  ? '2px solid var(--accent-primary)'
                  : '1px solid var(--accent-border)',
                borderRadius: 4,
                background: '#0a0a0f',
                cursor: 'none',
                overflow: 'hidden',
                position: 'relative',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxShadow: i === current ? 'var(--accent-glow)' : 'none',
              }}
              aria-label={`Screenshot ${i + 1}`}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: GRAD[i % GRAD.length],
                opacity: i === current ? 1 : 0.5,
                transition: 'opacity 0.2s',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: '0.45rem',
                color: 'var(--accent-secondary)', letterSpacing: '0.05em',
                opacity: 0.6,
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </button>
          ))}

          {/* Keyboard hint */}
          <div style={{
            marginLeft: 'auto', alignSelf: 'center', flexShrink: 0,
            fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
            color: 'var(--text-muted)', letterSpacing: '0.06em',
            paddingRight: 4,
          }}>
            ← → to navigate
          </div>
        </div>
      )}
    </div>
  );
}
