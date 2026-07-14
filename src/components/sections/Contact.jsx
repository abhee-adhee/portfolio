import { motion } from 'framer-motion';

import { Mail, Github, Linkedin } from 'lucide-react';

import SectionHeading from '../SectionHeading';

export default function Contact() {
  return (
    <section id="contact" className="w-full py-32 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 relative z-10 text-center">

      <SectionHeading
        pageLabel="SECURE_CHANNEL"
        title="Initiate Handshake"
        subtitle="Open for collaboration, security research, and engineering roles."
        metaLines={[
          { label: "> PROTOCOL:", value: "Asynchronous Comm" },
          { label: "> RESPONSE TIME:", value: "< 24 Hours" }
        ]}
        accent="var(--accent-blue)"
        align="center"
        cursor={true}
        animate={true}
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12"
      >
        I'm currently looking for new opportunities and my inbox is always open.
        Whether you have a question, a project idea, or just want to say hi,
        I'll try my best to get back to you!
      </motion.p>

      <motion.a
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        href="mailto:abinavaaditya@gmail.com"
        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 border border-accent-blue/30 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:border-accent-blue transition-all duration-300"
      >
        <Mail size={20} className="text-accent-blue" />
        Say Hello
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-24 flex items-center justify-center gap-6"
      >
        <a href="https://github.com/abhee-adhee" className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-accent-blue transition-all group">
          <Github className="group-hover:scale-110 transition-transform" size={24} />
        </a>
        <a href="https://www.linkedin.com/in/abinav-aaditya-86a952305/" className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-accent-blue transition-all group">
          <Linkedin className="group-hover:scale-110 transition-transform" size={24} />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-gray-600 font-mono text-sm"
      >
        <p>Built by Abinav</p>
        <div className="w-px h-12 bg-gray-800 mx-auto mt-4"></div>
      </motion.div>

    </section>
  );
}
