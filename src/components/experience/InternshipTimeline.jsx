import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

function InternshipCard({ exp, index, total }) {
  const { playSound } = useSound();
  const [expanded, setExpanded] = useState(true);
  const [hovered, setHovered] = useState(false);

  const isActive = exp.status === 'ACTIVE';

  const toggleExpand = () => {
    playSound('click');
    setExpanded((prev) => !prev);
  };

  return (
    <div
      className="experience-timeline-row"
      onMouseEnter={() => {
        setHovered(true);
        playSound('hover');
      }}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: '1.5rem',
        position: 'relative',
        alignItems: 'flex-start',
      }}
    >
      {/* Node marker & connector */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          width: 36,
          marginTop: 18,
        }}
      >
        <div
          style={{
            width: 11,
            height: 11,
            borderRadius: '50%',
            background: isActive ? 'var(--accent-primary)' : hovered ? 'var(--text-primary)' : 'var(--surface-primary)',
            border: `2px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
            transition: 'all 0.2s ease',
          }}
        />

        {index < total - 1 && (
          <div
            style={{
              width: 1,
              flex: 1,
              minHeight: 80,
              marginTop: 12,
              background: 'var(--border-strong)',
            }}
          />
        )}
      </div>

      {/* Main Experience Card */}
      <div
        className="experience-timeline-card"
        style={{
          flex: 1,
          borderRadius: '2px',
          padding: '1.75rem',
          marginBottom: '2rem',
          background: 'var(--surface-primary)',
          border: '1px solid',
          borderColor: hovered ? 'var(--border-strong)' : 'var(--border-subtle)',
          transition: 'border-color 0.2s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: '1rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--accent-primary)',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              {exp.org}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}
            >
              {exp.duration}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                padding: '0.15rem 0.45rem',
                borderRadius: '2px',
                background: 'var(--surface-muted)',
                border: '1px solid var(--border-subtle)',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                fontWeight: 600,
              }}
            >
              {isActive ? 'Current' : 'Completed'}
            </span>
          </div>
        </div>

        {/* Role */}
        <h4
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.65rem',
          }}
        >
          {exp.role}
        </h4>

        {/* Description */}
        {exp.description && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: '1rem',
            }}
          >
            {exp.description}
          </p>
        )}

        {/* Responsibilities toggle */}
        <div style={{ marginBottom: '0.85rem' }}>
          <button
            onClick={toggleExpand}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {expanded ? (
              <>
                <ChevronUp size={14} />
                <span>Hide key responsibilities</span>
              </>
            ) : (
              <>
                <ChevronDown size={14} />
                <span>View key responsibilities ({exp.tasks?.length || 0})</span>
              </>
            )}
          </button>
        </div>

        {/* Tasks */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden', marginBottom: '1.25rem' }}
            >
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.55rem',
                }}
              >
                {exp.tasks.map((task) => (
                  <li
                    key={task.id}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.65rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>&bull;</span>
                    <span>{task.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech stack */}
        {exp.stack && exp.stack.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            {exp.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '2px',
                  background: 'var(--surface-muted)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function InternshipTimeline({ experience = [], certificates = [] }) {
  const { playSound } = useSound();
  const [showCerts, setShowCerts] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Chapter Subheader */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '2.5rem',
          paddingBottom: '0.85rem',
          borderBottom: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--accent-primary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
            }}
          >
            Chapter 01 &mdash; Industry Engagements &amp; Experience
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.45rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            Practical Experience &amp; Responsibilities
          </h3>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
          }}
        >
          {experience.length} Practical Roles Documented
        </div>
      </div>

      {/* Experience Timeline */}
      <div>
        {experience.map((exp, index) => (
          <InternshipCard
            key={exp.id}
            exp={exp}
            index={index}
            total={experience.length}
          />
        ))}
      </div>

      {/* Verified Professional Credentials Drawer */}
      {certificates && certificates.length > 0 && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            borderRadius: '2px',
            background: 'var(--surface-primary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: '0 0 0.2rem 0',
                }}
              >
                Verified Professional Credentials &amp; Certifications
              </h4>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                }}
              >
                {certificates.length} Specializations (IBM, AWS, Scaler, Google Cloud)
              </div>
            </div>

            <button
              onClick={() => {
                playSound('click');
                setShowCerts((prev) => !prev);
              }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                fontWeight: 500,
                padding: '0.45rem 0.95rem',
                borderRadius: '2px',
                background: 'transparent',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {showCerts ? (
                <>
                  <ChevronUp size={14} />
                  <span>Hide Credentials</span>
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  <span>View All Credentials ({certificates.length})</span>
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showCerts && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                style={{
                  overflow: 'hidden',
                  marginTop: '1.25rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      style={{
                        padding: '1.25rem',
                        background: 'var(--surface-muted)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '2px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 8,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--accent-primary)',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {cert.issuer} &bull; {cert.date}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            lineHeight: 1.4,
                          }}
                        >
                          {cert.name}
                        </div>
                      </div>

                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            color: 'var(--text-muted)',
                            textDecoration: 'none',
                            alignSelf: 'flex-start',
                            borderBottom: '1px solid var(--border-subtle)',
                          }}
                        >
                          Verify &nearr;
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
