import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Linkedin, Mail, ArrowRight, ArrowUp } from 'lucide-react';

const prefetchRoute = (path) => {
  const routes = {
    'home': () => import('../pages/Home'),
    'projects': () => import('../pages/Projects'),
    'education': () => import('../pages/Education'),
    'experience': () => import('../pages/Experience'),
    'about': () => import('../pages/About'),
    'contact': () => import('../pages/Contact'),
  };
  if (routes[path]) routes[path]().catch(() => {});
};

export default function Footer() {
  const [time, setTime] = useState('');
  const [latency, setLatency] = useState(12);

  // Live clock IST
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
      setTime(d.toLocaleTimeString('en-IN', options));
    };
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  // Random latency
  useEffect(() => {
    const t = setInterval(() => {
      setLatency(Math.floor(Math.random() * 16) + 8);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('abinavaaditya@gmail.com');
    // We could trigger a toast here if we imported useToast
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      position: 'relative',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)',
      background: 'rgba(255,255,255,0.02)',
      borderTop: '1px solid var(--accent-subtle)',
      borderImage: 'linear-gradient(90deg, transparent, var(--accent-secondary), var(--accent-primary), transparent) 1',
      backdropFilter: 'blur(12px)',
      marginTop: '6rem',
      overflow: 'hidden',
      color: 'var(--text-secondary)',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.01, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--accent-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--accent-secondary) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      <div style={{
        maxWidth: 1400, margin: '0 auto',
        padding: '4rem clamp(1.5rem, 5vw, 4rem) 2rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
        }}>
          {/* COL 1: Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-dot-matrix)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
              ABINAV<span style={{ color: 'var(--accent-primary)' }}>.SYS</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
              Engineering the future.<br/>One commit at a time.
            </div>
            <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'blink 1.5s infinite' }} />
              <span style={{ color: '#4ade80', letterSpacing: '0.1em' }}>SYSTEM_ONLINE | UPTIME: 99.9%</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>
              LOCAL_TIME: {time} IST
            </div>
            <div style={{ marginTop: 'auto', paddingTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
              © 2026 ABINAV.SYS<br/>ALL_RIGHTS_RESERVED
            </div>
          </div>

          {/* COL 2: Navigation */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-secondary)', letterSpacing: '0.15em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Terminal size={14} /> // SITE_MAP
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['home', 'projects', 'education', 'experience', 'about', 'contact'].map(path => (
                <Link
                  key={path}
                  to={path === 'home' ? '/' : `/${path}`}
                  className="footer-nav-link"
                  onMouseEnter={() => prefetchRoute(path)}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                    color: 'var(--text-muted)', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: 8,
                    transition: 'color 0.2s, transform 0.2s',
                  }}
                >
                  <span style={{ color: 'var(--accent-primary)', opacity: 0.5 }}>&gt;</span>
                  ~/{path}
                </Link>
              ))}
            </nav>
          </div>

          {/* COL 3: Connect */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-secondary)', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>
              // OPEN_CHANNELS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button onClick={copyEmail} className="footer-connect-link" style={{ background: 'transparent', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }}>
                <Mail size={16} /> <span style={{ flex: 1 }}>EMAIL</span> <ArrowRight size={14} className="arrow" />
              </button>
              <a href="https://github.com/abhee-adhee" target="_blank" rel="noreferrer" className="footer-connect-link">
                <Github size={16} /> <span style={{ flex: 1 }}>GITHUB</span> <ArrowRight size={14} className="arrow" />
              </a>
              <a href="https://www.linkedin.com/in/abinav-aaditya-86a952305/" target="_blank" rel="noreferrer" className="footer-connect-link">
                <Linkedin size={16} /> <span style={{ flex: 1 }}>LINKEDIN</span> <ArrowRight size={14} className="arrow" />
              </a>
              <a href="/resume.pdf" download style={{
                marginTop: '1rem', display: 'inline-block',
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '8px 16px',
                border: '1px solid var(--accent-border)', color: 'var(--accent-primary)',
                borderRadius: 2, background: 'var(--accent-subtle)', letterSpacing: '0.1em',
                textAlign: 'center', transition: 'all 0.2s',
              }} className="btn-interactive btn-outline">
                [ DOWNLOAD_RESUME ]
              </a>
            </div>
          </div>

          {/* COL 4: System Info */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-secondary)', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>
              // SYS_INFO
            </div>
            <div style={{
              background: 'rgba(5,5,10,0.5)', border: '1px solid rgba(255,255,255,0.05)',
              padding: '1rem', borderRadius: 6, fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>VERSION:</span> <span style={{ color: 'var(--text-primary)' }}>2.0.0-RC</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>BUILD:</span> <span style={{ color: '#4ade80' }}>PASSING ✓</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>LAST_DEPLOY:</span> <span style={{ color: 'var(--text-primary)' }}>{new Date().toISOString().split('T')[0]}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>STACK:</span> <span style={{ color: 'var(--accent-primary)' }}>React + Vite + Tailwind</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>HOSTED_ON:</span> <span style={{ color: 'var(--text-primary)' }}>Vercel</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>LOCATION:</span> <span style={{ color: 'var(--text-primary)', textAlign: 'right' }}>Chennai, IND<br/><span style={{ fontSize: '0.55rem', opacity: 0.6 }}>[13.08°N 80.27°E]</span></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                <span>LATENCY:</span> <span style={{ color: '#4ade80' }}>{latency}ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem',
          paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
            BUILT WITH ♥ AND TOO MUCH COFFEE
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['React', 'Vite', 'Tailwind', 'Framer'].map(tech => (
              <span key={tech} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.55rem', padding: '3px 8px',
                background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)',
                color: 'var(--accent-secondary)', borderRadius: 2, letterSpacing: '0.05em',
              }}>
                [{tech}]
              </span>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="footer-nav-link"
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-primary)',
              display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.1em',
            }}
          >
            [ <ArrowUp size={12} /> TOP ]
          </button>
        </div>
      </div>

      <style>{`
        .footer-nav-link:hover {
          color: var(--accent-cyan) !important;
          transform: translateX(4px);
        }
        .footer-connect-link {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: 0.1em;
          transition: color 0.2s;
        }
        .footer-connect-link .arrow {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.2s;
        }
        .footer-connect-link:hover {
          color: var(--accent-primary) !important;
        }
        .footer-connect-link:hover .arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </footer>
  );
}
