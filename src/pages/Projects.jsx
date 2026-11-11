import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import PageTransition from '../components/PageTransition';
import BackButton from '../components/BackButton';
import { useSound } from '../context/SoundContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

const FILTERS = [
  { key: 'ALL', label: 'All Projects' },
  { key: 'CYBERSEC', label: 'Cybersecurity' },
  { key: 'WEB', label: 'Web & Systems' },
  { key: 'ML', label: 'Machine Learning' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
];

export default function Projects() {
  const { data } = usePortfolioData();
  const projects = data.projects || [];
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchParams, setSearchParams] = useSearchParams();
  const { playSound } = useSound();

  const skillFilter = searchParams.get('skill');

  // Filter project database
  const filtered = (() => {
    let base =
      activeFilter === 'ALL'
        ? projects
        : activeFilter === 'IN_PROGRESS'
        ? projects.filter((p) => p.status === 'IN_PROGRESS')
        : projects.filter((p) => p.tags?.includes(activeFilter));

    if (skillFilter) {
      base = base.filter((p) =>
        p.stack?.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase()))
      );
    }
    return base;
  })();

  // Separate Main Projects vs Sidequests
  const mainProjects = filtered.filter((p) => !p.isSidequest && p.category !== 'sidequest');
  const sidequestProjects = filtered.filter((p) => p.isSidequest || p.category === 'sidequest');

  return (
    <PageTransition>
      <Helmet>
        <title>Projects &amp; Builds &mdash; Abinav Aaditya</title>
        <meta
          name="description"
          content="Practical software engineering, defensive security systems, and machine learning projects by Abinav Aaditya."
        />
        <meta property="og:title" content="Projects & Builds — Abinav Aaditya" />
        <meta
          property="og:description"
          content="Practical software engineering, defensive security systems, and machine learning projects by Abinav Aaditya."
        />
      </Helmet>

      <div
        className="page-container projects-page-container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2.5rem 1.5rem 7rem',
        }}
      >
        <BackButton label="Home" />

        {/* Page Header */}
        <header style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              marginBottom: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            >
              Projects &amp; Builds
            </h1>
            <span style={{ color: 'var(--text-muted)' }}>-</span>
            <span
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.4rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              Curated engineering work &amp; systems
            </span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              lineHeight: 1.6,
              margin: '0 0 1.75rem 0',
            }}
          >
            A collection of practical software systems, intrusion detection engines, accessibility platforms, and experimental prototypes. Click any project to inspect its complete architecture and implementation details.
          </p>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            {FILTERS.map((f) => {
              const isSelected = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => {
                    playSound('click');
                    setActiveFilter(f.key);
                    if (skillFilter) setSearchParams({});
                  }}
                  onMouseEnter={() => playSound('hover')}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 600 : 500,
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    border: `1px solid ${
                      isSelected ? 'var(--accent-primary)' : 'var(--border-color)'
                    }`,
                    backgroundColor: isSelected ? 'var(--bg-subtle)' : 'var(--bg-surface)',
                    color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {f.label}
                </button>
              );
            })}

            {skillFilter && (
              <button
                onClick={() => setSearchParams({})}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid var(--accent-primary)',
                  color: 'var(--accent-primary)',
                  cursor: 'pointer',
                }}
              >
                Clear skill filter: {skillFilter} &times;
              </button>
            )}
          </div>
        </header>

        {/* SECTION 1: Featured Systems & Projects */}
        <section style={{ marginBottom: '4rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary)',
                }}
              />
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                Featured Projects
              </h2>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              {mainProjects.length} systems
            </span>
          </div>

          {mainProjects.length === 0 ? (
            <div
              style={{
                padding: '3rem 1rem',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              No projects found matching the selected filter.
            </div>
          ) : (
            <div className="projects-responsive-grid">
              {mainProjects.map((p) => (
                <div key={p.id} style={{ minHeight: '380px' }}>
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 2: Sidequests & Experimental Prototypes */}
        {sidequestProjects.length > 0 && (
          <section>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#a855f7',
                  }}
                />
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Sidequests &amp; Prototypes
                </h2>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}
              >
                {sidequestProjects.length} prototypes
              </span>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                margin: '0 0 1.5rem 0',
                maxWidth: '620px',
              }}
            >
              Experimental exploratory builds, hackathon prototypes, and sidequests investigating niche intersections of computer vision, cryptography, and local machine learning models.
            </p>

            <div className="projects-responsive-grid">
              {sidequestProjects.map((p) => (
                <div key={p.id} style={{ minHeight: '380px' }}>
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}