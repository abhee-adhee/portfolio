import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SIDEBAR_NAVIGATION } from '../../constants/navigation';
import { Terminal, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { useSessionManager } from '../../hooks/useSessionManager';
import clsx from 'clsx';

export function Sidebar({ isCollapsed, onToggle, className }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { logout } = useSessionManager();

  return (
    <>
      <aside 
        className={clsx(
          "admin-sidebar admin-sidebar-fixed",
          isCollapsed ? "w-16" : "w-[240px]",
          className
        )}
      >
        {/* Logo area */}
        <div className="admin-sidebar-logo flex items-center justify-between px-4 h-[60px] border-b border-white/5 relative">
          {!isCollapsed ? (
            <div className="flex flex-col items-start select-none">
              <span className="text-sm font-bold text-[#a855f7] tracking-widest font-mono">
                AADHI.SYS
              </span>
              <span className="text-[9px] font-semibold text-white/40 tracking-[0.2em] font-mono leading-none mt-0.5">
                CONTROL CENTER
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <Terminal className="w-5 h-5 text-[#a855f7]" />
            </div>
          )}

          {/* Desktop collapse toggle button */}
          <button 
            onClick={onToggle}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#13131a] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#a855f7] transition-all z-50 cursor-pointer shadow-md"
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {SIDEBAR_NAVIGATION.map((section, idx) => (
            <div key={idx} className={clsx(isCollapsed ? "px-1 text-center" : "px-3")}>
              {!isCollapsed ? (
                <h3 className="admin-sidebar-section-label">
                  {section.section}
                </h3>
              ) : (
                <div className="h-px bg-white/5 my-4 mx-2" />
              )}
              <div className="space-y-1 mt-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      title={isCollapsed ? item.name : undefined}
                      className={({ isActive }) => clsx(
                        "admin-sidebar-nav-item rounded-lg",
                        isActive && "active",
                        isCollapsed && "justify-center px-0 h-10 w-10 mx-auto"
                      )}
                    >
                      <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="flex-1 truncate text-[13px] font-sans">
                          {item.name}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info & Logout */}
        <div className="p-3 border-t border-white/5 bg-[#0b0b0f] flex flex-col gap-2">
          {!isCollapsed ? (
            <div className="flex items-center justify-between gap-3 px-1 py-1">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                  A
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-white truncate font-sans">Admin User</span>
                  <span className="text-[10px] text-white/40 truncate font-mono">admin@aadhi.dev</span>
                </div>
              </div>
              <button 
                onClick={() => setShowLogoutConfirm(true)}
                title="End Session"
                className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                A
              </div>
              <button 
                onClick={() => setShowLogoutConfirm(true)}
                title="End Session"
                className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
              </button>
            </div>
          )}
        </div>
      </aside>

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
