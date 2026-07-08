import { motion } from 'framer-motion';
import { useEffect } from 'react';

import { useSound } from '../context/SoundContext';
import TransitionOverlay from './TransitionOverlay';

const contentVariants = {
  initial: { opacity: 0, y: 15, scale: 0.98, filter: 'blur(8px)' },
  animate: { 
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    opacity: 0, filter: 'blur(4px)',
    transition: { duration: 0.2 } 
  },
};

export default function PageTransition({ children }) {
  const { playSound } = useSound();

  useEffect(() => {
    playSound('whoosh');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <TransitionOverlay />
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </>
  );
}
