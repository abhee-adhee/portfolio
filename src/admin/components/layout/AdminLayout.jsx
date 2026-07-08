import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Drawer } from '../ui/Drawer';
import { useAdminTheme } from '../../hooks/useAdminTheme';
import '../../styles/admin.css'; // Isolated styles

export function AdminLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useAdminTheme();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return sessionStorage.getItem('adminSidebarCollapsed') === 'true';
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      sessionStorage.setItem('adminSidebarCollapsed', String(next));
      return next;
    });
  };

  // Apply admin specific theme class to the wrapper
  useEffect(() => {
    // Only apply to this specific container to avoid leaking to the main app
    const root = document.getElementById('admin-root');
    if (root) {
      if (theme === 'dark') {
        root.classList.add('dark', 'dark-admin');
      } else {
        root.classList.remove('dark', 'dark-admin');
      }
    }
  }, [theme]);

  const currentSidebarWidth = isSidebarCollapsed ? '64px' : '240px';

  return (
    <div 
      id="admin-root" 
      className={`admin-theme min-h-screen flex ${theme === 'dark' ? 'dark dark-admin' : ''}`}
      style={{ '--sidebar-width': currentSidebarWidth }}
    >
      {/* Desktop Sidebar */}
      <Sidebar 
        className="hidden lg:flex" 
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
      />

      {/* Mobile Sidebar */}
      <Drawer 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        position="left"
        title="Admin Navigation"
      >
        <Sidebar 
          className="w-full border-r-0" 
          isCollapsed={false}
          onToggle={() => {}}
        />
      </Drawer>

      {/* Main Content */}
      <div className="admin-main-wrapper flex-1 flex flex-col min-w-0 bg-[#0a0a0f] transition-all duration-300 min-h-screen">
        <Topbar onMenuClick={() => setMobileMenuOpen(true)} />
        
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 admin-page-entrance">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
