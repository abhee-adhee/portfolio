import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import PageTransition from '../components/PageTransition';
import BackButton from '../components/BackButton';
import { useSound } from '../context/SoundContext';

const FILTERS = ['ALL', 'ML', 'WEB', 'CYBERSEC', 'IN_PROGRESS'];

function ProjectHero({ count }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const sequence = [
      '> SCANNING_PROJECT_DATABASE...',
      `> ${count} MODULES FOUND`,
      '> CLEARANCE: GRANTED',
      '> DISPLAYING_RESULTS...'
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLines(prev => [...prev, sequence[i]]);
      i++;
      if (i >= sequence.length) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div style={{
      position: 'relative',
      minHeight: 280,
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem',
      borderBottom: '1px solid var(--border-color)',
      paddingTop: '2rem',
      paddingBottom: '2rem',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'clamp(3rem, 10vw, 8rem)', fontFamily: 'var(--font-heading)',
          fontWeight: 900, color: 'var(--text-primary)', whiteSpace: 'nowrap',
          pointerEvents: 'none', userSelect: 'none', zIndex: 0,
          overflow: 'hidden',
        }}
      >
        DEPLOYED_MODULES
      </motion.div>

      <motion.div
        initial={{ top: '-5%' }}
        animate={{ top: '110%' }}
        transition={{ duration: 2.5, ease: 'linear' }}
        style={{
          position: 'absolute', left: 0, right: 0, height: 3,
          background: 'var(--accent-secondary)',
          boxShadow: '0 0 20px 4px var(--accent-secondary)',
          zIndex: 2, pointerEvents: 'none'
        }}
      />

      <div style={{
        position: 'relative', zIndex: 1, width: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(200px, 1fr) minmax(260px, 1fr)',
        gap: '3rem',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="terminal-label">// DEPLOYED_MODULES</div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900,
            fontFamily: 'var(--font-heading)', color: 'var(--text-primary)',
            letterSpacing: '0.05em', lineHeight: 1, margin: 0,
          }}>
            Projects
          </h1>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
            color: 'var(--accent-primary)', letterSpacing: '0.1em',
          }}>
            DATABASE_ENTRIES: {count}
          </div>
        </div>

        <div style={{
          background: 'rgba(10,10,15,0.6)',
          border: '1px solid var(--accent-border)',
          borderRadius: 6, padding: '1.25rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
          color: 'var(--accent-secondary)', lineHeight: 1.9,
          boxShadow: '0 0 30px rgba(124,58,237,0.05)',
          backdropFilter: 'blur(8px)',
        }}>
          {lines.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {l}
            </motion.div>
          ))}
          {lines.length < 4 && <span className="blink">▋</span>}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState('ALL');
  const [searchParams] = useSearchParams();
  const { playSound } = useSound();

  const skillFilter = searchParams.get('skill');

  const filtered = (() => {
    let base = active === 'ALL'
      ? projects
      : active === 'IN_PROGRESS'
        ? projects.filter(p => p.status === 'IN_PROGRESS')
        : projects.filter(p => p.tags.includes(active));
    if (skillFilter) {
      base = base.filter(p =>
        p.stack.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()))
      );
    }
    return base;
  })();

  return (
    <PageTransition>
      <Helmet>
        <title>Projects | ABINAV.SYS</title>
        <meta name="description" content="View all active modules, classified archives, and ongoing operations by Abinav." />
      </Helmet>

      <div className="page-container">
        <BackButton />
        <ProjectHero count={projects.length} />

        {/* Filter bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 50,
          display: 'flex', gap: 10, flexWrap: 'wrap',
          padding: '1rem 0',
          background: 'rgba(10,10,15,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '2.5rem',
        }}>
          {FILTERS.map(f => {
            const cnt = f === 'ALL' ? projects.length
              : f === 'IN_PROGRESS' ? projects.filter(p => p.status === 'IN_PROGRESS').length
                : projects.filter(p => p.tags.includes(f)).length;
            const isActive = active === f;
            return (
              <button
                key={f}
                onClick={() => { playSound('click'); setActive(f); }}
                onMouseEnter={() => playSound('hover')}
                style={{
                  position: 'relative',
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  letterSpacing: '0.1em', padding: '7px 14px', borderRadius: 4,
                  border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  cursor: 'pointer',
                  background: isActive ? 'var(--accent-subtle)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 400,
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                [ {f} <span style={{ opacity: 0.6 }}>· {cnt}</span> ]
                {isActive && (
                  <motion.div
                    layoutId="activeFilterUnderline"
                    style={{
                      position: 'absolute', bottom: -1, left: 0, right: 0,
                      height: 2, background: 'var(--accent-primary)',
                      boxShadow: 'var(--accent-glow)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 4 cards per row grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.25rem',
            marginBottom: '4rem',
            alignItems: 'start',
          }}
        >
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onMouseEnter={() => playSound('hover')}
                style={{
                  gridColumn: 'span 3',
                  minWidth: 0,
                  height: 440, // Fixed height to prevent collapse from absolute children
                }}
              >
                <ProjectCard
                  project={project}
                  index={i}
                  isFeatured={false}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '4rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)', fontSize: '0.8rem',
          }}>
            &gt; NO_MODULES_FOUND FOR FILTER: {active}
          </div>
        )}

        {/* Footer line */}
        <div style={{
          textAlign: 'center', paddingBottom: '3rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          color: 'var(--text-muted)', letterSpacing: '0.1em',
          lineHeight: 2,
        }}>
          <div>&gt; END_OF_DATABASE</div>
          <div>TOTAL_MODULES: {projects.length} | LAST_UPDATED: {new Date().toISOString().split('T')[0]}</div>
        </div>
      </div>
    </PageTransition>
  );
}