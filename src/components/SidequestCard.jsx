import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSound } from '../context/SoundContext';

export default function SidequestCard({ project, index = 0 }) {
  const { playSound } = useSound();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      onMouseEnter={() => playSound('hover')}
      style={{
        background: 'var(--surface-primary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '2px',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
      }}
    >
      <div>
        {/* Sidequest Eyebrow */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent-primary)',
            }}
          >
            Sidequest // Prototype
          </span>

          {project.event && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
              }}
            >
              {project.event.split('\n')[0]}
            </span>
          )}
        </div>

        {/* Title */}
        <h4
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            marginBottom: '0.35rem',
          }}
        >
          {project.title}
        </h4>

        {/* Subtitle / Tagline */}
        {(project.tagline || project.subtitle) && (
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '0.85rem',
            }}
          >
            {project.tagline || project.subtitle}
          </div>
        )}

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.86rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            marginBottom: '1.25rem',
          }}
        >
          {project.shortDesc || project.description}
        </p>

        {/* Workflow or features snippet if available */}
        {project.workflow && (
          <div
            style={{
              padding: '0.75rem',
              background: 'var(--surface-muted)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2px',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}
          >
            {project.workflow}
          </div>
        )}
      </div>

      <div>
        {/* Tech stack */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.35rem',
            marginBottom: '1.25rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {(project.stack || []).map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                padding: '0.15rem 0.45rem',
                background: 'var(--surface-muted)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                color: 'var(--text-secondary)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link
            to={`/projects/${project.id}`}
            onClick={() => playSound('click')}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '0.84rem',
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            <span>Explore Sidequest</span>
            <span>&rarr;</span>
          </Link>

          {project.repository && (
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
              }}
            >
              Source &nearr;
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
