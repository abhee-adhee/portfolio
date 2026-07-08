import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { EXPERIENCE_DATA, CERTIFICATES_DATA } from '../constants/mockData';
import { Plus, Edit2, Trash2, Briefcase, Award, ExternalLink, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

export function Experience() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('EXPERIENCE');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <AdminLayout>
      <SectionHeader 
        title={activeTab === 'EXPERIENCE' ? 'WORK_HISTORY' : 'CERTIFICATIONS'}
        action={
          <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors">
            <Plus className="w-4 h-4 mr-2" /> 
            {activeTab === 'EXPERIENCE' ? 'ADD EXPERIENCE' : 'ADD CERTIFICATE'}
          </button>
        }
      />

      <div className="flex border-b border-gray-200 dark:border-[#27272a] mb-8">
        <button
          onClick={() => setActiveTab('EXPERIENCE')}
          className={clsx(
            "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
            activeTab === 'EXPERIENCE' 
              ? "border-blue-500 text-blue-600 dark:text-blue-400" 
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          )}
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> EXPERIENCE
          </div>
        </button>
        <button
          onClick={() => setActiveTab('CERTIFICATES')}
          className={clsx(
            "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
            activeTab === 'CERTIFICATES' 
              ? "border-blue-500 text-blue-600 dark:text-blue-400" 
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          )}
        >
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" /> CERTIFICATES
          </div>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LoadingSkeleton className="h-48 w-full rounded-xl" />
          <LoadingSkeleton className="h-48 w-full rounded-xl" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {activeTab === 'EXPERIENCE' ? (
            <motion.div 
              key="exp"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {EXPERIENCE_DATA.map((item) => (
                <Card key={item.id} className="group dark:admin-glass hover:border-blue-500/50 transition-colors relative">
                  <CardContent className="p-6">
                    <div className="absolute top-6 right-6 flex opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                      <button onClick={() => setIsModalOpen(true)} className="p-2 bg-gray-100 dark:bg-[#27272a] text-gray-500 hover:text-blue-500 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => setIsModalOpen(true)} className="p-2 bg-gray-100 dark:bg-[#27272a] text-gray-500 hover:text-red-500 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-24">{item.role}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{item.company}</p>
                        <Badge variant="default" className="mb-4">{item.duration}</Badge>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="cert"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {CERTIFICATES_DATA.map((item) => (
                <Card key={item.id} className="group dark:admin-glass hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                        <button onClick={() => setIsModalOpen(true)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-md transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => setIsModalOpen(true)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    
                    <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-2 flex-1">
                      {item.name}
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{item.issuer}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-[#27272a]">
                      <span className="text-xs font-mono text-gray-500">{item.date}</span>
                      <button onClick={() => setIsModalOpen(true)} className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center hover:underline">
                        VERIFY <ExternalLink className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Under Development">
        <div className="p-6 text-center text-gray-600 dark:text-gray-400">
          COMING SOON — This feature is under development.
        </div>
      </Modal>
    </AdminLayout>
  );
}
