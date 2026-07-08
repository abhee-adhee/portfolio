import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Modal } from '../components/ui/Modal';
import { SearchInput } from '../components/ui/SearchInput';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { MEDIA_ITEMS } from '../constants/mockData';
import { UploadCloud, Image as ImageIcon, Film, FileText, Eye, Link, Trash2, Search } from 'lucide-react';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

export function Media() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredMedia = MEDIA_ITEMS.filter(m => {
    const matchesFilter = filter === 'ALL' || m.type === filter;
    const matchesSearch = m.filename.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAction = (e, media = null) => {
    e.stopPropagation();
    if (media) setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'VIDEO': return <Film className="w-8 h-8 text-purple-500" />;
      case 'DOCUMENT': return <FileText className="w-8 h-8 text-blue-500" />;
      default: return <ImageIcon className="w-8 h-8 text-emerald-500" />;
    }
  };

  return (
    <AdminLayout>
      <SectionHeader 
        title="MEDIA_LIBRARY" 
        description="Manage your uploaded assets, images, and documents."
        action={
          <button onClick={handleAction} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors">
            <UploadCloud className="w-4 h-4 mr-2" /> UPLOAD MEDIA
          </button>
        }
      />

      {/* Upload Dropzone */}
      <div 
        onClick={handleAction}
        className="w-full mb-8 border-2 border-dashed border-gray-300 dark:border-[#27272a] hover:border-blue-500 dark:hover:border-blue-500 bg-gray-50/50 hover:bg-blue-50/50 dark:bg-[#18181b]/50 dark:hover:bg-blue-900/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group"
      >
        <div className="w-16 h-16 bg-white dark:bg-[#27272a] shadow-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Drag & drop files here</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or click to browse from your computer</p>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-gray-100 dark:bg-[#09090b] rounded text-xs font-mono text-gray-500">JPG</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-[#09090b] rounded text-xs font-mono text-gray-500">PNG</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-[#09090b] rounded text-xs font-mono text-gray-500">MP4</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-[#09090b] rounded text-xs font-mono text-gray-500">PDF</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between p-4 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-xl shadow-sm dark:admin-glass">
        <div className="flex gap-2 bg-gray-100 dark:bg-[#09090b] p-1 rounded-lg">
          {['ALL', 'IMAGE', 'VIDEO', 'DOCUMENT'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={clsx(
                "px-3 py-1.5 text-xs font-mono rounded-md transition-all",
                filter === type 
                  ? "bg-white dark:bg-[#27272a] text-gray-900 dark:text-white shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="w-full sm:w-64">
          <SearchInput 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search files..." 
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => <LoadingSkeleton key={i} className="aspect-square w-full rounded-xl" />)}
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredMedia.map(media => (
              <motion.div
                key={media.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => handleAction(e, media)}
                className="group aspect-square rounded-xl bg-gray-100 dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] overflow-hidden relative cursor-pointer"
              >
                {/* Placeholder Image/Icon area */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-[#18181b] dark:to-[#09090b]">
                  {getIcon(media.type)}
                </div>
                
                {/* Info Bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-md p-3 border-t border-gray-200 dark:border-[#27272a]">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{media.filename}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500 font-mono">{media.size}</span>
                    <span className="text-xs text-gray-500">{media.date}</span>
                  </div>
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button onClick={(e) => handleAction(e, media)} className="p-2 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-colors" title="View">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button onClick={(e) => handleAction(e, media)} className="p-2 bg-white/20 hover:bg-blue-500 text-white rounded-full transition-colors" title="Copy URL">
                    <Link className="w-5 h-5" />
                  </button>
                  <button onClick={(e) => handleAction(e, media)} className="p-2 bg-white/20 hover:bg-red-500 text-white rounded-full transition-colors" title="Delete">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox / Action Modal Placeholder */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedMedia ? `Viewing: ${selectedMedia.filename}` : "Upload Media"}>
        <div className="p-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
            <UploadCloud className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">COMING SOON</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            Actual file uploading and media bucket integration will be connected in Phase 2.
          </p>
        </div>
      </Modal>

    </AdminLayout>
  );
}
