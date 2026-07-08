import { useState, useEffect } from 'react';

export function useAdminTheme() {
  const [theme, setTheme] = useState(() => {
    // Isolated theme state for admin, defaults to dark
    return localStorage.getItem('admin-theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('admin-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
}
