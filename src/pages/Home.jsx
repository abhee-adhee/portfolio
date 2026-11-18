import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FileText,
  Send,
  Github,
  Linkedin,
  Globe,
  Mail,
  Calendar,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Shield,
  Award,
  Terminal,
  Users,
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GithubActivity from '../components/home/GithubActivity';
import TechLogos from '../components/home/TechLogos';
import ProjectVisual from '../components/home/ProjectVisual';
import { useSound } from '../context/SoundContext';

const MotionDiv = motion.div;

export default function Home() {
  const { playSound } = useSound();
  const [istTime, setIstTime] = useState('');
  const [expandedExp, setExpandedExp] = useState({});

  // Experience Timeline Scroll Animation
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  });
  const smoothTimelineProgress = useSpring(timelineProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
    restDelta: 0.001,
  });

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
      };
      setIstTime(d.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleExp = (id) => {
    playSound('click');
    setExpandedExp((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Experience Entries
  const experiences = [
    {
      id: 'bugbusterslab',
      number: '01',
      org: 'BUGBUSTERSLAB',
      role: 'Cybersecurity Intern / Web Penetration Tester',
      duration: '2026',
      badgeColor: '#22c55e',
      badgeInitial: 'B',
      tags: ['Burp Suite', 'OWASP Top 10', 'Nmap', 'Linux', 'Web Security'],
      highlight: 'Audited web endpoints and identified OWASP Top 10 vulnerabilities with Burp Suite and Nmap',
      tasks: [
        'Performed web application security assessments to identify common vulnerabilities and security misconfigurations.',
        'Conducted manual reconnaissance, endpoint enumeration, and vulnerability validation using industry-standard security methodologies.',
        'Assisted in penetration testing engagements by documenting findings, assessing risk, and recommending remediation measures.',
        'Collaborated with the security team to analyze web application attack surfaces and improve overall application security posture.',
      ],
    },
    {
      id: 'assurefm',
      number: '02',
      org: 'ASSURE FACILITY MANAGEMENT SERVICES',
      role: 'Junior Web Developer',
      duration: 'June 2024 (30 Days)',
      badgeColor: '#3b82f6',
      badgeInitial: 'A',
      tags: ['React', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs'],
      highlight: 'Developed responsive client-facing UI components and streamlined frontend workflows',
      tasks: [
        'Developed and optimized frontend components for internal and client-facing web applications.',
        'Worked on responsive UI design using modern web technologies and best practices.',
        'Collaborated with senior developers to debug issues and improve performance.',
        'Gained hands-on experience in real-world development workflows and deployment cycles.',
      ],
    },
    {
      id: 'techsociety',
      number: '03',
      org: 'TECH SOCIETY',
      role: 'Joint Secretary, Cybersecurity Domain',
      duration: '2024 — Present',
      badgeColor: '#ea580c',
      badgeInitial: 'T',
      tags: ['Cybersecurity', 'Technical Events', 'Mentorship', 'Leadership', 'Project Planning'],
      description:
        'As Joint Secretary of the Cybersecurity Domain at Tech Society, I help organize and conduct technical and non-technical events, collaborate with members on practical technical projects, and support junior students in their academic learning and technical development.',
      highlight: 'Spearheading cybersecurity workshops, technical events, and peer project collaborations',
      tasks: [
        'Organizing cybersecurity events and workshops.',
        'Collaborating on practical technical projects.',
        'Helping juniors understand academic and technical concepts.',
        'Encouraging peer learning and technical participation.',
      ],
    },
  ];

  // 4 Featured Projects
  const featuredProjects = [
    {
      id: 'sentinel-ids',
      title: 'Sentinel IDS',
      category: 'Network Intrusion Detection & Socket Analysis',
      stack: ['Python', 'Scapy', 'SQLite'],
      screenshot: '/projects/sentinel-ids.png',
    },
    {
      id: 'voice-for-all',
      title: 'VoiceForAll',
      category: 'Civic Accessibility Platform & NLP Sentiment Mapping',
      stack: ['Python', 'Streamlit', 'TextBlob', 'Plotly'],
      screenshot: '/projects/voice-for-all.png',
    },
    {
      id: 'mini-soc',
      title: 'Mini SOC',
      category: 'Endpoint Security Monitoring & Event Correlation',
      stack: ['Python', 'PowerShell', 'Windows Defender'],
      screenshot: '/projects/mini-soc.png',
    },
    {
      id: 'edumate',
      title: 'EduMate',
      category: 'Facial Expression Recognition & Adaptive Learning',
      stack: ['Python', 'OpenCV', 'Machine Learning', 'React'],
      screenshot: '/projects/edumate.png',
    },
  ];

  // Recognition Cards
  const recognitions = [
    {
      id: 'events',
      title: 'Technical Events Hosted',
      subtitle: 'CTFs & Technical Workshops',
      stat: '3+',
      statLabel: 'Hosted',
      meta: 'Saveetha / Tech Society',
      icon: Terminal,
      items: ['THE INSIDE JOB CTF', 'GHOST IN THE MACHINE CTF', 'CYBERSTART Workshop'],
    },
    {
      id: 'hackathons',
      title: 'Hackathons & Competitions',
      subtitle: 'Applied Engineering Competitions',
      stat: '6+',
      statLabel: 'Events',
      meta: 'CIT • Redrob AI • SEC • SIH',
      icon: Shield,
      items: [
        "Code O'Clock 2026 (CoC) — 24-Hour Hackathon at CIT",
        'India Runs by Redrob AI by Hack2Skill 2026',
        'Hack Hustle 2025 by Saveetha Engineering College',
        'Smart India Hackathon 2025',
        'IBM Z Datathon 2025 (VoiceForAll Platform)',
        "ITERYX'25 Hackathon (EduMate CV Companion)",
      ],
    },
    {
      id: 'certs',
      title: 'Certifications',
      subtitle: 'Cloud & Security Platforms',
      stat: '8+',
      statLabel: 'Certs',
      meta: 'IBM • Scaler • Google Cloud',
      icon: Award,
      items: [
        'IBM Cybersecurity Tools & Cyberattacks',
        'IBM Operating Systems: Administration & Security',
        'Scaler DBMS Fundamentals',
        'IBM Compliance Frameworks & Standards',
      ],
    },
    {
      id: 'leadership',
      title: 'Community & Leadership',
      subtitle: 'Tech Society Domain Lead',
      stat: '1',
      statLabel: 'Role',
      meta: '2024 — Present',
      icon: Users,
      items: [
        'Joint Secretary — Cybersecurity Domain',
        'Mentoring junior students in technical concepts',
        'Fostering peer collaboration and CTF training',
      ],
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Abinav Aaditya — Software Developer &amp; Cybersecurity Enthusiast</title>
        <meta
          name="description"
          content="Portfolio of Abinav Aaditya — Computer Science Undergraduate at Saveetha Engineering College, Software Developer, and Cybersecurity Enthusiast."
        />
        <meta property="og:title" content="Abinav Aaditya — Portfolio" />
        <meta
          property="og:description"
          content="Portfolio of Abinav Aaditya — Computer Science Undergraduate, Software Developer, and Cybersecurity Enthusiast."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div
        className="home-page-container"
        style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '2rem 1.25rem 6.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '4.5rem',
        }}
      >
        {/* =========================================================================
            SECTION 1: PROFILE INTRODUCTION
            ========================================================================= */}
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Cover / Banner Image Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(180px, 28vw, 260px)',
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: '#1b1b22',
              backgroundImage: 'url(/cover.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid var(--border-color)',
            }}
          >
            {/* Top Right: Country & IST Clock */}
            <div
              className="home-cover-badge"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(13, 13, 16, 0.72)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#f4f3ef',
                fontWeight: 500,
              }}
            >
              <span role="img" aria-label="India flag">
                🇮🇳
              </span>
              <span>{istTime ? `${istTime} IST` : 'IST'}</span>
            </div>

            {/* Bottom Right: Availability Indicator */}
            <div
              className="home-cover-badge"
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '5px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(13, 13, 16, 0.72)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                color: '#f4f3ef',
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  boxShadow: '0 0 6px #22c55e',
                }}
              />
              <span>Open to opportunities</span>
            </div>
          </div>

          {/* Profile Header Overlapping Cover */}
          <div
            style={{
              padding: '0 0.5rem',
              marginTop: '-52px',
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Profile Avatar */}
            <div
              className="home-avatar-container"
              style={{
                width: '104px',
                height: '104px',
                borderRadius: '18px',
                overflow: 'hidden',
                border: '4px solid var(--bg-primary)',
                backgroundColor: 'var(--bg-surface)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
              }}
            >
              <img
                src="/profile.jpg"
                alt="Abinav Aaditya"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Name & Title */}
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.15,
                  margin: '0 0 0.35rem 0',
                }}
              >
                ABINAV AADITYA
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.88rem, 1.6vw, 1rem)',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Computer Science Undergraduate | Software Developer | Cybersecurity Enthusiast
              </p>
            </div>

            {/* Concise Introduction */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.96rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                margin: 0,
                maxWidth: '780px',
              }}
            >
              I&apos;m a <strong style={{ color: 'var(--text-primary)' }}>Computer Science undergraduate</strong> at Saveetha
              Engineering College, interested in <strong style={{ color: 'var(--text-primary)' }}>building software</strong>,
              exploring <strong style={{ color: 'var(--text-primary)' }}>cybersecurity</strong>, and understanding how systems work.
              I enjoy learning through <strong style={{ color: 'var(--text-primary)' }}>hands-on projects</strong>, experimenting
              with technologies, and solving practical engineering problems.
            </p>

            {/* Actions & Social Links Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.25rem',
                paddingTop: '0.5rem',
              }}
            >
              {/* Primary Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href="/resume.pdf"
                  download
                  className="home-btn-resume"
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <FileText size={15} />
                  <span>View Resume</span>
                </a>

                <Link
                  to="/contact"
                  className="home-btn-contact"
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <Send size={14} />
                  <span>Get in touch</span>
                </Link>
              </div>

              {/* Social Icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <a
                  href="https://github.com/abhee-adhee"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="home-social-link"
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <Github size={18} />
                </a>

                <a
                  href="https://www.linkedin.com/in/abinav-aaditya-86a952305/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="home-social-link"
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <Linkedin size={18} />
                </a>

                <a
                  href="https://adhidev.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Portfolio"
                  className="home-social-link"
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <Globe size={18} />
                </a>

                <a
                  href="mailto:abinavaaditya@gmail.com"
                  aria-label="Email"
                  className="home-social-link"
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: TECH STACK & EXPERIENCE
            ========================================================================= */}
        <section>
          {/* Section Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              className="home-section-number"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '2px 8px',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              01
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Stacks &amp; Experience
            </h2>
            <span style={{ color: 'var(--text-muted)' }}>-</span>
            <span
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.35rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              My toolkit and where I built with it
            </span>
          </div>

          {/* Combined Dark Showcase Card */}
          <div
            className="home-showcase-card"
          >
            {/* Top Part: GitHub Contribution Calendar */}
            <GithubActivity />

            {/* Divider */}
            <div
              style={{
                height: '1px',
                backgroundColor: 'var(--border-color)',
                margin: '1.25rem 0',
              }}
            />

            {/* Bottom Part: Technology Logos Showcase */}
            <TechLogos />
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: EXPERIENCE TIMELINE
            ========================================================================= */}
        <section>
          {/* Section Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              marginBottom: '2rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              className="home-section-number"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '2px 8px',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              02
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Experience
            </h2>
            <span style={{ color: 'var(--text-muted)' }}>-</span>
            <span
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.35rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              Practical roles &amp; defense initiatives
            </span>
          </div>

          {/* Timeline Container with Vertical Green Line */}
          <div
            ref={timelineRef}
            className="home-timeline-container"
            style={{ position: 'relative', paddingLeft: '4rem' }}
          >
            {/* Vertical Rail (Base Track + Animated Extending Green Line) */}
            <div
              className="home-timeline-rail"
              style={{
                position: 'absolute',
                left: '1.5rem',
                top: '0.5rem',
                bottom: '1rem',
                width: '2px',
                backgroundColor: 'rgba(34, 197, 94, 0.18)',
                borderRadius: '1px',
                overflow: 'hidden',
              }}
            >
              <MotionDiv
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#22c55e',
                  borderRadius: '1px',
                  transformOrigin: 'top',
                  scaleY: smoothTimelineProgress,
                  boxShadow: '0 0 10px rgba(34, 197, 94, 0.7)',
                }}
              />
            </div>

            {/* Timeline Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {experiences.map((exp) => {
                const isExpanded = !!expandedExp[exp.id];

                return (
                  <div key={exp.id} style={{ position: 'relative' }}>
                    {/* Milestone Number Label on Rail */}
                    <div
                      className="home-timeline-number"
                      style={{
                        position: 'absolute',
                        left: '-4rem',
                        top: '0.25rem',
                        width: '3rem',
                        textAlign: 'right',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {exp.number}
                    </div>

                    {/* Entry Content Block */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {/* Organization & Role */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          className="home-exp-badge"
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            backgroundColor: exp.badgeColor,
                            color: '#ffffff',
                            fontWeight: 700,
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {exp.badgeInitial}
                        </div>

                        <div>
                          <div
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.72rem',
                              color: 'var(--text-muted)',
                              fontWeight: 600,
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {exp.org}
                          </div>
                          <h3
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '1.25rem',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              margin: 0,
                            }}
                          >
                            {exp.role}
                          </h3>
                        </div>
                      </div>

                      {/* Duration */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--text-muted)',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        <Calendar size={13} />
                        <span>{exp.duration}</span>
                      </div>

                      {/* Tech Tags */}
                      {exp.tags && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="home-tag-pill"
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.68rem',
                                padding: '2px 8px',
                                borderRadius: '9999px',
                                backgroundColor: 'var(--bg-surface)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-secondary)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Highlight with Star */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '8px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.88rem',
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                          marginTop: '0.2rem',
                        }}
                      >
                        <Star size={14} style={{ color: '#22c55e', flexShrink: 0, marginTop: '2px' }} fill="#22c55e" />
                        <span>{exp.highlight}</span>
                      </div>

                      {/* Description if present */}
                      {exp.description && (
                        <p
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.86rem',
                            lineHeight: 1.6,
                            color: 'var(--text-secondary)',
                            margin: 0,
                          }}
                        >
                          {exp.description}
                        </p>
                      )}

                      {/* Expandable Details Button */}
                      <div>
                        <button
                          onClick={() => toggleExp(exp.id)}
                          className="home-details-btn"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp size={14} />
                              <span>Hide details</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown size={14} />
                              <span>Show details</span>
                            </>
                          )}
                        </button>

                        {/* Collapsible Tasks List */}
                        {isExpanded && (
                          <ul
                            style={{
                              listStyle: 'none',
                              padding: '0.75rem 0 0 0',
                              margin: 0,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.5rem',
                            }}
                          >
                            {exp.tasks.map((task, tIdx) => (
                              <li
                                key={tIdx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'baseline',
                                  gap: '8px',
                                  fontFamily: 'var(--font-sans)',
                                  fontSize: '0.85rem',
                                  color: 'var(--text-secondary)',
                                  lineHeight: 1.55,
                                }}
                              >
                                <span style={{ color: '#22c55e' }}>&bull;</span>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: PROJECTS SHOWCASE
            ========================================================================= */}
        <section>
          {/* Section Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              className="home-section-number"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '2px 8px',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              03
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Projects
            </h2>
            <span style={{ color: 'var(--text-muted)' }}>-</span>
            <span
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.35rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              Featured Engineering Work
            </span>
          </div>

          {/* 2-Column Responsive Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {featuredProjects.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className="home-project-card"
                onClick={() => playSound('click')}
                onMouseEnter={() => playSound('hover')}
              >
                {/* Visual Header Graphic */}
                <ProjectVisual id={p.id} screenshot={p.screenshot} />

                {/* Card Meta Content */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        margin: 0,
                      }}
                    >
                      {p.title}
                    </h3>
                    <ArrowUpRight size={17} className="home-card-arrow" />
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {p.category}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '5px',
                      paddingTop: '0.5rem',
                    }}
                  >
                    {p.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          backgroundColor: 'var(--bg-subtle)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Direct link to all systems */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link
              to="/projects"
              className="home-explore-all-btn"
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
            >
              <span>Explore all documented systems &amp; sidequests</span>
              <ArrowUpRight size={15} className="home-explore-arrow" />
            </Link>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: RECOGNITION & ACHIEVEMENTS
            ========================================================================= */}
        <section>
          {/* Section Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              className="home-section-number"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '2px 8px',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              04
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Recognition
            </h2>
            <span style={{ color: 'var(--text-muted)' }}>-</span>
            <span
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.35rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              Milestones &amp; Impact
            </span>
          </div>

          {/* 2x2 Grid with Folder-Tab Aesthetic */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {recognitions.map((rec) => {
              const Icon = rec.icon;
              return (
                <div
                  key={rec.id}
                  className="home-recognition-card"
                >
                  {/* Card Top */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            margin: '0 0 0.25rem 0',
                          }}
                        >
                          {rec.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.78rem',
                            color: 'var(--text-muted)',
                            margin: 0,
                          }}
                        >
                          {rec.subtitle}
                        </p>
                      </div>

                      <div className="home-rec-icon-box">
                        <Icon size={16} />
                      </div>
                    </div>

                    {/* Bullet Items */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem',
                        marginTop: '1.25rem',
                      }}
                    >
                      {rec.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '6px',
                            lineHeight: 1.4,
                          }}
                        >
                          <span style={{ color: '#22c55e', fontSize: '0.7rem' }}>&bull;</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Big Stat & Meta Label */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      paddingTop: '1.5rem',
                      marginTop: '1rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.85rem',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          lineHeight: 1,
                        }}
                      >
                        {rec.stat}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {rec.statLabel}
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {rec.meta}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: MINIMAL FOOTER
            ========================================================================= */}
        <footer
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '2.5rem',
            paddingBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.35rem',
                }}
              >
                ABINAV AADITYA
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.84rem',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  maxWidth: '380px',
                  lineHeight: 1.55,
                }}
              >
                Computer Science Undergraduate building practical software and exploring cybersecurity.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a
                href="https://github.com/abhee-adhee"
                target="_blank"
                rel="noopener noreferrer"
                className="home-footer-link"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/abinav-aaditya-86a952305/"
                target="_blank"
                rel="noopener noreferrer"
                className="home-footer-link"
              >
                LinkedIn
              </a>

              <a
                href="mailto:abinavaaditya@gmail.com"
                className="home-footer-link"
              >
                abinavaaditya@gmail.com
              </a>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              borderTop: '1px solid rgba(255, 255, 255, 0.04)',
              paddingTop: '1.25rem',
            }}
          >
            <span>&copy; {new Date().getFullYear()} Abinav Aaditya. All rights reserved.</span>
            <span>Chennai, India</span>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
