import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useSound } from '../../context/SoundContext';

export default function FeaturedProjects() {
  const { data } = usePortfolioData();
  const { playSound } = useSound();

  // Primary flagship
  const sentinel = data.projects?.find((p) => p.id === 'sentinel-ids') || {
    id: 'sentinel-ids',
    title: 'Sentinel IDS',
    subtitle: 'Python Network Intrusion Detection System',
    description:
      'A modular Network Intrusion Detection System built from scratch for real-time packet inspection, attack detection, offline PCAP analysis, and SOC-style monitoring.',
    stack: ['Python', 'Scapy', 'SQLite', 'Matplotlib', 'Network Protocols'],
    repository: 'https://github.com/abhee-adhee/sentinel-ids',
  };

  // Secondary featured set (excluding sidequests)
  const secondaryProjects = (data.projects || [])
    .filter((p) => ['voice-for-all', 'ai-recruiter-copilot', 'mini-soc', 'edumate'].includes(p.id))
    .slice(0, 4);

  return (
    <section
      id="featured-projects"
      style={{
        padding: '5rem var(--page-gutter)',
        maxWidth: '1240px',
        margin: '0 auto',
      }}
    >
      <SectionHeading
        pageLabel="Selected Systems // Evidence"
        title="Software engineered for resilience, visibility, and impact."
        subtitle="Intrusion detection engines, accessibility reporting platforms, and applied machine learning tools."
      />

      {/* Flagship Monograph: Sentinel IDS */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        style={{
          border: '1px solid var(--border-subtle)',
          background: 'var(--surface-primary)',
          borderRadius: '2px',
          marginBottom: '2.5rem',
          overflow: 'hidden',
        }}
      >
        {/* Monograph Top Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.75rem',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--surface-muted)',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                letterSpacing: '0.08em',
              }}
            >
              PRIMARY FLAGSHIP SYSTEM
            </span>
            <span style={{ color: 'var(--border-strong)' }}>&bull;</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}
            >
              Network Defense &bull; Raw Sockets
            </span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)',
            }}
          >
            Python 3 &bull; Scapy &bull; SQLite &bull; Multithreaded Capture
          </div>
        </div>

        {/* Monograph Body Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            padding: '2.25rem 1.75rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Premise, Motivation & Personal Contributions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display), Georgia, serif',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  lineHeight: 1.15,
                  marginBottom: '0.4rem',
                }}
              >
                {sentinel.title}
              </h3>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  color: 'var(--accent-primary)',
                  fontWeight: 500,
                }}
              >
                {sentinel.subtitle}
              </div>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              <strong>What it is:</strong> A Python-based Network Intrusion Detection System built
              completely from scratch to capture raw packets on promiscuous network interfaces, decode
              protocols across layers 2 through 4, and detect attack signatures in real time without
              third-party proprietary black boxes.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              <strong>Why I built it:</strong> To bridge theoretical network security concepts with
              real-world socket programming and SOC workflows. Writing custom parsers for Ethernet, IP,
              and TCP headers gave me a deep understanding of protocol evasion, TCP handshake state
              tracking, and packet fragmentation.
            </p>

            {/* Architecture Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '0.2rem',
                  }}
                >
                  Capture Pipeline
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                  }}
                >
                  Scapy Packet Ingestion
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '0.2rem',
                  }}
                >
                  Signature Engine
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                  }}
                >
                  SYN Flood &amp; Port Scan Detection
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '0.2rem',
                  }}
                >
                  Storage &amp; Replay
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                  }}
                >
                  SQLite Ledger &bull; PCAP Analysis
                </div>
              </div>
            </div>

            {/* Stack Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
              {(sentinel.stack || []).map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.55rem',
                    background: 'var(--surface-muted)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '2px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <Link
                to={`/projects/${sentinel.id}`}
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.75rem 1.5rem',
                  background: 'var(--accent-primary)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  borderRadius: '2px',
                  textDecoration: 'none',
                }}
              >
                <span>Read Full Case Study</span>
                <span>&rarr;</span>
              </Link>

              {sentinel.repository && (
                <a
                  href={sentinel.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '2px',
                  }}
                >
                  Inspect Source on GitHub &nearr;
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Technical Blueprint & Engineering Evidence */}
          <div
            style={{
              background: 'var(--surface-muted)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2px',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              System Architecture &amp; Mechanism
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--accent-primary)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.25rem',
                    fontWeight: 600,
                  }}
                >
                  01 / Live Packet Parsing Pipeline
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.86rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Uses Scapy to sniff raw link-layer frames, extract source and destination IP/ports,
                  TCP flags (SYN, ACK, FIN, RST), and window sizes through a producer-consumer thread queue.
                </p>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--accent-primary)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.25rem',
                    fontWeight: 600,
                  }}
                >
                  02 / Stateful Heuristics
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.86rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Tracks incomplete 3-way handshakes to flag SYN flood volumetric thresholds, and aggregates
                  rapid multi-port scans from single hosts using time-bucketed sliding windows.
                </p>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--accent-primary)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.25rem',
                    fontWeight: 600,
                  }}
                >
                  03 / Forensic Incident Ledger
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.86rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Saves structured alert records with packet timestamps, threat classifications, and
                  payload hashes to SQLite. Supports offline playback of PCAP dump files for forensic post-mortems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Secondary Works: Structured Asymmetric Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        {secondaryProjects.map((p, idx) => (
          <article
            key={p.id}
            style={{
              background: 'var(--surface-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2px',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
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
                    fontSize: '0.68rem',
                    color: 'var(--accent-primary)',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                  }}
                >
                  {p.tags?.[0] || 'ENGINEERING'}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {p.status === 'IN_PROGRESS' ? 'In Progress' : 'Deployed'}
                </span>
              </div>

              <h4
                style={{
                  fontFamily: 'var(--font-display), Georgia, serif',
                  fontSize: '1.35rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  lineHeight: 1.25,
                  marginBottom: '0.35rem',
                }}
              >
                {p.title}
              </h4>

              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.85rem',
                }}
              >
                {p.subtitle}
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.86rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '1.25rem',
                }}
              >
                {p.shortDesc || p.description}
              </p>
            </div>

            <div>
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
                {(p.stack || []).slice(0, 4).map((tech) => (
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

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Link
                  to={`/projects/${p.id}`}
                  onMouseEnter={() => playSound('hover')}
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
                  <span>View Case Study</span>
                  <span>&rarr;</span>
                </Link>

                {p.repository && (
                  <a
                    href={p.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                    }}
                  >
                    GitHub &nearr;
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Navigation Footer to Full Catalog */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1.5rem 0',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
          }}
        >
          Archive includes flagship systems, hackathon platforms &amp; sidequest prototypes.
        </div>

        <Link
          to="/projects"
          onMouseEnter={() => playSound('hover')}
          onClick={() => playSound('click')}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: '0.88rem',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            border: '1px solid var(--border-strong)',
            borderRadius: '2px',
          }}
        >
          <span>Explore All Projects &amp; Sidequests</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}