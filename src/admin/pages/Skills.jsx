import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Modal } from '../components/ui/Modal';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp, Save, X, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { motion,  AnimatePresence } from 'framer-motion';

function SkillBar({ skill, onEdit, onDelete }) {
  return (
    <div className="group flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-white/80">{skill.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/40 font-mono">{skill.level}%</span>
          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
            <button onClick={() => onEdit(skill)}
              className="p-1 text-white/30 hover:text-[#a855f7] hover:bg-[#a855f7]/10 rounded transition-colors cursor-pointer">
              <Edit2 className="w-3 h-3" />
            </button>
            <button onClick={() => onDelete(skill)}
              className="p-1 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors cursor-pointer">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #a855f7, #6366f1)' }}
        />
      </div>
    </div>
  );
}

function SkillGroup({ groupKey, groupData, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(true);
  const label = groupData.label || groupKey;

  return (
    <div className="admin-card overflow-hidden p-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/2 transition-colors text-left cursor-pointer"
        style={{ borderBottom: isOpen ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
      >
        <h3 className="font-semibold font-mono text-[12px] tracking-widest text-white/80 uppercase">{label}</h3>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/30 font-mono">{(groupData.skills || []).length} skills</span>
          {isOpen ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(groupData.skills || []).map(skill => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  onEdit={() => onEdit({ ...skill, groupKey })}
                  onDelete={() => onDelete({ ...skill, groupKey })}
                />
              ))}
              {(!groupData.skills || groupData.skills.length === 0) && (
                <p className="col-span-2 text-[12px] text-white/25 font-mono text-center py-4">&gt; NO_SKILLS_IN_GROUP</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Skills() {
  const { data, updateData } = usePortfolioData();
  const skillGroups = data.skills || [];

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');
  const [editingSkill, setEditingSkill] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 75, groupIndex: 0 });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const handleDeleteSkill = ({ name, groupKey }) => {
    const groupIndex = skillGroups.findIndex(g => (g.label || g.id) === groupKey);
    if (groupIndex === -1) return;
    const updated = skillGroups.map((g, i) =>
      i === groupIndex ? { ...g, skills: g.skills.filter(s => s.name !== name) } : g
    );
    updateData('skills', updated);
    showSaved();
  };

  const handleSaveEdit = () => {
    if (!editingSkill.name.trim()) return;
    const groupIndex = skillGroups.findIndex(g => (g.label || g.id) === editingSkill.groupKey);
    if (groupIndex === -1) return;
    const updated = skillGroups.map((g, i) =>
      i === groupIndex
        ? { ...g, skills: g.skills.map(s => s.name === editingSkill.name ? { ...s, ...editingSkill, level: Number(editingSkill.level) } : s) }
        : g
    );
    updateData('skills', updated);
    setEditingSkill(null);
    showSaved();
  };

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;
    const idx = newSkill.groupIndex;
    const updated = skillGroups.map((g, i) =>
      i === idx
        ? { ...g, skills: [...(g.skills || []), { name: newSkill.name.trim(), level: Number(newSkill.level), tag: newSkill.name.slice(0, 4).toUpperCase(), label: 'INTERMEDIATE' }] }
        : g
    );
    updateData('skills', updated);
    setIsAdding(false);
    setNewSkill({ name: '', level: 75, groupIndex: 0 });
    showSaved();
  };

  const displayGroups = activeTab === 'ALL'
    ? skillGroups.map((g, i) => ({ ...g, groupKey: g.label || g.id || `group-${i}`, originalIndex: i }))
    : skillGroups
        .map((g, i) => ({ ...g, groupKey: g.label || g.id || `group-${i}`, originalIndex: i }))
        .filter(g => g.groupKey === activeTab);

  return (
    <AdminLayout>
      <SectionHeader
        title="SKILL_MATRIX"
        description="Manage your portfolio skills and proficiency levels."
        action={
          <button onClick={() => setIsAdding(true)} className="btn-admin-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> ADD SKILL
          </button>
        }
      />

      {saved && (
        <div className="mb-5 px-4 py-3 rounded-lg flex items-center gap-2 text-[13px] font-mono"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          CHANGES_SAVED — Skills updated in portfolio.
        </div>
      )}

      {/* Tab filters */}
      <div className="flex flex-wrap gap-1 mb-6 p-1 rounded-lg w-fit" style={{ background: '#0a0a0f' }}>
        <button
          onClick={() => setActiveTab('ALL')}
          className={clsx(
            "px-3 py-1.5 text-[11px] font-mono rounded-md transition-all cursor-pointer",
            activeTab === 'ALL' ? "bg-[#13131a] text-white border border-white/8" : "text-white/40 hover:text-white"
          )}
        >
          ALL
        </button>
        {skillGroups.map((g, i) => {
          const key = g.label || g.id || `group-${i}`;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={clsx(
                "px-3 py-1.5 text-[11px] font-mono rounded-md transition-all cursor-pointer",
                activeTab === key ? "bg-[#13131a] text-white border border-white/8" : "text-white/40 hover:text-white"
              )}
            >
              {key}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="space-y-4">
          <LoadingSkeleton className="h-48 w-full rounded-xl" />
          <LoadingSkeleton className="h-48 w-full rounded-xl" />
        </div>
      ) : (
        <div className="space-y-4">
          {displayGroups.map(group => (
            <SkillGroup
              key={group.groupKey}
              groupKey={group.groupKey}
              groupData={group}
              onEdit={setEditingSkill}
              onDelete={handleDeleteSkill}
            />
          ))}
        </div>
      )}

      {/* Edit Skill Modal */}
      <Modal isOpen={!!editingSkill} onClose={() => setEditingSkill(null)} title="EDIT_SKILL">
        {editingSkill && (
          <div className="space-y-4">
            <div>
              <label className="admin-label">Skill Name</label>
              <input value={editingSkill.name}
                onChange={e => setEditingSkill(p => ({ ...p, name: e.target.value }))}
                className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Proficiency Level: <span style={{ color: '#a855f7' }}>{editingSkill.level}%</span></label>
              <input type="range" min={0} max={100} value={editingSkill.level}
                onChange={e => setEditingSkill(p => ({ ...p, level: Number(e.target.value) }))}
                className="w-full mt-2 accent-[#a855f7]" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleSaveEdit} className="btn-admin-primary flex-1 justify-center gap-2">
                <Save className="w-4 h-4" /> SAVE
              </button>
              <button onClick={() => setEditingSkill(null)} className="btn-admin-secondary px-4">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Skill Modal */}
      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="ADD_SKILL">
        <div className="space-y-4">
          <div>
            <label className="admin-label">Skill Name</label>
            <input value={newSkill.name}
              onChange={e => setNewSkill(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Docker"
              className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Proficiency Level: <span style={{ color: '#a855f7' }}>{newSkill.level}%</span></label>
            <input type="range" min={0} max={100} value={newSkill.level}
              onChange={e => setNewSkill(p => ({ ...p, level: Number(e.target.value) }))}
              className="w-full mt-2 accent-[#a855f7]" />
          </div>
          <div>
            <label className="admin-label">Add to Group</label>
            <select value={newSkill.groupIndex}
              onChange={e => setNewSkill(p => ({ ...p, groupIndex: Number(e.target.value) }))}
              className="admin-input">
              {skillGroups.map((g, i) => (
                <option key={i} value={i}>{g.label || g.id || `Group ${i + 1}`}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleAddSkill} disabled={!newSkill.name.trim()}
              className="btn-admin-primary flex-1 justify-center gap-2 disabled:opacity-50">
              <Plus className="w-4 h-4" /> ADD SKILL
            </button>
            <button onClick={() => setIsAdding(false)} className="btn-admin-secondary px-4">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
