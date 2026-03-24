import { useState, useEffect } from 'react';

export default function FloatingBadge() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 12px',
        borderRadius: 4,
        background: 'rgba(10,10,15,0.85)',
        border: '1px solid rgba(0,245,255,0.2)',
        backdropFilter: 'blur(8px)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--text-secondary)',
        letterSpacing: '0.1em',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#4ade80',
          boxShadow: '0 0 6px #4ade80',
          display: 'inline-block',
          animation: 'blink 2s ease-in-out infinite',
        }}
      />
      <span>LIVE</span>
      <span style={{ color: 'var(--text-muted)' }}>|</span>
      <span>v1.0.0</span>
      <span style={{ color: 'var(--text-muted)' }}>|</span>
      <span style={{ color: 'var(--accent-cyan)' }}>{time}</span>
    </div>
  );
}
