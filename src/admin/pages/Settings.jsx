import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { Save, User, Globe, Palette, AlertTriangle, Download, Trash2, RefreshCw, CheckCircle } from 'lucide-react';
import { useAdminTheme } from '../hooks/useAdminTheme';
import { usePortfolioData } from '../../context/PortfolioDataContext';

function SettingsSection({ icon: Icon, title, children }) {
  return (
    <div className="admin-card">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
        {Icon && <Icon className="w-4 h-4 text-white/40 flex-shrink-0" />}
        <h3 className="text-[15px] font-semibold text-white">{title}</h3>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}

export function Settings() {
  const { resetToDefaults } = usePortfolioData();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const { theme, toggleTheme } = useAdminTheme();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-5 max-w-3xl">
          {[1, 2, 3, 4].map(i => <LoadingSkeleton key={i} className="h-48 w-full rounded-xl" />)}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <SectionHeader
        title="SYSTEM_SETTINGS"
        description="Configure your portfolio behavior, theme, and admin preferences."
      />

      {resetDone && (
        <div className="mb-5 px-4 py-3 rounded-lg flex items-center gap-2 text-[13px] font-mono"
          style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', color: '#a855f7' }}>
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          FACTORY_RESET_COMPLETE — All data restored to defaults.
        </div>
      )}

      <div className="space-y-6 max-w-3xl">

        {/* Section 1: Profile */}
        <SettingsSection icon={User} title="Admin Profile">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                style={{ border: '2px solid rgba(255,255,255,0.08)' }}>
                A
              </div>
              <button type="button" onClick={() => setIsModalOpen(true)}
                className="btn-admin-secondary text-[13px]">
                Change Avatar
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Display Name</label>
                <input type="text" defaultValue="Admin User" className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Email Address</label>
                <input type="email" defaultValue="admin@aadhi.dev" className="admin-input" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-admin-primary flex items-center gap-2">
                <Save className="w-4 h-4" /> SAVE PROFILE
              </button>
            </div>
          </form>
        </SettingsSection>

        {/* Section 2: Portfolio Config */}
        <SettingsSection icon={Globe} title="Portfolio Configuration">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Portfolio Title</label>
                <input type="text" defaultValue="AADHI.SYS" className="admin-input font-mono" />
              </div>
              <div>
                <label className="admin-label">Primary URL</label>
                <input type="text" defaultValue="https://aadhi.dev" className="admin-input font-mono" />
              </div>
            </div>
            <div>
              <label className="admin-label">Meta Description (SEO)</label>
              <textarea rows={3}
                defaultValue="Security Researcher & Full Stack Engineer specializing in robust system architecture."
                className="admin-input min-h-[80px] resize-none" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-admin-primary flex items-center gap-2">
                <Save className="w-4 h-4" /> SAVE CONFIG
              </button>
            </div>
          </form>
        </SettingsSection>

        {/* Section 3: Appearance */}
        <SettingsSection icon={Palette} title="Appearance">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] text-white font-medium">Admin Theme Mode</p>
                <p className="text-[12px] text-white/40 mt-0.5">Toggle between light and dark mode.</p>
              </div>
              <button onClick={toggleTheme}
                className="btn-admin-secondary font-mono text-[12px] tracking-wider">
                {theme.toUpperCase()} MODE
              </button>
            </div>

            <div className="pt-4 border-t border-white/5">
              <p className="text-[13px] text-white/60 mb-3">Portfolio Accent Color</p>
              <div className="flex gap-3">
                {[
                  { color: '#a855f7', label: 'Purple' },
                  { color: '#3b82f6', label: 'Blue' },
                  { color: '#06b6d4', label: 'Cyan' },
                ].map(({ color, label }) => (
                  <button
                    key={color}
                    title={label}
                    onClick={() => setIsModalOpen(true)}
                    className="w-8 h-8 rounded-full transition-all hover:scale-110 cursor-pointer"
                    style={{ background: color, boxShadow: color === '#a855f7' ? `0 0 0 2px #0a0a0f, 0 0 0 4px ${color}` : 'none' }}
                  />
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button onClick={() => setIsModalOpen(true)} className="btn-admin-primary flex items-center gap-2">
                <Save className="w-4 h-4" /> SAVE THEME
              </button>
            </div>
          </div>
        </SettingsSection>

        {/* Section 4: Danger Zone */}
        <div className="admin-card" style={{ borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.03)' }}>
          <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor: 'rgba(239,68,68,0.15)' }}>
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <h3 className="text-[15px] font-semibold text-red-400">Danger Zone</h3>
          </div>
          <div className="p-5 space-y-3">
            {[
              {
                title: 'Export Data',
                desc: 'Download all portfolio JSON data.',
                action: () => setIsModalOpen(true),
                btnLabel: 'EXPORT',
                icon: Download,
                danger: false,
              },
              {
                title: 'Clear Cache',
                desc: 'Force refresh portfolio CDN cache.',
                action: () => setIsModalOpen(true),
                btnLabel: 'CLEAR',
                icon: RefreshCw,
                danger: false,
              },
              {
                title: 'Reset All Content',
                desc: 'Permanently wipe all custom data. Cannot be undone.',
                action: () => setIsResetConfirmOpen(true),
                btnLabel: 'FACTORY RESET',
                icon: Trash2,
                danger: true,
              },
            ].map(({ title, desc, action, btnLabel, icon: Icon, danger }) => (
              <div key={title} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg"
                style={{ background: danger ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${danger ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)'}` }}>
                <div>
                  <h4 className="text-[13px] font-semibold" style={{ color: danger ? '#f87171' : 'rgba(255,255,255,0.8)' }}>{title}</h4>
                  <p className="text-[12px] mt-0.5" style={{ color: danger ? 'rgba(248,113,113,0.6)' : 'rgba(255,255,255,0.35)' }}>{desc}</p>
                </div>
                <button onClick={action}
                  className={danger ? "btn-admin-danger flex items-center gap-2 whitespace-nowrap" : "btn-admin-secondary flex items-center gap-2 whitespace-nowrap"}>
                  <Icon className="w-3.5 h-3.5" /> {btnLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coming soon modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="UNDER_DEVELOPMENT">
        <div className="text-center py-4">
          <p className="text-[13px] text-white/50">
            COMING SOON — Backend connections to save these settings are under development.
          </p>
          <button onClick={() => setIsModalOpen(false)} className="btn-admin-primary mt-5 px-8">
            Got it
          </button>
        </div>
      </Modal>

      {/* Reset confirm dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={() => {
          resetToDefaults();
          setIsResetConfirmOpen(false);
          setResetDone(true);
          setTimeout(() => setResetDone(false), 3000);
        }}
        title="FACTORY_RESET?"
        message="Are you absolutely sure you want to wipe all portfolio content? This action is irreversible."
        confirmText="Yes, Reset Everything"
        cancelText="Cancel"
        isDestructive={true}
      />
    </AdminLayout>
  );
}
