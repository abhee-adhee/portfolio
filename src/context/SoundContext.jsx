import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  setSoundEnabled,
  playClick,
  playHover,
  playSuccess,
  playError,
  playTyping,
  playNav,
  playGlitch,
  playThemeToggle,
} from '../utils/soundEngine';

const SoundContext = createContext();

/**
 * Maps a friendly string key to a sound engine function.
 * All calls are no-ops when sound is disabled (engine handles that).
 */
const SOUND_MAP = {
  click:   playClick,
  hover:   playHover,
  success: playSuccess,
  error:   playError,
  keyTick: playTyping,
  whoosh:  playNav,
  glitch:  playGlitch,
  theme:   playThemeToggle,
};

export function SoundProvider({ children }) {
  const [soundOn, setSoundOn] = useState(() => {
    return localStorage.getItem('abinav-sound-enabled') === 'true';
  });

  useEffect(() => {
    setSoundEnabled(soundOn);
  }, [soundOn]);

  const toggle = useCallback(() => {
    setSoundOn(prev => {
      const next = !prev;
      setSoundEnabled(next);
      localStorage.setItem('abinav-sound-enabled', String(next));
      return next;
    });
  }, []);

  /** Call with a key from SOUND_MAP. Silently ignored when sound is off. */
  const playSound = useCallback((type) => {
    const fn = SOUND_MAP[type];
    if (fn) fn();
  }, []);

  return (
    <SoundContext.Provider value={{ soundOn, toggle, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
