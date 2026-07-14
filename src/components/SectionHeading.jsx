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
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const Wrapper = animate ? motion.div : 'div';
  const Item   = animate ? motion.div : 'div';

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
        marginBottom: '3.5rem',
        width: '100%',
      }}
    >
      {/* Small Identifier */}
      <Item
        variants={itemVariants}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.25em',
          color: 'rgba(168, 85, 247, 0.55)',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>
          // {pageLabel}
        </div>
        <div style={{
          height: '1px',
          width: '60px',
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          opacity: 0.45,
          flexShrink: 0,
        }} />
      </Item>

      {/* Large Title */}
      <Item
        variants={itemVariants}
        style={{
          fontFamily: 'var(--font-heading), Rajdhani, sans-serif',
          fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.4rem',
          marginBottom: '0.75rem',
        }}
      >
        {title}
        {cursor && (
          <span style={{
            animation: 'blinkCursor 1.2s step-end infinite',
            color: accent,
            fontWeight: 300,
            marginLeft: '0.1rem',
          }}>_</span>
        )}
      </Item>

      {/* Subtitle */}
      {subtitle && (
        <Item
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-heading), Rajdhani, sans-serif',
            fontSize: 'clamp(0.95rem, 2.2vw, 1.3rem)',
            fontWeight: 500,
            color: 'rgba(168, 85, 247, 0.75)',
            letterSpacing: '0.015em',
            maxWidth: '640px',
            lineHeight: 1.5,
            marginBottom: '1.75rem',
          }}
        >
          {subtitle}
        </Item>
      )}

      {/* Thin animated accent rule */}
      <Item
        variants={itemVariants}
        style={{
          width: '100%',
          height: '1px',
          background: `linear-gradient(90deg, ${accent}55, transparent 60%)`,
          marginBottom: '2rem',
          opacity: 0.4,
        }}
      />

      {/* Meta Information — max 2 lines */}
      {metaLines && metaLines.length > 0 && (
        <Item
          variants={itemVariants}
          style={{
            display: 'flex',
            justifyContent: isCenter ? 'center' : 'flex-start',
            gap: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {metaLines.map((line, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.18em',
                color: 'rgba(255, 255, 255, 0.3)',
                textTransform: 'uppercase',
              }}>
                {line.label}
              </div>
              {line.value && (
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.04em',
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: 500,
                }}>
                  {line.value}
                </div>
              )}
            </div>
          ))}
        </Item>
      )}

      <style>{`
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </Wrapper>
  );
}
