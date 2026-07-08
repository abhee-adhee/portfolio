import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

import PageTransition from '../components/PageTransition';
import RadialSkillWeb from '../components/RadialSkillWeb';
import { usePortfolioData } from '../context/PortfolioDataContext';

const FUN_FACTS = [
  'Built an ML-powered intrusion detection system',
  'Participated in IBM Datathon 2025 as backend developer',
  'Prefer system-level and cybersecurity projects over UI-heavy apps',
];

// Typewriter component for bio paragraphs
function TypewriterBio({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(intervalRef.current);
      }, 18);
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [started, text, delay]);

  return (
    <p
      ref={ref}
      style={{
        fontFamily: 'var(--font-sans)',
        color: 'var(--text-secondary)',
        lineHeight: 1.9,
        fontSize: '0.95rem',
        marginBottom: '1rem',
        minHeight: '1.4rem',
      }}
    >
      {displayed}
      {displayed.length < text.length && started && (
        <span className="blink" style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>_</span>
      )}
    </p>
  );
}

export default function About() {
  const { data } = usePortfolioData();
  const BIO_TEXT = data.about.bio;
  const PROCESSES = data.about.processes;

  return (
    <PageTransition>
      <Helmet>
        <title>About Me | ABINAV.SYS</title>
        <meta name="description" content="About Abinav: Developer working at the intersection of ML, cybersecurity, and full-stack engineering." />
      </Helmet>
      <div className="page-container">
        <BackButton />
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
          <div className="terminal-label" style={{ marginBottom: 8 }}>// IDENTITY_MANIFEST</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.3rem)', letterSpacing: '0.05em', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            About Me
          </h1>
        </motion.div>

        {/* 3-Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '3rem', marginBottom: '3rem', alignItems: 'start' }} className="about-grid">

          {/* LEFT: Sticky Profile Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}
            className="hide-on-mobile"
          >
            {/* Profile photo */}
            <div style={{
              width: 180, height: 180,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-subtle), var(--accent-subtle))',
              border: '2px solid var(--accent-primary)',
              boxShadow: 'var(--accent-glow), inset 0 0 40px var(--accent-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textAlign: 'center', padding: '0 1rem' }}>
                PHOTO<br />PLACEHOLDER
              </span>
            </div>

            <a
              href="/resume.pdf"
              download
              className="btn-interactive btn-filled"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                color: '#0a0a0f',
                background: 'var(--accent-primary)',
                padding: '10px 22px',
                borderRadius: 3,
                textDecoration: 'none',
                fontWeight: 700,
                width: '100%',
                textAlign: 'center',
                boxShadow: 'var(--accent-glow)'
              }}
            >
              [ DOWNLOAD_RESUME ]
            </a>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', opacity: 0.6, width: '100%', textAlign: 'center' }}>
              STATUS: ONLINE<br />
              LOCATION: UNDISCLOSED
            </div>
          </motion.div>

          {/* CENTER: Core Bio & Logs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              {BIO_TEXT.map((para, i) => (
                <TypewriterBio key={i} text={para} delay={i * 400} />
              ))}
            </div>

            {/* Currently Running */}
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 8 }}>
              <div className="terminal-label" style={{ marginBottom: 16 }}>// CURRENTLY_RUNNING</div>
              {PROCESSES.map((p, i) => (
                <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 10, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#4ade80', flexShrink: 0 }}>&gt; PROCESS_{String(i + 1).padStart(2, '0')}:</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>

            {/* Fun facts */}
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 8 }}>
              <div className="terminal-label" style={{ marginBottom: 16 }}>// FUN_FACTS.log</div>
              {FUN_FACTS.map((fact, i) => (
                <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 10, display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--accent-secondary)', flexShrink: 0 }}>&gt; FUN_FACT_{String(i + 1).padStart(2, '0')}:</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>

            {/* Interests */}
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 8 }}>
              <div className="terminal-label" style={{ marginBottom: 12 }}>// INTERESTS_OUTSIDE_CODE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Cybersecurity', 'System Design', 'Hackathons', 'Tech Research', 'Problem Solving'].map(interest => (
                  <span key={interest} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '4px 12px', borderRadius: 2,
                    background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)', color: 'var(--accent-secondary)', letterSpacing: '0.05em',
                  }}>{interest}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Tech Radar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} style={{ position: 'sticky', top: '100px' }} className="hide-on-mobile">
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="terminal-label" style={{ marginBottom: '1.5rem', width: '100%', textAlign: 'left' }}>// SKILL_RADAR</div>
              <RadialSkillWeb />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
    </PageTransition>
  );
}
