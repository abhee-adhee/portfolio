import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({
  pageLabel,
  title,
  subtitle,
  metaLines = [],
  accent = 'var(--accent-primary)',
  cursor = false,
  animate = true,
  align = 'left', // 'left' | 'center'
}) {
  const isCenter = align === 'center';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  const Wrapper = animate ? motion.div : 'div';
  const Item = animate ? motion.div : 'div';

  return (
    <Wrapper
      variants={animate ? containerVariants : undefined}
      initial={animate ? 'hidden' : undefined}
      whileInView={animate ? 'visible' : undefined}
      viewport={{ once: true, margin: '-10%' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCenter ? 'center' : 'flex-start',
        textAlign: isCenter ? 'center' : 'left',
        marginBottom: '2.5rem',
        width: '100%',
      }}
    >
      {/* Category / Section Eyebrow */}
      {pageLabel && (
        <Item
          variants={itemVariants}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              color: 'var(--accent-primary)',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {pageLabel.replace(/^\/\/\s*/, '')}
          </span>
          <span
            style={{
              display: 'inline-block',
              width: '28px',
              height: '1px',
              background: 'var(--border-strong)',
            }}
          />
        </Item>
      )}

      {/* Main Headline */}
      <Item
        variants={itemVariants}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.85rem, 3.8vw, 2.75rem)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          marginBottom: subtitle ? '0.75rem' : '1.5rem',
          maxWidth: '820px',
        }}
      >
        {title}
        {cursor && (
          <span
            style={{
              color: accent,
              fontWeight: 300,
              marginLeft: '0.2rem',
              animation: 'editorialPulse 1.8s ease-in-out infinite',
            }}
          >
            .
          </span>
        )}
      </Item>

      {/* Subtitle */}
      {subtitle && (
        <Item
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            letterSpacing: '-0.01em',
            maxWidth: '680px',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}
        >
          {subtitle}
        </Item>
      )}

      {/* Meta Information row if provided */}
      {metaLines && metaLines.length > 0 && (
        <Item
          variants={itemVariants}
          style={{
            display: 'flex',
            justifyContent: isCenter ? 'center' : 'flex-start',
            gap: '2.5rem',
            flexWrap: 'wrap',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            width: '100%',
          }}
        >
          {metaLines.map((line, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                {line.label}
              </div>
              {line.value && (
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                  }}
                >
                  {line.value}
                </div>
              )}
            </div>
          ))}
        </Item>
      )}

      <style>{`
        @keyframes editorialPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </Wrapper>
  );
}
