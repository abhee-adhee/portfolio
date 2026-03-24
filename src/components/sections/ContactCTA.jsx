import { motion } from 'framer-motion';
import { showTransmissionToast } from '../Toast';

const GH_URL = 'https://github.com/abhee-adhee';
const LI_URL = 'https://www.linkedin.com/in/abinav-aaditya-86a952305/';
const EMAIL = 'youremail@example.com';

export default function ContactCTA() {
  return (
    <section
      id="contact-cta"
      style={{
        padding: '5rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, var(--accent-subtle) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="terminal-label" style={{ marginBottom: 16 }}>
          &gt; INITIATING_TRANSMISSION...
        </div>
        <h2
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}
        >
          INITIATE_TRANSMISSION
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            marginBottom: '2.5rem',
            maxWidth: 480,
            margin: '0 auto 2.5rem',
          }}
        >
          I'm open to internships, hackathon collabs, and interesting projects.
          Let's build something.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <a
            href={`mailto:${EMAIL}`}
            onClick={() => showTransmissionToast()}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: '#0a0a0f',
              background: 'var(--accent-primary)',
              padding: '12px 28px',
              borderRadius: 3,
              textDecoration: 'none',
              fontWeight: 700,
              boxShadow: 'var(--accent-glow)',
            }}
          >
            [ SEND_MESSAGE ]
          </a>
          <a
            href={GH_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--text-secondary)',
              background: 'transparent',
              border: '1px solid var(--border-color)',
              padding: '12px 24px',
              borderRadius: 3,
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            [ GITHUB ]
          </a>
          <a
            href={LI_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--text-secondary)',
              background: 'transparent',
              border: '1px solid var(--border-color)',
              padding: '12px 24px',
              borderRadius: 3,
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            [ LINKEDIN ]
          </a>
        </div>

      </motion.div>
    </section>
  );
}
