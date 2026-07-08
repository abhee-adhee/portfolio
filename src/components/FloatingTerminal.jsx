import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';

const SKILLS = skillGroups.flatMap(group => group.skills.map(skill => skill.name));
const ACQUIRING = SKILLS.slice(0, 4);

const COMMANDS = {
  help: () => [
    '  Available commands:',
    '  help              → show this message',
    '  ls projects       → list all project modules',
    '  whoami            → print bio',
    '  cat skills.txt    → list all skills',
    '  ping abinav        → check connection',
    '  sudo hire abinav   → initiate hire sequence',
    '  clear             → clear terminal',
  ],
  'ls projects': () => [
    '  DEPLOYED_MODULES/',
    ...projects.map(p => `  ├── ${p.codename}  ${p.title}`),
    `  ${projects.length} modules found.`,
  ],
  whoami: () => [
    '  Abinav — Full Stack Developer & ML Engineer.',
    '  Based in Chennai, IND.',
    '  Currently: Open to internships & freelance.',
    '  Clearance Level: 3 / Building real-world ML systems.',
    '  Contact: youremail@example.com',
  ],
  'cat skills.txt': () => [
    '  === SKILL_MANIFEST.txt ===',
    ...SKILLS.map(s => `  > ${s}`),
    `  Acquiring: ${ACQUIRING.join(', ')}`,
  ],
  'ping abinav': () => [
    '  PING abinav.sys 56(84) bytes of data.',
    '  Response: 1ms. I\'m right here.',
    '  Packet loss: 0%. Connection: ACTIVE.',
  ],
  'sudo hire abinav': () => [
    '  [sudo] password for recruiter: ••••••••',
    '  >>> ACCESS_GRANTED. HIRE SEQUENCE INITIATED.',
    '  >>> Forwarding CV to your inbox...',
    '  >>> Status: HIRED (pending your email)',
  ],
};

export default function FloatingTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [pos, setPos] = useState({ x: 60, y: 60 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Ctrl + ` to toggle
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setIsOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const execCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    setHistory(h => [...h, { type: 'input', text: `$ ${raw}` }]);
    setCmdHistory(h => [raw, ...h]);
    setHistoryIdx(-1);

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    const fn = COMMANDS[cmd];
    if (fn) {
      const lines = fn();
      setHistory(h => [...h, ...lines.map(text => ({ type: 'output', text }))]);
    } else {
      setHistory(h => [...h,
        { type: 'error', text: `  command not found: ${raw}. Type 'help' for available commands.` }
      ]);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (input.trim()) execCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const prev = Math.max(historyIdx - 1, -1);
      setHistoryIdx(prev);
      setInput(prev === -1 ? '' : cmdHistory[prev] || '');
    }
  };

  // Drag handlers
  const startDrag = (e) => {
    setDragging(true);
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragging]);

  return (
    <>
      {/* Keyboard shortcut hint (only when closed) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{
              position: 'fixed', bottom: 24, right: 96,
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              color: 'var(--accent-subtle)', letterSpacing: '0.1em', opacity: 0.6,
              zIndex: 8000, pointerEvents: 'none',
            }}
          >
            Ctrl + ` → TERMINAL
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{
              position: 'fixed',
              left: pos.x, top: pos.y,
              width: 600, height: 420,
              background: 'rgba(5,5,12,0.97)',
              border: '1px solid var(--accent-border)',
              borderRadius: 8,
              boxShadow: '0 0 60px var(--accent-subtle), 0 20px 60px rgba(0,0,0,0.6)',
              zIndex: 9999,
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              userSelect: dragging ? 'none' : 'auto',
            }}
          >
            {/* Title bar (drag handle) */}
            <div
              onMouseDown={startDrag}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 16px',
                background: 'rgba(0,0,0,0.5)',
                borderBottom: '1px solid var(--accent-subtle)',
                cursor: 'grab', flexShrink: 0,
              }}
            >
              <span
                onClick={() => setIsOpen(false)}
                style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 800, color: 'rgba(0,0,0,0.5)' }}
                title="Close"
              >×</span>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }} />
              <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-primary)', opacity: 0.4, letterSpacing: '0.08em' }}>
                ABINAV_SYS — bash — 80×24
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--accent-primary)', opacity: 0.2 }}>Ctrl+` to close</span>
            </div>

            {/* Output area */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '12px 16px',
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem', lineHeight: 1.9,
              scrollbarWidth: 'none',
            }}>
              {history.length === 0 && (
                <div style={{ color: 'var(--accent-primary)', opacity: 0.4 }}>
                  Welcome to ABINAV.SYS terminal. Type 'help' for available commands.
                </div>
              )}
              {history.map((line, i) => (
                <div key={i} style={{
                  color: line.type === 'input'
                    ? 'var(--accent-primary)'
                    : line.type === 'error'
                    ? 'rgba(239,68,68,0.8)'
                    : 'rgba(168, 85, 247, 0.7)',
                }}>
                  {line.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px',
              borderTop: '1px solid rgba(0,245,255,0.08)',
              background: 'rgba(0,0,0,0.3)', flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-primary)', flexShrink: 0 }}>
                abinav@sys:~$
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                  color: 'var(--accent-primary)', caretColor: 'var(--accent-primary)',
                  letterSpacing: '0.04em',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
