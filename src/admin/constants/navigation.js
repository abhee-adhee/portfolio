import { 
  LayoutDashboard, 
  FolderGit2, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  LineChart, 
  Sparkles 
} from 'lucide-react';

export const SIDEBAR_NAVIGATION = [
  {
    section: 'Overview',
    items: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Analytics', path: '/admin/analytics', icon: LineChart },
    ]
  },
  {
    section: 'Content',
    items: [
      { name: 'Portfolio', path: '/admin/portfolio', icon: FolderGit2 },
      { name: 'Pages', path: '/admin/pages', icon: FileText },
      { name: 'Media', path: '/admin/media', icon: ImageIcon },
    ]
  },
  {
    section: 'System',
    items: [
      { name: 'Settings', path: '/admin/settings', icon: Settings },
      { name: 'Future Features', path: '/admin/features', icon: Sparkles },
    ]
  }
];
