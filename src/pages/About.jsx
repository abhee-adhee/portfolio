import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Compass,
  Users2,
  Sparkles,
  ArrowRight,
  Terminal,
  Flag,
  Wrench,
  GraduationCap,
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import BackButton from '../components/BackButton';
import { useSound } from '../context/SoundContext';

export default function About() {
  const { playSound } = useSound();

  return (
    <PageTransition>
      <Helmet>
        <title>About &mdash; Abinav Aaditya</title>
        <meta
          name="description"
          content="Personal background, philosophy, learning approach, and aspirations of Abinav Aaditya."
        />
        <meta property="og:title" content="About — Abinav Aaditya" />
        <meta
          property="og:description"
          content="Personal background, philosophy, learning approach, and aspirations of Abinav Aaditya."
        />
      </Helmet>

      <div
        className="page-container"
        style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '2.5rem 1.5rem 7rem',
        }}
      >
        <BackButton label="Home" />

        {/* Page Main Header */}
        <header style={{ marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              marginBottom: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4.5vw, 2.85rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            >
              About Me
            </h1>
            <span style={{ color: 'var(--text-muted)' }}>-</span>
            <span
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.4rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              The person behind the screen
            </span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              maxWidth: '680px',
              margin: 0,
            }}
          >
            A look into how I think, how I approach learning, and what drives my journey through software engineering and cybersecurity.
          </p>
        </header>

        {/* =========================================================================
            SECTION 1: BEYOND THE CODE (A LITTLE ABOUT ME)
            ========================================================================= */}
        <section
          style={{
            marginBottom: '4rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-primary)',
              }}
            />
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Beyond the code.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '2.5rem',
              alignItems: 'start',
            }}
          >
            {/* Left Narrative Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.98rem',
                  lineHeight: 1.75,
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}
              >
                I&apos;m <strong style={{ color: 'var(--text-primary)' }}>Abinav Aaditya</strong>, a Computer Science undergraduate at Saveetha Engineering College in Chennai. At my core, I am someone who genuinely enjoys exploring new concepts, learning by getting my hands dirty, and understanding how abstract ideas turn into practical tools.
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.98rem',
                  lineHeight: 1.75,
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}
              >
                I don&apos;t want to limit myself to a single narrow track of technology. Whether I&apos;m writing software, digging into network security protocols, experimenting with machine learning pipelines, or organizing a workshop on campus, I find energy in taking on challenges that push me past what I already know.
              </p>

              {/* Personal Quick Highlights */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  paddingTop: '0.5rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.78rem',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  📍 Chennai, India
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.78rem',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  🎓 Saveetha Engineering College
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.78rem',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  ⚡ Builder &amp; Peer Mentor
                </span>
              </div>
            </div>

            {/* Right Photo Column */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface)',
                maxWidth: '340px',
                justifySelf: 'center',
                width: '100%',
              }}
            >
              <img
                src="/profile.jpg"
                alt="Abinav Aaditya"
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  padding: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>Abinav Aaditya</span>
                <span style={{ color: 'var(--accent-primary)' }}>CS Undergrad</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: HOW I THINK (CURIOSITY KEEPS ME MOVING)
            ========================================================================= */}
        <section
          style={{
            marginBottom: '4rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
              }}
            />
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Curiosity keeps me moving.
            </h2>
          </div>

          {/* Restrained Pull Quote */}
          <blockquote
            style={{
              margin: '0 0 2rem 0',
              padding: '1.25rem 1.75rem',
              backgroundColor: 'var(--bg-surface)',
              borderLeft: '3px solid var(--accent-primary)',
              borderRadius: '0 12px 12px 0',
              borderTop: '1px solid var(--border-color)',
              borderRight: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                fontStyle: 'italic',
                color: 'var(--text-primary)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              &ldquo;I learn best by building, breaking things, and seeing what happens when theory meets reality.&rdquo;
            </p>
          </blockquote>

          {/* Core Mindsets */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.25rem',
            }}
          >
            <div
              style={{
                padding: '1.25rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.4rem',
                }}
              >
                Experimentation over memorization
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Reading docs and articles only takes you so far. I prefer spinning up a prototype, testing assumptions directly, and observing the outputs firsthand.
              </p>
            </div>

            <div
              style={{
                padding: '1.25rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.4rem',
                }}
              >
                Independent, but community-rooted
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                I love deep-diving on my own to solve hard problems, but I know some of the most valuable insights come from exchanging perspectives with peers and mentors.
              </p>
            </div>

            <div
              style={{
                padding: '1.25rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.4rem',
                }}
              >
                Failed attempts are teachers
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Bugs, broken scripts, and unexpected exceptions aren&apos;t wasted time. They highlight edge cases you hadn&apos;t considered and sharpen your engineering judgment.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: BEYOND ACADEMICS (COMMUNITY & TEAMWORK)
            ========================================================================= */}
        <section
          style={{
            marginBottom: '4rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#a855f7',
              }}
            />
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              More than just academics.
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.98rem',
              lineHeight: 1.75,
              color: 'var(--text-secondary)',
              margin: '0 0 1.5rem 0',
            }}
          >
            A big part of my college life happens outside lecture halls. As Joint Secretary of the Cybersecurity Domain at <strong style={{ color: 'var(--text-primary)' }}>Tech Society</strong>, I collaborate with members to organize and host hands-on technical events—such as <em style={{ fontStyle: 'normal', color: 'var(--text-primary)' }}>The Inside Job</em>, <em style={{ fontStyle: 'normal', color: 'var(--text-primary)' }}>Ghost in the Machine</em>, and <em style={{ fontStyle: 'normal', color: 'var(--text-primary)' }}>CyberStart</em>.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.98rem',
              lineHeight: 1.75,
              color: 'var(--text-secondary)',
              margin: '0 0 2rem 0',
            }}
          >
            One of the most rewarding parts of this work is supporting junior students. Helping someone navigate a confusing concept, debug their first project, or feel confident in a technical competition reinforces that software engineering is fundamentally about people, communication, and shared growth.
          </p>

          {/* Pillars of Involvement */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '1.15rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
              }}
            >
              <Users2 size={18} style={{ color: '#a855f7', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem',
                  }}
                >
                  Event Organizing &amp; Hosting
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Planning challenges, coordinating logistics, and creating supportive spaces for students to test their skills.
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '1.15rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
              }}
            >
              <GraduationCap size={18} style={{ color: '#22c55e', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem',
                  }}
                >
                  Peer Mentorship
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Helping juniors break down academic topics, learn development workflows, and build their first prototypes.
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '1.15rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
              }}
            >
              <Sparkles size={18} style={{ color: '#f59e0b', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem',
                  }}
                >
                  Teamwork &amp; Community
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Collaborating across teams, taking shared responsibility, and building an open environment of mutual encouragement.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: WHAT I'M WORKING TOWARDS (ASPIRATIONS)
            ========================================================================= */}
        <section
          style={{
            marginBottom: '4rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
              }}
            />
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Where I want to go.
            </h2>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              maxWidth: '820px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.98rem',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                margin: 0,
              }}
            >
              My goal is to grow into a well-rounded software engineer with rock-solid computer science fundamentals. Rather than chasing every fleeting trend, I want to deeply understand how systems function, how data moves reliably, and how software remains resilient when deployed.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.98rem',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                margin: 0,
              }}
            >
              I want to contribute to meaningful products that solve real-world problems. That means learning from experienced engineers, holding myself to high engineering standards, and gradually taking full ownership of projects from initial conception to production deployment.
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: A FEW THINGS I ENJOY (PERSONAL INTERESTS)
            ========================================================================= */}
        <section
          style={{
            marginBottom: '4rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#f97316',
              }}
            />
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              A few things I enjoy.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '1rem',
            }}
          >
            <div
              style={{
                padding: '1.15rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem' }}>
                <Terminal size={16} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Side Projects &amp; Prototypes
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Taking a spontaneous weekend idea and tinkering until something tangible runs.
              </p>
            </div>

            <div
              style={{
                padding: '1.15rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem' }}>
                <Flag size={16} style={{ color: '#ef4444' }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  CTF Challenges &amp; Security
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Deconstructing web apps, analyzing packets, and solving capture-the-flag problems.
              </p>
            </div>

            <div
              style={{
                padding: '1.15rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem' }}>
                <Wrench size={16} style={{ color: '#3b82f6' }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Exploring New Tech Stacks
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Testing new libraries, developer CLI utilities, and modern open-source tooling.
              </p>
            </div>

            <div
              style={{
                padding: '1.15rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem' }}>
                <Compass size={16} style={{ color: '#a855f7' }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Hackathons &amp; Events
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Meeting fellow students, collaborating under tight deadlines, and sharing energy.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: CLOSING THOUGHT
            ========================================================================= */}
        <section
          style={{
            padding: '2rem 1.5rem',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: '1.7rem',
              color: 'var(--accent-primary)',
              marginBottom: '0.5rem',
            }}
          >
            Closing thought
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'var(--text-primary)',
              maxWidth: '620px',
              margin: '0 auto 1.75rem',
              lineHeight: 1.6,
            }}
          >
            &ldquo;I&apos;m still figuring things out, trying new things, and getting better one project at a time. That&apos;s the part of this journey I enjoy most.&rdquo;
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/projects"
              onClick={() => playSound('click')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 20px',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                color: '#0d0d10',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.86rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>Explore My Projects</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/contact"
              onClick={() => playSound('click')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 20px',
                borderRadius: '9999px',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.86rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              <span>Get in Touch</span>
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
