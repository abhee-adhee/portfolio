import { useEffect, useState } from 'react';
import { motion,  AnimatePresence } from 'framer-motion';

const SEQUENCE = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

export default function KonamiEgg() {
  const [buf, setBuf]         = useState([]);
  const [rain, setRain]       = useState(false);
  const [popup, setPopup]     = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      setBuf(prev => {
        const next = [...prev, e.key].slice(-SEQUENCE.length);
        if (next.join(',') === SEQUENCE.join(',')) {
          // Trigger!
          setRain(true);
          setTimeout(() => {
            setRain(false);
            setPopup(true);
          }, 3000);
          setTimeout(() => setPopup(false), 6500);
          return [];
        }
        return next;
      });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* Full-screen matrix rain overlay */}
      <AnimatePresence>
        {rain && (
          <motion.div
            key="konami-rain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99990,
              pointerEvents: 'none',
            }}
          >
            {/* Full-screen canvas matrix rain */}
            <KonamiMatrix />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            key="konami-popup"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 99995,
              background: 'rgba(10,10,15,0.97)',
              border: '1px solid var(--accent-primary)',
              borderRadius: 8,
              padding: '2rem 2.5rem',
              minWidth: 340,
              boxShadow: '0 0 60px var(--accent-glow), 0 0 120px var(--accent-subtle)',
              textAlign: 'center',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Terminal title bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              position: 'absolute',
              top: 12,
              left: 16,
            }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#ef4444' }} />
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#f59e0b' }} />
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#4ade80' }} />
            </div>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.12em',
              marginBottom: '1.25rem',
              marginTop: '0.5rem',
            }}>
              SYSTEM_OVERRIDE.exe
            </div>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: '#4ade80',
              letterSpacing: '0.08em',
              lineHeight: 1.7,
              marginBottom: '1rem',
            }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginBottom: '0.5rem' }}>
                {'>'} ACCESS_LEVEL: ROOT
              </div>
              <div>NEURAL_OVERRIDE_COMPLETE.</div>
              <div style={{ color: 'var(--accent-primary)' }}>NICE TRY, AGENT.</div>
            </div>

            <div
              onClick={() => setPopup(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                cursor: 'none',
                marginTop: '0.5rem',
                letterSpacing: '0.08em',
                opacity: 0.6,
              }}
            >
              [ CLICK TO DISMISS ]
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dim overlay behind popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            key="konami-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPopup(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99994,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(4px)',
              cursor: 'none',
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* Inline canvas matrix rain specifically for full-screen konami effect */
function KonamiMatrix() {
  useEffect(() => {
    const canvas = document.getElementById('konami-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols   = Math.floor(canvas.width / 16);
    const drops  = Array(cols).fill(1);
    const chars  = '01NEURALOVERRIDE10ABINAV_SYS01';

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#a855f7';
      ctx.font = '13px JetBrains Mono, monospace';
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const id = setInterval(draw, 45);
    return () => clearInterval(id);
  }, []);

  return (
    <canvas
      id="konami-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.92,
      }}
    />
  );
}
