import { motion } from 'framer-motion';
import { Shield, BrainCircuit, Cloud, Globe, Code2, Terminal } from 'lucide-react';

const skillsData = [
  { 
    category: "Cybersecurity", 
    icon: Shield,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    shadow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]",
    items: ["Wireshark", "Network Security", "Penetration Testing", "Scapy"] 
  },
  { 
    category: "Machine Learning", 
    icon: BrainCircuit,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    shadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    items: ["Python", "TensorFlow", "XGBoost", "Scikit-learn", "Pandas"] 
  },
  { 
    category: "Cloud & DevOps", 
    icon: Cloud,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    shadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    items: ["AWS / GCP", "Docker", "Linux", "CI/CD"] 
  },
  { 
    category: "Web Engineering", 
    icon: Globe,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    shadow: "hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]",
    items: ["React", "FastAPI", "Node.js", "Tailwind CSS"] 
  },
  { 
    category: "Core Languages", 
    icon: Code2,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    shadow: "hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]",
    items: ["Python", "Java", "JavaScript", "C++"] 
  },
  { 
    category: "Tools & Env", 
    icon: Terminal,
    color: "text-gray-400",
    bg: "bg-gray-400/10",
    border: "border-gray-400/20",
    shadow: "hover:shadow-[0_0_30px_rgba(156,163,175,0.2)]",
    items: ["VS Code / Vibe", "Git / GitHub", "Postman", "Bash"] 
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function Skills() {
  return (
    <section id="skills" className="w-full py-24 flex items-center justify-center max-w-6xl mx-auto px-6 relative z-10">
      <div className="w-full flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Core Arsenal</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies I've mastered to build secure, performant, and intelligent applications.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillsData.map((skillGroup, idx) => {
            const Icon = skillGroup.icon;
            
            return (
              <motion.div 
                key={skillGroup.category} 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`glass p-8 rounded-2xl flex flex-col border transition-all duration-300 group ${skillGroup.border} ${skillGroup.shadow}`}
              >
                <div className="flex items-center gap-4 mb-6 relative">
                  <div className={`p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 ${skillGroup.bg} ${skillGroup.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400">
                    {skillGroup.category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {skillGroup.items.map((skill) => (
                    <div 
                      key={skill}
                      className="px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
}
