export const projects = [
  {
    id: 'mini-soc',
    codename: 'SOC_01',
    title: 'Mini SOC',
    subtitle: 'SOC Monitoring & Defense Demonstration',
    status: 'DEPLOYED',
    tags: ['CYBERSEC', 'SOC'],
    stack: [
      'Windows Defender',
      'PowerShell',
      'Windows Event Logs',
      'Python',
      'Monitoring'
    ],
    description:
      'A Security Operations Center (SOC) demonstration showcasing endpoint monitoring, threat detection, and defensive workflows using Windows Defender and a custom PowerShell monitoring solution.',
    shortDesc:
      'SOC monitoring and defensive security demonstration using Windows Defender and PowerShell.',
    fullDesc:
      'Mini SOC demonstrates how endpoint security events can be monitored and analyzed using Windows Defender together with a custom-built PowerShell monitoring script. The project focuses on SOC-style visibility, alert generation, and defensive monitoring concepts.',
    features: [
      'Windows Defender monitoring',
      'Custom PowerShell SOC monitor',
      'Event log monitoring',
      'Security event visualization',
      'SOC workflow demonstration'
    ],
    screenshots: [],
    repository: 'https://github.com/sectechsociety/CloudSEC-Sandbox/tree/Mini-SOC',
    demo: null,
    problem: 'Students often lack access to realistic Security Operations Center environments for understanding monitoring and defensive workflows.',
    approach: 'Built a lightweight SOC demonstration using Windows Defender, Windows Event Logs, and PowerShell monitoring to simulate endpoint monitoring and security event analysis.',
    outcome: 'Created a practical environment demonstrating SOC workflows, endpoint monitoring, and defensive analysis suitable for cybersecurity learning.'
  },

  {
    id: 'voice-for-all',
    codename: 'VF_02',
    title: 'VoiceForAll',
    subtitle: 'IBM Z Datathon 2025 Project',
    status: 'DEPLOYED',
    tags: ['WEB'],
    stack: [
      'Streamlit',
      'Python',
      'SQLite',
      'Pandas',
      'TextBlob',
      'Plotly'
    ],
    description:
      'Accessibility reporting platform that enables people with disabilities to submit accessibility issues using voice or text while generating actionable insights through sentiment analysis and interactive dashboards.',
    shortDesc:
      'IBM Z Datathon project empowering accessibility reporting through AI-driven insights.',
    fullDesc:
      'VoiceForAll empowers individuals with disabilities to report accessibility barriers using text or voice input. Reports are analyzed for sentiment and urgency, visualized on interactive maps, and transformed into actionable insights for NGOs and policymakers.',
    features: [
      'Voice & text accessibility reporting',
      'Interactive accessibility map',
      'NLP sentiment analysis using TextBlob',
      'Analytics dashboard',
      'Timestamped report integrity',
      'Cloud deployment'
    ],
    screenshots: [],
    repository: 'https://github.com/abhee-adhee/voice-forall-access',
    demo: 'https://voice-for-all-phi.vercel.app/',
    problem: 'People with disabilities frequently encounter accessibility barriers without an easy way to report them or visualize accessibility trends.',
    approach: 'Developed a Streamlit-based platform allowing users to submit accessibility issues through voice or text. Integrated sentiment analysis, interactive maps, SQLite storage, and analytical dashboards.',
    outcome: 'Produced a working accessibility reporting platform showcased during IBM Z Datathon that transforms accessibility reports into actionable insights.'
  },

  {
    id: 'sentinel-ids',
    codename: 'SENTINEL_03',
    title: 'Sentinel IDS',
    subtitle: 'Python Network Intrusion Detection System',
    status: 'ACTIVE',
    progress: 82,
    tags: ['CYBERSEC', 'WEB', 'PYTHON'],
    stack: [
      'Python',
      'Scapy',
      'SQLite',
      'Matplotlib',
      'Custom Detection Engine'
    ],
    description:
      'A modular Network Intrusion Detection System built from scratch for real-time packet inspection, attack detection, offline PCAP analysis, and SOC-style monitoring.',
    shortDesc:
      'Python-based IDS with real-time packet capture and attack detection.',
    fullDesc:
      'Sentinel IDS is a modular intrusion detection system built entirely in Python to understand packet processing, network security, and SOC operations. It performs real-time traffic inspection, configurable attack detection, alert logging, offline PCAP analysis, and dashboard visualization.',
    features: [
      'Real-time packet capture using Scapy',
      'Modular packet parsing pipeline',
      'Configurable detection engine',
      'SYN Flood detection',
      'Port Scan detection',
      'SQLite alert logging',
      'SOC dashboard',
      'PDF & TXT report generation',
      'Offline PCAP analysis',
      'Configurable detection rules'
    ],
    screenshots: [],
    repository: 'https://github.com/abhee-adhee/Network-IDS',
    demo: null,
    problem: 'Organizations need an accessible intrusion detection system capable of monitoring network traffic in real time while remaining modular and easy to extend for learning and experimentation.',
    approach: 'Developed a Python-based IDS using Scapy for packet capture and parsing. Built a modular detection engine with configurable rules, SQLite alert logging, live dashboard integration, PDF/TXT reporting, and offline PCAP analysis.',
    outcome: 'Successfully implemented SYN Flood detection, Port Scan detection, live monitoring, configurable rules, reporting features, and a SOC-style dashboard. The project continues to evolve with additional attack signatures and performance improvements.'
  },

  {
    id: 'edumate',
    codename: 'EDUMATE_04',
    title: 'EduMate',
    subtitle: "ITRYX'25 Hackathon Project",
    status: 'DEPLOYED',
    tags: ['ML', 'WEB', 'COMPUTER VISION', 'EDTECH'],
    stack: [
      'Python',
      'OpenCV',
      'FER',
      'Machine Learning',
      'React'
    ],
    description:
      'AI-powered adaptive learning platform that analyzes learner engagement using facial expression recognition and dynamically personalizes learning experiences.',
    shortDesc:
      'Adaptive learning platform powered by facial expression recognition.',
    fullDesc:
      'EduMate enhances digital learning by continuously monitoring learner engagement through facial expression recognition, automatically adapting lesson pacing, providing contextual hints, and generating detailed learning analytics.',
    features: [
      'Live facial expression recognition',
      'Adaptive learning pace',
      'Context-aware learning hints',
      'Emotion analytics dashboard',
      'Learning efficiency reports'
    ],
    screenshots: [],
    repository: 'https://github.com/nishanthrs0312/emotion-aware-learning-companion',
    demo: 'https://emotion-aware-learning-companion.vercel.app',
    problem: 'Traditional online learning platforms cannot adapt to a student\'s emotional engagement during learning sessions.',
    approach: 'Developed an AI-assisted learning platform capable of detecting facial expressions and adjusting learning support through adaptive pacing, scaffolded hints, and session analytics.',
    outcome: 'Built a functional prototype demonstrating emotion-aware learning and personalized educational assistance.'
  },

  {
    id: 'policy-sandbox',
    codename: 'SANDBOX_05',
    title: 'Policy-Based Execution Sandbox',
    subtitle: 'Secure Runtime for Autonomous AI Agents',
    status: 'IN_PROGRESS',
    progress: 12,
    tags: ['CYBERSEC', 'RESEARCH', 'LINUX'],
    stack: [
      'Python',
      'FastAPI',
      'Docker',
      'Open Policy Agent',
      'seccomp',
      'ptrace',
      'React'
    ],
    description:
      'Research project exploring runtime policy enforcement and behavioral monitoring for autonomous AI agents executing tools, shell commands, APIs, and file operations.',
    shortDesc:
      'Research-oriented execution sandbox for secure autonomous AI agents.',
    fullDesc:
      'A research-focused execution sandbox designed to enforce security policies on autonomous AI agents using Linux syscall interception, runtime policy enforcement, and behavioral anomaly detection. The project aims to improve the safety of agentic AI systems.',
    features: [
      'Policy-based execution engine',
      'Runtime syscall interception',
      'Behavioral anomaly detection',
      'Docker-based isolation',
      'Policy violation monitoring',
      'Security analytics dashboard'
    ],
    screenshots: []
  }
];