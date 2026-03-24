import { useEffect, useRef } from 'react';

const TARGET = 'sudo hire abinav';

export function useSudoHire(callback) {
  const buffer = useRef('');

  useEffect(() => {
    const handler = (e) => {
      if (e.key.length === 1) {
        buffer.current = (buffer.current + e.key).slice(-TARGET.length);
        if (buffer.current === TARGET) {
          callback();
          buffer.current = '';
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback]);
}
