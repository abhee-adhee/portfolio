import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [time, setTime] = useState('');

  // Live clock IST
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      setTime(d.toLocaleTimeString('en-IN', options));
    };
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-card)',
        color: 'var(--text-secondary)',
        marginTop: '6rem',
        padding: '4.5rem clamp(1.25rem, 4vw, 3rem) 6.5rem',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {/* Col 1: Identity & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              Abinav Aaditya
            </span>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                maxWidth: '320px',
              }}
            >
              Computer science student focused on network intrusion detection, web application security, and applied machine learning.
            </p>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                marginTop: '0.5rem',
              }}
            >
              Chennai, India • {time ? `${time} IST` : 'IST'}
            </div>
          </div>

          {/* Col 2: Navigation Index */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Index
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: 'Home', to: '/' },
                { label: 'Experience', to: '/experience' },
                { label: 'Projects', to: '/projects' },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.88rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Direct Channels */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Channels
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a
                href="mailto:abinavaaditya@gmail.com"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              >
                abinavaaditya@gmail.com
                <ArrowUpRight size={13} style={{ opacity: 0.6 }} />
              </a>
              <a
                href="https://github.com/abhee-adhee"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              >
                GitHub
                <ArrowUpRight size={13} style={{ opacity: 0.6 }} />
              </a>
              <a
                href="https://www.linkedin.com/in/abinav-aaditya-86a952305/"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              >
                LinkedIn
                <ArrowUpRight size={13} style={{ opacity: 0.6 }} />
              </a>
              <a
                href="/resume.pdf"
                download
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              >
                Curriculum Vitae (PDF)
                <ArrowUpRight size={13} style={{ opacity: 0.6 }} />
              </a>
            </div>
          </div>

          {/* Col 4: Colophon */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Colophon
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                color: 'var(--text-muted)',
              }}
            >
              Typeset in Inter and JetBrains Mono. Built with React and Vite. Hand-crafted with deliberate focus.
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>© {new Date().getFullYear()} Abinav Aaditya. All work referenced is authored or co-created.</div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: 0,
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
