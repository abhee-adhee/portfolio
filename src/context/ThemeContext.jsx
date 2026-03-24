import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('abinav-theme') || 'dark';
  });

  // Ripple state: null = inactive, { x, y, color } = active
  const [ripple, setRipple] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('abinav-theme', theme);
  }, [theme]);

  /**
   * Call with the click coordinates of the toggle button.
   * Fires the ripple, waits for peak, then switches theme.
   */
  const triggerRipple = useCallback((x, y) => {
    const toLight = theme === 'dark';
    const color = toLight ? '#f5f5f7' : '#0a0a0f';
    // Start ripple
    setRipple({ x, y, color, key: Date.now() });
    // Switch theme at the midpoint (200ms) so it's hidden under the ripple
    setTimeout(() => {
      setTheme(t => (t === 'dark' ? 'light' : 'dark'));
    }, 200);
    // Clear ripple after animation completes
    setTimeout(() => setRipple(null), 750);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, triggerRipple, ripple }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
