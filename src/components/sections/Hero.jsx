
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';

const roles = [
  "Full-Stack Developer",
  "ML Engineer",
  "Cybersecurity Enthusiast",
  "Hackathon Builder"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="w-full min-h-screen flex items-center justify-center max-w-6xl mx-auto px-6 relative">
      <div className="flex flex-col items-start w-full relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-accent-blue font-mono mb-4 flex items-center gap-2"
        >
          <span className="w-8 h-[1px] bg-accent-blue inline-block"></span>
          Welcome Setup
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4 text-white"
        >
          Hi, I'm Abinav Aaditya.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-12 md:h-16 flex items-center overflow-hidden mb-8"
        >
          <p className="text-xl md:text-3xl lg:text-4xl font-medium text-gray-400 mr-2">
            Curious learner with strong problem-solving mindset
          </p>
          <div className="relative h-full flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-purple absolute left-0 whitespace-nowrap"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-400 max-w-xl text-lg mb-12 leading-relaxed"
        >
          Bridging the gap between intelligent algorithms and robust web architectures.
          Specializing in zero-to-one product engineering with a deep focus on security.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-accent-blue text-base-900 font-bold hover:bg-accent-blue/90 transition-all shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:shadow-[0_0_30px_rgba(0,245,255,0.6)]"
          >
            View My Work <ArrowDown size={18} />
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-8 py-3 rounded-full border border-gray-600 text-white font-medium hover:border-accent-purple hover:bg-accent-purple/10 transition-all"
          >
            <Download size={18} className="text-gray-300" /> Resume
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer flex flex-col items-center gap-2 text-gray-500 hover:text-accent-blue transition-colors"
      >
        <span className="text-sm font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
