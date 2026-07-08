import { useState } from 'react';
import { motion,  AnimatePresence } from 'framer-motion';

const NODES = [
  { id: 'chennai', cx: 700, cy: 300, name: 'Chennai', country: 'IND', tz: 'IST', lat: 13, lng: 80 },
  { id: 'nyc', cx: 280, cy: 190, name: 'New York', country: 'USA', tz: 'EST', lat: 40, lng: -74 },
  { id: 'london', cx: 480, cy: 160, name: 'London', country: 'UK', tz: 'GMT', lat: 51, lng: -0.1 },
  { id: 'tokyo', cx: 880, cy: 200, name: 'Tokyo', country: 'JPN', tz: 'JST', lat: 35, lng: 139 },
  { id: 'sgp', cx: 760, cy: 320, name: 'Singapore', country: 'SGP', tz: 'SGT', lat: 1, lng: 103 },
  { id: 'syd', cx: 880, cy: 400, name: 'Sydney', country: 'AUS', tz: 'AEST', lat: -33, lng: 151 },
  { id: 'sf', cx: 160, cy: 200, name: 'San Francisco', country: 'USA', tz: 'PST', lat: 37, lng: -122 },
];

export default function WorldMap() {
  const [hovered, setHovered] = useState(null);
  const [activeArc, setActiveArc] = useState(null);

  const home = NODES[0]; // Chennai

  const handleNodeClick = (node) => {
    if (node.id === home.id) return;
    setActiveArc(node.id);
    setTimeout(() => setActiveArc(null), 3000);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 400 }}>
      {/* Container aspect ratio logic */}
      <svg viewBox="0 0 1000 500" style={{ width: '100%', height: '100%', display: 'block' }}>
        {/* Abstract grid wiring representing world map */}
        {[...Array(11)].map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} stroke="var(--grid-color)" strokeWidth="1" />
        ))}
        {[...Array(21)].map((_, i) => (
          <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="var(--grid-color)" strokeWidth="1" />
        ))}

        {/* Connection Arcs */}
        <AnimatePresence>
          {activeArc && (
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              d={`M ${NODES.find(n => n.id === activeArc).cx} ${NODES.find(n => n.id === activeArc).cy} Q 500 100 ${home.cx} ${home.cy}`}
              fill="none"
              stroke="var(--accent-primary)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}
        </AnimatePresence>

        {/* City Nodes */}
        {NODES.map(node => (
          <g key={node.id}
             onMouseEnter={() => setHovered(node)}
             onMouseLeave={() => setHovered(null)}
             onClick={() => handleNodeClick(node)}
             style={{ cursor: node.id === home.id ? 'default' : 'pointer' }}
          >
            {/* Pulsing home base ring */}
            {node.id === home.id && (
              <circle cx={node.cx} cy={node.cy} r="16" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" style={{ transformOrigin: `${node.cx}px ${node.cy}px` }} className="map-pulse-ring" />
            )}
            
            <circle cx={node.cx} cy={node.cy} r={node.id === home.id ? "5" : "3"} 
              fill={node.id === home.id ? "var(--accent-primary)" : "var(--accent-secondary)"}
              style={{
                filter: hovered?.id === node.id || node.id === home.id ? 'drop-shadow(0 0 8px var(--accent-primary))' : 'none',
                transition: 'all 0.3s'
              }}
            />
            
            {/* Minimal SVG label */}
            <text x={node.cx + 8} y={node.cy - 8} fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.05em" style={{ opacity: hovered?.id === node.id ? 0 : 0.8, transition: 'opacity 0.2s' }}>
              {node.name.substring(0, 3).toUpperCase()}
            </text>
          </g>
        ))}
      </svg>

      {/* HTML absolute positioned Tooltip Card */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              position: 'absolute',
              left: `${(hovered.cx / 1000) * 100}%`,
              top: `calc(${(hovered.cy / 500) * 100}% - 90px)`,
              transform: 'translateX(-50%)',
              background: 'rgba(5,5,12,0.95)',
              border: '1px solid var(--accent-border)',
              borderRadius: 4, padding: '12px 14px',
              fontFamily: 'var(--font-mono)', minWidth: 180,
              boxShadow: '0 0 30px var(--accent-glow)',
              pointerEvents: 'none', zIndex: 50,
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: 4, letterSpacing: '0.05em' }}>
              {hovered.name.toUpperCase()}, {hovered.country}
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.05em' }}>
              TIMEZONE: {hovered.tz}  |  LAT: {hovered.lat}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'blink 1.5s infinite' }} />
              <span style={{ fontSize: '0.6rem', color: '#4ade80', letterSpacing: '0.1em' }}>
                {/* eslint-disable-next-line react-hooks/purity */}
                {/* eslint-disable-next-line react-hooks/purity */}
                ACTIVE  |  {Math.floor(Math.random() * 80) + 20}ms
              </span>
            </div>
            {hovered.id !== home.id && (
              <div style={{ marginTop: 10, paddingTop: 6, borderTop: '1px solid var(--accent-subtle)', fontSize: '0.55rem', color: 'var(--accent-primary)', textAlign: 'center', opacity: 0.7, letterSpacing: '0.1em' }}>
                [ CLICK NODE TO PING ]
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes map-pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        .map-pulse-ring {
          animation: map-pulse-ring 2.5s cubic-bezier(0.21, 0.53, 0.56, 1) infinite;
        }
      `}</style>
    </div>
  );
}
