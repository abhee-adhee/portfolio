import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import EventPoster from './EventPoster';
import { useSound } from '../../context/SoundContext';

function EventCard({ event, index }) {
  const { playSound } = useSound();
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const hasMultipleParagraphs = event.description && event.description.length > 2;

  return (
    <article
      onMouseEnter={() => {
        setHovered(true);
        playSound('hover');
      }}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '2px',
        padding: '2rem',
        marginBottom: '2.5rem',
        background: 'var(--surface-primary)',
        border: '1px solid',
        borderColor: hovered ? 'var(--border-strong)' : 'var(--border-subtle)',
        transition: 'border-color 0.2s ease',
      }}
    >
      <div
        className="event-grid-split"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 360px) 1fr',
          gap: '2.5rem',
          alignItems: 'start',
        }}
      >
        {/* Left: Poster + Key Specs */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <EventPoster
            posterUrl={event.posterUrl}
            title={event.title}
            type={event.type}
            id={event.id}
          />

          {event.meta && event.meta.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                padding: '1rem',
                borderRadius: '2px',
                background: 'var(--surface-muted)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {event.meta.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>{m.label}:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{m.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Content & Host context */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Eyebrow / Badges */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 8,
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--accent-primary)',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                {event.type}
              </span>
            </div>

            {/* Subtle Host Badge */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 600,
                padding: '0.2rem 0.55rem',
                borderRadius: '2px',
                color: 'var(--accent-primary)',
                background: 'var(--surface-muted)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {event.hostBadge || 'Organized & Hosted'}
            </span>
          </div>

          {/* Title */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.25,
                marginBottom: '0.35rem',
              }}
            >
              {event.title}
            </h3>

            {event.scenario && (
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                }}
              >
                {event.scenario}
              </div>
            )}
          </div>

          {/* Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {event.description.slice(0, hasMultipleParagraphs && !expanded ? 2 : undefined).map((para, pIdx) => (
              <p
                key={pIdx}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}
              >
                {para}
              </p>
            ))}

            {hasMultipleParagraphs && (
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
                  >
                    {event.description.slice(2).map((para, pIdx) => (
                      <p
                        key={pIdx + 2}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          lineHeight: 1.7,
                          color: 'var(--text-secondary)',
                          margin: 0,
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {hasMultipleParagraphs && (
              <button
                onClick={() => {
                  playSound('click');
                  setExpanded((prev) => !prev);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--accent-primary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '4px 0',
                  width: 'fit-content',
                }}
              >
                {expanded ? (
                  <>
                    <ChevronUp size={14} />
                    <span>Collapse details</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} />
                    <span>Read complete challenge breakdown</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Technical focus areas */}
          {event.technicalAreas && event.technicalAreas.length > 0 && (
            <div
              style={{
                marginTop: '0.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                }}
              >
                Methodologies &amp; Challenge Vectors
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {event.technicalAreas.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '2px',
                      background: 'var(--surface-muted)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function EventsSection({ events = [] }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '1040px', margin: '0 auto' }}>
      {/* Chapter Subheader */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '2.5rem',
          paddingBottom: '0.85rem',
          borderBottom: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--accent-primary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
            }}
          >
            Chapter 02 &mdash; Community &amp; Technical Events
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.45rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            CTFs, Workshops &amp; Community Hosting
          </h3>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
          }}
        >
          {events.length} Events Organized &amp; Hosted
        </div>
      </div>

      {/* Events List */}
      <div>
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .event-grid-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
