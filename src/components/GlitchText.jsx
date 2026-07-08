/* Reusable glitch text heading */
export default function GlitchText({ text, /* eslint-disable-next-line no-unused-vars */ /* eslint-disable-next-line no-unused-vars */ as: Tag = 'h1', className = '', style = {} }) {
  return (
    <Tag
      className={`relative inline-block ${className}`}
      style={{ ...style }}
      data-text={text}
    >
      {/* Main text */}
      <span style={{ position: 'relative', zIndex: 1 }}>{text}</span>

      {/* Glitch layer 1 */}
      <span
        aria-hidden="true"
        style={{
          content: `"${text}"`,
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          color: 'var(--accent-cyan)',
          animation: 'glitch 4s infinite',
          animationDelay: '0s',
          opacity: 0.8,
        }}
      >
        {text}
      </span>

      {/* Glitch layer 2 */}
      <span
        aria-hidden="true"
        style={{
          content: `"${text}"`,
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          color: 'var(--accent-violet)',
          animation: 'glitch-2 4s infinite',
          animationDelay: '0.1s',
          opacity: 0.6,
        }}
      >
        {text}
      </span>
    </Tag>
  );
}
