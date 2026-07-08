import { motion } from 'framer-motion';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import PageTransition from '../components/PageTransition';
import GlitchText from '../components/GlitchText';
import SectionDivider from '../components/SectionDivider';
import BackButton from '../components/BackButton';
import { useSound } from '../context/SoundContext';

import { usePortfolioData } from '../context/PortfolioDataContext';

/* ─────────────────────────────────────────────────
   CERT CARD
───────────────────────────────────────────────── */
function CertCard({ cert, index }) {
  const [hovered, setHovered] = useState(false);
  const { playSound } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90, transformPerspective: 1000 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => { setHovered(true); playSound('hover'); }}
      onMouseLeave={() => setHovered(false)}
      className="cert-card"
      style={{
        position: 'relative',
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? cert.color : 'var(--border-color)'}`,
        borderRadius: 10,
        padding: '1.5rem',
        backdropFilter: 'blur(12px)',
        boxShadow: hovered ? `0 0 28px ${cert.color}33, 0 8px 32px rgba(0,0,0,0.3)` : '0 2px 12px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        breakInside: 'avoid',
        marginBottom: '1.25rem',
      }}
    >
      {/* Holographic shimmer overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 10,
        background: 'linear-gradient(135deg, rgba(168,85,247,0.05), rgba(99,102,241,0.05), rgba(168,85,247,0.02), rgba(99,102,241,0.02))',
        backgroundSize: '400% 400%',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s',
        animation: hovered ? 'holoShimmer 3s ease infinite' : 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Content above overlay */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {/* Issuer icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            width: 42, height: 42, borderRadius: 8,
            background: `${cert.color}18`,
            border: `1.5px solid ${cert.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: cert.color, fontWeight: 700, letterSpacing: '0.04em',
            flexShrink: 0,
            boxShadow: hovered ? `0 0 12px ${cert.color}44` : 'none',
            transition: 'box-shadow 0.3s',
          }}>
            {cert.issuer.slice(0, 3).toUpperCase()}
          </div>
          {/* Verified badge */}
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            letterSpacing: '0.1em', fontWeight: 700,
            padding: '3px 10px', borderRadius: 3,
            color: '#4ade80',
            border: '1px solid rgba(74,222,128,0.4)',
            background: 'rgba(74,222,128,0.08)',
            boxShadow: hovered ? '0 0 10px rgba(74,222,128,0.3)' : 'none',
            transition: 'box-shadow 0.3s',
          }}>
            VERIFIED ✓
          </span>
        </div>

        {/* Cert ID */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
          {cert.id}
        </div>

        {/* Cert name */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
          {cert.name}
        </div>

        {/* Issuer + platform */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: cert.color, letterSpacing: '0.05em' }}>
            {cert.issuer}
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {cert.platform}
          </span>
        </div>

        {/* Date */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          ISSUED: {cert.date}
        </div>

        {/* View button */}
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound('click')}
          onMouseEnter={() => playSound('hover')}
          className="btn-credential"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            letterSpacing: '0.1em',
            color: cert.color,
            border: `1px solid ${cert.color}55`,
            padding: '7px 14px', borderRadius: 3,
            textDecoration: 'none',
            width: 'fit-content',
            cursor: 'pointer',
          }}
        >
          [ VIEW_CREDENTIAL ]
        </a>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────
   EXPERIENCE CARD
───────────────────────────────────────────────── */
function ExpCard({ exp, index }) {
  const isActive = exp.status === 'ACTIVE';
  const { playSound } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90, transformPerspective: 1000 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => playSound('hover')}
      style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}
    >
      {/* Left: timeline line + node */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        {/* Glow dot */}
        <div style={{
          width: 14, height: 14, borderRadius: '50%', flexShrink: 0, marginTop: 18,
          background: isActive ? 'var(--accent-primary)' : 'var(--accent-secondary)',
          boxShadow: isActive
            ? '0 0 0 3px var(--accent-subtle), 0 0 14px var(--accent-glow)'
            : '0 0 0 3px var(--accent-subtle), 0 0 10px var(--accent-glow)',
          animation: isActive ? 'blink 2s ease-in-out infinite' : 'none',
          zIndex: 1,
        }} />
        {/* Vertical line */}
        <div style={{
          flex: 1, width: 1, marginTop: 6,
          background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
          opacity: 0.25,
          minHeight: 40,
        }} />
      </div>

      {/* Right: card */}
      <div
        className="glass-card"
        style={{ flex: 1, borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}
      >
        {/* Terminal header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.2rem', paddingBottom: '0.9rem', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            {exp.id}
          </span>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
            {exp.role.toUpperCase().replace(/ /g, '_')}
          </span>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
            padding: '1px 7px', borderRadius: 2,
            color: isActive ? '#4ade80' : 'var(--accent-primary)',
            border: `1px solid ${isActive ? 'rgba(74,222,128,0.3)' : 'var(--accent-border)'}`,
            background: isActive ? 'rgba(74,222,128,0.07)' : 'var(--accent-subtle)',
            boxShadow: isActive ? '0 0 8px rgba(74,222,128,0.2)' : 'none',
            letterSpacing: '0.1em',
          }}>
            STATUS: {exp.status}
          </span>
        </div>

        {/* Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'start' }} className="exp-content-grid">
          <div>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: 4 }}>
              {exp.role}
            </h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-primary)', letterSpacing: '0.06em', marginBottom: 4 }}>
              {exp.org}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '1.2rem' }}>
              {exp.duration}
            </div>

            {/* Tasks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.2rem' }}>
              {exp.tasks.map(t => (
                <div key={t.id} style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>&gt; TASK_{t.id}:</span>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>

            {/* Stack chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {exp.stack.map(s => (
                <span key={s} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  padding: '2px 8px', borderRadius: 2,
                  background: 'var(--accent-subtle)',
                  border: '1px solid var(--accent-border)',
                  color: 'var(--accent-secondary)',
                  letterSpacing: '0.04em',
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right: entry number watermark */}
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '3rem', fontWeight: 900,
            color: 'var(--accent-subtle)', lineHeight: 1, userSelect: 'none',
            alignSelf: 'center', paddingRight: '0.5rem',
            opacity: 0.4,
          }}>
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────── */
export default function Experience() {
  const { data } = usePortfolioData();
  const CERTS = data.certificates;
  const EXPERIENCE = data.experience;

  return (
    <PageTransition>
      <Helmet>
        <title>Experience | ABINAV.SYS</title>
        <meta name="description" content="Certifications and work experience of Abinav — Full Stack Developer and ML Engineer." />
      </Helmet>

      <div className="page-container">
        <BackButton />
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <div className="terminal-label" style={{ marginBottom: 10 }}>// CREDENTIALS_MANIFEST | CLEARANCE: VERIFIED</div>
          <GlitchText
            text="Experience"
            as="h1"
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 900,
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-primary)',
            }}
          />
        </motion.div>

        {/* ── SECTION 1: CERTIFICATES ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '1.5rem' }}
        >
          <div className="terminal-label" style={{ marginBottom: 10 }}>// CERTIFICATIONS_VAULT</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', fontWeight: 700, fontSize: 'clamp(1.4rem, 3.3vw, 2.1rem)', color: 'var(--text-primary)', marginBottom: '2rem' }}>
            Certificates
          </h2>
        </motion.div>

        {/* CSS Grid for certificates */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}>
          {CERTS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>

        <SectionDivider label="CERTS_LOADED" />

        {/* ── SECTION 2: EXPERIENCE ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ margin: '3.5rem 0 2rem' }}
        >
          <div className="terminal-label" style={{ marginBottom: 10 }}>// MISSION_LOG</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', fontWeight: 700, fontSize: 'clamp(1.4rem, 3.3vw, 2.1rem)', color: 'var(--text-primary)', marginBottom: '2.5rem' }}>
            Work Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div>
          {EXPERIENCE.map((exp, i) => (
            <ExpCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes holoShimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (max-width: 768px) {
          .exp-content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageTransition>
  );
}
