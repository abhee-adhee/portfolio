import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, ResponsiveContainer, Tooltip, YAxis
} from 'recharts';
import { useCounter } from '../../utils/useCounter';

/* ── Helpers ─────────────────────────────────────────────── */
function randomPt() { return Math.floor(Math.random() * 80 + 20); }
function initData(n = 20) { return Array.from({ length: n }, () => ({ v: randomPt() })); }

/* ── Live chart ─────────────────────────────────────────── */
function LiveChart() {
  const [data, setData] = useState(initData);
  useEffect(() => {
    const id = setInterval(() => {
      setData(prev => [...prev.slice(1), { v: randomPt() }]);
    }, 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <ResponsiveContainer width="100%" height={90}>
      <LineChart data={data}>
        <YAxis domain={[0, 100]} hide />
        <Tooltip
          contentStyle={{ background: 'rgba(10,10,15,0.9)', border: '1px solid rgba(0,245,255,0.2)', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-cyan)' }}
          formatter={v => [`${v} pkt/s`]}
          labelFormatter={() => 'TRAFFIC'}
        />
        <Line
          type="monotone" dataKey="v" dot={false}
          stroke="#00f5ff" strokeWidth={1.5}
          style={{ filter: 'drop-shadow(0 0 4px rgba(0,245,255,0.6))' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* ── Threat counter ─────────────────────────────────────── */
function FastCounter({ target, interval = 80 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setN(p => (p < target ? p + Math.ceil(target / 40) : target));
    }, interval);
    return () => clearInterval(id);
  }, [target, interval]);
  return <>{n.toLocaleString()}</>;
}

/* ── Featured top card ──────────────────────────────────── */
function TopCard() {
  const ids = {
    id: 'ps-43', codename: 'PS_43',
    title: 'Intrusion Detection System',
    subtitle: 'Using Network Traffic Anomalies',
    stack: ['Scapy', 'XGBoost', 'FastAPI', 'React', 'Recharts'],
    desc: 'ML-powered network IDS detecting DDoS, port scanning, and MITM attacks in real time. Streams live classifications to a React dashboard via WebSocket with sub-500ms latency.',
    github: 'https://github.com/yourusername/ids-project',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card"
      style={{ borderRadius: 12, overflow: 'hidden', marginBottom: '1.5rem' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 340 }} className="top-card-grid">
        {/* ── LEFT ── */}
        <div style={{ padding: '0 2rem 2rem', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
          {/* Terminal bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 0 18px', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginLeft: 6 }}>
              PS_43_IDS.exe
            </span>
          </div>

          {/* Codename + badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-violet)', letterSpacing: '0.15em' }}>[ PS_43 ]</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#4ade80', border: '1px solid rgba(74,222,128,0.4)', background: 'rgba(74,222,128,0.08)', padding: '1px 8px', borderRadius: 2, letterSpacing: '0.1em' }}>DEPLOYED ✓</span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-subheading)', letterSpacing: '0.08em', fontWeight: 800, fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 6 }}>
            {ids.title}
          </h3>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-cyan)', letterSpacing: '0.08em', marginBottom: '1.2rem', opacity: 0.8 }}>
            {ids.subtitle}
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.5rem', flex: 1 }}>
            {ids.desc}
          </p>

          {/* Stack chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.5rem' }}>
            {ids.stack.map(s => (
              <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', padding: '3px 8px', borderRadius: 2, background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.2)', color: 'var(--accent-cyan-muted)', letterSpacing: '0.04em' }}>{s}</span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/projects/ps-43"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: '#0a0a0f', background: 'var(--accent-cyan)', padding: '9px 18px', borderRadius: 3, textDecoration: 'none', fontWeight: 700, boxShadow: 'var(--glow-cyan)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(0,245,255,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--glow-cyan)'; }}>
              [ OPEN_MODULE ]
            </Link>
            <a href={ids.github} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--accent-cyan)', border: '1px solid rgba(0,245,255,0.35)', padding: '9px 18px', borderRadius: 3, textDecoration: 'none', transition: 'background 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.08)'; e.currentTarget.style.borderColor = 'var(--accent-cyan)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(0,245,255,0.35)'; }}>
              [ VIEW_SOURCE ]
            </a>
          </div>
        </div>

        {/* ── RIGHT — live dashboard ── */}
        <div style={{ padding: '1.5rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Metric cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {/* Threats */}
            <div className="glass-card" style={{ padding: '0.75rem', borderRadius: 6, borderLeft: '2px solid #ef4444' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 4 }}>THREATS_DETECTED</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: '#ef4444', textShadow: '0 0 10px rgba(239,68,68,0.5)' }}>
                <FastCounter target={147} interval={50} />
              </div>
            </div>
            {/* Packets */}
            <div className="glass-card" style={{ padding: '0.75rem', borderRadius: 6, borderLeft: '2px solid var(--accent-violet)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 4 }}>PKTS_ANALYZED</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-violet)', textShadow: '0 0 10px rgba(124,58,237,0.5)' }}>
                <FastCounter target={98432} interval={20} />
              </div>
            </div>
            {/* Status */}
            <div className="glass-card" style={{ padding: '0.75rem', borderRadius: 6, borderLeft: '2px solid #4ade80' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 4 }}>SYS_STATUS</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: '#4ade80', textShadow: '0 0 10px rgba(74,222,128,0.5)', display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'blink 1.5s ease-in-out infinite' }} />
                SECURE
              </div>
            </div>
          </div>

          {/* Chart */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
              NETWORK_TRAFFIC ── LIVE_FEED ──
              <span style={{ color: '#4ade80', marginLeft: 8, animation: 'blink 1s step-end infinite' }}>●</span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 8, border: '1px solid var(--border-color)', padding: '0.75rem 0.5rem 0.25rem', flex: 1, minHeight: 110 }}>
              <LiveChart />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'right', letterSpacing: '0.06em' }}>
              UPTIME: 99.9% | BUILD: PASSING | MODEL_ACC: 97.3%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── GHOST_02 classified card ───────────────────────────── */
function GhostCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card classified-card"
      style={{ borderRadius: 10, overflow: 'hidden', position: 'relative', minHeight: 280, display: 'flex', flexDirection: 'column' }}
    >
      {/* Red scanline */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(239,68,68,0.06) 4px, rgba(239,68,68,0.06) 8px)', pointerEvents: 'none', transition: 'opacity 0.4s' }} className="classified-scanline" />

      {/* ACCESS_GRANTED hover overlay */}
      <div className="access-granted-overlay" style={{ position: 'absolute', inset: 0, zIndex: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6, opacity: 0, pointerEvents: 'none', transition: 'opacity 0.4s' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(239,68,68,0.9)', textShadow: '0 0 10px rgba(239,68,68,0.5)' }}>CLEARANCE_REQUIRED</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.2em', color: '#4ade80', textShadow: '0 0 14px rgba(74,222,128,0.6)', animation: 'blink 1.2s step-end infinite' }}>ACCESS_GRANTED</span>
      </div>

      {/* Terminal bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginLeft: 4 }}>GHOST_02.exe</span>
      </div>

      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-violet)', letterSpacing: '0.15em' }}>[ GHOST_02 ]</span>
          <span className="badge badge-classified">CLASSIFIED</span>
        </div>
        <h3 className="classified-blur" style={{ fontFamily: 'var(--font-subheading)', letterSpacing: '0.08em', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Project GHOST</h3>
        <p className="classified-blur" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          ACCESS DENIED. This module is classified. Clearance level insufficient.
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['[REDACTED]', '[REDACTED]', '[REDACTED]'].map((s, i) => (
            <span key={i} className="classified-blur" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', padding: '2px 7px', borderRadius: 2, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', color: 'rgba(239,68,68,0.7)' }}>{s}</span>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)' }}>
          CLEARANCE_REQUIRED // LEVEL_04_ACCESS
        </div>
      </div>
    </motion.div>
  );
}

/* ── NOVA_03 in-progress card ──────────────────────────── */
function NovaCard() {
  const [progress] = useState(34);
  const [fill, setFill] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setFill(progress), 200); observer.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [progress]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      style={{ borderRadius: 10, overflow: 'hidden', minHeight: 280, display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', border: '1.5px dashed rgba(245,158,11,0.4)', backdropFilter: 'blur(12px)', animation: 'marchingAnts 8s linear infinite' }}
    >
      {/* Terminal bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px dashed rgba(245,158,11,0.3)', background: 'rgba(0,0,0,0.2)' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#f59e0b', marginLeft: 4 }}>NOVA_03.exe — COMPILING</span>
      </div>

      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-violet)', letterSpacing: '0.15em' }}>[ NOVA_03 ]</span>
          <span className="badge badge-progress">IN_PROGRESS</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-subheading)', letterSpacing: '0.08em', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Project NOVA</h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          A new initiative currently in active development. Architecture being finalized — details forthcoming on deployment.
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['TBD', 'TBD', 'TBD'].map((s, i) => <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', padding: '2px 7px', borderRadius: 2, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', color: 'rgba(245,158,11,0.8)' }}>{s}</span>)}
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>CURRENTLY_COMPILING...</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#f59e0b', fontWeight: 700 }}>{fill}%</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: 'rgba(245,158,11,0.1)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${fill}%`, background: 'linear-gradient(90deg, rgba(245,158,11,0.6), #f59e0b)', boxShadow: '0 0 8px rgba(245,158,11,0.4)', borderRadius: 2, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main export ────────────────────────────────────────── */
export default function FeaturedProjects() {
  return (
    <section id="featured-projects" className="section-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: '4rem' }}
      >
        <div className="terminal-label" style={{ marginBottom: 8 }}>// ARCHIVE_RETRIEVAL</div>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', letterSpacing: '0.08em', fontWeight: 800, fontFamily: 'var(--font-subheading)', color: 'var(--text-primary)' }}>
          Featured Projects
        </h2>
      </motion.div>

      {/* Top featured card */}
      <TopCard />

      {/* Bottom two cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2.5rem' }} className="bottom-cards-grid">
        <GhostCard />
        <NovaCard />
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center' }}
      >
        <Link
          to="/projects"
          style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--accent-cyan)', border: '1px solid rgba(0,245,255,0.35)', padding: '12px 28px', borderRadius: 3, textDecoration: 'none', marginBottom: '1rem', transition: 'background 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.08)'; e.currentTarget.style.boxShadow = 'var(--glow-cyan)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          [ VIEW_ALL_MODULES ]
        </Link>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
          TOTAL_PROJECTS: 3 | ACTIVE: 1 | CLASSIFIED: 1 | WIP: 1
        </div>
      </motion.div>

      <style>{`
        @keyframes marchingAnts {
          to { background-position: 100% 0, 0 100%, 0 0, 100% 100%; }
        }
        @media (max-width: 768px) {
          .top-card-grid { grid-template-columns: 1fr !important; }
          .bottom-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
