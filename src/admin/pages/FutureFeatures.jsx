import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { ROADMAP_PHASES } from '../constants/mockData';
import { Sparkles, ChevronDown, ChevronUp, CheckCircle2, Circle, AlertCircle, Clock } from 'lucide-react';
import { motion,  AnimatePresence } from 'framer-motion';

export function FutureFeatures() {
  const [loading, setLoading] = useState(true);
  // Default open all sections for this view
  const [openSections, setOpenSections] = useState({ 0: true, 1: true, 2: true, 3: true });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (idx) => {
    setOpenSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'COMPLETE': 
        return { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle2 };
      case 'IN_PROGRESS': 
        return { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: Clock };
      case 'PLANNED': 
        return { color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: AlertCircle };
      default: 
        return { color: 'text-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500/20', icon: Circle };
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white font-mono tracking-widest mb-4">
            DEVELOPMENT_ROADMAP
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Track the ongoing development and planned features for the Portfolio Management System.
          </p>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1,2,3,4].map(i => <LoadingSkeleton key={i} className="h-24 w-full rounded-xl" />)}
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-0">
            {/* Desktop Timeline Line */}
            <div className="hidden sm:block absolute left-[150px] top-0 bottom-0 w-px bg-gray-200 dark:bg-[#27272a]" />
            
            <div className="space-y-12">
              {ROADMAP_PHASES.map((phaseData, idx) => {
                const isOpen = openSections[idx];
                const config = getStatusConfig(phaseData.status);
                const StatusIcon = config.icon;

                return (
                  <div key={idx} className="relative sm:flex gap-8 group">
                    {/* Desktop Phase Label */}
                    <div className="hidden sm:block w-[120px] text-right pt-4 flex-shrink-0">
                      <span className="font-mono font-bold text-gray-900 dark:text-white text-lg">{phaseData.phase}</span>
                    </div>

                    {/* Timeline Node */}
                    <div className="hidden sm:flex absolute left-[134px] top-4 w-8 h-8 rounded-full bg-white dark:bg-[#09090b] border-2 border-gray-200 dark:border-[#27272a] items-center justify-center z-10 transition-colors">
                      <div className={`w-3 h-3 rounded-full ${config.bg.replace('/10', '')} ${config.color.replace('text-', 'bg-')}`} />
                    </div>

                    {/* Mobile Phase Label */}
                    <div className="sm:hidden mb-4">
                      <span className="font-mono font-bold text-gray-900 dark:text-white text-lg">{phaseData.phase}</span>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-xl overflow-hidden shadow-sm dark:admin-glass hover:shadow-md transition-shadow">
                      <button 
                        onClick={() => toggleSection(idx)}
                        className="w-full flex items-center justify-between p-5 bg-gray-50/50 dark:bg-[#27272a]/20 hover:bg-gray-50 dark:hover:bg-[#27272a]/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <StatusIcon className={`w-5 h-5 ${config.color}`} />
                          <span className={`text-xs font-mono font-bold tracking-widest px-2 py-1 rounded border ${config.bg} ${config.border} ${config.color}`}>
                            {phaseData.status}
                          </span>
                        </div>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-gray-200 dark:border-[#27272a]"
                          >
                            <ul className="p-6 space-y-4">
                              {phaseData.tasks.map((task, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-3">
                                  {task.done ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0 mt-0.5" />
                                  )}
                                  <span className={`text-base ${task.done ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-700 dark:text-gray-200 font-medium'}`}>
                                    {task.text}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
