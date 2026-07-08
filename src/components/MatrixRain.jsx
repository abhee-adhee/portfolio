import { useEffect, useRef, useState } from 'react';
import { motion,  AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '../utils/useKonamiCode';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?あいうえおカタカナ';

export default function MatrixRain() {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useKonamiCode(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3500);
    }, 3000);
  });

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 16);
    const drops = Array(cols).fill(1);
    let animId;

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00f5ff';
      ctx.font = '14px JetBrains Mono, monospace';

      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0,
              zIndex: 9990,
              pointerEvents: 'none',
              background: '#000',
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              zIndex: 9991,
              padding: '2rem 3rem',
              background: 'rgba(0,0,0,0.95)',
              border: '1px solid var(--accent-cyan)',
              boxShadow: '0 0 40px rgba(0,245,255,0.3)',
              fontFamily: 'var(--font-mono)',
              textAlign: 'center',
              borderRadius: 4,
            }}
          >
            <div style={{ color: '#4ade80', marginBottom: 8 }}>[ NEURAL_OVERRIDE_COMPLETE ]</div>
            <div style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem' }}>NICE TRY, AGENT.</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
