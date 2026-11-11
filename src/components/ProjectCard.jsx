import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectVisual from './home/ProjectVisual';
import { useSound } from '../context/SoundContext';

export default function ProjectCard({ project }) {
  const { playSound } = useSound();
  const [isHovered, setIsHovered] = useState(false);

  // Derive 3-4 primary technology tags
  const primaryStack = (project.stack || []).slice(0, 4);

  // Derive one-line description
  const oneLineDesc = project.shortDesc || project.tagline || project.description;

  // Category label
  const categoryLabel =
    project.tags?.[0] ||
    (project.isSidequest ? 'SIDEQUEST' : 'SYSTEMS');

  return (
    <Link
      to={`/projects/${project.id}`}
      onClick={() => playSound('click')}
      onMouseEnter={() => {
        setIsHovered(true);
        playSound('hover');
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'var(--bg-surface)',
        border: `1px solid ${isHovered ? 'rgba(34, 197, 94, 0.45)' : 'var(--border-color)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.22s ease',
        transform: isHovered ? 'translateY(-3px)' : 'none',
        boxShadow: isHovered ? '0 10px 24px -10px rgba(0, 0, 0, 0.5)' : 'none',
      }}
    >
      {/* Visual Thumbnail */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <ProjectVisual id={project.id} screenshot={project.screenshot} />
      </div>

      {/* Card Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '1.35rem 1.35rem 1.15rem',
          gap: '0.85rem',
        }}
      >
        {/* Category & Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--accent-primary)',
              textTransform: 'uppercase',
            }}
          >
            {categoryLabel}
          </span>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
            }}
          >
            {project.status === 'IN_PROGRESS'
              ? 'In Progress'
              : project.status === 'PLANNING'
              ? 'Planning'
              : 'Deployed'}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: '0 0 0.25rem 0',
              lineHeight: 1.25,
            }}
          >
            {project.title}
          </h3>

          {project.subtitle && (
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {project.subtitle}
            </p>
          )}
        </div>

        {/* One-Line Description */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {oneLineDesc}
        </p>

        {/* 3-4 Primary Technology Tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginTop: 'auto',
            paddingTop: '0.5rem',
          }}
        >
          {primaryStack.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                padding: '3px 9px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer: Explore Project Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.85rem',
            marginTop: '0.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.84rem',
            fontWeight: 600,
            color: isHovered ? 'var(--accent-primary)' : 'var(--text-primary)',
            transition: 'color 0.2s ease',
          }}
        >
          <span>Explore Project</span>
          <ArrowRight
            size={15}
            style={{
              transform: isHovered ? 'translateX(4px)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
        </div>
      </div>
    </Link>
  );
}
