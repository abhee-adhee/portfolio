import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion,  AnimatePresence } from 'framer-motion';
import GlitchText from '../GlitchText';
import { useCounter } from '../../utils/useCounter';
import { useSound } from '../../context/SoundContext';

/* ── Terminal lines for the right-side widget ─────────── */
const TERMINAL_LINES = [
  { text: '> scanning profile...', color: 'var(--text-muted)' },
  { text: '> NAME: Abinav', color: 'var(--accent-primary)' },
  { text: '> ROLE: Full Stack + ML Developer', color: 'var(--accent-primary)' },
  { text: '> LOCATION: Chennai, IND', color: 'var(--accent-primary)' },
  { text: '> STATUS: Available for hire', color: '#4ade80' },
  { text: '> CLEARANCE: Level 3', color: 'var(--accent-secondary)' },
  { text: '> THREAT_LEVEL: Curious', color: '#f59e0b' },
  { text: '─────────────────────────────', color: 'var(--border-color)' },
  { text: '> scan complete. no anomalies found.', color: '#4ade80' },
];

/* ── Process list lines ───────────────────────────────── */
const PROCESSES = [
  { id: '01', text: 'Building Python-based Sentinel IDS' },
  { id: '02', text: 'Learning Offensive Security & SOC Operations' },
  { id: '03', text: 'Developing AI-powered applications' },
  { id: '04', text: 'Seeking cybersecurity internship opportunities' },
];

/* ── Stat cards data ──────────────────────────────────── */
const STATS = [
  { label: 'HACKATHONS_COMPLETED', value: 2, suffix: '', numValue: 2 },
  { label: 'PROJECTS_DEPLOYED', value: 5, suffix: '+', numValue: 5 },
  { label: 'CUPS_OF_COFFEE', value: 247, suffix: '', numValue: 247 },
  { label: 'BUGS_SQUASHED', value: 999, suffix: '+', numValue: 999 },
];

/* ── Terminal widget with sequential line reveal ──────── */
function TerminalWidget() {
  const [visibleLines, setVisibleLines] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let i = 0;
        const tick = () => {
          if (i < TERMINAL_LINES.length) {
            i++;
            setVisibleLines(i);
            setTimeout(tick, i === 1 ? 600 : 260);
          }
        };
        setTimeout(tick, 300);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="glass-card"
      style={{ borderRadius: 10, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* Title bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.25)', flexShrink: 0 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginLeft: 6, letterSpacing: '0.08em' }}>
          IDENTITY_SCAN.exe
        </span>
      </div>
      {/* Divider line */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-subtle)', padding: '10px 18px 4px', letterSpacing: '0.04em', opacity: 0.3 }}>
        ─────────────────────────────
      </div>
      {/* Lines */}
      <div style={{ padding: '0 18px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: line.color,
              letterSpacing: '0.04em',
              opacity: i < visibleLines ? 1 : 0,
              transform: i < visibleLines ? 'none' : 'translateY(4px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              minHeight: '1em',
            }}
          >
            {i < visibleLines ? line.text : ''}
            {i === visibleLines - 1 && visibleLines < TERMINAL_LINES.length && (
              <span className="blink" style={{ color: 'var(--accent-primary)' }}>_</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Process list with staggered type-in on scroll ──────── */
function ProcessList() {
  const [revealed, setRevealed] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        PROCESSES.forEach((_, i) => {
          setTimeout(() => setRevealed(r => Math.max(r, i + 1)), 300 + i * 320);
        });
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {PROCESSES.map((p, i) => (
        <div
          key={p.id}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: i < revealed ? 'var(--text-secondary)' : 'transparent',
            display: 'flex',
            gap: 10,
            opacity: i < revealed ? 1 : 0,
            transform: i < revealed ? 'none' : 'translateX(-8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease, color 0.2s',
          }}
        >
          <span style={{ color: '#4ade80', flexShrink: 0 }}>
            &gt; PROCESS_{p.id}:
          </span>
          <span>{p.text}</span>
          {i === revealed - 1 && revealed < PROCESSES.length && (
            <span className="blink" style={{ color: 'var(--accent-primary)' }}>_</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Stat counter card ──────────────────────────────────── */
const statItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', bounce: 0.4 } }
};

function StatCard({ label, value, suffix, numValue }) {
  const { count, ref, reset } = useCounter(numValue, 1800);
  const [hovered, setHovered] = useState(false);
  const { playSound } = useSound();

  return (
    <motion.div
      variants={statItemVariants}
      ref={ref}
      className="glass-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { reset(); playSound('click'); }}
      style={{
        padding: '1.5rem 1rem',
        borderRadius: 8,
        textAlign: 'center',
        flex: 1,
        minWidth: 140,
        position: 'relative',
        transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
        boxShadow: hovered ? 'var(--glow-primary)' : 'none',
        borderColor: hovered ? 'var(--border-hover)' : 'var(--border-color)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        cursor: 'pointer',
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -8 }}
            exit={{ opacity: 0, y: 0 }}
            style={{
              position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-primary)',
              background: 'rgba(10,10,15,0.95)', border: '1px solid var(--accent-border)',
              padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap', pointerEvents: 'none',
              boxShadow: '0 0 10px var(--accent-glow)'
            }}
          >
            Click to recount
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{
        fontFamily: 'var(--font-subheading)',
        letterSpacing: '0.08em',
        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
        fontWeight: 800,
        color: 'var(--accent-primary)',
        textShadow: hovered ? '0 0 24px var(--accent-glow)' : '0 0 12px var(--accent-subtle)',
        transition: 'text-shadow 0.3s',
        lineHeight: 1,
        marginBottom: 8,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.52rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        lineHeight: 1.4,
        wordBreak: 'break-word',
      }}>
        {label}
      </div>
    </motion.div>
  );
}

const statsContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

/* ── Main export ────────────────────────────────────────── */
export default function AboutSnapshot() {
  return (
    <section id="about-snap" className="section-container" style={{ overflowX: 'hidden' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        style={{ marginBottom: '3rem' }}
      >
        <div className="terminal-label" style={{ marginBottom: 10 }}>// IDENTITY_MANIFEST</div>
        <GlitchText
          text="WHO AM I?"
          as="h2"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            letterSpacing: '0.05em',
          }}
        />
      </motion.div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '3.5rem', alignItems: 'stretch' }} className="about-snap-grid">
        {/* LEFT — bio + process list */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
            I'm Abinav Aaditya — a Computer Science student building at the intersection of cybersecurity, artificial intelligence, and software engineering.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
            My work focuses on network security, web application security, and intelligent software systems. I enjoy understanding how systems work, identifying how they fail, and designing practical solutions through hands-on projects, internships, and hackathons.
          </p>

          <div className="glass-card" style={{ padding: '1.25rem', borderRadius: 8 }}>
            <div className="terminal-label" style={{ marginBottom: 14 }}>// CURRENTLY_RUNNING</div>
            <ProcessList />
          </div>

          <Link
            to="/about"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-primary)', textDecoration: 'none', letterSpacing: '0.1em', borderBottom: '1px solid var(--accent-border)', paddingBottom: 2, alignSelf: 'flex-start', transition: 'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--accent-border)'}
          >
            &gt; VIEW_FULL_PROFILE →
          </Link>
        </motion.div>

        {/* RIGHT — terminal widget */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ minHeight: 340 }}
        >
          <TerminalWidget />
        </motion.div>
      </div>

      {/* Stat counter cards */}
      <motion.div
        variants={statsContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}
        className="stats-grid"
      >
        {STATS.map(s => (
          <StatCard key={s.label} {...s} />
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .about-snap-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
