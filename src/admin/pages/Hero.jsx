import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card, CardContent } from '../components/ui/Card';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { Save, Eye, Terminal, Type, X, Plus, CheckCircle } from 'lucide-react';

function Edit2(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
  );
}

export function Hero() {
  const { data, updateData } = usePortfolioData();
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  // Local form state mirrors context, so changes are visible in the preview immediately
  const [formData, setFormData] = useState(data.hero);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // Keep local state in sync if context changes externally (e.g. reset)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(data.hero);
  }, [data.hero]);

  const handleSave = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    updateData('hero', formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCtaChange = (ctaKey, field, value) => {
    setFormData(prev => ({ ...prev, [ctaKey]: { ...prev[ctaKey], [field]: value } }));
  };

  const addRole = () => {
    if (newRole.trim() && !formData.roles.includes(newRole.trim())) {
      setFormData(prev => ({ ...prev, roles: [...prev.roles, newRole.trim()] }));
      setNewRole('');
    }
  };

  const removeRole = (roleToRemove) => {
    setFormData(prev => ({ ...prev, roles: prev.roles.filter(r => r !== roleToRemove) }));
  };

  return (
    <AdminLayout>
      <SectionHeader
        title="HERO_SECTION"
        description="Edit your main landing section. Changes save to shared state immediately."
        action={
          <div className="flex gap-3 items-center">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#27272a] dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium text-sm transition-colors border border-gray-200 dark:border-gray-700"
            >
              <Eye className="w-4 h-4 mr-2" /> PREVIEW LIVE
            </a>
            <button
              onClick={handleSave}
              className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                saved
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {saved ? (
                <><CheckCircle className="w-4 h-4 mr-2" /> SAVED!</>
              ) : (
                <><Save className="w-4 h-4 mr-2" /> SAVE CHANGES</>
              )}
            </button>
          </div>
        }
      />

      {saved && (
        <div className="mb-6 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm font-mono">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          CHANGES_SAVED — Portfolio updated in real time. Open the home page to verify.
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LoadingSkeleton className="h-[600px] w-full rounded-xl" />
          <LoadingSkeleton className="h-[600px] w-full rounded-xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* EDITOR FORM */}
          <Card className="dark:admin-glass">
            <div className="p-6 border-b border-gray-200 dark:border-[#27272a]">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-gray-400" /> Editor
              </h3>
            </div>
            <CardContent className="p-6 space-y-6">

              {/* Name */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-gray-500 uppercase">Display Name</label>
                <div className="relative">
                  <Type className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="ABINAV.SYS"
                  />
                </div>
              </div>

              {/* Status Text */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-gray-500 uppercase">Status Badge Text</label>
                <input
                  type="text"
                  value={formData.statusText}
                  onChange={(e) => handleChange('statusText', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              {/* Roles (Tags) */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-gray-500 uppercase">Typewriter Roles</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.roles.map(role => (
                    <span key={role} className="flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 rounded-full text-sm font-medium">
                      {role}
                      <button onClick={() => removeRole(role)} className="hover:text-blue-800 dark:hover:text-white transition-colors ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRole())}
                    placeholder="Add a new role... (press Enter)"
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <button onClick={addRole} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-[#27272a] dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* CTA 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-gray-500 uppercase">Primary CTA Text</label>
                  <input
                    type="text"
                    value={formData.cta1?.text}
                    onChange={(e) => handleCtaChange('cta1', 'text', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-lg text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-gray-500 uppercase">Primary CTA Link</label>
                  <input
                    type="text"
                    value={formData.cta1?.link}
                    onChange={(e) => handleCtaChange('cta1', 'link', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-lg text-gray-900 dark:text-white font-mono text-sm"
                  />
                </div>
              </div>

              {/* CTA 2 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-gray-500 uppercase">Secondary CTA Text</label>
                  <input
                    type="text"
                    value={formData.cta2?.text}
                    onChange={(e) => handleCtaChange('cta2', 'text', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-lg text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-gray-500 uppercase">Secondary CTA Link</label>
                  <input
                    type="text"
                    value={formData.cta2?.link}
                    onChange={(e) => handleCtaChange('cta2', 'link', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-lg text-gray-900 dark:text-white font-mono text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSave}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors font-mono tracking-wider"
                >
                  SAVE_CHANGES
                </button>
              </div>
            </CardContent>
          </Card>

          {/* LIVE PREVIEW PANEL */}
          <div className="sticky top-24">
            <h3 className="text-xs font-mono text-gray-500 uppercase mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4" /> Live Render Preview
            </h3>
            <div className="w-full aspect-[4/3] bg-[#09090b] rounded-2xl border-2 border-gray-200 dark:border-[#27272a] overflow-hidden relative shadow-2xl flex flex-col items-center justify-center text-center p-8">

              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:14px_24px]"></div>

              <div className="relative z-10 w-full max-w-md flex flex-col items-center">
                {formData.statusText && (
                  <div className="mb-4 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2 w-fit mx-auto">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {formData.statusText}
                  </div>
                )}

                <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight font-mono">
                  {formData.name || 'YOUR_NAME.SYS'}
                </h1>

                <div className="text-lg font-mono text-blue-400 h-7 mb-6">
                  {'> '}
                  {formData.roles && formData.roles.length > 0 ? formData.roles[0] : 'Developer'}
                  <span className="animate-pulse">_</span>
                </div>

                <div className="flex gap-3 w-full justify-center flex-wrap">
                  {formData.cta1?.text && (
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-md font-medium text-sm shadow-lg shadow-blue-500/20 font-mono text-xs">
                      [ {formData.cta1.text} ]
                    </button>
                  )}
                  {formData.cta2?.text && (
                    <button className="px-5 py-2.5 bg-[#18181b] border border-[#27272a] text-white rounded-md font-medium text-sm font-mono text-xs">
                      [ {formData.cta2.text} ]
                    </button>
                  )}
                </div>

                <div className="mt-8 text-xs font-mono text-gray-600 flex items-center gap-2">
                  <Terminal className="w-3 h-3" />
                  {formData.roles && formData.roles.length > 0 ? `${formData.roles.length} roles configured` : 'No roles set'}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-600 text-center mt-3 font-mono">
              Preview updates as you type. Click SAVE to persist to portfolio.
            </p>
          </div>

        </div>
      )}
    </AdminLayout>
  );
}
