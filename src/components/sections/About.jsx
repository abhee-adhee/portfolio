import { motion } from 'framer-motion';
import { Terminal, Database, Shield, Zap, Target, Cpu, Activity, Coffee } from 'lucide-react';

export default function About() {
  const stats = [
    { label: "Hackathons", value: "2+", icon: <Terminal size={20} className="text-accent-blue" />, color: "from-accent-blue/20 to-transparent", border: "hover:border-accent-blue/50" },
    { label: "Projects", value: "5+", icon: <Database size={20} className="text-accent-purple" />, href: "#projects", color: "from-accent-purple/20 to-transparent", border: "hover:border-accent-purple/50" },
    { label: "Stack", value: "Full", icon: <Shield size={20} className="text-emerald-400" />, href: "#skills", color: "from-emerald-500/20 to-transparent", border: "hover:border-emerald-500/50" },
  ];

  const focusAreas = [
    { text: "Advanced Penetration Testing", icon: <Target size={16} className="text-red-400" /> },
    { text: "Reinforcement Learning Agents", icon: <Cpu size={16} className="text-purple-400" /> },
    { text: "Scalable Web Architectures", icon: <Activity size={16} className="text-blue-400" /> },
  ];

  return (
    <section id="about" className="w-full min-h-screen py-24 flex items-center justify-center max-w-6xl mx-auto px-6 relative z-10">

      {/* Background ambient blobs specifically for About */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 w-full">

        {/* Left Side: Terminal Window Bio */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 flex flex-col"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">About Me</h2>
            <div className="h-[2px] w-24 bg-gradient-to-r from-accent-blue to-transparent"></div>
          </div>

          <div className="glass rounded-xl overflow-hidden shadow-2xl border border-white/10 flex-1 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            {/* Terminal Top Bar */}
            <div className="bg-base-900/80 px-4 py-3 flex items-center border-b border-white/5 relative z-10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <p className="ml-4 text-xs font-mono text-gray-400">aadhi@portfolio: ~/about</p>
            </div>

            {/* Terminal Content */}
            <div className="p-6 md:p-8 font-mono text-sm md:text-base relative z-10 flex flex-col gap-5">
              <div>
                <span className="text-accent-blue">➜</span> <span className="text-accent-purple">~</span> <span className="text-white">whoami</span>
              </div>
              <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-white/10">
                I'm Abinav Aaditya, a CS student who's genuinely obsessed with building systems that scale and secure ecosystems.<br /><br />
                My interests sit at the intersection of <span className="text-red-400">cybersecurity</span>, <span className="text-purple-400">machine learning</span>, and <span className="text-blue-400">full-stack development</span>.
              </p>

              <div>
                <span className="text-accent-blue">➜</span> <span className="text-accent-purple">~</span> <span className="text-white">cat mindset.txt</span>
              </div>
              <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-white/10">
                From training ML models on real network traffic to shipping live, glassmorphic dashboards, I optimize for technical depth over shortcuts. I'm always searching for the next hard problem.
              </p>

              <div className="mt-2 flex items-center gap-2 animate-pulse">
                <span className="text-accent-blue">➜</span> <span className="text-accent-purple">~</span> <span className="w-2 h-5 bg-white inline-block"></span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Stats & Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 pt-0 lg:pt-16">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, i) => {
              const Component = stat.href ? motion.a : motion.div;
              return (
                <Component
                  key={stat.label}
                  href={stat.href}
                  initial={{ scale: 0.9, opacity: 0, y: 30 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.5, type: "spring" }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`glass p-6 rounded-2xl flex flex-col items-start gap-4 border border-white/5 transition-all duration-300 overflow-hidden relative group ${i === 2 ? 'sm:col-span-2' : ''} ${stat.href ? 'cursor-pointer' : ''} ${stat.border}`}
                >
                  {/* Background gradient injection */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 relative z-10 backdrop-blur-md">
                    {stat.icon}
                  </div>
                  <div className="relative z-10">
                    <motion.h3
                      className="text-4xl md:text-5xl font-black text-white mb-1 tracking-tight"
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="text-sm font-mono text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      {stat.label}
                      {stat.href && <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"></span>}
                    </p>
                  </div>
                </Component>
              );
            })}
          </div>

          {/* Current Focus / Vibe Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass p-6 md:p-8 rounded-2xl border border-white/5 flex-1 relative overflow-hidden group hover:border-accent-blue/30 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-bl-[100px] pointer-events-none"></div>

            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap size={20} className="text-accent-blue" /> Currently Exploring
            </h3>

            <div className="flex flex-col gap-4">
              {focusAreas.map((focus, idx) => (
                <div key={idx} className="flex items-center gap-4 group/item">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover/item:border-white/20 transition-colors">
                    {focus.icon}
                  </div>
                  <p className="text-gray-300 font-medium group-hover/item:text-white transition-colors">
                    {focus.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm font-mono text-gray-500 flex items-center gap-2">
                <Coffee size={14} /> Fueled by caffeine & curiosity
              </span>
              <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono border border-white/10">
                v2.0
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
