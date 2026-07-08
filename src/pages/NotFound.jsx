import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

import GlitchText from '../components/GlitchText';
import PageTransition from '../components/PageTransition';
import BackButton from '../components/BackButton';
import { useSound } from '../context/SoundContext';

export default function NotFound() {
  const { playSound } = useSound();

  useEffect(() => { playSound('error'); }, []); // eslint-disable-line
  return (
    <PageTransition>
      <Helmet>
        <title>404 - Not Found | ABINAV.SYS</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated static noise background */}
        <div
          style={{
            position: 'absolute',
            inset: -100, /* bleed over edges for shake */
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3CcolorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 10 -4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='white' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
            opacity: 0.15,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
            animation: 'grain 0.2s steps(1) infinite',
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* 404 glitch */}
          <GlitchText
            text="404"
            as="h1"
            style={{
              fontSize: 'clamp(6rem, 20vw, 12rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              letterSpacing: '0.05em',
              color: 'var(--text-primary)',
              lineHeight: 1,
              marginBottom: '1rem',
            }}
          />

          {/* Error codes */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              color: 'rgba(239,68,68,0.8)',
              marginBottom: 6,
            }}
          >
            ERROR_CODE: MODULE_NOT_FOUND
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              marginBottom: '2.5rem',
            }}
          >
            YOUR_COORDINATES_ARE_INVALID. REDIRECTING...
          </div>
          <BackButton />
          {/* Scanlines decoration */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 6px,
                rgba(239,68,68,0.02) 6px,
                rgba(239,68,68,0.02) 12px
              )`,
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      </div>
    </PageTransition>
  );
}
