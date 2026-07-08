import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export function Modal({ isOpen, onClose, title, children, footer }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            style={{
              background: '#13131a',
              border: '1px solid rgba(255,255,255,0.07)',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 flex-shrink-0">
              <h2 className="text-[15px] font-semibold text-white font-mono tracking-wider">{title}</h2>
              <button 
                onClick={onClose}
                className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {children}
            </div>
            {footer && (
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/5 flex-shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
