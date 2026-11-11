import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../context/SoundContext';

export default function BackButton({ label = 'Back' }) {
  const navigate = useNavigate();
  const { playSound } = useSound();

  return (
    <button
      onClick={() => {
        playSound('click');
        navigate(-1);
      }}
      onMouseEnter={() => playSound('hover')}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.84rem',
        fontWeight: 500,
        color: 'var(--text-secondary)',
        background: 'transparent',
        border: 'none',
        padding: '0.4rem 0',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        marginBottom: '2rem',
        transition: 'color 0.15s ease',
      }}
    >
      <span>&larr;</span>
      <span>{label}</span>
    </button>
  );
}
