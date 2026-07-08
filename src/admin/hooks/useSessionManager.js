import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const WARNING_TIME = 25 * 60 * 1000; // 25 minutes
const LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes

export function useSessionManager() {
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login', { replace: true });
    // You could also trigger a toast here if you have a global toast system setup
  }, [navigate]);

  useEffect(() => {
    let warningTimer;
    let logoutTimer;

    const resetTimers = () => {
      setShowWarning(false);
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);

      warningTimer = setTimeout(() => {
        setShowWarning(true);
      }, WARNING_TIME);

      logoutTimer = setTimeout(() => {
        logout();
      }, LOGOUT_TIME);
    };

    // Initial setup
    resetTimers();

    // Event listeners for user activity
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    const handleActivity = () => resetTimers();

    events.forEach(event => window.addEventListener(event, handleActivity));

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);
    };
  }, [logout]);

  return { showWarning, setShowWarning, logout };
}
