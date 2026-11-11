import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

function cleanText(str) {
  if (!str) return '';
  return String(str).replace(/^\[|\]$/g, '').trim();
}

export default function EducationTimeline({ education = [], eduCerts = [] }) {
  const { playSound } = useSound();
  const [hoveredId, setHoveredId] = useState(null);

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
            Chapter 03 &mdash; Academic Foundations
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
            Institutional Trajectory &amp; Coursework
          </h3>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span>{education.length} Milestones</span>
          <span>&bull;</span>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Currently Enrolled</span>
        </div>
      </div>

      {/* Main Vertical Timeline */}
      <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
        {/* Continuous Timeline Line */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 16,
            bottom: 16,
            width: 1,
            background: 'var(--border-strong)',
          }}
        />

        {/* Timeline Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {education.map((item, index) => {
            const isActive = item.status === 'ACTIVE';
            const isHovered = hoveredId === item.id;
            const degreeClean = cleanText(item.degree);
            const notesClean = cleanText(item.notes);
            const streamClean = cleanText(item.stream);
            const scoreClean = cleanText(item.score);
            const classesClean = cleanText(item.classes);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                onMouseEnter={() => {
                  setHoveredId(item.id);
                  playSound('hover');
                }}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                }}
              >
                {/* Node marker */}
                <div
                  style={{
                    position: 'relative',
                    flexShrink: 0,
                    width: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 18,
                  }}
                >
                  <div
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: '50%',
                      background: isActive ? 'var(--accent-primary)' : isHovered ? 'var(--text-primary)' : 'var(--surface-primary)',
                      border: `2px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
                      transition: 'all 0.2s ease',
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  style={{
                    flex: 1,
                    borderRadius: '2px',
                    padding: '1.75rem',
                    background: 'var(--surface-primary)',
                    border: '1px solid',
                    borderColor: isHovered ? 'var(--border-strong)' : 'var(--border-subtle)',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  {/* Top Bar */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 8,
                      marginBottom: '0.85rem',
                      paddingBottom: '0.65rem',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--accent-primary)',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item.level?.toUpperCase()}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {item.year}
                      </span>
                      {isActive && (
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '2px',
                            background: 'var(--surface-muted)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--accent-primary)',
                            fontWeight: 600,
                          }}
                        >
                          Current
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Institution & Degree */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.institution}
                    </h4>

                    {(degreeClean || streamClean || classesClean) && (
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {degreeClean || streamClean || classesClean}
                      </div>
                    )}
                  </div>

                  {/* Score & Notes */}
                  {(notesClean || scoreClean) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                      {scoreClean && (
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: 'var(--text-primary)',
                          }}
                        >
                          Score / Standing: <strong>{scoreClean}</strong>
                        </span>
                      )}
                      {notesClean && (
                        <span
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          &bull; {notesClean}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Subjects */}
                  {item.subjects && item.subjects.length > 0 && (
                    <div
                      style={{
                        paddingTop: '0.85rem',
                        borderTop: '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.35rem',
                      }}
                    >
                      {item.subjects.map((sub) => (
                        <span
                          key={sub}
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
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Academic Distinctions & Olympiads */}
      {eduCerts && eduCerts.length > 0 && (
        <div
          style={{
            marginTop: '3.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Academic Distinctions &amp; Olympiads
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            {eduCerts.map((cert) => (
              <div
                key={cert.name}
                style={{
                  padding: '1.25rem',
                  background: 'var(--surface-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '0.2rem',
                  }}
                >
                  {cert.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {cert.issuer} &bull; {cert.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
