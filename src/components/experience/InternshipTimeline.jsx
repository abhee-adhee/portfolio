import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

function OrgLogo({ org }) {
  const getInitials = (name) => {
    if (!name) return 'EX';
    if (name.includes('BugBustersLab')) return 'BBL';
    if (name.includes('AssureFM')) return 'AFM';
    if (name.includes('Tech Society')) return 'TS';
    return name
      .split(' ')
      .slice(0, 3)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  };

  const getSubtleColor = (name) => {
    if (name.includes('BugBustersLab')) {
      return {
        bg: 'rgba(34, 197, 94, 0.1)',
        border: 'rgba(34, 197, 94, 0.3)',
        text: 'var(--accent-primary)',
      };
    }
    if (name.includes('AssureFM')) {
      return {
        bg: 'rgba(59, 130, 246, 0.1)',
        border: 'rgba(59, 130, 246, 0.3)',
        text: '#3b82f6',
      };
    }
    if (name.includes('Tech Society')) {
      return {
        bg: 'rgba(168, 85, 247, 0.1)',
        border: 'rgba(168, 85, 247, 0.3)',
        text: '#a855f7',
      };
    }
    return {
      bg: 'var(--bg-subtle)',
      border: 'var(--border-color)',
      text: 'var(--accent-primary)',
    };
  };

  const colors = getSubtleColor(org);

  return (
    <div
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        fontWeight: 700,
        color: colors.text,
        letterSpacing: '-0.01em',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
      }}
    >
      {getInitials(org)}
    </div>
  );
}

function InternshipCard({ exp, index, total }) {
  const { playSound } = useSound();
  const [hovered, setHovered] = useState(false);

  const isActive = exp.status === 'ACTIVE';

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
      {/* Node marker & connector rail */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          width: 36,
          marginTop: 24,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: isActive
              ? 'var(--accent-primary)'
              : hovered
              ? 'var(--text-primary)'
              : 'var(--bg-surface)',
            border: `2px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
            boxShadow: isActive ? '0 0 10px rgba(34, 197, 94, 0.6)' : 'none',
            transition: 'all 0.2s ease',
          }}
        />

        {index < total - 1 && (
          <div
            style={{
              width: 1,
              flex: 1,
              minHeight: 120,
              marginTop: 12,
              backgroundColor: 'var(--border-color)',
            }}
          />
        )}
      </div>

      {/* Main Experience Card */}
      <div
        className="experience-timeline-card"
        style={{
          flex: 1,
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2.5rem',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid',
          borderColor: hovered ? 'var(--border-hover)' : 'var(--border-color)',
          boxShadow: hovered ? '0 8px 30px rgba(0, 0, 0, 0.35)' : '0 4px 20px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.2s ease',
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {/* Left: Organization Logo + Role Title & Org Name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              minWidth: '240px',
              flex: '1 1 auto',
            }}
          >
            <OrgLogo org={exp.org} />
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.15rem, 2.2vw, 1.35rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  margin: '0 0 4px 0',
                }}
              >
                {exp.role}
              </h3>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{exp.org}</span>
              </div>
            </div>
          </div>

          {/* Right: Date Duration + Status Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-subtle)',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
              }}
            >
              <Calendar size={13} style={{ color: 'var(--accent-primary)' }} />
              <span>{exp.duration}</span>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: isActive ? 'rgba(34, 197, 94, 0.12)' : 'var(--bg-subtle)',
                border: `1px solid ${isActive ? 'rgba(34, 197, 94, 0.35)' : 'var(--border-color)'}`,
                color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              {isActive && (
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-primary)',
                    boxShadow: '0 0 6px var(--accent-primary)',
                  }}
                />
              )}
              {isActive ? 'Current Role' : 'Completed'}
            </span>
          </div>
        </div>

        {/* Narrative Description (if present) */}
        {exp.description && (
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginTop: '1.25rem',
              padding: '0.9rem 1.1rem',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: '8px',
              borderLeft: '3px solid var(--accent-primary)',
            }}
          >
            {exp.description}
          </div>
        )}

        {/* Key Responsibilities & Deliverables (Clean separated bullet points) */}
        {exp.tasks && exp.tasks.length > 0 && (
          <div style={{ marginTop: '1.25rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <CheckCircle2 size={13} style={{ color: 'var(--accent-primary)' }} />
              <span>Key Responsibilities &amp; Deliverables</span>
            </div>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              {exp.tasks.map((task) => (
                <li
                  key={task.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-primary)',
                      flexShrink: 0,
                      marginTop: '9px',
                    }}
                  />
                  <span>{task.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies & Core Competencies Tags */}
        {exp.stack && exp.stack.length > 0 && (
          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1.15rem',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.65rem',
              }}
            >
              Technologies &amp; Skill Competencies
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {exp.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    transition: 'border-color 0.15s ease',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
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
