import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Modal } from '../components/ui/Modal';
import { 
  Folder, Eye, Code, CheckCircle2, TrendingUp,
  Activity, ArrowRight, Server, Cloud, Wrench, XCircle, Lock
} from 'lucide-react';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { usePortfolioData } from '../../context/PortfolioDataContext';

// --- Animated Counter ---
function AnimatedCounter({ value, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;
    const duration = 1500;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * value));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// --- Mock Data ---
const TIMELINE_DATA = [
  { id: 1, time: '2 hours ago',  action: 'Updated project: IDS System description',   icon: Folder,       color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
  { id: 2, time: '1 day ago',    action: 'Added skill: Docker',                        icon: Code,         color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  { id: 3, time: '3 days ago',   action: 'Changed hero tagline',                       icon: Activity,     color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  { id: 4, time: '1 week ago',   action: 'Added certificate: ML Specialization',       icon: CheckCircle2, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  { id: 5, time: '2 weeks ago',  action: 'Initial portfolio deploy',                   icon: Cloud,        color: '#06b6d4', bg: 'rgba(6,182,212,0.12)' },
];

const STACK_DATA = [
  { name: 'Frontend',  value: 40, color: '#3b82f6' },
  { name: 'Backend',   value: 25, color: '#a855f7' },
  { name: 'ML',        value: 15, color: '#ec4899' },
  { name: 'Cybersec',  value: 10, color: '#22c55e' },
  { name: 'Tools',     value: 10, color: '#f59e0b' },
];

const HEALTH_CHECKLIST = [
  { label: 'Hero section complete',           status: true  },
  { label: 'Projects added (5)',              status: true  },
  { label: 'Skills listed (18)',              status: true  },
  { label: 'Resume uploaded',                 status: false },
  { label: 'All project screenshots added',   status: false },
  { label: 'Blog section active',             status: false },
];

// --- Stat Card component (inline for Dashboard) ---
function DashStatCard({ label, value, trend, positive, icon: Icon, accent = '#a855f7' }) {
  return (
    <div className="admin-card relative overflow-hidden group hover:-translate-y-0.5 transition-all duration-150">
      <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity"
        style={{ background: `${accent}22` }} />
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="admin-stat-card-label">{label}</span>
          {Icon && (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}22` }}>
              <Icon className="w-4 h-4" style={{ color: accent }} />
            </div>
          )}
        </div>
        <div className="admin-stat-card-value"><AnimatedCounter value={typeof value === 'number' ? value : parseInt(value) || 0} suffix={typeof value === 'string' && value.includes('%') ? '%' : ''} /></div>
        {trend && (
          <div className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full self-start ${positive ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/40'}`}>
            {positive && <TrendingUp className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Main Dashboard ---
export function Dashboard() {
  const { data } = usePortfolioData();
  const [time, setTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalProjects = (data.projects || []).length;
  const totalSkills = (data.skills || []).reduce((acc, g) => acc + (g.skills || []).length, 0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const h = time.getHours();
    if (h < 12) return 'GOOD MORNING';
    if (h < 18) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } }
  };
  const containerVariants = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.08 } }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 w-full pb-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-[26px] font-bold font-mono tracking-tight text-white">
              {getGreeting()}, ADMIN
            </h1>
            <p className="mt-1.5 text-[13px] text-white/40 font-mono flex items-center gap-3">
              {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              <span className="opacity-40">|</span>
              {time.toLocaleTimeString('en-US', { hour12: true })}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] font-mono font-semibold text-green-400 tracking-widest">PORTFOLIO: LIVE</span>
          </div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">

          {/* Row 1: Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <motion.div variants={itemVariants}>
              <DashStatCard label="Total Projects" value={totalProjects} trend="+2 this month" positive icon={Folder} accent="#a855f7" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashStatCard label="Portfolio Views" value={1247} trend="+18% this week" positive icon={Eye} accent="#3b82f6" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashStatCard label="Skills Listed" value={totalSkills} trend="Updated 2 days ago" positive={false} icon={Code} accent="#06b6d4" />
            </motion.div>
            <motion.div variants={itemVariants}>
              {/* Profile Completion — progress bar */}
              <div className="admin-card relative overflow-hidden group hover:-translate-y-0.5 transition-all duration-150">
                <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-20" style={{ background: 'rgba(34,197,94,0.2)' }} />
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="admin-stat-card-label">Profile Completion</span>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)' }}>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                  <div className="admin-stat-card-value"><AnimatedCounter value={78} suffix="%" /></div>
                  <div className="w-full h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '78%' }}
                      transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                      className="h-full rounded-full bg-green-400"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2: Activity + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Recent Activity */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="admin-card h-full flex flex-col">
                <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-[14px] font-semibold text-white">Recent Activity</h3>
                  <span className="text-[11px] font-mono text-white/30">LAST 2 WEEKS</span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="relative border-l border-white/6 ml-3 space-y-6 flex-1">
                    {TIMELINE_DATA.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.id} className="relative pl-7">
                          <span className="absolute -left-[17px] top-0.5 w-7 h-7 rounded-full flex items-center justify-center ring-4 ring-[#0a0a0f]"
                            style={{ background: item.bg }}>
                            <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                          </span>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <p className="text-[13px] text-white/80">{item.action}</p>
                            <span className="text-[11px] text-white/30 font-mono whitespace-nowrap">{item.time}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-6 w-full py-2.5 text-[13px] font-medium text-white/40 hover:text-white border border-white/6 hover:border-white/12 rounded-lg transition-colors"
                  >
                    LOAD MORE
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="admin-card h-full flex flex-col">
                <div className="px-5 py-4 border-b border-white/5">
                  <h3 className="text-[14px] font-semibold text-white">Quick Actions</h3>
                </div>
                <div className="p-5 flex-1 flex flex-col gap-3">
                  {[
                    { label: '+ ADD PROJECT', icon: Folder, accent: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.15)' },
                    { label: '+ ADD SKILL',   icon: Code,   accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.15)' },
                    { label: 'EDIT HERO',     icon: Wrench, accent: 'rgba(255,255,255,0.6)', bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.06)' },
                    { label: 'UPDATE RESUME', icon: CheckCircle2, accent: 'rgba(255,255,255,0.6)', bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.06)' },
                  ].map((/* eslint-disable-next-line no-unused-vars */ { label, icon: Icon, accent, bg, border }) => (
                    <button
                      key={label}
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center justify-between w-full px-4 py-3 text-left rounded-lg transition-all cursor-pointer"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <span className="text-[13px] font-semibold" style={{ color: accent }}>{label}</span>
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: accent, opacity: 0.7 }} />
                    </button>
                  ))}
                  <div className="flex-1" />
                  <button
                    onClick={() => window.open('/', '_blank')}
                    className="btn-admin-primary w-full justify-center"
                  >
                    VIEW PORTFOLIO <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 3: Health + Stack + Deploy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Portfolio Health */}
            <motion.div variants={itemVariants}>
              <div className="admin-card h-full">
                <div className="px-5 py-4 border-b border-white/5">
                  <h3 className="text-[14px] font-semibold text-white">Portfolio Health</h3>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-[32px] font-bold text-white leading-none"><AnimatedCounter value={67} suffix="%" /></span>
                    <span className="text-[12px] text-white/40">Overall Score</span>
                  </div>
                  <ul className="space-y-3">
                    {HEALTH_CHECKLIST.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        {item.status
                          ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          : <XCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.15)' }} />}
                        <span className="text-[13px]" style={{ color: item.status ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.3)' }}>
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Stack Distribution */}
            <motion.div variants={itemVariants}>
              <div className="admin-card h-full flex flex-col">
                <div className="px-5 py-4 border-b border-white/5">
                  <h3 className="text-[14px] font-semibold text-white">Stack Distribution</h3>
                </div>
                <div className="p-5 flex-1 flex flex-col items-center min-h-[220px]">
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={STACK_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value" stroke="none">
                        {STACK_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: '#13131a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, color: '#fff', fontSize: 12 }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
                    {STACK_DATA.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[11px] text-white/40">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Last Deploy */}
            <motion.div variants={itemVariants}>
              <div className="admin-card h-full flex flex-col" style={{ background: '#0d0d12' }}>
                <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
                  <Server className="w-4 h-4 text-white/30" />
                  <h3 className="text-[14px] font-semibold text-white">Last Deploy</h3>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between font-mono text-[13px]">
                  <div className="space-y-4 text-white/40">
                    {[
                      { key: 'PLATFORM',   val: 'Vercel',                    valClass: 'text-white' },
                      { key: 'BRANCH',     val: 'main',                      valClass: 'text-blue-400' },
                      { key: 'STATUS',     val: '● LIVE',                    valClass: 'text-green-400' },
                      { key: 'BUILD TIME', val: '23s',                       valClass: 'text-white' },
                    ].map(({ key, val, valClass }) => (
                      <div key={key} className="flex justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                        <span>{key}</span>
                        <span className={valClass}>{val}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-admin-secondary w-full justify-center mt-5"
                  >
                    [ REDEPLOY ]
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Coming Soon Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="UNDER_DEVELOPMENT">
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.12)' }}>
            <Lock className="w-7 h-7 text-[#a855f7]" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-white mb-1 font-mono">COMING SOON</h3>
            <p className="text-[13px] text-white/45">
              This feature is currently under development. Real CRUD operations will be connected to the backend soon.
            </p>
          </div>
          <button onClick={() => setIsModalOpen(false)} className="btn-admin-primary mt-2 px-8">
            Understood
          </button>
        </div>
      </Modal>
    </AdminLayout>
  );
}
