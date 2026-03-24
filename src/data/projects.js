export const projects = [
  {
    id: 'ps-43-ids',
    codename: 'PS_43',
    title: 'Intrusion Detection System',
    subtitle: 'Using Network Traffic Anomalies',
    status: 'DEPLOYED',
    tags: ['ML', 'CYBERSEC'],
    stack: ['Scapy', 'XGBoost', 'FastAPI', 'React', 'Recharts', 'Tailwind'],
    description: 'ML-powered network IDS detecting DDoS, port scanning, and MITM attacks in real time using the CICIDS 2017 dataset with a live React dashboard.',
    shortDesc: 'ML-powered network IDS detecting DDoS, port scanning, and MITM attacks in real time using the CICIDS 2017 dataset with a live React dashboard.',
    fullDesc: 'ML-powered network IDS detecting DDoS, port scanning, and MITM attacks in real time using the CICIDS 2017 dataset with a live React dashboard.',
    features: [
      'Real-time packet capture and flow feature extraction using Scapy',
      'XGBoost classifier trained on CICIDS 2017 dataset',
      'FastAPI backend with WebSocket streaming',
      'React dashboard with Recharts visualization'
    ],
    screenshots: [
      { src: '/screenshots/ids-1.png', caption: 'LIVE_DASHBOARD' }
    ]
  },
  {
    id: 'ghost-02',
    codename: 'GHOST_02',
    title: 'Project Ghost',
    subtitle: 'Classified Operation',
    status: 'CLASSIFIED',
    tags: ['WEB'],
    stack: ['REDACTED'],
    description: 'Details redacted. Access restricted.',
    shortDesc: 'Details redacted. Access restricted.',
    fullDesc: 'Details redacted. Access restricted.',
    features: ['[REDACTED]', '[REDACTED]', '[REDACTED]'],
    screenshots: []
  },
  {
    id: 'nova-03',
    codename: 'NOVA_03',
    title: 'Project Nova',
    subtitle: 'Currently Compiling',
    status: 'IN_PROGRESS',
    progress: 34,
    tags: ['WEB', 'ML'],
    stack: ['React', 'Python', 'FastAPI'],
    description: 'Currently under development. Stay tuned.',
    shortDesc: 'Currently under development. Stay tuned.',
    fullDesc: 'Currently under development. Stay tuned.',
    features: ['Active development', 'Architecture Phase'],
    screenshots: []
  },
  {
    id: 'cipher-04',
    codename: 'CIPHER_04',
    title: 'Cipher Dashboard',
    subtitle: 'Data Visualization Platform',
    status: 'IN_PROGRESS',
    progress: 60,
    tags: ['WEB'],
    stack: ['React', 'Recharts', 'FastAPI', 'Tailwind'],
    description: 'Full-stack analytics dashboard for visualizing and exploring complex datasets.',
    shortDesc: 'Full-stack analytics dashboard for visualizing and exploring complex datasets.',
    fullDesc: 'Full-stack analytics dashboard for visualizing and exploring complex datasets.',
    features: ['Data visualization', 'Real-time analytics'],
    screenshots: []
  },
  {
    id: 'nexus-05',
    codename: 'NEXUS_05',
    title: 'Nexus Hub',
    subtitle: 'Central Infrastructure',
    status: 'DEPLOYED',
    tags: ['WEB', 'CYBERSEC'],
    stack: ['Node.js', 'Express', 'JWT', 'MongoDB'],
    description: 'Centralized hub for managing cross-module communication and security protocols.',
    shortDesc: 'Centralized hub for managing cross-module communication and security protocols.',
    fullDesc: 'Centralized hub for managing cross-module communication and security protocols.',
    features: ['Auth systems', 'API Gateway'],
    screenshots: []
  }
];
