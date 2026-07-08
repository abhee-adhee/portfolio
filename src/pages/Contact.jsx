import { motion } from 'framer-motion';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import PageTransition from '../components/PageTransition';
import { showTransmissionToast } from '../components/Toast';
import BackButton from '../components/BackButton';
import { useSound } from '../context/SoundContext';
import GlitchText from '../components/GlitchText';

const EMAIL = 'abinavaaditya@gmail.com';
const SOCIALS = [
  { label: 'GITHUB', url: 'https://github.com/abhee-adhee' },
  { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/abinav-aaditya-86a952305/' },
];

export default function Contact() {
  const [input, setInput] = useState('');
  const { playSound } = useSound();

  return (
    <PageTransition>
      <Helmet>
        <title>Contact | ABINAV.SYS</title>
        <meta name="description" content="Get in touch with Abinav for internships, freelance work, or hackathon collaborations." />
      </Helmet>
      <div className="page-container">
        {/* Decorative elements */}
        <BackButton />
        {/* Split Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="contact-grid">

          {/* LEFT: Heading, Desc & CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <motion.div
              initial={{ opacity: 0, filter: 'contrast(250%) brightness(150%) blur(4px) hue-rotate(90deg)', x: -40, skewX: -20 }}
              animate={{ opacity: 1, filter: 'contrast(100%) brightness(100%) blur(0px) hue-rotate(0deg)', x: 0, skewX: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="terminal-label" style={{ marginBottom: 12 }}>// OPEN_CHANNEL</div>
              <GlitchText
                text="Get in Touch"
                as="h1"
                style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', letterSpacing: '0.05em', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.1 }}
              />
              <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 480 }}>
                I'm currently open to internships, freelance work, and hackathon collabs.
                If you have something interesting, let's talk.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
            >
              <a
                href={`mailto:${EMAIL}`}
                className="btn-interactive btn-filled"
                onClick={() => { playSound('click'); playSound('success'); showTransmissionToast(); }}
                onMouseEnter={() => playSound('hover')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  letterSpacing: '0.08em',
                  color: '#0a0a0f',
                  background: 'var(--accent-primary)',
                  padding: '16px 32px',
                  borderRadius: 4,
                  textDecoration: 'none',
                  fontWeight: 700,
                  boxShadow: 'var(--accent-glow)',
                }}
              >
                ✉ SEND_TRANSMISSION
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Socials & Terminal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              {SOCIALS.map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-interactive icon-link"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    color: 'var(--text-secondary)',
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    padding: '12px 24px',
                    borderRadius: 3,
                    textDecoration: 'none',
                  }}
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => playSound('click')}
                >
                  [ {label} ] →
                </a>
              ))}
            </motion.div>

            {/* Aesthetic terminal input widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card"
              style={{ padding: 0, borderRadius: 8, overflow: 'hidden' }}
            >
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '12px 16px', background: 'rgba(0,0,0,0.3)',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: 8, letterSpacing: '0.1em' }}>
                  SECURE_CHANNEL — message.sh
                </span>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                    color: 'var(--text-muted)', marginBottom: 16, letterSpacing: '0.08em', lineHeight: 1.6
                  }}
                >
                  &gt; ESTABLISHING_SECURE_CHANNEL... OK<br />
                  &gt; TYPE YOUR MESSAGE:
                </div>
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 16px', background: 'rgba(0,0,0,0.4)',
                    borderRadius: 4, border: '1px solid var(--accent-border)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-primary)', flexShrink: 0 }}>$</span>
                  <input
                    value={input}
                    onChange={e => { setInput(e.target.value); playSound('keyTick'); }}
                    placeholder="// message content..."
                    style={{
                      background: 'transparent', border: 'none', outline: 'none',
                      fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                      color: 'var(--text-secondary)', flex: 1, cursor: 'none',
                    }}
                  />
                  <span className="blink" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>█</span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    color: 'var(--text-muted)', marginTop: 14, letterSpacing: '0.08em',
                  }}
                >
                  // This is an aesthetic widget — to actually reach me, use the button above.
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </PageTransition>
  );
}
