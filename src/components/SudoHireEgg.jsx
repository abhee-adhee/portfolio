import { useState } from 'react';
import { motion,  AnimatePresence } from 'framer-motion';
import { useSudoHire } from '../utils/useSudoHire';

export default function SudoHireEgg() {
  const [show, setShow] = useState(false);

  useSudoHire(() => {
    setShow(true);
    setTimeout(() => setShow(false), 4000);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          style={{
            position: 'fixed',
            bottom: 80, right: 24,
            zIndex: 9000,
            padding: '1.25rem 1.75rem',
            background: 'rgba(0,10,5,0.98)',
            border: '1px solid rgba(74,222,128,0.5)',
            boxShadow: '0 0 30px rgba(74,222,128,0.2)',
            fontFamily: 'var(--font-mono)',
            borderRadius: 4,
            minWidth: 320,
          }}
        >
          <div style={{ color: '#4ade80', fontSize: '0.7rem', marginBottom: 8, letterSpacing: '0.1em' }}>
            $ sudo hire abinav
          </div>
          <div style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', marginBottom: 4 }}>
            [sudo] password for recruiter: ••••••••
          </div>
          <div style={{ color: '#4ade80', fontSize: '0.85rem' }}>
            ACCESS_GRANTED. HIRE SEQUENCE INITIATED.
          </div>
          <div style={{ color: 'rgba(74,222,128,0.5)', fontSize: '0.65rem', marginTop: 8 }}>
            &gt; Forwarding CV to your inbox...
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
