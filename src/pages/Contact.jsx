import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

import PageTransition from '../components/PageTransition';
import BackButton from '../components/BackButton';
import SectionHeading from '../components/SectionHeading';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { useSound } from '../context/SoundContext';

export default function Contact() {
  const { data } = usePortfolioData();
  const { playSound } = useSound();
  const { email = 'abinavaaditya@gmail.com', github, linkedin } = data.contact || {};
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    playSound('click');
    setTimeout(() => setCopied(false), 2500);
  };

  const topics = [
    {
      num: '01',
      title: 'Security Engineering & Internships',
      desc: 'Exploring summer & fall 2026 internships in offensive security, vulnerability assessment, and threat detection.',
    },
    {
      num: '02',
      title: 'Network Defense & Systems Architecture',
      desc: 'Collaborations around packet inspection, custom intrusion detection rules, and security operations center tooling.',
    },
    {
      num: '03',
      title: 'Applied Machine Learning & Hackathons',
      desc: 'Interdisciplinary hackathon initiatives spanning computer vision verification, accessibility tools, and NLP.',
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Contact &mdash; Abinav Aaditya</title>
        <meta
          name="description"
          content="Get in touch with Abinav Aaditya for cybersecurity internships, software engineering opportunities, or collaborative research."
        />
        <meta property="og:title" content="Contact — Abinav Aaditya" />
        <meta
          property="og:description"
          content="Get in touch with Abinav Aaditya for cybersecurity internships and software engineering opportunities."
        />
      </Helmet>

      <div
        className="page-container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '2.5rem var(--page-gutter) 6rem',
        }}
      >
        <BackButton />

        <SectionHeading
          pageLabel="Correspondence // Contact"
          title="Let's discuss systems, opportunities, or research."
          subtitle="Currently based in Chennai, India (IST / UTC+5:30) and available for 2026 security engineering and software development internships."
        />

        {/* Two-Column Editorial Contact Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* LEFT: Direct Communication Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Primary Email Card */}
            <div
              style={{
                padding: '2rem',
                background: 'var(--surface-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--accent-primary)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Direct Email Dispatch
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginTop: '0.35rem',
                    marginBottom: 0,
                  }}
                >
                  {email}
                </h3>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Direct email is the most reliable channel for project inquiries, recruitment, or research
                questions. I typically reply within 24 hours.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href={`mailto:${email}`}
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => playSound('click')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.75rem 1.4rem',
                    background: 'var(--accent-primary)',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.86rem',
                    borderRadius: '2px',
                    textDecoration: 'none',
                  }}
                >
                  <span>Compose Email</span>
                  <span>&rarr;</span>
                </a>

                <button
                  onClick={handleCopy}
                  onMouseEnter={() => playSound('hover')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.75rem 1.25rem',
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-strong)',
                    fontSize: '0.86rem',
                    fontWeight: 500,
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                >
                  <span>{copied ? '✓ Copied to Clipboard' : 'Copy Address'}</span>
                </button>
              </div>
            </div>

            {/* Social & Code Profiles */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Network &amp; Code Repositories
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => playSound('hover')}
                    style={{
                      padding: '1rem 1.25rem',
                      background: 'var(--surface-muted)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '2px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <span>LinkedIn &mdash; Professional Profile</span>
                    <span style={{ color: 'var(--text-muted)' }}>&nearr;</span>
                  </a>
                )}

                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => playSound('hover')}
                    style={{
                      padding: '1rem 1.25rem',
                      background: 'var(--surface-muted)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '2px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <span>GitHub &mdash; @abhee-adhee</span>
                    <span style={{ color: 'var(--text-muted)' }}>&nearr;</span>
                  </a>
                )}

                <a
                  href="/resume.pdf"
                  download
                  onMouseEnter={() => playSound('hover')}
                  style={{
                    padding: '1rem 1.25rem',
                    background: 'var(--surface-muted)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '2px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                  }}
                >
                  <span>Curriculum Vitae (PDF)</span>
                  <span style={{ color: 'var(--text-muted)' }}>&darr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Discussion Areas & Location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              Primary Areas of Collaboration
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {topics.map((t) => (
                <div
                  key={t.num}
                  style={{
                    padding: '1.5rem',
                    background: 'var(--surface-primary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 600,
                        fontSize: '0.98rem',
                        color: 'var(--text-primary)',
                        margin: 0,
                      }}
                    >
                      {t.title}
                    </h4>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      {t.num}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.86rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Geographical & Academic Base */}
            <div
              style={{
                padding: '1.25rem',
                background: 'var(--surface-muted)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              <span>CHENNAI, TAMIL NADU, INDIA</span>
              <span>UTC+5:30 (IST)</span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
