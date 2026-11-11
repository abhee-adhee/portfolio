import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useSound } from '../../context/SoundContext';

export default function ContactCTA() {
  const { data } = usePortfolioData();
  const { playSound } = useSound();
  const { email, github, linkedin } = data.contact || {};
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      playSound('click');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="contact-cta"
      style={{
        padding: '5rem var(--page-gutter) 6rem',
        maxWidth: '1240px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          border: '1px solid var(--border-subtle)',
          background: 'var(--surface-primary)',
          borderRadius: '2px',
          padding: '3.5rem 2.5rem',
        }}
      >
        <SectionHeading
          pageLabel="Dialogue // Inquiries"
          title="Let's discuss systems, opportunities, or research."
          subtitle="Currently open to 2026 security engineering and software development internships, as well as collaborative research and technical hackathons."
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          {/* Email button / copy */}
          <a
            href={`mailto:${email}`}
            onMouseEnter={() => playSound('hover')}
            onClick={() => playSound('click')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              background: 'var(--accent-primary)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.9rem',
              borderRadius: '2px',
              textDecoration: 'none',
            }}
          >
            <span>Send Direct Email</span>
            <span>&rarr;</span>
          </a>

          <button
            onClick={copyEmail}
            onMouseEnter={() => playSound('hover')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.85rem 1.4rem',
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-strong)',
              fontWeight: 500,
              fontSize: '0.9rem',
              borderRadius: '2px',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              {copied ? '✓ Copied Address' : email || 'Copy Address'}
            </span>
          </button>

          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound('hover')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                padding: '0.5rem',
              }}
            >
              LinkedIn &nearr;
            </a>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound('hover')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                padding: '0.5rem',
              }}
            >
              GitHub &nearr;
            </a>
          )}

          <Link
            to="/contact"
            onMouseEnter={() => playSound('hover')}
            onClick={() => playSound('click')}
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            Detailed Contact Directory &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
