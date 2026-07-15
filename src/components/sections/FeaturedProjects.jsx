import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

/* ── Helpers ─────────────────────────────────────────────── */
function randomPt() { return Math.floor(Math.random() * 80 + 20); }
function initData(n = 20) { return Array.from({ length: n }, () => ({ v: randomPt() })); }

function LiveChart() {
  const [data, setData] = useState(initData);
  useEffect(() => {
    const id = setInterval(() => {
      setData(prev => [...prev.slice(1), { v: randomPt() }]);
    }, 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <ResponsiveContainer width="100%" height={90}>
      <LineChart data={data}>
        <YAxis domain={[0, 100]} hide />
        <Tooltip
          contentStyle={{ background: 'rgba(10,10,15,0.9)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-violet)' }}
          formatter={v => [`${v} pkt/s`]}
          labelFormatter={() => 'TRAFFIC'}
        />
        <Line type="monotone" dataKey="v" dot={false} stroke="#a855f7" strokeWidth={1.5}
          style={{ filter: 'drop-shadow(0 0 4px rgba(168,85,247,0.6))' }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function FastCounter({ target, interval = 80 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setN(p => (p < target ? p + Math.ceil(target / 40) : target));
    }, interval);
    return () => clearInterval(id);
  }, [target, interval]);
  return <>{n.toLocaleString()}</>;
}

/* ── Terminal bar reusable ───────────────────────────────── */
function TerminalBar({ name }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginLeft: 4 }}>{name}</span>
    </div>
  );
}

/* ── Stack chip ──────────────────────────────────────────── */
function Chip({ label, color = 'cyan' }) {
  const colors = {
    cyan: { bg: 'rgba(0,245,255,0.06)', border: 'rgba(0,245,255,0.2)', text: 'var(--accent-cyan-muted)' },
    violet: { bg: 'rgba(168,85,247,0.06)', border: 'rgba(168,85,247,0.2)', text: 'var(--accent-violet)' },
    amber: { bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.2)', text: 'rgba(245,158,11,0.8)' },
    red: { bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.2)', text: 'rgba(239,68,68,0.7)' },
  };
  const c = colors[color] || colors.cyan;
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', padding: '3px 8px', borderRadius: 2, background: c.bg, border: `1px solid ${c.border}`, color: c.text, letterSpacing: '0.04em' }}>
      {label}
    </span>
  );
}

/* ── SENTINEL IDS — Featured Top Card ───────────────────── */
function SentinelCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card"
      style={{ borderRadius: 12, overflow: 'hidden', marginBottom: '1.5rem' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 340 }} className="top-card-grid">

        {/* LEFT */}
        <div style={{ padding: '0 2rem 2rem', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 0 18px', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginLeft: 6 }}>SENTINEL_IDS.exe</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-violet)', letterSpacing: '0.15em' }}>[ SENT_01 ]</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.4)', background: 'rgba(245,158,11,0.08)', padding: '1px 8px', borderRadius: 2, letterSpacing: '0.1em' }}>IN_PROGRESS ⚙</span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-subheading)', letterSpacing: '0.08em', fontWeight: 800, fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 6 }}>
            Sentinel IDS
          </h3>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-violet)', letterSpacing: '0.08em', marginBottom: '1.2rem', opacity: 0.8 }}>
            Network Intrusion Detection System
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.5rem', flex: 1 }}>
            Python-based real-time Network IDS built from scratch. Features packet capture via Scapy, modular detection engine for SYN Flood & Port Scan attacks, SQLite alert logging, live SOC-style dashboard, and PDF report generation.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.5rem' }}>
            {['Python', 'Scapy', 'SQLite', 'FastAPI', 'React'].map(s => <Chip key={s} label={s} color="violet" />)}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/projects/sentinel-ids"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: '#0a0a0f', background: 'var(--accent-violet)', padding: '9px 18px', borderRadius: 3, textDecoration: 'none', fontWeight: 700, boxShadow: '0 0 15px rgba(168,85,247,0.4)', transition: 'transform 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
              [ OPEN_MODULE ]
            </Link>
            <a href="https://github.com/abhee-adhee" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--accent-violet)', border: '1px solid rgba(168,85,247,0.35)', padding: '9px 18px', borderRadius: 3, textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
              [ VIEW_SOURCE ]
            </a>
          </div>
        </div>

        {/* RIGHT — live dashboard */}
        <div style={{ padding: '1.5rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className="glass-card" style={{ padding: '0.75rem', borderRadius: 6, borderLeft: '2px solid #ef4444' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 4 }}>ALERTS_FIRED</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: '#ef4444', textShadow: '0 0 10px rgba(239,68,68,0.5)' }}>
                <FastCounter target={312} interval={40} />
              </div>
            </div>
            <div className="glass-card" style={{ padding: '0.75rem', borderRadius: 6, borderLeft: '2px solid var(--accent-violet)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 4 }}>PKTS_CAPTURED</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-violet)' }}>
                <FastCounter target={54210} interval={18} />
              </div>
            </div>
            <div className="glass-card" style={{ padding: '0.75rem', borderRadius: 6, borderLeft: '2px solid #4ade80' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 4 }}>SOC_STATUS</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'blink 1.5s ease-in-out infinite' }} />
                ACTIVE
              </div>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
              PACKET_STREAM ── LIVE_FEED ──
              <span style={{ color: '#4ade80', marginLeft: 8, animation: 'blink 1s step-end infinite' }}>●</span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 8, border: '1px solid var(--border-color)', padding: '0.75rem 0.5rem 0.25rem', flex: 1, minHeight: 110 }}>
              <LiveChart />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'right', letterSpacing: '0.06em' }}>
              RULES: SYN_FLOOD | PORT_SCAN | PCAP_ANALYSIS
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Small card template ─────────────────────────────────── */
function SmallCard({ delay = 0, codename, exe, title, subtitle, description, stack, status, to, color = 'cyan', special }) {
  const ref = useRef(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    if (special !== 'progress') return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setFill(20), 300); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [special]);

  const statusStyles = {
    DEPLOYED: { color: '#4ade80', border: 'rgba(74,222,128,0.4)', bg: 'rgba(74,222,128,0.08)', label: 'DEPLOYED ✓' },
    IN_PROGRESS: { color: '#f59e0b', border: 'rgba(245,158,11,0.4)', bg: 'rgba(245,158,11,0.08)', label: 'IN_PROGRESS' },
    PLANNED: { color: '#6366f1', border: 'rgba(99,102,241,0.4)', bg: 'rgba(99,102,241,0.08)', label: 'UNDER_PLANNING' },
  };
  const st = statusStyles[status] || statusStyles.DEPLOYED;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className="glass-card"
      style={{
        borderRadius: 10, overflow: 'hidden', minHeight: 260,
        display: 'flex', flexDirection: 'column',
        border: special === 'planned' ? '1px dashed rgba(99,102,241,0.3)' : undefined,
      }}
    >
      <TerminalBar name={exe} />
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-violet)', letterSpacing: '0.15em' }}>{codename}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: st.color, border: `1px solid ${st.border}`, background: st.bg, padding: '1px 8px', borderRadius: 2, letterSpacing: '0.08em' }}>{st.label}</span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-subheading)', letterSpacing: '0.08em', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.2, margin: 0 }}>
          {title}
        </h3>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-violet)', opacity: 0.7 }}>{subtitle}</div>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>
          {description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {stack.map(s => <Chip key={s} label={s} color={color} />)}
        </div>

        {special === 'progress' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'var(--text-muted)' }}>PLANNING_PHASE...</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#6366f1', fontWeight: 700 }}>{fill}%</span>
            </div>
            <div style={{ height: 3, borderRadius: 2, background: 'rgba(99,102,241,0.1)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${fill}%`, background: 'linear-gradient(90deg, rgba(99,102,241,0.6), #6366f1)', borderRadius: 2, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
            </div>
          </div>
        )}

        <Link to={to}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--accent-violet)', border: '1px solid rgba(168,85,247,0.3)', padding: '7px 14px', borderRadius: 3, textDecoration: 'none', textAlign: 'center', marginTop: 'auto', transition: 'background 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
          [ OPEN_MODULE ]
        </Link>
      </div>
    </motion.div>
  );
}

import SectionHeading from '../SectionHeading';

/* ── Main Export ─────────────────────────────────────────── */
export default function FeaturedProjects() {
  return (
    <section id="featured-projects" className="section-container">
      <SectionHeading
        pageLabel="PRIORITY_ASSETS"
        title="Mission Critical"
        subtitle="High-impact systems engineered for resilience."
        metaLines={[
          { label: "> DEPLOYED NODES:", value: "5 Active Environments" },
          { label: "> PRIMARY STACK:", value: "Python, React, TypeScript" }
        ]}
        accent="var(--accent-violet)"
        cursor={true}
        animate={true}
      />

      {/* Featured — Sentinel IDS */}
      <SentinelCard />

      {/* Bottom 4 cards — 2x2 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2.5rem' }} className="bottom-cards-grid">

        <SmallCard
          delay={0}
          codename="[ REC_AI_06 ]"
          exe="AI_RECRUITER.exe"
          title="AI Recruiter Copilot"
          subtitle="Hack2Skill's India Runs - Intelligent Hiring Assistant"
          description="An AI-powered candidate intelligence platform that ranks resumes using semantic embeddings, technical capability analysis, behavioral scoring, and explainable AI."
          stack={['Streamlit', 'Python', 'ML', 'NLP', 'Sentence Transformers']}
          status="DEPLOYED"
          to="/projects/ai-recruiter-copilot"
          color="violet"
        />

        <SmallCard
          delay={0}
          codename="[ VSOC_02 ]"
          exe="VOICE_FOR_ALL.exe"
          title="VoiceForAll"
          subtitle="IBM Z Datathon — Accessibility Platform"
          description="Empowers individuals with disabilities to report accessibility barriers via text or voice. Analyzes reports for sentiment and urgency using NLP, and visualizes trends on an interactive map for NGOs and policymakers."
          stack={['Streamlit', 'Python', 'TextBlob', 'Plotly', 'SQLite', 'Pandas']}
          status="DEPLOYED"
          to="/projects/voice-for-all"
          color="cyan"
        />

        <SmallCard
          delay={0.1}
          codename="[ SOC_03 ]"
          exe="MINI_SOC.exe"
          title="Mini SOC"
          subtitle="SOC Monitoring & Defense Demo"
          description="A Security Operations Center monitoring and defense demonstration using Windows Defender and a custom SOC PowerShell monitor. Simulates real analyst workflows with live alert triage."
          stack={['PowerShell', 'Windows Defender', 'Python', 'SOC']}
          status="DEPLOYED"
          to="/projects/mini-soc"
          color="cyan"
        />

        <SmallCard
          delay={0.2}
          codename="[ EDU_04 ]"
          exe="EDUMATE.exe"
          title="EduMate"
          subtitle="ITERYX'25 — Emotion-Aware Learning"
          description="Adaptive learning platform using live facial expression recognition to detect engagement, confusion, and frustration. Automatically adjusts content pacing and provides scaffolded hints in real time."
          stack={['FER', 'FastAPI', 'WebSockets', 'React', 'Python']}
          status="DEPLOYED"
          to="/projects/edumate"
          color="violet"
        />

        <SmallCard
          delay={0.3}
          codename="[ SAND_05 ]"
          exe="POLICY_SANDBOX.exe"
          title="Agent Execution Sandbox"
          subtitle="Agentic AI Security — Under Planning"
          description="Runtime policy enforcement for LLM-based autonomous agents using syscall interception (seccomp + ptrace), OPA policy engine, and LSTM behavioral anomaly detection. Targets the most urgent unsolved challenge in AI security."
          stack={['Python', 'seccomp', 'OPA', 'LangChain', 'LSTM', 'FastAPI']}
          status="PLANNED"
          to="/projects/policy-sandbox"
          color="amber"
          special="progress"
        />
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center' }}
      >
        <Link
          to="/projects"
          style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--accent-violet)', border: '1px solid rgba(168,85,247,0.35)', padding: '12px 28px', borderRadius: 3, textDecoration: 'none', marginBottom: '1rem', transition: 'background 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.08)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(168,85,247,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          [ VIEW_ALL_MODULES ]
        </Link>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
          TOTAL_PROJECTS: 6 | ACTIVE: 2 | DEPLOYED: 4 | PLANNING: 1
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .top-card-grid { grid-template-columns: 1fr !important; }
          .bottom-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}