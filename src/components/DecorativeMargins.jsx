import { useEffect, useState } from 'react';

export default function DecorativeMargins() {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const checkWidth = () => setShow(window.innerWidth > 1460);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  if (!show) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {/* LEFT MARGIN */}
      <div style={{ position: 'absolute', left: 40, top: 0, bottom: 0, borderRight: '1px solid var(--accent-subtle)', width: 1, height: '100%' }} />
      
      <div style={{ position: 'absolute', left: 24, top: '25vh', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', opacity: 0.35, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
        SYS.CORE.v9.0.2 // ABINAV.SYS
      </div>
      
      <div style={{ position: 'absolute', left: 24, bottom: '25vh', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--accent-primary)', opacity: 0.45, writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.15em' }}>
        LAT: 12.9716 N / LON: 77.5946 E
      </div>

      <div style={{ position: 'absolute', left: 38, top: '50vh', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ width: 5, height: 1, background: 'var(--accent-primary)', opacity: 0.4 }} />
        <div style={{ width: 5, height: 1, background: 'var(--accent-primary)', opacity: 0.4 }} />
        <div style={{ width: 5, height: 1, background: 'var(--accent-primary)', opacity: 0.4 }} />
      </div>

      {/* RIGHT MARGIN */}
      <div style={{ position: 'absolute', right: 40, top: 0, bottom: 0, borderLeft: '1px dashed rgba(124,58,237,0.1)', width: 1, height: '100%' }} />
      
      <div style={{ position: 'absolute', right: 28, top: '35vh', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', opacity: 0.3, writingMode: 'vertical-rl' }}>
        UPLINK_ESTABLISHED
      </div>
      
      <div style={{ position: 'absolute', right: 38, bottom: '20vh', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ width: 5, height: 5, background: 'var(--accent-primary)', opacity: 0.5 }} />
        <div style={{ width: 5, height: 5, background: 'var(--accent-cyan)', opacity: 0.5 }} />
        <div style={{ width: 5, height: 5, background: 'var(--accent-violet)', opacity: 0.6 }} />
        <div style={{ width: 5, height: 28, background: 'var(--accent-violet)', opacity: 0.6 }} />
      </div>
    </div>
  );
}
