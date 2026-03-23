import { motion } from 'framer-motion';
import { ExternalLink, Github, Activity, Brain, Shield } from 'lucide-react';

const projectsData = [
  {
    title: "Mini Cloud SOC (Security Operations Center)",
    tags: ["Cloud Computing", "Cybersecurity", "Real-Time"],
    description: "An ML-powered network intrusion detection system that identifies DDoS, port scanning, and MITM attacks in real time using network traffic anomalies. Built on the CICIDS 2017 dataset with XGBoost classification, a FastAPI backend, WebSocket streaming, and a live React dashboard.",
    stack: ["PowerShell", "Windows OS", "Windows Forms (GUI alerts)", "File System Monitoring", "Log Management"],
    github: "https://github.com/sectechsociety/CloudSEC-Sandbox",
    icon: Activity,
    featured: true,
  },
  {
    title: "Snake AI - Reinforcement Learning Agent",
    tags: ["Machine Learning", "Reinforcement Learning", "Deep Learning"],
    description: "A Deep Q-Learning based agent that learns to play Snake through trial and error. The model improves its performance over multiple games using reward-based learning, experience replay, and epsilon-greedy exploration. Includes real-time training visualization (score vs episodes) to track learning progress.",
    stack: ["Python", "PyTorch", "Pygame", "NumPy", "Matplotlib"],
    github: "https://github.com/balasaravanank/snake-ai-pytorch",
    icon: Brain,
    featured: true,
  },
  {
    title: "JWT Attack & Defence Lab",
    tags: ["Security", "Web", "AppSec"],
    description: "Implemented 6 real-world JWT attacks — alg:none, key confusion, brute-force, kid injection, jku spoofing, and claim tampering — then built a hardened auth service that blocks all of them.",
    stack: ["Python", "Flask", "PyJWT", "Cryptography"],
    icon: Shield,
    placeholder: true,
  }
];

export default function Projects() {
  return (
    <section id="projects" className="w-full py-24 flex items-center justify-center max-w-6xl mx-auto px-6 relative z-10">
      <div className="w-full">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Work</h2>
            <div className="h-[2px] w-24 bg-accent-purple rounded-full"></div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-12">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`glass rounded-2xl p-8 md:p-10 border transition-all duration-500 group ${project.featured
                ? 'border-accent-purple/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] hover:border-accent-purple/60'
                : 'border-white/5 opacity-80 hover:opacity-100'
                }`}
            >
              <div className="flex flex-col md:flex-row gap-8 justify-between">

                <div className="flex-1 flex flex-col items-start text-left">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-mono uppercase bg-white/5 text-gray-300 rounded-md border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-accent-blue transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl text-lg">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.stack.map((tech) => (
                      <span key={tech} className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple/50"></span>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {!project.placeholder && (
                    <div className="flex gap-4 mt-auto">
                      <a
                        href={project.github}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                      >
                        <Github size={18} />
                        Code
                      </a>
                    </div>
                  )}

                  {project.placeholder && (
                    <div className="mt-auto inline-flex items-center px-4 py-2 rounded-lg bg-white/5 text-gray-500 font-mono text-sm border border-white/5">
                      Building...
                    </div>
                  )}
                </div>

                {project.featured && (
                  <div className="hidden md:flex w-1/3 bg-base-800 rounded-xl border border-white/5 overflow-hidden relative items-center justify-center p-6 shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.1)_0,transparent_100%)]"></div>
                    <div className="absolute top-4 left-4 right-4 h-6 border-b border-white/5 flex gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/50"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/50"></span>
                    </div>
                    {/* Abstract placeholder for the dashboard visualization */}
                    {project.icon ? <project.icon size={64} className="text-accent-blue/30 mt-8" /> : <Activity size={64} className="text-accent-blue/30 mt-8" />}
                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
