import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export function Drawer({ isOpen, onClose, title, children, position = 'right' }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const slideVariants = {
    hidden:  { x: position === 'right' ? '100%' : '-100%', transition: { type: 'spring', damping: 28, stiffness: 220 } },
    visible: { x: 0,                                        transition: { type: 'spring', damping: 28, stiffness: 220 } },
    exit:    { x: position === 'right' ? '100%' : '-100%', transition: { type: 'spring', damping: 28, stiffness: 220 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            variants={slideVariants} initial="hidden" animate="visible" exit="exit"
            className={`fixed top-0 bottom-0 ${position === 'right' ? 'right-0' : 'left-0'} w-full sm:w-[360px] shadow-2xl z-50 flex flex-col`}
            style={{
              background: '#13131a',
              borderLeft: position === 'right' ? '1px solid rgba(255,255,255,0.06)' : 'none',
              borderRight: position === 'left'  ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 flex-shrink-0">
              <h2 className="text-[13px] font-semibold text-white font-mono tracking-wider">{title}</h2>
              <button 
                onClick={onClose}
                className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
