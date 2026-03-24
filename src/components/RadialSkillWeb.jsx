import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
  { label: 'Python',       level: 90, color: 'var(--accent-primary)' },
  { label: 'React',        level: 82, color: 'var(--accent-secondary)' },
  { label: 'ML / AI',      level: 80, color: '#4ade80' },
  { label: 'Node.js',      level: 72, color: '#f59e0b' },
  { label: 'Cybersec',     level: 75, color: '#ef4444' },
  { label: 'SQL',          level: 68, color: 'var(--accent-secondary)' },
  { label: 'Docker',       level: 60, color: 'var(--accent-primary)' },
  { label: 'TypeScript',   level: 70, color: '#fbbf24' },
];

function polarToCart(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

export default function RadialSkillWeb() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const size   = 320;
  const cx     = size / 2;
  const cy     = size / 2;
  const maxR   = 120;
  const rings  = [25, 50, 75, 100];
  const n      = SKILLS.length;
  const step   = 360 / n;

  // Build polygon points
  const points = SKILLS.map((s, i) => {
    const r = visible ? (s.level / 100) * maxR : 0;
    return polarToCart(cx, cy, r, i * step);
  });
  const polyStr = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div className="terminal-label" style={{ marginBottom: 8 }}>// SKILL_WEB_DIAGRAM</div>

      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
        {/* Ring grid lines */}
        {rings.map(pct => {
          const r = (pct / 100) * maxR;
          const rPts = SKILLS.map((_, i) => polarToCart(cx, cy, r, i * step));
          const rStr = rPts.map(p => `${p.x},${p.y}`).join(' ');
          return (
            <polygon
              key={pct}
              points={rStr}
              fill="none"
              stroke="var(--accent-subtle)"
              strokeWidth="1"
            />
          );
        })}

        {/* Spoke lines */}
        {SKILLS.map((_, i) => {
          const outer = polarToCart(cx, cy, maxR + 10, i * step);
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={outer.x} y2={outer.y}
              stroke="var(--accent-subtle)"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled polygon */}
        <motion.polygon
          points={polyStr}
          fill="var(--accent-subtle)"
          stroke="var(--accent-border)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.34, 1.1, 0.64, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Dots on each vertex */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill={SKILLS[i].color}
            style={{ filter: `drop-shadow(0 0 4px ${SKILLS[i].color})` }}
            initial={{ opacity: 0, r: 0 }}
            animate={visible ? { opacity: 1, r: 4 } : {}}
            transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
          />
        ))}

        {/* Labels */}
        {SKILLS.map((s, i) => {
          const labelPos = polarToCart(cx, cy, maxR + 28, i * step);
          const anchor =
            labelPos.x < cx - 10 ? 'end'
            : labelPos.x > cx + 10 ? 'start'
            : 'middle';
          return (
            <text
              key={i}
              x={labelPos.x}
              y={labelPos.y + 4}
              textAnchor={anchor}
              fill={s.color}
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="500"
              style={{ filter: `drop-shadow(0 0 3px ${s.color}88)` }}
            >
              {s.label}
            </text>
          );
        })}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={4} fill="var(--accent-primary)"
          style={{ filter: 'drop-shadow(0 0 6px var(--accent-glow))' }} />
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', maxWidth: 320 }}>
        {SKILLS.map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, boxShadow: `0 0 4px ${s.color}` }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)' }}>
              {s.label} {s.level}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
