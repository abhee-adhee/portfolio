import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Extended to support custom message + color
let showToastFn = null;

export function showTransmissionToast() {
  if (showToastFn) showToastFn({ message: 'TRANSMISSION_INITIATED', color: '#4ade80', icon: '✓' });
}

export function showToast(message, { color = 'var(--accent-primary)', icon = '◈' } = {}) {
  if (showToastFn) showToastFn({ message, color, icon });
}

export default function Toast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    showToastFn = ({ message, color, icon }) => {
      setToast({ message, color, icon, key: Date.now() });
      setTimeout(() => setToast(null), 2500);
    };
    return () => { showToastFn = null; };
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.key}
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0,   x: '-50%' }}
          exit={{    opacity: 0, y: -20, x: '-50%' }}
          style={{
            position: 'fixed',
            top: 80,
            left: '50%',
            zIndex: 9500,
            padding: '10px 20px',
            background: 'rgba(0,10,15,0.97)',
            border: '1px solid var(--accent-border)',
            boxShadow: 'var(--accent-glow)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent-primary)',
            letterSpacing: '0.1em',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: toast.color }}>{toast.icon}</span>
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
