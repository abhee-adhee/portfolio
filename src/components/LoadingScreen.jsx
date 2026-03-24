import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../context/SoundContext';

// Terminal boot sequence lines
const BOOT_LINES = [
  '> BOOTING SYSTEM...',
  '> LOADING KERNEL... OK',
  '> MOUNTING FILESYSTEM... OK',
  '> ESTABLISHING CONNECTION... OK',
  '> IDENTITY VERIFIED: ABINAV',
  '> WELCOME TO THE GRID',
];

export default function LoadingScreen({ onComplete }) {
  const { playSound } = useSound();
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Already shown this session? skip.
    if (sessionStorage.getItem('abinav-loaded')) {
      onComplete();
      return;
    }

    let lineIdx = 0;
    const lineInterval = setInterval(() => {
      if (lineIdx < BOOT_LINES.length) {
        setVisibleLines(prev => [...prev, BOOT_LINES[lineIdx]]);
        lineIdx++;
      } else {
        clearInterval(lineInterval);
      }
    }, 420);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // After 2.5s, transition out normally
    const timeout = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem('abinav-loaded', 'true');
      onComplete();
    }, 5000);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
          style={{ background: '#0a0a0f' }}
          exit={{
            opacity: 0,
            filter: 'blur(10px) brightness(2)',
            scale: 0,
          }}
          transition={{ duration: 0.8, ease: 'backIn' }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 bg-grid opacity-30" />

          {/* Glow orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Terminal window */}
          <div
            className="relative z-10 w-full max-w-xl mx-4 rounded-lg overflow-hidden"
            style={{
              background: 'rgba(10,10,15,0.95)',
              border: '1px solid rgba(0,245,255,0.2)',
              boxShadow: '0 0 60px rgba(0,245,255,0.1)',
            }}
          >
            {/* Terminal title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: '1px solid rgba(0,245,255,0.1)', background: 'rgba(0,245,255,0.03)' }}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#4ade80' }} />
              <span
                className="ml-4 text-xs"
                style={{ fontFamily: 'var(--font-dot-matrix)', color: 'var(--text-muted)', letterSpacing: '0.1em' }}
              >
                ABINAV.SYS terminal — boot.sh
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-6 min-h-48">
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-2 text-sm"
                  style={{
                    fontFamily: line.includes('WELCOME TO THE GRID') ? 'var(--font-dot-matrix)' : 'var(--font-mono)',
                    color: i === visibleLines.length - 1 ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    letterSpacing: '0.05em',
                    fontSize: line.includes('WELCOME TO THE GRID') ? '1.2rem' : undefined,
                    textShadow: line.includes('WELCOME TO THE GRID') ? '0 0 20px rgba(168,85,247,0.6)' : undefined,
                  }}
                >
                  {line}
                  {i === visibleLines.length - 1 && (
                    <span className="blink ml-1" style={{ color: 'var(--accent-cyan)' }}>█</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="px-6 pb-6">
              <div className="flex justify-between mb-1">
                <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  LOADING_PROGRESS
                </span>
                <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                  {progress}%
                </span>
              </div>
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: 'rgba(0,245,255,0.1)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, var(--accent-violet), var(--accent-cyan))',
                    boxShadow: 'var(--glow-cyan)',
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
