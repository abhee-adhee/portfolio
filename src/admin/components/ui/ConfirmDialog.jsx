import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle } from 'lucide-react';

export function ConfirmDialog({ isOpen, onClose, onConfirm, title = "Are you sure?", message, confirmText = "Confirm", cancelText = "Cancel", isDestructive = false }) {
  const footer = (
    <>
      <button 
        onClick={onClose}
        className="btn-admin-secondary"
      >
        {cancelText}
      </button>
      <button 
        onClick={() => { onConfirm(); onClose(); }}
        className={isDestructive ? "btn-admin-danger" : "btn-admin-primary"}
      >
        {confirmText}
      </button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
      <div className="flex items-start gap-4 py-2">
        {isDestructive && (
          <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)' }}>
            <AlertTriangle className="w-4.5 h-4.5 text-red-400" />
          </div>
        )}
        <p className="text-[13px] text-white/55 leading-relaxed">
          {message}
        </p>
      </div>
    </Modal>
  );
}
