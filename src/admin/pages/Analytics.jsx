import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StatCard } from '../components/ui/StatCard';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { Users, Clock, ArrowDownRight, Globe2 } from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { ANALYTICS_TREND, TOP_PAGES, DEVICE_DATA, TRAFFIC_SOURCES, RECENT_VISITORS } from '../constants/mockData';

const TOOLTIP_STYLE = {
  backgroundColor: '#13131a',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 8,
  color: '#fff',
  fontSize: 12,
};

function ChartCard({ title, children, height = 260 }) {
  return (
    <div className="admin-card">
      <div className="px-5 py-4 border-b border-white/5">
        <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.1em]">{title}</h3>
      </div>
      <div className="p-4" style={{ height }}>
        {children}
      </div>
    </div>
  );
}

export function Analytics() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[1,2,3,4].map(i => <div key={i} className="admin-skeleton h-28 rounded-xl" />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="admin-skeleton h-[280px] rounded-xl" />
            <div className="admin-skeleton h-[280px] rounded-xl" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-5 px-4 py-3 rounded-lg text-center text-[13px] font-mono"
        style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', color: '#60a5fa' }}>
        <strong>ANALYTICS_PREVIEW</strong> — Connect a real analytics provider (Plausible / Vercel Analytics) to see live data.
      </div>

      <SectionHeader
        title="TRAFFIC_ANALYTICS"
        description="Monitor your portfolio's reach and engagement."
      />

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard label="Total Visitors" value="1,247" trend="+8% this week"   positive={true}  icon={Users}        accentColor="purple" />
        <StatCard label="Avg Session"    value="2m 34s" trend="+12s this week" positive={true}  icon={Clock}        accentColor="blue"   />
        <StatCard label="Bounce Rate"    value="42%"    trend="-2% this week"  positive={true}  icon={ArrowDownRight} accentColor="cyan" />
        <StatCard label="Top Country"    value="India 🇮🇳" trend="45% of traffic" positive={null} icon={Globe2}      accentColor="green"  />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">

        {/* Visitors over time */}
        <ChartCard title="Visitors (30 Days)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ANALYTICS_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Line type="monotone" dataKey="visitors" stroke="#a855f7" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#a855f7' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top pages */}
        <ChartCard title="Top Pages">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={TOP_PAGES} layout="vertical" margin={{ left: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" stroke="rgba(255,255,255,0.2)" fontSize={11} hide />
              <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} width={70} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="views" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Device breakdown */}
        <ChartCard title="Device Breakdown">
          <div className="flex items-center justify-around h-full">
            <ResponsiveContainer width="55%" height="100%">
              <PieChart>
                <Pie data={DEVICE_DATA} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={4} dataKey="value" stroke="none">
                  {DEVICE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-3 pl-4">
              {DEVICE_DATA.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-[12px] text-white/50">{entry.name}</span>
                  <span className="text-[12px] text-white font-medium ml-1">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Traffic Sources */}
        <ChartCard title="Traffic Sources">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={TRAFFIC_SOURCES}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32}>
                {TRAFFIC_SOURCES.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Visitor Log Table */}
      <div className="mb-2">
        <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.1em] mb-4">Live Visitor Log</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ minWidth: 100 }}>Country</th>
                <th style={{ minWidth: 130 }}>IP Address</th>
                <th style={{ minWidth: 100 }}>Page</th>
                <th style={{ minWidth: 90 }}>Duration</th>
                <th style={{ minWidth: 100 }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_VISITORS.map((v, i) => (
                <tr key={i}>
                  <td>{v.country}</td>
                  <td className="font-mono text-[11px] text-white/40">{v.ip}</td>
                  <td className="text-[#a855f7]">{v.page}</td>
                  <td>{v.duration}</td>
                  <td className="font-mono text-[11px] text-white/40">{v.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
