import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import ScrollProgressBar from './components/ScrollProgressBar';
import FloatingBadge from './components/FloatingBadge';
import LoadingScreen from './components/LoadingScreen';
import MatrixRain from './components/MatrixRain';
import DecorativeMargins from './components/DecorativeMargins';
import SudoHireEgg from './components/SudoHireEgg';
import Toast from './components/Toast';
import KonamiEgg from './components/KonamiEgg';
import ThemeRipple from './components/ThemeRipple';
import FloatingTerminal from './components/FloatingTerminal';
import ContextMenu from './components/ContextMenu';
import Footer from './components/Footer';

// Lazy-loaded pages (code splitting per route)
const Home         = lazy(() => import('./pages/Home'));
const Projects     = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Education    = lazy(() => import('./pages/Education'));
const Experience   = lazy(() => import('./pages/Experience'));
const About        = lazy(() => import('./pages/About'));
const Contact      = lazy(() => import('./pages/Contact'));
const NotFound     = lazy(() => import('./pages/NotFound'));

// Loading fallback for lazy loaded chunks
function LoadingFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}
    >
      <div 
        style={{ 
          width: 140, height: 2, 
          background: 'var(--accent-violet)', 
          animation: 'pulse-line 0.6s ease-in-out infinite alternate', 
          boxShadow: '0 0 12px var(--accent-violet)',
          borderRadius: 2
        }} 
      />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
        LOADING_MODULE...
      </div>
      <style>{`
        @keyframes pulse-line {
          0% { opacity: 0.3; transform: scaleX(0.8); }
          100% { opacity: 1; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

// Animated routes wrapper using location key for AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();

  // Scroll Restoration equivalent for BrowserRouter
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"             element={<Home />} />
          <Route path="/projects"     element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/education"    element={<Education />} />
          <Route path="/experience"   element={<Experience />} />
          <Route path="/about"        element={<About />} />
          <Route path="/contact"      element={<Contact />} />
          <Route path="*"             element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function AppInner() {
  const [loaded, setLoaded] = useState(() => sessionStorage.getItem('abinav-loaded') === 'true');
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) {
      document.body.classList.remove('public-cursor');
    } else {
      document.body.classList.add('public-cursor');
    }
    return () => {
      document.body.classList.remove('public-cursor');
    };
  }, [isAdmin]);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        overflowX: 'hidden',
      }}
    >
      {/* Global overlays */}
      <DecorativeMargins />
      <ScrollProgressBar />
      {!isAdmin && <CustomCursor />}
      {!isAdmin && <AnimatedBackground />}

      <ThemeRipple />
      <Toast />
      <MatrixRain />
      <SudoHireEgg />
      <KonamiEgg />
      <FloatingBadge />
      <FloatingTerminal />
      <ContextMenu />

      {/* Boot loading screen */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Main app (rendered under loading screen, shown after) */}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease-in-out', width: '100%' }}>
        <Navbar />
        <main style={{ position: 'relative', zIndex: 10 }}>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <AppInner />
      </SoundProvider>
    </ThemeProvider>
  );
}
