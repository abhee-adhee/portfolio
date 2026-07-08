import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { skillGroups } from '../../data/skills';

const LABEL_COLOR = {
  EXPERT: 'var(--accent-primary)',
  ADVANCED: '#a78bfa',
  INTERMEDIATE: '#f59e0b',
};

function SkillBar({ name, level, tag, label, animate, itemVariants }) {
  const { data } = usePortfolioData();
  const projects = data.projects;
  const [fill, setFill] = useState(0);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  // Derive projects that use this skill
  const usedIn = projects
    .filter(p => p.stack.some(s => s.toLowerCase().includes(name.toLowerCase())))
    .map(p => p.title);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!animate) { setFill(0); return; }
    const t = setTimeout(() => setFill(level), 80);
    return () => clearTimeout(t);
  }, [animate, level]);

  const handleClick = () => {
    if (usedIn.length > 0) {
      navigate(`/projects?skill=${encodeURIComponent(name)}`);
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        marginBottom: '1.1rem', position: 'relative', overflow: 'visible',
        cursor: usedIn.length > 0 ? 'pointer' : 'default',
      }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute', bottom: 'calc(100% + 10px)', left: '50px',
              background: 'rgba(10,10,15,0.96)',
              border: '1px solid var(--accent-border)',
              borderRadius: 4, padding: '6px 12px',
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              color: 'var(--accent-primary)', whiteSpace: 'nowrap',
              zIndex: 1000, pointerEvents: 'none',
              boxShadow: '0 0 20px var(--accent-glow)',
            }}
          >
            {usedIn.length > 0
              ? `Used in: ${usedIn.slice(0, 2).join(', ')}${usedIn.length > 2 ? ` +${usedIn.length - 2}` : ''} → click to filter`
              : `${name} · Click to filter projects`
            }
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shimmer overlay */}
      {hovered && (
        <motion.div
          initial={{ left: '-100%' }}
          animate={{ left: '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: 0, bottom: 0, width: '50%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            pointerEvents: 'none', zIndex: 10,
          }}
        />
      )}
      {/* Tag chip */}
      <div style={{
        flexShrink: 0, width: 42, textAlign: 'center',
        fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
        padding: '3px 4px', borderRadius: 3,
        background: 'var(--accent-subtle)',
        border: '1px solid var(--accent-border)',
        color: 'var(--accent-primary)', letterSpacing: '0.04em',
      }}>
        {tag}
      </div>

      {/* Name + bar + label */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
            {name}{usedIn.length > 0 && <span style={{ marginLeft: 6, fontSize: '0.5rem', color: 'rgba(168, 85, 247, 0.4)', letterSpacing: '0.1em' }}>↗ FILTER</span>}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: LABEL_COLOR[label] || 'var(--text-muted)', letterSpacing: '0.1em', opacity: 0.9 }}>
            {label}
          </span>
        </div>

        {/* Bar track */}
        <div style={{ height: 5, borderRadius: 3, background: 'rgba(168, 85, 247, 0.06)', overflow: 'hidden', position: 'relative' }}>
          <div style={{
            height: '100%', borderRadius: 3,
            width: `${fill}%`,
            background: `linear-gradient(90deg, var(--accent-secondary), ${LABEL_COLOR[label] || 'var(--accent-primary)'})`,
            boxShadow: `0 0 10px ${LABEL_COLOR[label] || 'rgba(168, 85, 247, 0.4)'}66`,
            transition: 'width 0.8s ease',
          }} />
        </div>
      </div>

      {/* % */}
      <span style={{ flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', width: 28, textAlign: 'right' }}>
        {level}%
      </span>
    </motion.div>
  );
}

const tableContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const tableItemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } }
};

export default function Skills() {
  const { data } = usePortfolioData();
  const TABS = data.skills;
  const ACQUIRING = skillGroups.flatMap(group => group.skills.map(skill => skill.name)).slice(0, 4);

  const [activeTab, setActiveTab] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleTab = (i) => {
    setShouldAnimate(false);
    setActiveTab(i);
    setTimeout(() => setShouldAnimate(true), 60);
  };

  const tab = TABS[activeTab];

  return (
    <section ref={sectionRef} id="skills" className="section-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: '3.5rem' }}
      >
        <div className="terminal-label" style={{ marginBottom: 12 }}>// TECHNICAL_ARSENAL</div>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, fontFamily: 'var(--font-subheading)', letterSpacing: '0.08em', color: 'var(--text-primary)' }}>
          Skills &amp; Stack
        </h2>
      </motion.div>

      {/* Terminal panel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="glass-card"
        style={{ borderRadius: 12, overflow: 'hidden', marginBottom: '2rem' }}
      >
        {/* Tab bar — chrome strip */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            display: 'flex', alignItems: 'stretch', gap: 0,
            background: 'rgba(0,0,0,0.3)',
            borderBottom: '1px solid var(--border-color)',
            overflowX: 'auto',
          }}
        >
          {/* macOS dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px', borderRight: '1px solid var(--border-color)', flexShrink: 0 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }} />
          </div>

          {TABS.map((t, i) => (
            <button
              key={t.label || t.id}
              onClick={() => handleTab(i)}
              className={`skill-tab${activeTab === i ? ' skill-tab-active' : ''}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                padding: '13px 20px',
                border: 'none',
                borderRight: '1px solid var(--border-color)',
                cursor: 'pointer',
                background: activeTab === i ? 'var(--accent-subtle)' : 'transparent',
                color: activeTab === i ? 'var(--accent-primary)' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', gap: 6,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <span style={{ opacity: 0.7 }}>{t.icon}</span>
              {t.label || t.id}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <div style={{ padding: '2rem 2.5rem', minHeight: 300 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22 }}
            >
              <motion.div
                variants={tableContainerVariants}
                initial="hidden"
                animate={visible && shouldAnimate ? "show" : "hidden"}
                style={{
                  display: 'grid',
                  gridTemplateColumns: tab.skills.length >= 4 ? '1fr 1fr' : '1fr',
                  gap: '0 3rem',
                }}
              >
                {tab.skills.map(skill => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    animate={visible && shouldAnimate}
                    itemVariants={tableItemVariants}
                  />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Currently acquiring */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', flexShrink: 0 }}>
          CURRENTLY_ACQUIRING:
        </span>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {ACQUIRING.map((badge) => (
            <div
              key={badge}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
                padding: '5px 14px',
                borderRadius: 3,
                border: '1px solid var(--accent-border)',
                color: 'var(--accent-primary)',
                background: 'var(--accent-subtle)',
                animation: 'acquiringPulse 2.5s ease-in-out infinite',
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes acquiringPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(168, 85, 247, 0); opacity: 0.7; }
          50%       { box-shadow: 0 0 14px rgba(168, 85, 247, 0.25); opacity: 1; }
        }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
      `}</style>
    </section>
  );
}
