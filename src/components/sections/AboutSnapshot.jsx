import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { useCounter } from '../../utils/useCounter';
import { useSound } from '../../context/SoundContext';

/* ── Terminal lines for the right-side widget ─────────── */
const TERMINAL_LINES = [
  { text: '> scanning profile...', color: 'var(--text-muted)' },
  { text: '> NAME: Abinav', color: 'var(--accent-primary)' },
  { text: '> ROLE: Pentester, ML Developer', color: 'var(--accent-primary)' },
  { text: '> LOCATION: Chennai, IND', color: 'var(--accent-primary)' },
  { text: '> STATUS: Available for hire', color: '#4ade80' },
  { text: '> CLEARANCE: Level 3', color: 'var(--accent-secondary)' },
  { text: '> THREAT_LEVEL: Curious', color: '#f59e0b' },
  { text: '─────────────────────────────', color: 'var(--border-color)' },
  { text: '> scan complete. no anomalies found.', color: '#4ade80' },
];

/* ── Current-focus panel data ─────────────────────────── */
const FOCUS_LINES = [
  { key: 'ROLE',         value: 'Computer Science Student' },
  { key: 'SPECIALIZATION', value: 'Cybersecurity' },
  { key: 'CURRENT_BUILD', value: 'Sentinel IDS' },
  { key: 'INTERESTS',   value: 'SOC  •  Web Security  •  AI Security' },
  { key: 'NEXT_TARGET', value: 'Security Engineering Internship' },
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

/* ── Current-focus panel with staggered reveal ───────────── */
function CurrentFocusPanel() {
  const [revealed, setRevealed] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        FOCUS_LINES.forEach((_, i) => {
          setTimeout(() => setRevealed(r => Math.max(r, i + 1)), 300 + i * 200);
        });
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="glass-card"
      style={{
        padding: '1.25rem 1.5rem',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.22em',
          color: 'var(--accent-primary)',
          opacity: 0.8,
          marginBottom: '0.25rem',
          textTransform: 'uppercase',
        }}
      >
        CURRENT_FOCUS
      </div>
      {FOCUS_LINES.map((line, i) => (
        <div
          key={line.key}
          style={{
            display: 'grid',
            gridTemplateColumns: '130px 1fr',
            gap: '0.75rem',
            opacity: i < revealed ? 1 : 0,
            transform: i < revealed ? 'none' : 'translateX(-8px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'rgba(168,85,247,0.6)',
              alignSelf: 'center',
              letterSpacing: '0.08em',
            }}
          >
            &gt; {line.key}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
            }}
          >
            {line.value}
            {i === revealed - 1 && revealed < FOCUS_LINES.length && (
              <span className="blink" style={{ color: 'var(--accent-primary)', marginLeft: 2 }}>_</span>
            )}
          </span>
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
      <SectionHeading
        pageLabel="PERSONAL_PROFILE"
        title="Building Secure Digital Systems."
        subtitle="One project at a time."
        metaLines={[
          { label: '> SPECIALIZATION:', value: 'Cybersecurity + AI' },
          { label: '> AVAILABILITY:',   value: 'Open to Internships' },
        ]}
        accent="var(--accent-primary)"
        cursor={true}
        animate={true}
      />

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
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.92rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              maxWidth: '480px',
            }}
          >
            I'm Abinav Aaditya, a Computer Science student focused on cybersecurity, secure software engineering, and applied AI.
            I enjoy building practical systems—from intrusion detection and SOC monitoring to intelligent web applications—because
            the best way to learn is by building.
          </p>

          <CurrentFocusPanel />

          {/* Identity quote */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'rgba(168,85,247,0.5)',
              letterSpacing: '0.1em',
              borderLeft: '2px solid rgba(168,85,247,0.25)',
              paddingLeft: '0.85rem',
              fontStyle: 'italic',
            }}
          >
            "Learning by building. Improving by breaking."
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
