import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Github,
  ExternalLink,
  UploadCloud,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowLeft,
  ArrowRight,
  Trash2,
  RefreshCw,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

import { projects } from '../data/projects';
import PageTransition from '../components/PageTransition';
import BackButton from '../components/BackButton';
import { useSound } from '../context/SoundContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const { playSound } = useSound();
  const fileInputRef = useRef(null);

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  // Independent Screenshot State per Project
  const [prevId, setPrevId] = useState(id);
  const [userScreenshot, setUserScreenshot] = useState(() => {
    try {
      return typeof window !== 'undefined'
        ? localStorage.getItem(`project_screenshot_${id}`)
        : null;
    } catch {
      return null;
    }
  });

  if (prevId !== id) {
    setPrevId(id);
    try {
      setUserScreenshot(
        typeof window !== 'undefined'
          ? localStorage.getItem(`project_screenshot_${id}`)
          : null
      );
    } catch {
      setUserScreenshot(null);
    }
  }

  const screenshot = userScreenshot || project?.screenshot || null;

  // Handle local image upload for this project
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (dataUrl) {
        try {
          localStorage.setItem(`project_screenshot_${project.id}`, dataUrl);
          setUserScreenshot(dataUrl);
          playSound('click');
        } catch (err) {
          console.error('Failed to save screenshot in localStorage', err);
          alert('Image size exceeds browser storage limit. Please try a compressed image.');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Remove uploaded screenshot
  const handleRemoveScreenshot = () => {
    try {
      localStorage.removeItem(`project_screenshot_${project.id}`);
    } catch {
      // ignore
    }
    setUserScreenshot(null);
    playSound('click');
  };

  if (!project) {
    return (
      <PageTransition>
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '8rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
            }}
          >
            Project Not Found
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
            }}
          >
            The requested project specification &ldquo;{id}&rdquo; does not exist in the archive.
          </p>
          <Link
            to="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
            }}
          >
            <ArrowLeft size={15} />
            <span>Return to Projects</span>
          </Link>
        </div>
      </PageTransition>
    );
  }

  // Previous and Next Projects
  const prevProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject =
    projects[(projectIndex + 1) % projects.length];

  return (
    <PageTransition>
      <Helmet>
        <title>{project.title} &mdash; Project Case Study</title>
        <meta
          name="description"
          content={`${project.title}: ${project.shortDesc || project.description}`}
        />
        <meta property="og:title" content={`${project.title} — Abinav Aaditya`} />
        <meta
          property="og:description"
          content={project.shortDesc || project.description}
        />
      </Helmet>

      <div
        className="page-container project-detail-page-container"
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '2.5rem 1.5rem 7rem',
        }}
      >
        <BackButton label="All Projects" />

        {/* =========================================================================
            SECTION A: PROJECT HEADER
            ========================================================================= */}
        <header style={{ marginBottom: '2.5rem' }}>
          {/* Category & Status Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--accent-primary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {project.isSidequest ? 'SIDEQUEST // PROTOTYPE' : project.tags?.[0] || 'SYSTEM'}
            </span>

            <span style={{ color: 'var(--text-muted)' }}>&bull;</span>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}
            >
              {project.status === 'IN_PROGRESS'
                ? 'Under Active Development'
                : project.status === 'PLANNING'
                ? 'Research & Specification'
                : 'Deployed & Operational'}
            </span>
          </div>

          {/* Project Title */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: '0 0 0.85rem 0',
            }}
          >
            {project.title}
          </h1>

          {/* Short Introduction / Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '820px',
              margin: '0 0 1.5rem 0',
            }}
          >
            {project.subtitle || project.tagline || project.shortDesc}
          </p>

          {/* Technology Stack Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '7px',
              marginBottom: '1.75rem',
            }}
          >
            {project.stack?.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  padding: '4px 11px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links Row (GitHub & Live Demo) */}
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            {project.repository && (
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                onMouseEnter={() => playSound('hover')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--text-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                }}
              >
                <Github size={16} />
                <span>View Source Repository</span>
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                onMouseEnter={() => playSound('hover')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '9999px',
                  backgroundColor: '#ffffff',
                  color: '#0d0d10',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'opacity 0.15s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <ExternalLink size={15} />
                <span>Open Live Deployment</span>
              </a>
            )}
          </div>
        </header>

        {/* =========================================================================
            SECTION B: DEDICATED SCREENSHOT & UPLOAD CONTAINER (16:9)
            ========================================================================= */}
        <section style={{ marginBottom: '3.5rem' }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />

          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-surface)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.2s ease',
            }}
          >
            {screenshot ? (
              // Display Actual Screenshot
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <img
                  src={screenshot}
                  alt={`${project.title} screenshot`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* Screenshot Actions Bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    gap: '8px',
                    backgroundColor: 'rgba(13, 13, 16, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.74rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    <RefreshCw size={12} />
                    <span>Replace</span>
                  </button>

                  <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>

                  <button
                    onClick={handleRemoveScreenshot}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.74rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={12} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ) : (
              // Neutral Dark Placeholder with Upload Callout
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  <UploadCloud size={24} />
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '0.35rem',
                  }}
                >
                  Project Screenshot
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                    margin: '0 0 1rem 0',
                    maxWidth: '360px',
                    lineHeight: 1.5,
                  }}
                >
                  Add your project screenshot. Click to upload a 16:9 preview for this project (PNG, JPG, WebP).
                </p>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: 'var(--accent-primary)',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--accent-border)',
                    backgroundColor: 'rgba(34, 197, 94, 0.08)',
                  }}
                >
                  + Upload Screenshot
                </span>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION C: PROJECT OVERVIEW
            ========================================================================= */}
        <section
          style={{
            marginBottom: '3.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              marginBottom: '1.5rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Project Overview
            </h2>
            <span style={{ color: 'var(--text-muted)' }}>-</span>
            <span
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.35rem',
                color: 'var(--text-secondary)',
              }}
            >
              Context, purpose &amp; motivation
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* What it is */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  letterSpacing: '0.06em',
                  marginBottom: '0.5rem',
                }}
              >
                WHAT IT IS
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {project.whatItIs || project.fullDesc || project.description}
              </p>
            </div>

            {/* Why I built it */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  letterSpacing: '0.06em',
                  marginBottom: '0.5rem',
                }}
              >
                WHY I BUILT IT
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {project.whyBuilt ||
                  'Built to understand core systems architecture, practical protocols, and real engineering trade-offs through hands-on implementation.'}
              </p>
            </div>

            {/* The problem it addresses */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  letterSpacing: '0.06em',
                  marginBottom: '0.5rem',
                }}
              >
                THE PROBLEM IT ADDRESSES
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {project.problem ||
                  'Addresses the need for modular, inspectable, and reproducible software solutions that solve real practical engineering challenges.'}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION D: KEY FEATURES
            ========================================================================= */}
        {project.features && project.features.length > 0 && (
          <section
            style={{
              marginBottom: '3.5rem',
              paddingBottom: '2.5rem',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                marginBottom: '1.5rem',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                Key Features
              </h2>
              <span style={{ color: 'var(--text-muted)' }}>-</span>
              <span
                style={{
                  fontFamily: 'var(--font-handwriting)',
                  fontSize: '1.35rem',
                  color: 'var(--text-secondary)',
                }}
              >
                Core system capabilities
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '0.85rem',
              }}
            >
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '1rem',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                  }}
                >
                  <CheckCircle2
                    size={17}
                    style={{
                      color: 'var(--accent-primary)',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION E: TECHNICAL IMPLEMENTATION
            ========================================================================= */}
        <section
          style={{
            marginBottom: '3.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              marginBottom: '1.5rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Technical Implementation
            </h2>
            <span style={{ color: 'var(--text-muted)' }}>-</span>
            <span
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.35rem',
                color: 'var(--text-secondary)',
              }}
            >
              Architecture &amp; engineering decisions
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* System Architecture / What I Built */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  marginBottom: '0.75rem',
                }}
              >
                <Layers size={14} />
                <span>SYSTEM ARCHITECTURE &amp; SUBSYSTEMS</span>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  margin: '0 0 1rem 0',
                }}
              >
                {project.architecture ||
                  project.whatIBuilt ||
                  'The architecture is modularly decoupled across ingestion, processing, persistence, and telemetry presentation layers.'}
              </p>

              {project.technicallyInteresting && (
                <div
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '1rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    CORE PIPELINE &amp; DETECTION LOGIC
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.84rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.6,
                    }}
                  >
                    {project.technicallyInteresting}
                  </div>
                </div>
              )}
            </div>

            {/* Workflow / Data Flow if available */}
            {project.workflow && (
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: 'var(--accent-primary)',
                    marginBottom: '0.75rem',
                  }}
                >
                  <Cpu size={14} />
                  <span>DATA FLOW &amp; PROCESSING PIPELINE</span>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {project.workflow}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION F: CHALLENGES & LEARNINGS
            ========================================================================= */}
        <section
          style={{
            marginBottom: '3.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              marginBottom: '1.5rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Challenges &amp; Learnings
            </h2>
            <span style={{ color: 'var(--text-muted)' }}>-</span>
            <span
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.35rem',
                color: 'var(--text-secondary)',
              }}
            >
              Engineering trade-offs &amp; takeaways
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Approach */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  marginBottom: '0.65rem',
                }}
              >
                <AlertTriangle size={14} />
                <span>TECHNICAL CHALLENGES &amp; APPROACH</span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {project.approach ||
                  'Tackling edge cases in asynchronous data handling, protocol packet validation, and maintaining reproducible local execution.'}
              </p>
            </div>

            {/* Outcome & Learnings */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  marginBottom: '0.65rem',
                }}
              >
                <Lightbulb size={14} />
                <span>OUTCOMES &amp; KEY TAKEAWAYS</span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {project.outcome ||
                  'Delivered a verified functional prototype that demonstrated hands-on technical viability, with actionable takeaways applied to future projects.'}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION G: PROJECT LINKS & REPOSITORIES
            ========================================================================= */}
        {(project.repository || project.demo) && (
          <section
            style={{
              marginBottom: '3.5rem',
              paddingBottom: '2.5rem',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem',
                  }}
                >
                  Explore System Source &amp; Artifacts
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Genuine repositories and deployed instances for {project.title}.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {project.repository && (
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound('click')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <Github size={15} />
                    <span>GitHub</span>
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound('click')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      backgroundColor: '#ffffff',
                      color: '#0d0d10',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <ExternalLink size={14} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION H: PROJECT NAVIGATION (PREV / NEXT / ALL)
            ========================================================================= */}
        <nav
          className="project-detail-nav"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: '1rem',
            paddingTop: '1rem',
          }}
        >
          {/* Previous Project */}
          <Link
            to={`/projects/${prevProject.id}`}
            onClick={() => playSound('click')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              textDecoration: 'none',
              padding: '10px 14px',
              borderRadius: '10px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              transition: 'border-color 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--text-primary)')}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <ArrowLeft size={12} />
              <span>PREVIOUS PROJECT</span>
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {prevProject.title}
            </span>
          </Link>

          {/* Back to All Projects */}
          <Link
            to="/projects"
            onClick={() => playSound('click')}
            style={{
              padding: '10px 16px',
              borderRadius: '9999px',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.82rem',
              fontWeight: 500,
              textDecoration: 'none',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'var(--text-primary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            All Projects
          </Link>

          {/* Next Project */}
          <Link
            to={`/projects/${nextProject.id}`}
            onClick={() => playSound('click')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '3px',
              textDecoration: 'none',
              padding: '10px 14px',
              borderRadius: '10px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              transition: 'border-color 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--text-primary)')}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>NEXT PROJECT</span>
              <ArrowRight size={12} />
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {nextProject.title}
            </span>
          </Link>
        </nav>
      </div>
    </PageTransition>
  );
}
