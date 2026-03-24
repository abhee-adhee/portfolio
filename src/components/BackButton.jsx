import { useNavigate } from 'react-router-dom';
import { useSound } from '../context/SoundContext';

export default function BackButton() {
  const navigate = useNavigate();
  const { playSound } = useSound();

  return (
    <button
      className="btn-interactive back-btn"
      onClick={() => { playSound('click'); navigate(-1); }}
      onMouseEnter={() => playSound('hover')}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.12em',
        color: 'var(--accent-primary)',
        background: 'transparent',
        border: '1px solid var(--accent-border)',
        padding: '8px 16px',
        borderRadius: 3,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: '2rem',
      }}
    >
      <span className="back-arrow">←</span>
      RETURN_TO_PREVIOUS
    </button>
  );
}
