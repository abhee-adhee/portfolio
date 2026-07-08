import { useState } from 'react';
import { Link } from 'react-router-dom';


const STATUS_CLASS = {
  DEPLOYED: 'badge-deployed',
  ACTIVE: 'badge-active',
  CLASSIFIED: 'badge-classified',
  IN_PROGRESS: 'badge-progress',
};

export default function ProjectCard({ project, index = 0, isFeatured = false }) {
  const isClassified = project.status === 'CLASSIFIED';
  const isDeployed = project.status === 'DEPLOYED';
  const inProgress = project.status === 'IN_PROGRESS';
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    /* 3D Perspective wrapper */
    <div
      style={{
        perspective: '1200px',
        height: isFeatured ? 360 : '100%',
        cursor: 'pointer',
      }}
      onClick={() => !isFeatured && setIsFlipped(f => !f)}
    >
      {/* Inner flip container */}
      <motion.div
        initial="initial"
        whileInView="show"
        viewport={{ once: true }}
        whileHover="hovered"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        variants={{
          initial: { opacity: 0, y: 30 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.05 } },
          hovered: { y: isFeatured ? 0 : -8 }
        }}
        style={{
          position: 'relative',
          width: '100%', height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* FLIP_CARD hint badge — shows on hover, hides when flipped */}
        {!isFeatured && !isFlipped && (
          <motion.div
            variants={{
              initial: { opacity: 0 },
              show: { opacity: 0 },
              hovered: { opacity: 1, transition: { duration: 0.2 } }
            }}
            style={{
              position: 'absolute', top: 8, right: 8,
              fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
              color: 'var(--accent-secondary)',
              background: 'var(--accent-subtle)',
              border: '1px solid var(--accent-border)',
              padding: '3px 8px', borderRadius: 2,
              letterSpacing: '0.1em', zIndex: 20, pointerEvents: 'none',
            }}
          >
            ↩ FLIP_CARD
          </motion.div>
        )}

        {/* ─── FRONT FACE ─── */}
        <motion.div
          className={`glass-card project-card-wrap${isClassified ? ' classified-card' : ''} ${inProgress ? ' in-progress-card' : ''}`}
          style={{
            position: 'absolute', inset: 0,
            borderRadius: 8, overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            backfaceVisibility: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            border: inProgress ? '1px dashed rgba(245,158,11,0.5)' : '1px solid var(--border-color)',
            animation: inProgress ? 'border-dance 4s linear infinite' : 'none',
          }}
        >
          {/* 45deg Diagonal Sweep */}
          <motion.div
            variants={{
              initial: { left: '-150%', top: '0%', opacity: 0 },
              show: { left: '-150%', top: '0%', opacity: 0 },
              hovered: { left: '150%', top: '0%', opacity: 1, transition: { duration: 0.4, ease: 'linear' } }
            }}
            style={{
              position: 'absolute',
              width: '50px',
              height: '250%',
              background: 'linear-gradient(90deg, transparent, var(--accent-glow), transparent)',
              transform: 'rotate(45deg) translateY(-50%)',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          />
          {/* CLASSIFIED red scanline overlay */}
          {isClassified && (
            <div className="classified-scanline" style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 4px,
            rgba(239,68,68,0.05) 4px,
            rgba(239,68,68,0.05) 8px
          )`,
              pointerEvents: 'none',
              transition: 'opacity 0.4s ease',
            }} />
          )}

          {/* ACCESS_GRANTED hover overlay (classified only) */}
          {isClassified && (
            <div className="access-granted-overlay" style={{
              position: 'absolute',
              inset: 0,
              zIndex: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 6,
              opacity: 0,
              pointerEvents: 'none',
              transition: 'opacity 0.4s ease',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.15em',
                color: 'rgba(239,68,68,0.9)',
                textShadow: '0 0 10px rgba(239,68,68,0.5)',
              }}>
                CLEARANCE_REQUIRED...
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: '#4ade80',
                textShadow: '0 0 14px rgba(74,222,128,0.6)',
                animation: 'blink 1.2s step-end infinite',
              }}>
                ACCESS_GRANTED
              </span>
            </div>
          )}

          {/* Terminal title bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 16px',
            borderBottom: '1px solid var(--border-color)',
            background: 'rgba(0,0,0,0.4)',
            flexShrink: 0,
          }}>
            {/* Animated dots */}
            <motion.div
              variants={{
                initial: { rotate: 0 },
                hovered: { rotate: 180, transition: { duration: 0.5, ease: 'easeOut' } }
              }}
              style={{ display: 'flex', gap: 4, originX: 0.5, originY: 0.5 }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.4 }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.4 }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.4 }} />
            </motion.div>

            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              marginLeft: 8,
              letterSpacing: '0.1em',
            }}>
              MODULE_{project.codename}.exe
            </span>

            {/* Number tag */}
            <span style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              color: 'var(--accent-primary)',
              opacity: 0.3,
              fontWeight: 900
            }}>
              #{String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Card body (landscape if featured) */}
          <div className="project-card-body" style={{
            padding: isFeatured ? '2.5rem' : '1.5rem',
            flex: 1, display: 'flex',
            flexDirection: isFeatured ? 'row' : 'column',
            gap: isFeatured ? '3rem' : '1rem',
            alignItems: isFeatured ? 'center' : 'stretch',
          }}>

            {/* Left side text content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>

              {/* Status badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: isFeatured ? '0.5rem' : 0 }}>
                {isDeployed && (
                  <span className="badge badge-deployed" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'blink 2s ease-in-out infinite' }} />
                    DEPLOYED
                  </span>
                )}
                {isClassified && (
                  <span className="badge badge-classified">
                    CLASSIFIED
                  </span>
                )}
                {inProgress && (
                  <span className="badge" style={{
                    color: '#f59e0b', background: 'rgba(245,158,11,0.05)',
                    border: '1px dashed rgba(245,158,11,0.4)'
                  }}>
                    IN_PROGRESS
                  </span>
                )}
                {!isDeployed && !isClassified && !inProgress && (
                  <span className="badge badge-active">{project.status}</span>
                )}
              </div>

              {/* Title */}
              <h3
                className={isClassified ? 'classified-blur' : ''}
                style={{
                  fontFamily: 'var(--font-subheading)',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  fontSize: isFeatured ? '2rem' : '1.1rem',
                  color: 'var(--text-primary)',
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                className={isClassified ? 'classified-blur' : ''}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                {isFeatured ? project.fullDesc || project.shortDesc : project.shortDesc}
              </p>

              {/* Stack chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: isFeatured ? '1rem' : 'auto' }}>
                {project.stack.map(s => (
                  <motion.span
                    key={s}
                    className={isClassified ? 'classified-blur' : ''}
                    variants={{
                      initial: { boxShadow: '0 0 0px transparent', borderColor: 'var(--accent-border)' },
                      hovered: { boxShadow: '0 0 12px var(--accent-glow)', borderColor: 'var(--accent-primary)' }
                    }}
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                      padding: '4px 10px', borderRadius: 2,
                      background: 'var(--accent-subtle)',
                      border: '1px solid var(--accent-border)',
                      color: 'var(--accent-primary)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>

              {/* Footer Stats Line */}
              <div style={{
                marginTop: isFeatured ? 'auto' : '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                }}>
                  UPTIME: 99.9% <span style={{ color: 'var(--border-color)', margin: '0 4px' }}>|</span> BUILD: <span style={{ color: '#4ade80' }}>PASSING</span>
                </span>
                <Link
                  to={`/projects/${project.id}`}
                  className="btn-interactive btn-open-module"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    textDecoration: 'none',
                    border: '1px solid rgba(0,245,255,0.3)',
                    padding: '5px 18px',
                    borderRadius: 2,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    display: 'inline-block',
                    background: isFeatured ? 'var(--accent-cyan)' : 'transparent',
                    color: isFeatured ? '#0a0a0f' : 'var(--accent-cyan)',
                    fontWeight: isFeatured ? 800 : 600,
                  }}
                >
                  {isClassified ? '[UNLOCK]' : '[OPEN_MODULE]  '}
                </Link>
              </div>

              {/* Progress Bar for IN_PROGRESS */}
              {inProgress && (
                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(245,158,11,0.7)' }}>COMPILING_MODULE...</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(245,158,11,0.9)' }}>{project.progress || 0}%</span>
                  </div>
                  <div style={{ height: 2, background: 'rgba(245,158,11,0.1)', borderRadius: 1, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress || 0}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      style={{ height: '100%', background: '#f59e0b', boxShadow: '0 0 8px rgba(245,158,11,0.5)' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right side graphic for featured cards */}
            {isFeatured && (
              <div style={{
                flex: 1, height: '100%', minHeight: 250,
                background: 'var(--bg-black-light)',
                borderRadius: 6, border: '1px solid var(--border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden'
              }}>
                {/* Abstract grid wiring representation */}
                <div className="absolute inset-0 bg-grid opacity-50" />
                <motion.div
                  variants={{ hovered: { scale: 1.05, transition: { duration: 0.5 } } }}
                  style={{
                    width: '80%', height: '80%', border: '1px solid rgba(124,58,237,0.3)',
                    background: 'rgba(124,58,237,0.05)', borderRadius: 4,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 40px rgba(124,58,237,0.1)'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-violet)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
                // MODULE_VISUALIZATION
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          <style>{`
        .classified-blur {
          filter: blur(4px);
          transition: filter 0.5s ease;
        }
        .classified-card:hover .classified-blur {
          filter: none;
          animation: glitch-reveal 0.45s ease forwards;
        }
        @keyframes glitch-reveal {
          0%   { filter: blur(4px); transform: translateX(-2px); }
          30%  { filter: blur(2px); transform: translateX(2px); clip-path: inset(30% 0 50% 0); }
          60%  { filter: blur(0.5px); transform: translateX(-1px); clip-path: inset(0 0 0 0); }
          100% { filter: none; transform: translateX(0); clip-path: none; }
        }
        .classified-card:hover .access-granted-overlay {
          opacity: 1 !important;
        }
        .classified-card:hover .classified-scanline {
          opacity: 0.35;
        }
        @keyframes border-dance {
          0% { border-style: dashed; }
          50% { border-style: dotted; }
          100% { border-style: dashed; }
        }
        @media (max-width: 768px) {
          .project-card-body { flex-direction: column !important; padding: 1.5rem !important; }
        }
      `}</style>
        </motion.div>{/* END FRONT FACE */}

        {/* ─── BACK FACE ─── */}
        <div
          style={{
            position: 'absolute', inset: 0,
            borderRadius: 8, overflow: 'hidden',
            background: 'rgba(10,10,20,0.97)',
            border: '1px solid rgba(124,58,237,0.4)',
            boxShadow: '0 0 40px rgba(124,58,237,0.15)',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex', flexDirection: 'column',
            padding: '1.5rem',
            gap: '1rem',
          }}
        >
          {/* Back header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(124,58,237,0.2)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-violet)', letterSpacing: '0.12em' }}>MODULE_STATS</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>↩ click to flip back</span>
          </div>

          {/* Project title */}
          <div style={{ fontFamily: 'var(--font-subheading)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{project.title}</div>

          {/* Key achievements */}
          {project.features && (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-violet)', letterSpacing: '0.12em', marginBottom: 6 }}>// KEY_ACHIEVEMENTS</div>
              {project.features.slice(0, 3).map((f, i) => (
                <div key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5, display: 'flex', gap: 6, marginBottom: 3 }}>
                  <span style={{ color: 'var(--accent-cyan)', flexShrink: 0 }}>›</span>{f.slice(0, 80)}{f.length > 80 ? '…' : ''}
                </div>
              ))}
            </div>
          )}

          {/* Full stack */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-violet)', letterSpacing: '0.12em', marginBottom: 6 }}>// TECH_STACK</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {project.stack.map(s => (
                <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '3px 8px', borderRadius: 2, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.3)', color: 'rgba(124,58,237,0.9)' }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Link to full page */}
          <Link
            to={`/projects/${project.id}`}
            onClick={e => e.stopPropagation()}
            style={{
              marginTop: 'auto',
              display: 'inline-block',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              color: '#0a0a0f', background: 'var(--accent-violet)',
              border: 'none', padding: '8px 16px', borderRadius: 3,
              textDecoration: 'none', fontWeight: 700, letterSpacing: '0.08em',
              boxShadow: '0 0 20px rgba(124,58,237,0.3)',
            }}
          >
            [ OPEN_FULL_MODULE ] →
          </Link>
        </div>{/* END BACK FACE */}

      </motion.div>{/* END INNER FLIP CONTAINER */}
    </div> // END PERSPECTIVE WRAPPER
  );
}
