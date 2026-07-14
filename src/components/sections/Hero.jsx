import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion,  useScroll, useTransform } from 'framer-motion';
import GlitchText from '../GlitchText';
import SectionHeading from '../SectionHeading';
import { useSound } from '../../context/SoundContext';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import WorldMap from '../WorldMap';
import { useMagnetic } from '../../utils/useMagnetic';

function Typewriter({ roles }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const full = roles[roleIdx];
    if (!deleting) {
      if (displayed.length < full.length) {
        timeout.current = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 70);
      } else {
        timeout.current = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDeleting(false);
        setRoleIdx(prev => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout.current);
  }, [roleIdx, displayed, deleting]);

  return (
    <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
      {displayed}
      <span className="blink" style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>_</span>
    </span>
  );
}



export default function Hero() {
  const { data } = usePortfolioData();
  const { playSound } = useSound();
  const today = new Date().toISOString().split('T')[0];

  // Typewriter heading logic
  const fullHeading = data.hero.name;
  const [headingText, setHeadingText] = useState("");
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setHeadingText(fullHeading.slice(0, i + 1));
      i++;
      if (i >= fullHeading.length) clearInterval(t);
    }, 150);
    return () => clearInterval(t);
  }, []);

  // Parallax Globe logic
  const { scrollY } = useScroll();
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  const globeRotation = useTransform(scrollY, [0, 2000], [0, 90]);
  const btnProjectsRef = useMagnetic(12, 60);
  const btnResumeRef = useMagnetic(12, 60);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '6rem 2rem 4rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Faint watermark */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 'clamp(6rem, 20vw, 18rem)',
        fontWeight: 900,
        fontFamily: 'var(--font-mono)',
        color: 'rgba(168, 85, 247, 0.03)',
        userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '-0.05em', whiteSpace: 'nowrap',
      }}>
        {data.hero.name}
      </div>

      {/* Two column layout */}
      <div className="hero-grid" style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gap: '4rem',
        alignItems: 'center',
      }}>

        {/* LEFT — existing content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ textAlign: 'left' }}
        >
          {/* Section Heading */}
          <div style={{ marginBottom: '2rem' }}>
            <SectionHeading
              pageLabel="ORIGIN_STATE"
              title=""
              subtitle=""
              metaLines={[
                { label: "> OPERATING_ENVIRONMENT:", value: "Linux / Web" },
                { label: "> PRIMARY_OBJECTIVE:", value: "Build & Defend Systems" }
              ]}
              accent="var(--accent-primary)"
              cursor={false}
              animate={true}
            />
          </div>

          {/* Glitch heading */}
          <div style={{ marginBottom: '1rem', minHeight: 'clamp(5rem, 14vw, 11rem)' }}>
            {headingText && (
              <GlitchText
                text={headingText}
                as="h1"
                style={{
                  fontSize: 'clamp(5rem, 14vw, 11rem)',
                  fontFamily: 'var(--font-dot-matrix)',
                  fontWeight: 900,
                  letterSpacing: '0.05em',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}
              />
            )}
            {/* Blinking cursor while typing */}
            {headingText.length < fullHeading.length && (
              <span className="blink" style={{ fontSize: 'clamp(5rem, 14vw, 11rem)', color: 'var(--accent-primary)' }}>_</span>
            )}
          </div>

          {/* Typewriter */}
          <div style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            fontWeight: 400,
            marginBottom: '2.5rem',
            minHeight: '2rem',
          }}>
            <Typewriter roles={data.hero.roles} />
          </div>

          <div style={{
            display: 'flex', gap: '1rem',
            flexWrap: 'wrap', marginBottom: '1.5rem',
          }}>
            <Link
              ref={btnProjectsRef}
              to={data.hero.cta1.link}
              className="btn-interactive btn-filled"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                letterSpacing: '0.12em', color: '#0a0a0f',
                background: 'var(--accent-primary)', border: 'none',
                padding: '12px 24px', borderRadius: 3,
                textDecoration: 'none', fontWeight: 600,
                boxShadow: 'var(--glow-primary)',
                display: 'inline-block',
              }}
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
            >
              [ {data.hero.cta1.text} ]
            </Link>
            <a
              ref={btnResumeRef}
              href={data.hero.cta2.link}
              download
              className="btn-interactive btn-outline"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                letterSpacing: '0.12em', color: 'var(--accent-primary)',
                background: 'transparent',
                border: '1px solid var(--accent-border)',
                padding: '12px 24px', borderRadius: 3,
                textDecoration: 'none', fontWeight: 600,
                display: 'inline-block',
              }}
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
            >
              [ {data.hero.cta2.text} ]
            </a>
          </div>

          {/* Last deploy line */}
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: 'var(--text-muted)', letterSpacing: '0.1em',
          }}>
            LAST_DEPLOY: {today} | STATUS: ALL_SYSTEMS_NOMINAL
          </div>
        </motion.div>

        {/* RIGHT — terminal widget + world map parallax */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          {/* Parallax Interactive World Map */}
          <motion.div
            style={{
              position: 'absolute',
              right: '-20%',
              top: '10%',
              width: '120%',
              opacity: 0.8,
              y: useTransform(scrollY, [0, 800], [0, 100]),
              pointerEvents: 'auto',
              zIndex: 0,
            }}
          >
            <WorldMap />
          </motion.div>

          {/* Terminal Widget Removed */}
        </div>

      </div>

      {/* Scroll hint */}
      <motion.div
        style={{ position: 'absolute', bottom: 32, left: '50%', x: '-50%' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: 'var(--text-muted)', letterSpacing: '0.15em',
        }}>
          ↓ SCROLL_TO_CONTINUE
        </div>
      </motion.div>
    </section>
  );
}