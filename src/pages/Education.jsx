import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import BackButton from '../components/BackButton';
import { useSound } from '../context/SoundContext';

const TIMELINE = [
  {
    id: 'ENTRY_01',
    status: 'ACTIVE',
    institution: 'Saveetha Engineering College',
    level: 'Undergraduate',
    degree: '[BE - Computer Science]',
    year: '2024 — Present',
    notes: '[Tech Society , CGPA : 8.2 ]',
    subjects: ['Data Structures', 'Machine Learning', 'Computer Networks', 'Operating Systems', 'Cybersecurity'],
  },
  {
    id: 'ENTRY_02',
    status: 'COMPLETE',
    institution: 'AVM Rajeshwari Matriculation Higher Secondary School',
    level: 'Higher Secondary (Class 12)',
    stream: '[Computer Science ]',
    year: '2023',
    score: '[79%]',
  },
  {
    id: 'ENTRY_03',
    status: 'COMPLETE',
    institution: '[Narayana E-Techno School]',
    level: 'Secondary (Class 10)',
    year: '2021',
    score: '[85%]',
  },
];

const CERTS = [
  { name: 'International Math Olympiad', issuer: 'Science Olympiad Foundation', year: '2019', color: 'var(--accent-primary)' },
  { name: 'National Science Olympiad', issuer: 'Science Olympiad Foundation', year: '2018', color: 'var(--accent-secondary)' },
  { name: 'International English Olympiad', issuer: 'Science Olympiad Foundation', year: '2018', color: '#4ade80' },
];

// Animated scanning text — runs per card when it enters view
function ScanningText() {
  const steps = [
    'SCANNING_RECORDS...',
    'SCANNING_RECORDS... FOUND.',
    'SCANNING_RECORDS... FOUND. DECRYPTING...',
    'SCANNING_RECORDS... FOUND. DECRYPTING... DONE.',
  ];
  const [step, setStep] = useState(0);
  const ref = useRef(null);
  const seen = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !seen.current) {
        seen.current = true;
        let i = 0;
        const interval = setInterval(() => {
          i++;
          setStep(i);
          if (i >= steps.length - 1) clearInterval(interval);
        }, 320);
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        color: 'var(--accent-primary)',
        marginBottom: 10,
        letterSpacing: '0.08em',
        minHeight: '0.8rem',
      }}
    >
      {steps[step]}
      {step < steps.length - 1 && <span className="blink">_</span>}
    </div>
  );
}

export default function Education() {
  const { playSound } = useSound();
  return (
    <PageTransition>
      <Helmet>
        <title>Education | ABINAV.SYS</title>
        <meta name="description" content="Academic records and certifications for Abinav." />
      </Helmet>
      <div className="page-container">
        <BackButton />
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3.5rem' }}>
          <div className="terminal-label" style={{ marginBottom: 8 }}>
            // ACADEMIC_RECORDS | IDENTITY: ABINAV
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.3rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>
            Education
          </h1>
        </motion.div>

        {/* Two-Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 35%) 1fr', gap: '4rem', alignItems: 'start' }} className="edu-grid">

          {/* LEFT: Sticky Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 8 }}>
              <div className="terminal-label" style={{ marginBottom: '1rem' }}>// NAVIGATION_LINK</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {TIMELINE.map(entry => (
                  <li key={entry.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: entry.status === 'ACTIVE' ? '#4ade80' : 'var(--text-muted)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: entry.status === 'ACTIVE' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {entry.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative coordinates */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', opacity: 0.5 }}>
              SYS_COORD: 45.92.11.00 <br />
              SECTOR: KAPPA_9 <br />
              STATUS: NOMINAL
            </div>
          </motion.div>

          {/* RIGHT: Scrolling Content */}
          <div>
            {/* Timeline */}
            <div style={{ position: 'relative', marginBottom: '5rem' }}>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: '100%', opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: 28,
                  top: 0,
                  width: 1,
                  background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary), transparent)',
                }}
              />

              {TIMELINE.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  onMouseEnter={() => playSound('hover')}
                  style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', position: 'relative' }}
                >
                  {/* Timeline dot */}
                  <div style={{
                    flexShrink: 0, width: 56, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '1.25rem',
                  }}>
                    <div style={{
                      width: 12, height: 12, borderRadius: '50%',
                      background: entry.status === 'ACTIVE' ? '#4ade80' : 'var(--accent-primary)',
                      boxShadow: entry.status === 'ACTIVE' ? '0 0 10px #4ade80' : 'var(--accent-glow)',
                      zIndex: 1,
                    }} />
                  </div>

                  {/* Card */}
                  <div className="glass-card" style={{ flex: 1, padding: '1.75rem', borderRadius: 8 }}>
                    {/* Entry ID */}
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-secondary)', letterSpacing: '0.15em', marginBottom: 8 }}>
                      {entry.id}
                      {entry.status === 'ACTIVE' && (
                        <span style={{ marginLeft: 8, color: '#4ade80', fontSize: '0.6rem', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.3)', padding: '1px 6px', borderRadius: 2 }}>
                          ACTIVE
                        </span>
                      )}
                    </div>

                    <ScanningText key={entry.id} />

                    <h3 style={{ fontFamily: 'var(--font-subheading)', letterSpacing: '0.08em', fontWeight: 600, fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: 12 }}>
                      {entry.institution}
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 1fr) 2fr', gap: '0.75rem', marginBottom: 16 }}>
                      {[['LEVEL', entry.level || entry.degree], ['YEAR', entry.year], entry.stream && ['STREAM', entry.stream], entry.score && ['SCORE', entry.score], entry.notes && ['NOTES', entry.notes]]
                        .filter(Boolean).map(([key, val]) => (
                          <div key={key} style={{ display: 'contents' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', alignSelf: 'center' }}>{key}: </span>
                            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{val}</span>
                          </div>
                        ))}
                    </div>

                    {/* Subjects */}
                    {entry.subjects && (
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
                        {entry.subjects.map(s => (
                          <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '3px 8px', borderRadius: 2, background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)', color: 'var(--accent-secondary)' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications (moved inside Right Column) */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="terminal-label" style={{ marginBottom: '1.5rem' }}>// CERTIFICATIONS</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
                {CERTS.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.03, y: -3 }}
                    style={{
                      padding: '1.5rem',
                      borderRadius: 8,
                      background: 'var(--bg-card)',
                      border: `1px solid ${cert.color}33`,
                      borderLeft: `3px solid ${cert.color}`,
                      boxShadow: `0 0 20px ${cert.color}11, 0 0 40px ${cert.color}08`,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = `0 0 30px ${cert.color}33, 0 0 60px ${cert.color}15`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${cert.color}11, 0 0 40px ${cert.color}08`;
                    }}
                  >
                    {/* Glow pulse in corner */}
                    <div style={{
                      position: 'absolute',
                      top: -10, right: -10,
                      width: 50, height: 50,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${cert.color}22 0%, transparent 70%)`,
                      pointerEvents: 'none',
                    }} />
                    {/* Badge icon */}
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', marginBottom: 8, color: cert.color, textShadow: `0 0 10px ${cert.color}88` }}>◈</div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: 4 }}>
                      {cert.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                      {cert.issuer} · {cert.year}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .edu-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </PageTransition>
  );
}
