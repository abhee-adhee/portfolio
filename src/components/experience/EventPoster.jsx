import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

export default function EventPoster({
  posterUrl,
  title,
  type,
  id,
}) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const savedPoster = typeof window !== 'undefined' ? localStorage.getItem(`event_poster_${id}`) : null;
  const activePosterUrl = posterUrl || savedPoster;
  const hasImage = Boolean(activePosterUrl && !imgError);

  const renderVectorGraphic = () => {
    if (id === 'EVENT_01') {
      // The Inside Job: Radar / Investigation Crosshairs in vermilion & carbon
      return (
        <svg viewBox="0 0 400 240" fill="none" className="w-full h-full" style={{ opacity: 0.7 }}>
          <circle cx="200" cy="120" r="85" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="200" cy="120" r="55" stroke="var(--border-subtle)" strokeWidth="1" />
          <circle cx="200" cy="120" r="25" stroke="var(--accent-primary)" strokeWidth="1.5" />
          <line x1="80" y1="120" x2="320" y2="120" stroke="var(--border-subtle)" strokeWidth="1" />
          <line x1="200" y1="20" x2="200" y2="220" stroke="var(--border-subtle)" strokeWidth="1" />
          <circle cx="235" cy="85" r="4" fill="var(--accent-primary)" />
          <circle cx="165" cy="140" r="3" fill="var(--text-muted)" />
          <path d="M 40 190 L 130 190 L 150 170 L 250 170 L 270 190 L 360 190" stroke="var(--border-strong)" strokeWidth="1" />
        </svg>
      );
    }

    if (id === 'EVENT_02') {
      // Ghost In The Machine: Nexus Dynamics Architecture Network
      return (
        <svg viewBox="0 0 400 240" fill="none" className="w-full h-full" style={{ opacity: 0.7 }}>
          <polygon points="200,45 260,80 260,160 200,195 140,160 140,80" stroke="var(--border-strong)" strokeWidth="1.5" fill="none" />
          <polygon points="200,68 242,92 242,148 200,172 158,148 158,92" stroke="var(--accent-primary)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <circle cx="200" cy="120" r="14" fill="var(--surface-muted)" stroke="var(--accent-primary)" strokeWidth="1.5" />
          <circle cx="200" cy="120" r="5" fill="var(--accent-primary)" />
          <line x1="200" y1="106" x2="200" y2="68" stroke="var(--border-strong)" strokeWidth="1" />
          <line x1="212" y1="126" x2="242" y2="148" stroke="var(--border-strong)" strokeWidth="1" />
          <line x1="188" y1="126" x2="158" y2="148" stroke="var(--border-strong)" strokeWidth="1" />
          <circle cx="260" cy="80" r="3.5" fill="var(--text-primary)" />
          <circle cx="140" cy="80" r="3.5" fill="var(--text-primary)" />
          <circle cx="200" cy="195" r="3.5" fill="var(--accent-primary)" />
        </svg>
      );
    }

    // Default / CyberStart Workshop
    return (
      <svg viewBox="0 0 400 240" fill="none" className="w-full h-full" style={{ opacity: 0.7 }}>
        <rect x="70" y="45" width="260" height="150" rx="3" stroke="var(--border-strong)" strokeWidth="1" fill="var(--surface-primary)" />
        <line x1="70" y1="72" x2="330" y2="72" stroke="var(--border-subtle)" strokeWidth="1" />
        <circle cx="86" cy="58" r="3" fill="var(--border-strong)" />
        <circle cx="98" cy="58" r="3" fill="var(--border-strong)" />
        <circle cx="110" cy="58" r="3" fill="var(--border-strong)" />
        <text x="86" y="98" fill="var(--accent-primary)" fontFamily="monospace" fontSize="10">$ ./init-workshop.sh</text>
        <text x="86" y="118" fill="var(--text-secondary)" fontFamily="monospace" fontSize="9">[+] Loading Linux Lab Environment...</text>
        <text x="86" y="134" fill="var(--text-secondary)" fontFamily="monospace" fontSize="9">[+] Setting up CTF framework...</text>
        <text x="86" y="150" fill="var(--text-muted)" fontFamily="monospace" fontSize="9">[OK] Ready for participants</text>
      </svg>
    );
  };

  return (
    <>
      <div
        onClick={() => {
          if (hasImage) setIsLightboxOpen(true);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: hasImage ? '3 / 4.2' : '16 / 10',
          borderRadius: '4px',
          overflow: 'hidden',
          background: 'var(--surface-muted)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: hasImage ? 'zoom-in' : 'default',
        }}
      >
        {hasImage ? (
          <>
            <img
              src={activePosterUrl}
              alt={`${title} Official Poster`}
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 0.4s ease',
              }}
            />
            {/* Hover expand hint */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.75) 100%)',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.25s ease',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '0.75rem',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  padding: '4px 8px',
                  borderRadius: '3px',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <Maximize2 size={12} />
                <span>Click to expand poster</span>
              </div>
            </div>
          </>
        ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.25rem',
            overflow: 'hidden',
          }}
        >
          {/* Centered Graphic */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            {renderVectorGraphic()}
          </div>

          {/* Top Bar */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
            }}
          >
            <span>{id} // ARCHIVE</span>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>POSTER ARTIFACT</span>
          </div>

          {/* Center Title Echo */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
                marginBottom: 2,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--accent-primary)',
              }}
            >
              {type}
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--text-muted)',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '0.4rem',
            }}
          >
            <span>SPECIFICATION</span>
            <span>16:10 EXHIBIT</span>
          </div>
        </div>
      )}
    </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0, 0, 0, 0.88)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              cursor: 'zoom-out',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <button
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close poster preview"
                style={{
                  position: 'absolute',
                  top: '-2.5rem',
                  right: 0,
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
              >
                <X size={18} />
              </button>

              <img
                src={activePosterUrl}
                alt={`${title} Official Poster`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  borderRadius: '4px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
              <div
                style={{
                  marginTop: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textAlign: 'center',
                }}
              >
                {title} &mdash; {type}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
