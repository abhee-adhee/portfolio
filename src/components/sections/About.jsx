import { motion, useInView } from 'framer-motion';
import { Trophy, Code, Briefcase, Layers } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

function AnimatedCounter({ from = 0, to, duration = 1.2 }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef();
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime;
    let animationFrame;

    const update = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * (to - from) + from));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };
    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, to, from, duration]);

  return <span ref={nodeRef}>{count}</span>;
}

import SectionHeading from '../SectionHeading';

export default function About() {
  const stats = [
    { label: "HACKATHONS_ENTERED", sub: "Top finishes", value: 2, suffix: "+", icon: <Trophy size={16} /> },
    { label: "PROJECTS_SHIPPED", sub: "Real systems", value: 5, suffix: "+", icon: <Code size={16} /> },
    { label: "INTERNSHIPS", sub: "Industry XP", value: 2, suffix: "", icon: <Briefcase size={16} /> },
    { label: "TECHS_MASTERED", sub: "Full stack", value: 10, suffix: "+", icon: <Layers size={16} /> },
  ];

  const idLines = [
    { label: "NAME", value: "Abinav Aaditya" },
    { label: "ALIAS", value: "Aadhi" },
    { label: "ROLE", value: "CS Student + Dev" },
    { label: "BASE", value: "Chennai, IND" },
    { label: "STATUS", value: "● AVAILABLE", isStatus: true },
    { label: "YEAR", value: "3rd Year B.Tech" },
    { label: "FOCUS", value: "Cybersec + ML + Web" },
  ];

  const clearanceLines = [
    { label: "THREAT_LEVEL", value: "[ CURIOUS ]" },
    { label: "CLEARANCE", value: "[ LEVEL 03 ]" },
    { label: "BUILD", value: "[ PASSING ✓ ]" },
  ];

  const processes = [
    "> PROCESS_01: Studying CS @ Saveetha Engineering",
    "> PROCESS_02: Building Sentinel IDS",
    "> PROCESS_03: Interning @ BugBustersLab",
    "> PROCESS_04: Open to internships + collabs",
  ];

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.6 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const processListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 1.0 }
    }
  };

  return (
    <section id="about" className="w-full min-h-screen py-24 flex items-center justify-center max-w-6xl mx-auto px-6 relative z-10">

      {/* Background ambient blobs specifically for About */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="w-full flex flex-col gap-12">
        <SectionHeading
          pageLabel="ARCHITECT_PROFILE"
          title="Mindset & Philosophy"
          subtitle="I build systems that defend, learn, and scale."
          metaLines={[
            { label: "> SPECIALIZATION:", value: "Offensive Security & Systems" },
            { label: "> CURRENT FOCUS:", value: "Agentic AI Defense" }
          ]}
          accent="var(--accent-primary)"
          cursor={true}
          animate={true}
        />

        {/* TWO COLUMN LAYOUT */}
        <div className="flex flex-col md:flex-row gap-10 items-stretch">

          {/* LEFT COLUMN: ID CARD */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full md:w-[45%] flex flex-col"
            style={{
              background: 'rgba(10,10,15,0.8)',
              border: '1px solid rgba(168,85,247,0.25)',
              borderRadius: '10px',
              boxShadow: '0 0 30px rgba(168,85,247,0.06)',
              fontFamily: 'var(--font-mono), monospace',
            }}
          >
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', borderBottom: '1px solid rgba(168,85,247,0.15)' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(168,85,247,0.5)' }}></span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(168,85,247,0.5)' }}></span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(168,85,247,0.5)' }}></span>
              </div>
              <span style={{ fontSize: '11px', color: 'rgba(168,85,247,0.7)', marginLeft: '8px', letterSpacing: '1px' }}>IDENTITY_SCAN.exe</span>
            </div>

            {/* Photo & Details */}
            <div style={{ padding: '2rem 1.5rem', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <div style={{ position: 'relative', width: 100, height: 100 }}>
                <div style={{
                  position: 'absolute', inset: -8, borderRadius: '50%',
                  border: '1px dashed rgba(168,85,247,0.5)',
                  animation: 'spin 10s linear infinite'
                }}></div>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  border: '2px solid rgba(168,85,247,0.8)',
                  boxShadow: '0 0 20px rgba(168,85,247,0.3)',
                  background: 'rgba(168,85,247,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(168,85,247,0.8)', fontSize: '24px', fontWeight: 'bold'
                }}>
                  AA
                </div>
              </div>
            </div>

            <div style={{ width: '100%', height: '1px', background: 'rgba(168,85,247,0.15)', marginBottom: '1.5rem' }}></div>

            <motion.div variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
              {idLines.map((line, i) => (
                <motion.div key={i} variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1rem' }}>
                  <span style={{ color: 'rgba(168,85,247,0.5)', fontSize: '11px', alignSelf: 'center' }}>{line.label}:</span>
                  <span style={{ color: 'white', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {line.isStatus && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'pulse 2s infinite' }}></span>}
                    {!line.isStatus && line.value}
                    {line.isStatus && line.value.replace('● ', '')}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <div style={{ width: '100%', height: '1px', background: 'rgba(168,85,247,0.15)', marginBottom: '1.5rem' }}></div>

            <motion.div variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {clearanceLines.map((line, i) => (
                <motion.div key={i} variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '1rem' }}>
                  <span style={{ color: 'rgba(168,85,247,0.5)', fontSize: '11px', alignSelf: 'center' }}>{line.label}:</span>
                  <span style={{ color: 'white', fontSize: '13px' }}>{line.value}</span>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </motion.div>

      {/* RIGHT COLUMN: BIO */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-[55%] flex flex-col justify-center"
      >
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                // CS student. Security engineer in progress.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: 'Inter, var(--font-sans), sans-serif', fontSize: '0.88rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.7)' }}>
            I'm Abinav Aaditya, a CS student who's genuinely obsessed with building systems that scale and secure ecosystems.<br /><br />
            My interests sit at the intersection of <span className="text-red-400">cybersecurity</span>, <span className="text-purple-400">machine learning</span>, and <span className="text-blue-400">full-stack development</span>.
          </p>
          <p style={{ fontFamily: 'Inter, var(--font-sans), sans-serif', fontSize: '0.88rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.7)' }}>
            From training ML models on real network traffic to shipping live, glassmorphic dashboards, I optimize for technical depth over shortcuts. I'm always searching for the next hard problem.
          </p>
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.75rem', color: 'rgba(168,85,247,0.8)', marginBottom: '1rem', letterSpacing: '1px' }}>
            CURRENTLY_RUNNING
          </div>
          <motion.div variants={processListVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {processes.map((proc, i) => {
              const [label, ...rest] = proc.split(': ');
              return (
                <motion.div key={i} variants={itemVariants} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.75rem', display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'rgba(168,85,247,0.7)' }}>{label}:</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>{rest.join(': ')}</span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>

        {/* STAT COUNTERS ROW */ }
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
    {stats.map((stat, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.8 + i * 0.1, type: "spring" }}
        whileHover={{ y: -4, borderColor: 'rgba(168,85,247,0.5)', boxShadow: '0 10px 30px -10px rgba(168,85,247,0.2)' }}
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '1.5rem',
          display: 'flex', flexDirection: 'column', gap: '12px',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ color: 'rgba(168,85,247,0.8)' }}>
          {stat.icon}
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-heading), sans-serif', lineHeight: 1 }}>
            <AnimatedCounter from={0} to={stat.value} duration={1.2} />{stat.suffix}
          </div>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.65rem', color: 'rgba(168,85,247,0.7)', letterSpacing: '1px', marginTop: '8px', marginBottom: '4px' }}>
            {stat.label}
          </div>
          <div style={{ fontFamily: 'Inter, var(--font-sans), sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
            {stat.sub}
          </div>
        </div>
      </motion.div>
    ))}
  </div>

      </div >

    <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
        }
      `}</style>
    </section >
  );
}
