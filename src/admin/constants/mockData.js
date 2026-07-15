export const ADMIN_STATS = [
  { label: 'Total Projects', value: '15', trend: '+3 this month', positive: true },
  { label: 'Profile Views', value: '1,284', trend: '+12% vs last week', positive: true },
  { label: 'Active Skills', value: '28', trend: 'Updated 2 days ago', positive: null },
  { label: 'Uptime', value: '99.9%', trend: 'All systems operational', positive: true },
];

export const RECENT_ACTIVITY = [
  { id: 1, action: 'Updated Project', target: 'Sentinel IDS', time: '2 hours ago', type: 'edit' },
  { id: 2, action: 'Added Skill', target: 'React Native', time: '1 day ago', type: 'add' },
  { id: 3, action: 'New Visitor', target: 'from San Francisco, CA', time: '1 day ago', type: 'view' },
  { id: 4, action: 'Deployed', target: 'Production (v2.1.0)', time: '3 days ago', type: 'deploy' },
];

export const PROJECTS_DATA = [
  { id: 'ai-recruiter', codename: 'REC_AI_06', title: 'AI Recruiter Copilot', status: 'DEPLOYED', tags: ['AI', 'ML', 'WEB'], lastUpdated: '2026-07-15', description: 'Intelligent candidate ranking platform using semantic embeddings and explainable AI.' },
  { id: '1', codename: 'PS_43', title: 'Intrusion Detection System', status: 'DEPLOYED', tags: ['ML', 'CYBERSEC'], lastUpdated: '2026-07-01', description: 'Advanced AI-driven intrusion detection system designed to monitor network traffic in real-time.' },
  { id: '2', codename: 'GHOSt_02', title: 'Project Ghost', status: 'CLASSIFIED', tags: ['WEB'], lastUpdated: '2026-06-25', description: 'Confidential web application architecture exploring zero-knowledge proofs.' },
  { id: '3', codename: 'NOVA_03', title: 'Project Nova', status: 'IN_PROGRESS', tags: ['WEB', 'ML'], lastUpdated: '2026-07-03', description: 'Next-generation recommendation engine integrating predictive machine learning models.' },
  { id: '4', codename: 'CIPHER_04', title: 'Cipher Dashboard', status: 'IN_PROGRESS', tags: ['WEB'], lastUpdated: '2026-07-02', description: 'A sleek, glassmorphic analytics dashboard for cryptographic applications.' },
  { id: '5', codename: 'ORBIT_05', title: 'Orbit Tracker', status: 'IN_PROGRESS', tags: ['WEB'], lastUpdated: '2026-06-15', description: 'Real-time satellite tracking visualization utilizing WebGL and D3.js.' },
];

export const SKILLS_DATA = {
  LANGUAGES: [
    { id: 1, name: 'JavaScript', level: 95 },
    { id: 2, name: 'Python', level: 85 },
    { id: 3, name: 'TypeScript', level: 90 },
  ],
  FRONTEND: [
    { id: 4, name: 'React', level: 95 },
    { id: 5, name: 'Tailwind CSS', level: 90 },
    { id: 6, name: 'Framer Motion', level: 80 },
  ],
  BACKEND: [
    { id: 7, name: 'Node.js', level: 85 },
    { id: 8, name: 'Express', level: 80 },
    { id: 9, name: 'PostgreSQL', level: 75 },
  ],
  'ML-DATA': [
    { id: 10, name: 'TensorFlow', level: 70 },
    { id: 11, name: 'Pandas', level: 85 },
  ],
  TOOLS: [
    { id: 12, name: 'Git', level: 95 },
    { id: 13, name: 'Docker', level: 75 },
    { id: 14, name: 'AWS', level: 65 },
  ]
};

export const EDUCATION_DATA = [
  { id: 1, institution: 'Stanford University', degree: 'MS in Computer Science', years: '2023 - 2025', grade: '3.9 GPA', status: 'Completed' },
  { id: 2, institution: 'MIT', degree: 'BS in Software Engineering', years: '2019 - 2023', grade: '4.0 GPA', status: 'Completed' },
];

export const EXPERIENCE_DATA = [
  { id: 1, role: 'Senior Security Engineer', company: 'CyberDyne Systems', duration: '2025 - Present', description: 'Leading the threat intelligence team and developing proprietary ML models for anomaly detection.' },
  { id: 2, role: 'Full Stack Developer', company: 'TechNova', duration: '2023 - 2025', description: 'Built and maintained scalable microservices. Improved frontend performance by 40%.' },
];

export const CERTIFICATES_DATA = [
  { id: 1, name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: 'Aug 2024', link: '#' },
  { id: 2, name: 'Machine Learning Specialization', issuer: 'DeepLearning.AI', date: 'Jan 2024', link: '#' },
  { id: 3, name: 'OSCP', issuer: 'Offensive Security', date: 'Nov 2023', link: '#' },
];

export const HERO_DATA = {
  name: 'AADHI',
  roles: ['Software Engineer', 'Security Researcher', 'AI Enthusiast'],
  badgeText: 'AVAILABLE FOR HIRE',
  cta1: { text: 'View Projects', link: '#projects' },
  cta2: { text: 'Contact Me', link: '#contact' },
  deployDate: 'System v2.1.0'
};

// --- New Mock Data for Analytics, Media, Features ---

export const ANALYTICS_TREND = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  visitors: Math.floor(Math.random() * 100) + 20
}));

export const TOP_PAGES = [
  { name: '/', views: 1247 },
  { name: '/projects', views: 856 },
  { name: '/about', views: 420 },
  { name: '/experience', views: 312 },
  { name: '/contact', views: 185 },
];

export const DEVICE_DATA = [
  { name: 'Desktop', value: 68, color: '#8b5cf6' },
  { name: 'Mobile', value: 24, color: '#3b82f6' },
  { name: 'Tablet', value: 8, color: '#10b981' },
];

export const TRAFFIC_SOURCES = [
  { name: 'Direct', value: 450, color: '#6366f1' },
  { name: 'GitHub', value: 380, color: '#14b8a6' },
  { name: 'LinkedIn', value: 250, color: '#0ea5e9' },
  { name: 'Google', value: 167, color: '#f59e0b' },
];

export const RECENT_VISITORS = [
  { id: '1', ip: '192.168.1.45', country: '🇮🇳 India', page: '/', duration: '1m 20s', time: '5 mins ago' },
  { id: '2', ip: '203.0.113.12', country: '🇺🇸 USA', page: '/projects', duration: '3m 45s', time: '12 mins ago' },
  { id: '3', ip: '198.51.100.8', country: '🇬🇧 UK', page: '/contact', duration: '0m 45s', time: '22 mins ago' },
  { id: '4', ip: '45.22.12.9', country: '🇩🇪 Germany', page: '/', duration: '4m 10s', time: '1 hour ago' },
  { id: '5', ip: '112.44.2.1', country: '🇮🇳 India', page: '/about', duration: '2m 15s', time: '2 hours ago' },
  { id: '6', ip: '88.10.12.3', country: '🇫🇷 France', page: '/projects', duration: '1m 05s', time: '2 hours ago' },
  { id: '7', ip: '17.33.22.1', country: '🇺🇸 USA', page: '/', duration: '5m 30s', time: '3 hours ago' },
  { id: '8', ip: '210.12.99.3', country: '🇯🇵 Japan', page: '/experience', duration: '2m 50s', time: '4 hours ago' },
  { id: '9', ip: '190.2.33.4', country: '🇧🇷 Brazil', page: '/', duration: '0m 30s', time: '5 hours ago' },
  { id: '10', ip: '155.12.4.9', country: '🇦🇺 Australia', page: '/contact', duration: '1m 15s', time: '6 hours ago' },
];

export const MEDIA_ITEMS = [
  { id: 1, filename: 'hero-bg.jpg', size: '2.4 MB', type: 'IMAGE', date: 'Jul 01, 2026' },
  { id: 2, filename: 'project-sentinel.png', size: '1.1 MB', type: 'IMAGE', date: 'Jul 02, 2026' },
  { id: 3, filename: 'demo-video.mp4', size: '14.5 MB', type: 'VIDEO', date: 'Jun 28, 2026' },
  { id: 4, filename: 'resume-2026.pdf', size: '450 KB', type: 'DOCUMENT', date: 'Jun 15, 2026' },
  { id: 5, filename: 'avatar-main.png', size: '800 KB', type: 'IMAGE', date: 'May 10, 2026' },
  { id: 6, filename: 'arch-diagram.jpg', size: '1.8 MB', type: 'IMAGE', date: 'Apr 22, 2026' },
  { id: 7, filename: 'cert-aws.png', size: '950 KB', type: 'IMAGE', date: 'Apr 01, 2026' },
  { id: 8, filename: 'og-image.jpg', size: '1.2 MB', type: 'IMAGE', date: 'Mar 15, 2026' },
];

export const ROADMAP_PHASES = [
  {
    phase: 'PHASE 1',
    status: 'COMPLETE',
    tasks: [
      { text: 'Admin shell + auth', done: true },
      { text: 'Dashboard overview', done: true },
      { text: 'Content management pages', done: true },
      { text: 'Settings + Analytics UI', done: true }
    ]
  },
  {
    phase: 'PHASE 2',
    status: 'IN_PROGRESS',
    tasks: [
      { text: 'Connect hero editing to portfolio', done: false },
      { text: 'Connect project CRUD to portfolio', done: false },
      { text: 'Real file upload for media', done: false },
      { text: 'Resume PDF upload', done: false }
    ]
  },
  {
    phase: 'PHASE 3',
    status: 'PLANNED',
    tasks: [
      { text: 'Real analytics integration', done: false },
      { text: 'Blog post editor (MDX)', done: false },
      { text: 'AI content suggestions', done: false },
      { text: 'GitHub activity sync', done: false },
      { text: 'Email contact form backend', done: false },
      { text: 'Deploy trigger from dashboard', done: false }
    ]
  },
  {
    phase: 'PHASE 4',
    status: 'FUTURE',
    tasks: [
      { text: 'Multi-admin support', done: false },
      { text: 'Version history / rollback', done: false },
      { text: 'A/B testing sections', done: false },
      { text: 'SEO analyzer', done: false },
      { text: 'Visitor heatmap', done: false }
    ]
  }
];
