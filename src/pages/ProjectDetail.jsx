import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';

import { projects } from '../data/projects';
import PageTransition from '../components/PageTransition';
import GlitchText from '../components/GlitchText';
import ScreenshotViewer from '../components/ScreenshotViewer';
import BackButton from '../components/BackButton';
import { useSound } from '../context/SoundContext';

const STATUS_CLASS = {
  DEPLOYED: 'badge-deployed',
  ACTIVE: 'badge-active',
  CLASSIFIED: 'badge-classified',
  IN_PROGRESS: 'badge-progress',
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const { playSound } = useSound();

  if (!project) {
    return (
      <PageTransition>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '10rem 1.5rem', textAlign: 'center' }}>
          <div className="terminal-label">// MODULE_NOT_FOUND</div>
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: 16, marginBottom: 24 }}>
            Project ID "{id}" does not exist in the registry.
          </p>
          <BackButton />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="page-container">
        <BackButton />
        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}Fsystem
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--accent-secondary)',
                letterSpacing: '0.15em',
              }}
            >
              [{project.codename}]
            </span>
            <span className={`badge ${STATUS_CLASS[project.status]}`}>{project.status}</span>
          </div>
          <GlitchText
            text={project.title}
            as="h1"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.3rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.05em',
              color: 'var(--text-primary)',
              marginBottom: 8,
            }}
          />
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', fontSize: '1rem' }}>
            {project.subtitle}
          </p>
        </motion.div>

        {/* Screenshot carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <ScreenshotViewer
            screenshots={project.screenshots || []}
            classified={project.classified}
          />
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: '2.5rem',
            padding: '1rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 6,
          }}
        >
          <span className="terminal-label" style={{ width: '100%', marginBottom: 8 }}>
            // TECH_STACK
          </span>
          {project.stack.map(s => (
            <span
              key={s}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                padding: '4px 10px',
                borderRadius: 2,
                background: 'var(--accent-subtle)',
                border: '1px solid var(--accent-border)',
                color: 'var(--accent-secondary)',
                letterSpacing: '0.05em',
              }}
            >
              {s}
            </span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card"
          style={{ padding: '1.5rem', borderRadius: 8, marginBottom: '1.5rem' }}
        >
          <div className="terminal-label" style={{ marginBottom: 12 }}>// DESCRIPTION</div>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9rem' }}>
            {project.fullDesc}
          </p>
        </motion.div>

        {/* Problem → Approach → Outcome */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }} className="pao-grid">
          {[
            { label: 'PROBLEM', content: project.problem, color: 'rgba(239,68,68,0.6)' },
            { label: 'APPROACH', content: project.approach, color: 'rgba(245,158,11,0.6)' },
            { label: 'OUTCOME', content: project.outcome, color: 'rgba(74,222,128,0.6)' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.07 }}
              className="glass-card"
              style={{ padding: '1.25rem', borderRadius: 8 }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: item.color,
                  letterSpacing: '0.15em',
                  marginBottom: 10,
                }}
              >
                {item.label}
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.7 }}>
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card"
          style={{ padding: '1.5rem', borderRadius: 8, marginBottom: '2rem' }}
        >
          <div className="terminal-label" style={{ marginBottom: 16 }}>// KEY_FEATURES</div>
          {project.features.map((feat, i) => (
            <div
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                marginBottom: 10,
                display: 'flex',
                gap: 8,
              }}
            >
              <span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>&gt; FEATURE_{String(i + 1).padStart(2, '0')}:</span>
              <span>{feat}</span>
            </div>
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          {project.repository && (
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                color: '#0a0a0f',
                background: 'var(--accent-primary)',
                padding: '10px 22px',
                borderRadius: 3,
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              [ GITHUB_REPOSITORY ]
            </a>
          )}
          
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                color: 'var(--accent-primary)',
                background: 'transparent',
                border: '1px solid var(--accent-border)',
                padding: '10px 22px',
                borderRadius: 3,
                textDecoration: 'none',
              }}
            >
              [ LIVE_DEMO ]
            </a>
          ) : (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                background: 'transparent',
                border: '1px dashed var(--border-color)',
                padding: '10px 22px',
                borderRadius: 3,
                opacity: 0.6,
                cursor: 'not-allowed',
                display: 'inline-block'
              }}
            >
              [ NO_LIVE_DEMO_AVAILABLE ]
            </span>
          )}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) { .pao-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </PageTransition>
  );
}
