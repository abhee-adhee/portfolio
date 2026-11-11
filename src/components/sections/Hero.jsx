import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useSound } from '../../context/SoundContext';

export default function Hero() {
  const { data } = usePortfolioData();
  const { playSound } = useSound();
  const heroData = data.hero || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '86vh',
        display: 'flex',
        alignItems: 'center',
        padding: '5rem var(--page-gutter) 4.5rem',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column — Concrete Introduction */}
          <div style={{ maxWidth: '720px' }}>
            {/* Availability Pill */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.35rem 0.8rem',
                border: '1px solid var(--border-subtle)',
                background: 'var(--surface-muted)',
                borderRadius: '999px',
                marginBottom: '1.75rem',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.03em',
                  color: 'var(--text-secondary)',
                }}
              >
                Chennai, India &bull; Computer Science &bull; Available for 2026 Internships
              </span>
            </motion.div>

            {/* Author Byline */}
            <motion.div
              variants={itemVariants}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.92rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '0.75rem',
              }}
            >
              Abinav Aaditya &mdash; Security Researcher &amp; Developer
            </motion.div>

            {/* Typographic Statement */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                fontSize: 'clamp(2.4rem, 5.2vw, 4rem)',
                fontWeight: 400,
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
              }}
            >
              Engineering network intrusion detection, auditing web security, and building{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-display), Georgia, serif',
                  color: 'var(--accent-primary)',
                }}
              >
                resilient software
              </em>
              .
            </motion.h1>

            {/* Concrete Narrative Paragraph */}
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.98rem, 1.5vw, 1.12rem)',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                marginBottom: '2.25rem',
                maxWidth: '640px',
              }}
            >
              I am a Computer Science student at Saveetha Engineering College focusing on practical
              cybersecurity and software engineering. My work centers on raw network packet parsing
              with Python and Scapy, web application penetration testing (OWASP Top 10), and applied
              machine learning systems for accessibility and gesture authentication.
            </motion.p>

            {/* Direct Action Links */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <Link
                to="/projects"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.6rem',
                  background: 'var(--accent-primary)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  transition: 'background 0.15s ease',
                }}
              >
                <span>View Selected Projects</span>
                <span>&rarr;</span>
              </Link>

              <a
                href="/resume.pdf"
                download
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.5rem',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-strong)',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  borderRadius: '2px',
                  textDecoration: 'none',
                }}
              >
                <span>Download Resume (PDF)</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>&darr;</span>
              </a>

              <Link
                to="/about"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                style={{
                  marginLeft: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border-strong)',
                  paddingBottom: '2px',
                }}
              >
                Read Biography &rarr;
              </Link>
            </motion.div>
          </div>

          {/* Right Column — Evidence-Led Technical Dossier */}
          <motion.div
            variants={itemVariants}
            style={{
              background: 'var(--surface-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2px',
              padding: '2rem',
              boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '1.25rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                Technical Evidence &amp; Practical Work
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--accent-primary)',
                  fontWeight: 600,
                }}
              >
                01 &mdash; 03
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Evidence 01 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--accent-primary)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  01 / Network Security &amp; IDS
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  Sentinel IDS &bull; Built in Python &amp; Scapy
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                  }}
                >
                  Real-time raw packet capture on promiscuous interfaces, custom SYN flood &amp;
                  port probe detection algorithms, and SQLite forensic alert logging.
                </span>
              </div>

              <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

              {/* Evidence 02 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--accent-primary)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  02 / Web Penetration Testing
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  BugBustersLab &bull; Security Intern
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                  }}
                >
                  Conducted manual reconnaissance, parameter fuzzing, and vulnerability validation
                  across the OWASP Top 10 with Burp Suite and Nmap.
                </span>
              </div>

              <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

              {/* Evidence 03 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--accent-primary)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  03 / Applied AI &amp; Hackathons
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  VoiceForAll &bull; IBM Z Datathon 2025
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                  }}
                >
                  Built accessibility barrier reporting with TextBlob NLP sentiment urgency analysis
                  and interactive geographic mapping for NGOs and policymakers.
                </span>
              </div>
            </div>

            {/* Primary Tooling Strip */}
            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                }}
              >
                CORE INSTRUMENTS
              </span>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['Python', 'Scapy', 'Burp Suite', 'React', 'Linux'].map((tag) => (
                  <span
                    key={tag}
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
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}