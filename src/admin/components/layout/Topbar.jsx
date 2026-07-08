import React, { useState } from 'react';
import { Bell, Search, Sun, Moon, Menu, LogOut, User, ChevronRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useAdminTheme } from '../../hooks/useAdminTheme';
import { useSessionManager } from '../../hooks/useSessionManager';
import { ConfirmDialog } from '../ui/ConfirmDialog';

export function Topbar({ onMenuClick }) {
  const { theme, toggleTheme } = useAdminTheme();
  const { logout } = useSessionManager();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();

  // Generate breadcrumbs from pathname
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  return (
    <>
      <header className="admin-topbar">
        <div className="flex items-center flex-1">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 mr-4 text-gray-400 hover:text-white rounded-md hover:bg-white/5 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Breadcrumbs */}
          <nav className="hidden sm:flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1.5 font-mono text-[13px]">
              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const title = value.toUpperCase();

                return (
                  <li key={to} className="flex items-center">
                    {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/30 mx-1 flex-shrink-0" />}
                    {last ? (
                      <span className="text-white font-medium select-none" aria-current="page">
                        {title}
                      </span>
                    ) : (
                      <Link to={to} className="text-white/40 hover:text-white transition-colors">
                        {title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
        
        <div className="flex items-center gap-4 font-sans">
          {/* Search */}
          <div className="admin-search-container hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="admin-search-input"
            />
          </div>

          {/* Theme toggle */}
          <button 
            onClick={toggleTheme}
            className="p-1.5 text-white/45 hover:text-white rounded-md hover:bg-[#13131a] transition-colors cursor-pointer"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          {/* Notifications */}
          <button className="relative p-1.5 text-white/45 hover:text-white rounded-md hover:bg-[#13131a] transition-colors cursor-pointer" title="Notifications">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 block w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
          </button>
          
          {/* Avatar / Profile Dropdown */}
          <div className="relative">
            <div 
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-sm border border-white/10 cursor-pointer text-xs"
            >
              A
            </div>
            
            {/* Avatar Dropdown */}
            {showDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-[#13131a] border border-white/5 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-sm text-white font-medium font-sans">Admin User</p>
                    <p className="text-xs text-white/45 truncate font-mono">admin@aadhi.dev</p>
                  </div>
                  <div className="py-1">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-white/70 hover:bg-white/5 transition-colors cursor-pointer">
                      <User className="w-4 h-4 mr-2 text-white/40" />
                      Profile Settings
                    </button>
                    <button 
                      onClick={() => {
                        setShowDropdown(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <ConfirmDialog 
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={logout}
        title="END_SESSION?"
        message="This will log you out and require re-authentication to access the control center."
        confirmText="Log Out"
        cancelText="Cancel"
        isDestructive={true}
      />
    </>
  );
}
