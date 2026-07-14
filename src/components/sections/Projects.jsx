import { motion } from 'framer-motion';

import { ExternalLink, Github, Activity, Brain, Shield, Radio, BookOpen } from 'lucide-react';

const projectsData = [
  {
    id: 'sentinel-ids',
    codename: 'SENT_01',
    title: 'Sentinel IDS',
    subtitle: 'Network Intrusion Detection System',
    tags: ['Cybersecurity', 'Python', 'Real-Time'],
    status: 'IN_PROGRESS',
    description: 'A Python-based Network IDS built from scratch featuring real-time packet capture via Scapy, modular detection engine for SYN Flood & Port Scan attacks, SQLite alert logging, live SOC-style dashboard with charts, PDF/TXT report generation, and offline PCAP analysis support.',
    stack: ['Python', 'Scapy', 'SQLite', 'FastAPI', 'React'],
    github: 'https://github.com/abhee-adhee',
    demo: null,
    icon: Shield,
    featured: true,
    highlights: [
      'Real-time packet capture via Scapy',
      'SYN Flood + Port Scan detection',
      'Live SOC dashboard with analytics',
      'PDF & TXT report generation',
    ],
  },
  {
    id: 'voice-for-all',
    codename: 'VSOC_02',
    title: 'VoiceForAll',
    subtitle: 'IBM Z Datathon — Accessibility Platform',
    tags: ['NLP', 'Data Science', 'Social Impact'],
    status: 'DEPLOYED',
    description: 'Empowers individuals with disabilities to report accessibility barriers via text or voice. Uses TextBlob NLP for sentiment and urgency analysis, visualizes reports on an interactive Plotly map, and surfaces actionable insights for NGOs and policymakers.',
    stack: ['Streamlit', 'Python', 'TextBlob', 'Plotly', 'SQLite', 'Pandas'],
    github: 'https://github.com/abhee-adhee',
    demo: null,
    icon: Radio,
    featured: true,
    highlights: [
      'Text & voice report submission',
      'Sentiment & urgency NLP analysis',
      'Interactive geolocation map',
      'Live on Streamlit Cloud',
    ],
  },
  {
    id: 'mini-soc',
    codename: 'SOC_03',
    title: 'Mini SOC',
    subtitle: 'Security Operations Center Demo',
    tags: ['Cybersecurity', 'SOC', 'Windows'],
    status: 'DEPLOYED',
    description: 'A SOC monitoring and defense demonstration using Windows Defender integration and a custom PowerShell SOC monitor. Simulates real analyst workflows with live alert triage, file system monitoring, and log management.',
    stack: ['PowerShell', 'Windows Defender', 'Windows Forms', 'File System Monitor', 'Log Management'],
    github: 'https://github.com/sectechsociety/CloudSEC-Sandbox',
    demo: null,
    icon: Activity,
    featured: true,
    highlights: [
      'Windows Defender integration',
      'Custom PowerShell SOC monitor',
      'Live alert triage workflow',
      'File system & log monitoring',
    ],
  },
  {
    id: 'edumate',
    codename: 'EDU_04',
    title: 'EduMate',
    subtitle: 'ITERYX\'25 — Emotion-Aware Learning',
    tags: ['ML', 'Computer Vision', 'EdTech'],
    status: 'DEPLOYED',
    description: 'Adaptive learning platform using live facial expression recognition to continuously detect engagement, confusion, and frustration. Automatically adjusts content pacing based on real-time cognitive load and provides scaffolded hints with comprehensive session analytics.',
    stack: ['FER', 'FastAPI', 'WebSockets', 'React', 'Python', 'OpenCV'],
    github: 'https://github.com/abhee-adhee',
    demo: null,
    icon: Brain,
    featured: true,
    highlights: [
      'Live facial expression recognition',
      'Real-time adaptive pacing',
      'Scaffolded contextual hints',
      'Post-session emotion analytics',
    ],
  },
  {
    id: 'policy-sandbox',
    codename: 'SAND_05',
    title: 'Agent Execution Sandbox',
    subtitle: 'Agentic AI Security Research',
    tags: ['AI Security', 'Research', 'Systems'],
    status: 'PLANNED',
    description: 'Runtime policy enforcement for LLM-based autonomous agents using a 3-layer model: static OPA policy declaration, Linux seccomp/ptrace syscall interception, and LSTM behavioral anomaly detection. Targets prompt injection, jailbreaks, and lateral movement.',
    stack: ['Python', 'seccomp', 'ptrace', 'OPA', 'LangChain', 'LSTM', 'FastAPI', 'Docker'],
    github: null,
    demo: null,
    icon: Shield,
    featured: false,
    highlights: [
      'OPA static policy declaration',
      'Linux seccomp/ptrace interception',
      'LSTM behavioral anomaly detection',
      'Prompt injection defense',
    ],
  },
];

const statusConfig = {
  DEPLOYED:    { label: 'DEPLOYED ✓',     color: '#4ade80', bg: 'rgba(74,222,128,0.08)',   border: 'rgba(74,222,128,0.3)' },
  IN_PROGRESS: { label: 'IN_PROGRESS ⚙',  color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.3)' },
  PLANNED:     { label: 'UNDER_PLANNING', color: '#6366f1', bg: 'rgba(99,102,241,0.08)',   border: 'rgba(99,102,241,0.3)' },
};

import SectionHeading from '../SectionHeading';

export default function Projects() {
  return (
    <section id="projects" className="w-full py-24 flex items-center justify-center max-w-6xl mx-auto px-6 relative z-10">
      <div className="w-full">

        <SectionHeading
          pageLabel="SYSTEM_DEPLOYMENTS"
          title="Engineered Solutions"
          subtitle="Solving hard problems with scalable architectures."
          metaLines={[
            { label: "> RECENT BUILD:", value: "Sentinel IDS Engine" },
            { label: "> ARCHITECTURE:", value: "Event-Driven & Real-Time" }
          ]}
          accent="var(--accent-violet)"
          cursor={true}
          animate={true}
        />

        {/* Cards */}
        <div className="flex flex-col gap-8">
          {projectsData.map((project, idx) => {
            const st = statusConfig[project.status];
            const Icon = project.icon || Activity;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                className="glass rounded-2xl overflow-hidden border transition-all duration-500 group"
                style={{
                  borderColor: project.status === 'PLANNED'
                    ? 'rgba(99,102,241,0.2)'
                    : project.featured
                    ? 'rgba(168,85,247,0.25)'
                    : 'rgba(255,255,255,0.05)',
                  borderStyle: project.status === 'PLANNED' ? 'dashed' : 'solid',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(168,85,247,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = project.status === 'PLANNED'
                    ? 'rgba(99,102,241,0.2)'
                    : project.featured ? 'rgba(168,85,247,0.25)' : 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Terminal bar */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(0,0,0,0.2)',
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', marginLeft: 6 }}>
                    {project.codename}_{project.id.toUpperCase().replace(/-/g, '_')}.exe
                  </span>
                  <span style={{
                    marginLeft: 'auto',
                    fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                    color: st.color, background: st.bg,
                    border: `1px solid ${st.border}`,
                    padding: '1px 8px', borderRadius: 2, letterSpacing: '0.08em',
                  }}>
                    {st.label}
                  </span>
                </div>

                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8 justify-between">

                    {/* Left — content */}
                    <div className="flex-1 flex flex-col items-start text-left">

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 text-xs font-mono uppercase rounded-md border"
                            style={{ background: 'rgba(168,85,247,0.06)', borderColor: 'rgba(168,85,247,0.2)', color: 'rgba(168,85,247,0.8)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-accent-purple transition-colors"
                        style={{ fontFamily: 'var(--font-subheading)', letterSpacing: '0.06em' }}>
                        {project.title}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-violet)', letterSpacing: '0.08em', marginBottom: 16, opacity: 0.8 }}>
                        {project.subtitle}
                      </p>

                      <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl" style={{ fontSize: '0.9rem' }}>
                        {project.description}
                      </p>

                      {/* Stack */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {project.stack.map(tech => (
                          <span key={tech} className="text-sm font-medium text-gray-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(168,85,247,0.5)' }} />
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 mt-auto flex-wrap">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border transition-all"
                            style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.1)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                          >
                            <Github size={16} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em' }}>SOURCE</span>
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all"
                            style={{ background: 'var(--accent-violet)', color: 'white', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                            <ExternalLink size={16} />
                            LIVE_DEMO
                          </a>
                        )}
                        {project.status === 'PLANNED' && (
                          <span className="flex items-center px-4 py-2.5 rounded-lg border"
                            style={{ background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.2)', color: 'rgba(99,102,241,0.8)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                            UNDER_PLANNING...
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right — highlights panel */}
                    {project.featured && (
                      <div className="hidden md:flex w-72 rounded-xl border overflow-hidden relative flex-col"
                        style={{ background: 'rgba(10,10,15,0.5)', borderColor: 'rgba(168,85,247,0.15)' }}>
                        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(168,85,247,0.1)', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(168,85,247,0.5)', letterSpacing: '0.12em' }}>
                          KEY_FEATURES.log
                        </div>
                        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {project.highlights.map((h, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#4ade80', marginTop: 2, flexShrink: 0 }}>&gt;</span>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{h}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(168,85,247,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon size={28} style={{ color: 'rgba(168,85,247,0.25)' }} />
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}