import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useSound } from '../../context/SoundContext';

export default function AboutSnapshot() {
  const { data } = usePortfolioData();
  const { playSound } = useSound();

  const metrics = [
    { label: 'Technical Certifications', value: `${data.certificates?.length || 8}`, detail: 'IBM, Google Cloud, AWS, Infosec' },
    { label: 'Hands-on Roles & Initiatives', value: `${data.experience?.length || 3}`, detail: 'BugBustersLab, AssureFM, Tech Society' },
    { label: 'Documented Systems', value: `${data.projects?.length || 8}`, detail: '6 primary platforms + 2 sidequests' },
    { label: 'Academic Standing', value: '8.2', detail: 'Saveetha Engineering College CGPA' },
  ];

  const focusAreas = [
    {
      num: '01',
      title: 'Offensive Security & Web AppSec',
      desc: 'Performing manual reconnaissance, HTTP endpoint enumeration, and vulnerability auditing across the OWASP Top 10 with Burp Suite and Nmap.',
    },
    {
      num: '02',
      title: 'Network Traffic Inspection & Detection Engines',
      desc: 'Dissecting TCP/IP, UDP, and ICMP headers at the packet level with Python & Scapy, writing stateful SYN flood and port scan detection heuristics.',
    },
    {
      num: '03',
      title: 'Applied Machine Learning & Accessibility',
      desc: 'Developing computer vision gesture authentication with OpenCV & MediaPipe, and NLP urgency classification pipelines for assistive platforms.',
    },
  ];

  return (
    <section
      id="about-snap"
      style={{
        padding: '5rem var(--page-gutter)',
        maxWidth: '1240px',
        margin: '0 auto',
      }}
    >
      <SectionHeading
        pageLabel="Profile // Direction"
        title="Engineering security and software with deliberate curiosity."
        subtitle="Bridging defensive engineering, threat research, and human-centered software."
      />

      {/* Main Grid: Narrative & Focus Areas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          marginBottom: '3.5rem',
          alignItems: 'start',
        }}
      >
        {/* Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.02rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            I am a Computer Science undergraduate at Saveetha Engineering College in Chennai. Rather than
            approaching software solely as a set of features to assemble, I am drawn to understanding
            how complex digital systems break under real conditions and how to design defensive controls
            from first principles.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.96rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            My practical experience includes performing manual web penetration tests during my internship
            at BugBustersLab, building raw-packet intrusion detection pipelines in Sentinel IDS, and hosting
            community Capture The Flag challenges where I designed the vulnerable architectures, flag
            verifications, and player investigation flows.
          </p>

          <div
            style={{
              padding: '1.25rem',
              background: 'var(--surface-muted)',
              borderLeft: '2px solid var(--accent-primary)',
              marginTop: '0.25rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                fontSize: '1.02rem',
                fontStyle: 'italic',
                color: 'var(--text-primary)',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              &ldquo;Learning through hands-on construction, testing by identifying failure modes, and
              iterating until the system is both secure and intuitive.&rdquo;
            </p>
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <Link
              to="/about"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.88rem',
                color: 'var(--accent-primary)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>Read the comprehensive background &amp; trajectory</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </motion.div>

        {/* Focus Areas List */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            Areas of Focus &amp; Practical Practice
          </div>

          {focusAreas.map((area) => (
            <div
              key={area.num}
              style={{
                padding: '1.25rem',
                background: 'var(--surface-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '0.94rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  {area.title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--accent-primary)',
                    fontWeight: 600,
                  }}
                >
                  {area.num}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {area.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Real Quantitative Benchmarks Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          paddingTop: '2.5rem',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        {metrics.map((m, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                fontSize: '2.4rem',
                fontWeight: 400,
                color: 'var(--text-primary)',
                lineHeight: 1,
              }}
            >
              {m.value}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.86rem',
                color: 'var(--text-primary)',
              }}
            >
              {m.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}
            >
              {m.detail}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
