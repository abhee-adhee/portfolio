import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { EDUCATION_DATA } from '../constants/mockData';
import { Plus, Edit2, Trash2, GraduationCap } from 'lucide-react';


export function Education() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AdminLayout>
      <SectionHeader 
        title="ACADEMIC_RECORDS" 
        action={
          <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors">
            <Plus className="w-4 h-4 mr-2" /> ADD ENTRY
          </button>
        }
      />

      {loading ? (
        <div className="space-y-4">
          <LoadingSkeleton className="h-32 w-full rounded-xl" />
          <LoadingSkeleton className="h-32 w-full rounded-xl" />
        </div>
      ) : (
        <div className="relative pl-8 sm:pl-32 py-6">
          {/* Vertical line */}
          <div className="absolute left-8 sm:left-32 top-0 bottom-0 w-px bg-gray-200 dark:bg-[#27272a] -ml-px" />
          
          <div className="space-y-12">
            {EDUCATION_DATA.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Year tag for desktop */}
                <div className="hidden sm:block absolute -left-32 top-3 w-28 text-right pr-6 font-mono text-sm text-gray-500 dark:text-gray-400">
                  {item.years}
                </div>
                
                {/* Timeline node */}
                <div className="absolute -left-[33px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-[#18181b] border-2 border-gray-200 dark:border-[#27272a] flex items-center justify-center shadow-sm group-hover:border-blue-500 dark:group-hover:border-blue-500 transition-colors">
                  <GraduationCap className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                
                {/* Content Card */}
                <div className="ml-6 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-xl p-5 shadow-sm dark:admin-glass hover:shadow-md transition-shadow relative">
                  <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                    <button onClick={() => setIsModalOpen(true)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => setIsModalOpen(true)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>

                  <div className="sm:hidden text-xs font-mono text-gray-500 mb-2">{item.years}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-16">{item.institution}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-1">{item.degree}</p>
                  
                  <div className="mt-4 flex items-center gap-3">
                    <Badge variant={item.status === 'Completed' ? 'success' : 'primary'}>{item.status}</Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-[#27272a] px-2 py-0.5 rounded">
                      {item.grade}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Under Development">
        <div className="p-6 text-center text-gray-600 dark:text-gray-400">
          COMING SOON — This feature is under development.
        </div>
      </Modal>
    </AdminLayout>
  );
}
