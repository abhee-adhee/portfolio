import React from 'react';

export default function SectionDivider({ label }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 var(--page-gutter)',
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        opacity: 0.6,
      }}
    >
      <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            userSelect: 'none',
          }}
        >
          {label}
        </span>
      )}
      <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
    </div>
  );
}
