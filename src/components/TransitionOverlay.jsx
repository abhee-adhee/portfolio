import { motion } from 'framer-motion';


const overlayVariants = {
  initial: {},
  enter: {},
  exit: {}
};

const topVariants = {
  initial: { y: '0%' },
  enter: { 
    y: '-100%', 
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } 
  },
  exit: { 
    y: ['-100%', '-100%', '0%'],
    transition: { duration: 0.4, times: [0, 0.4, 1], ease: [0.76, 0, 0.24, 1] } 
  }
};

const bottomVariants = {
  initial: { y: '0%' },
  enter: { 
    y: '100%', 
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } 
  },
  exit: { 
    y: ['100%', '100%', '0%'],
    transition: { duration: 0.4, times: [0, 0.4, 1], ease: [0.76, 0, 0.24, 1] } 
  }
};

const lineVariants = {
  initial: { scaleX: 1, opacity: 0 },
  enter: { 
    opacity: 0,
    transition: { duration: 0.1 }
  },
  exit: { 
    scaleX: [0, 1, 1], 
    opacity: [1, 1, 0],
    transition: { duration: 0.4, times: [0, 0.4, 1], ease: 'easeOut' } 
  }
};

export default function TransitionOverlay() {
  return (
    <motion.div
      variants={overlayVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <motion.div
        variants={topVariants}
        style={{
          flex: 1,
          background: '#05050c', // Dark background matching portal theme
          transformOrigin: 'top',
          willChange: 'transform',
        }}
      />
      <motion.div
        variants={lineVariants}
        style={{
          height: 2,
          width: '100%',
          background: 'var(--accent-violet)',
          boxShadow: '0 0 20px var(--accent-violet)',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          transformOrigin: 'center',
          willChange: 'transform, opacity',
          zIndex: 10,
        }}
      />
      <motion.div
        variants={bottomVariants}
        style={{
          flex: 1,
          background: '#05050c',
          transformOrigin: 'bottom',
          willChange: 'transform',
        }}
      />
    </motion.div>
  );
}
