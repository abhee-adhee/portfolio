import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Modal } from '../components/ui/Modal';
import { Drawer } from '../components/ui/Drawer';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { Plus, Edit2, Eye, Trash2, Folder, Tag, Activity, Save, CheckCircle, X, Search } from 'lucide-react';
import clsx from 'clsx';

const EMPTY_PROJECT = {
  id: '', codename: '', title: '', subtitle: '', status: 'IN_PROGRESS',
  tags: [], stack: [], description: '', shortDesc: '', fullDesc: '', features: [], screenshots: [],
};

const STATUS_STYLES = {
  DEPLOYED:    { color: '#a855f7', bg: 'rgba(168,85,247,0.1)',  border: 'rgba(168,85,247,0.25)' },
  CLASSIFIED:  { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.25)' },
  IN_PROGRESS: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)' },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.IN_PROGRESS;
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold whitespace-nowrap"
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>
      {status}
    </span>
  );
}

export function Projects() {
  const { data, updateData } = usePortfolioData();
  const projects = data.projects || [];

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [drawerProject, setDrawerProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filter === 'ALL' || p.status === filter;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.codename || '').toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSaveProject = () => {
    if (!editingProject.title.trim()) return;
    const isNew = !projects.find(p => p.id === editingProject.id);
    const normalize = (val) =>
      typeof val === 'string' ? val.split(',').map(t => t.trim()).filter(Boolean) : (val || []);
    const proj = { ...editingProject, tags: normalize(editingProject.tags), stack: normalize(editingProject.stack) };
    const updated = isNew
      // eslint-disable-next-line react-hooks/purity
      // eslint-disable-next-line react-hooks/purity
      ? [...projects, { ...proj, id: proj.id || `proj-${Date.now()}`, codename: proj.codename || `NEW_${Date.now()}` }]
      : projects.map(p => p.id === proj.id ? proj : p);
    updateData('projects', updated);
    setEditingProject(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDelete = (project) => {
    updateData('projects', projects.filter(p => p.id !== project.id));
    setDeleteConfirm(null);
    setDrawerProject(null);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          {[1,2,3,4,5].map(i => <LoadingSkeleton key={i} className="h-14 w-full rounded-xl" />)}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <SectionHeader
        title="PROJECT_MODULES"
        description="Manage and edit your portfolio projects."
        action={
          <button
            onClick={() => setEditingProject({ ...EMPTY_PROJECT })}
            className="btn-admin-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> NEW PROJECT
          </button>
        }
      />

      {/* Save toast */}
      {saved && (
        <div className="mb-5 px-4 py-3 rounded-lg flex items-center gap-2 text-[13px] font-mono"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          CHANGES_SAVED — Portfolio updated.
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between p-4 rounded-xl"
        style={{ background: '#13131a', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex gap-1 p-1 rounded-lg flex-wrap" style={{ background: '#0a0a0f' }}>
          {['ALL', 'DEPLOYED', 'CLASSIFIED', 'IN_PROGRESS'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={clsx(
                "px-3 py-1.5 text-[11px] font-mono rounded-md transition-all cursor-pointer",
                filter === status
                  ? "bg-[#13131a] text-white border border-white/8"
                  : "text-white/40 hover:text-white"
              )}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="admin-input pl-9 text-[13px] h-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ minWidth: 90 }}>Codename</th>
              <th style={{ minWidth: 160 }}>Title</th>
              <th style={{ minWidth: 110 }}>Status</th>
              <th style={{ minWidth: 140 }}>Tags</th>
              <th style={{ minWidth: 110 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16 text-white/30 font-mono text-sm">
                  &gt; NO_PROJECTS_FOUND
                </td>
              </tr>
            ) : filteredProjects.map(row => (
              <tr
                key={row.id}
                onClick={() => setDrawerProject(row)}
                className="cursor-pointer"
              >
                <td>
                  <span className="font-mono text-[11px] text-white/40">{row.codename}</span>
                </td>
                <td>
                  <span className="font-medium text-white text-[13px]">{row.title}</span>
                </td>
                <td>
                  <StatusBadge status={row.status} />
                </td>
                <td>
                  <div className="flex gap-1 flex-wrap">
                    {(row.tags || []).slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded font-mono whitespace-nowrap"
                        style={{ background: 'rgba(168,85,247,0.08)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.15)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td onClick={e => e.stopPropagation()}>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingProject({ ...row, tags: (row.tags || []).join(', '), stack: (row.stack || []).join(', ') })}
                      className="p-1.5 text-white/30 hover:text-[#a855f7] hover:bg-[#a855f7]/10 rounded transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDrawerProject(row)}
                      className="p-1.5 text-white/30 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors cursor-pointer"
                      title="Preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(row)}
                      className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preview Drawer */}
      <Drawer isOpen={!!drawerProject} onClose={() => setDrawerProject(null)} title="PROJECT_PREVIEW" position="right">
        {drawerProject && (
          <div className="space-y-5 p-5">
            <div className="aspect-video rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{ background: '#0d0d12', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Folder className="w-10 h-10 text-white/10" />
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-[10px] text-white/60 rounded font-mono">IMG_PLACEHOLDER</div>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-white">{drawerProject.title}</h3>
              <p className="text-[11px] font-mono text-white/40 mt-1">{drawerProject.codename}</p>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-lg"
              style={{ background: '#0d0d12', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 text-[13px] text-white/60">
                <Activity className="w-4 h-4" /> Status
              </div>
              <StatusBadge status={drawerProject.status} />
            </div>
            {drawerProject.description && (
              <div>
                <h4 className="admin-label mb-2">Description</h4>
                <p className="text-[13px] text-white/60 leading-relaxed">{drawerProject.description}</p>
              </div>
            )}
            {(drawerProject.stack || []).length > 0 && (
              <div>
                <h4 className="admin-label mb-2">Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {drawerProject.stack.map(s => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded font-mono"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => { setDrawerProject(null); setEditingProject({ ...drawerProject, tags: (drawerProject.tags || []).join(', '), stack: (drawerProject.stack || []).join(', ') }); }}
                className="btn-admin-primary flex-1 justify-center"
              >
                EDIT PROJECT
              </button>
              <button
                onClick={() => setDeleteConfirm(drawerProject)}
                className="btn-admin-danger px-3"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        title={editingProject?.id && projects.find(p => p.id === editingProject?.id) ? 'EDIT_PROJECT' : 'NEW_PROJECT'}
      >
        {editingProject && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Title *</label>
                <input value={editingProject.title}
                  onChange={e => setEditingProject(p => ({ ...p, title: e.target.value }))}
                  className="admin-input" placeholder="My Project" />
              </div>
              <div>
                <label className="admin-label">Codename</label>
                <input value={editingProject.codename}
                  onChange={e => setEditingProject(p => ({ ...p, codename: e.target.value }))}
                  className="admin-input font-mono" placeholder="PROJ_01" />
              </div>
            </div>
            <div>
              <label className="admin-label">Status</label>
              <select value={editingProject.status}
                onChange={e => setEditingProject(p => ({ ...p, status: e.target.value }))}
                className="admin-input">
                <option value="DEPLOYED">DEPLOYED</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="CLASSIFIED">CLASSIFIED</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Tags (comma-separated)</label>
                <input value={typeof editingProject.tags === 'string' ? editingProject.tags : (editingProject.tags || []).join(', ')}
                  onChange={e => setEditingProject(p => ({ ...p, tags: e.target.value }))}
                  className="admin-input font-mono" placeholder="ML, WEB" />
              </div>
              <div>
                <label className="admin-label">Stack (comma-separated)</label>
                <input value={typeof editingProject.stack === 'string' ? editingProject.stack : (editingProject.stack || []).join(', ')}
                  onChange={e => setEditingProject(p => ({ ...p, stack: e.target.value }))}
                  className="admin-input font-mono" placeholder="React, Python" />
              </div>
            </div>
            <div>
              <label className="admin-label">Description</label>
              <textarea rows={3} value={editingProject.description}
                onChange={e => setEditingProject(p => ({ ...p, description: e.target.value }))}
                className="admin-input min-h-[80px] resize-none" placeholder="Project description..." />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleSaveProject} disabled={!editingProject.title.trim()}
                className="btn-admin-primary flex-1 justify-center gap-2 disabled:opacity-50">
                <Save className="w-4 h-4" /> SAVE PROJECT
              </button>
              <button onClick={() => setEditingProject(null)} className="btn-admin-secondary px-4">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="CONFIRM_DELETE">
        {deleteConfirm && (
          <div className="text-center space-y-4 py-2">
            <p className="text-[13px] text-white/60">
              Delete <strong className="text-white font-mono">{deleteConfirm.title}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)} className="btn-admin-danger flex-1 justify-center">
                Yes, Delete
              </button>
              <button onClick={() => setDeleteConfirm(null)} className="btn-admin-secondary flex-1 justify-center">
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}
