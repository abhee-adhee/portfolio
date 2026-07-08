import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSessionManager } from '../../hooks/useSessionManager';
import { ConfirmDialog } from '../ui/ConfirmDialog';

export function AdminAuthGuard({ children }) {
  const location = useLocation();
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
  
  // Initialize session manager
  const { showWarning, setShowWarning, logout } = useSessionManager();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <>
      {children}
      
      <ConfirmDialog 
        isOpen={showWarning}
        onClose={() => setShowWarning(false)} // Clicking outside or cancel just closes warning, resetting timers is handled by useSessionManager's activity listener
        onConfirm={logout}
        title="SESSION_EXPIRING"
        message="Your session will expire in 5 minutes due to inactivity. Do you want to log out now?"
        confirmText="Log Out"
        cancelText="Continue Session"
        isDestructive={true}
      />
    </>
  );
}
