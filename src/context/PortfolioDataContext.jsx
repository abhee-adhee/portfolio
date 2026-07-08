import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as defaultProjects } from '../data/projects';
import { skillGroups as defaultSkillGroups } from '../data/skills';

// Extract defaults from public pages
const defaultHero = {
  name: "ABINAV.SYS",
  roles: ['Pentester', 'ML Engineer', 'Cybersecurity Researcher', 'Hackathon Builder'],
  statusText: "SYSTEM_ONLINE",
  cta1: { text: "ACCESS_PROJECTS", link: "/projects" },
  cta2: { text: "DOWNLOAD_RESUME", link: "/resume.pdf" }
};

const defaultAbout = {
  bio: [
    "I'm Abinav — a developer working at the intersection of machine learning, cybersecurity, and full-stack engineering.",
    "I have built an ML-based intrusion detection system and participated in IBM Datathon 2025 as a backend developer.",
    "In the hackathon, I worked on building a real-time application integrating maps and voice features.",
    "Currently building a mini Cloud SOC (Security Operations Center) system in my college technical society.",
    "I focus on solving real-world problems with scalable and efficient systems.",
  ],
  processes: [
    'Building Cloud-based SOC system for threat monitoring and analysis',
    'Exploring ML + Cybersecurity integrations (IDS, anomaly detection)',
    'Open to internships, freelance work, and hackathon collaborations',
  ]
};

const defaultContact = {
  email: "youremail@example.com",
  github: "https://github.com/abhee-adhee",
  linkedin: "https://www.linkedin.com/in/abinav-aaditya-86a952305/"
};

const defaultExperience = [
  {
  id: 'EXP_01',
  status: 'COMPLETED',
  role: 'Cybersecurity Intern — Web Penetration Tester',
  org: 'BugBustersLab',
  duration: '2026',
  tasks: [
    { id: '01', text: 'Performed web application security assessments to identify common vulnerabilities and security misconfigurations.' },
    { id: '02', text: 'Conducted manual reconnaissance, endpoint enumeration, and vulnerability validation using industry-standard security methodologies.' },
    { id: '03', text: 'Assisted in penetration testing engagements by documenting findings, assessing risk, and recommending remediation measures.' },
    { id: '04', text: 'Collaborated with the security team to analyze web application attack surfaces and improve overall application security posture.' },
  ],
  stack: [
    'Burp Suite',
    'OWASP Top 10',
    'Nmap',
    'Linux',
    'HTTP',
    'Web Security'
  ],
},
  {
    id: 'EXP_02',
    status: 'COMPLETED',
    role: 'Junior Web Developer Intern',
    org: 'AssureFM Services Pvt Ltd',
    duration: 'June 2024 (30 Days)',
    tasks: [
      { id: '01', text: 'Developed and optimized frontend components for internal and client-facing web applications' },
      { id: '02', text: 'Worked on responsive UI design using modern web technologies and best practices' },
      { id: '03', text: 'Collaborated with senior developers to debug issues and improve performance' },
      { id: '04', text: 'Gained hands-on experience in real-world development workflows and deployment cycles' },
    ],
    stack: ['React', 'JavaScript', 'HTML', 'CSS', 'REST APIs'],
  },
  {
    id: 'EXP_03',
    status: 'ACTIVE',
    role: 'Core Member — Mini SOC Initiative',
    org: 'Tech Society',
    duration: '2024 — Present',
    tasks: [
      { id: '01', text: 'Building a mini Cloud Security Operations Center (SOC) for threat monitoring and analysis' },
      { id: '02', text: 'Implementing network traffic inspection and anomaly detection techniques' },
      { id: '03', text: 'Working with cybersecurity tools to simulate real-world attack detection scenarios' },
      { id: '04', text: 'Collaborating with team members to design scalable and secure cloud-based systems' },
    ],
    stack: ['Python', 'Linux', 'Networking', 'Scapy', 'Cloud Computing'],
  }
];

const defaultCertificates = [
  {
    id: 'CERT_01',
    name: 'DBMS Course - Master the Fundamentals and Advanced Concepts',
    issuer: 'Scaler',
    platform: 'Scaler',
    date: 'Aug 2025',
    color: '#f59e0b',
    url: 'https://moonshot.scaler.com/s/sl/zK8nyfJicd'
  },
  {
    id: 'CERT_02',
    name: 'Introduction to Cybersecurity Tools & Cyberattacks',
    issuer: 'IBM',
    platform: 'Coursera',
    date: 'Oct 2025',
    color: '#6366f1',
    credentialId: '571F37PJ9MS6',
    url: 'https://coursera.org/share/a2737e81774194b31eae03acf12160a6'
  },
  {
    id: 'CERT_03',
    name: 'Operating Systems: Overview, Administration, and Security',
    issuer: 'IBM',
    platform: 'Coursera',
    date: 'Oct 2025',
    color: '#4ade80',
    credentialId: 'IXGGRHEDGBLF',
    url: 'https://coursera.org/share/2b12349976cbe0581da0056d8a81ea7f'
  },
  {
    id: 'CERT_04',
    name: 'Cybersecurity Compliance Framework, Standards & Regulations',
    issuer: 'IBM',
    platform: 'Coursera',
    date: 'Dec 2025',
    color: '#ec4899',
    credentialId: '2QTPZJN39DDJ',
    url: 'https://coursera.org/share/256f69a2c6313f31fb2c0fcec5735df0'
  },
  {
    id: 'CERT_05',
    name: 'IT Fundamentals for Cybersecurity (Specialization)',
    issuer: 'IBM',
    platform: 'Coursera',
    date: 'Feb 2026',
    color: '#a855f7',
    credentialId: '0E4GRNCDTAJG',
    url: 'https://coursera.org/share/da96f98c2db242ed94289f81daf73d2f'
  },
  {
    id: 'CERT_06',
    name: 'Computer Forensics Specialization',
    issuer: 'Infosec',
    platform: 'Coursera',
    date: 'May 2026',
    color: '#06b6d4',
    credentialId: 'GPMWODDPQ7K8',
    url: 'https://coursera.org/share/dfc83bb64f9fc44f874ff6a10ab29f7b'
  },
  {
    id: 'CERT_07',
    name: 'Introduction to Security Principles in Cloud Computing',
    issuer: 'Google Cloud',
    platform: 'Coursera',
    date: 'Feb 2026',
    color: '#22c55e',
    credentialId: 'BYKSZIBGSUPP',
    url: 'https://coursera.org/share/c951d396026efeb9d7f8bd48823ed15b'
  },
  {
    id: 'CERT_08',
    name: 'Generative AI for Web Developers',
    issuer: 'Amazon Web Services (AWS)',
    platform: 'AWS',
    date: 'Feb 2026',
    color: '#ff9900',
    url: '#'
  }
];

const defaultEducation = [
  {
    id: 'ENTRY_01',
    status: 'ACTIVE',
    institution: 'Saveetha Engineering College',
    level: 'Undergraduate',
    degree: '[BE - Computer Science]',
    year: '2024 — Present',
    notes: '[Tech Society , CGPA : 8.2 ]',
    subjects: ['Data Structures', 'Machine Learning', 'Computer Networks', 'Operating Systems', 'Cybersecurity'],
  },
  {
    id: 'ENTRY_02',
    status: 'COMPLETE',
    institution: 'AVM Rajeshwari Matriculation Higher Secondary School',
    level: 'Higher Secondary (Class 12)',
    stream: '[Computer Science ]',
    year: '2023',
    score: '[79%]',
  }
];

const defaultEduCerts = [
  { name: 'International Math Olympiad', issuer: 'Science Olympiad Foundation', year: '2019', color: '#a855f7' },
  { name: 'National Science Olympiad', issuer: 'Science Olympiad Foundation', year: '2018', color: '#6366f1' },
];

const INITIAL_STATE = {
  hero: defaultHero,
  about: defaultAbout,
  contact: defaultContact,
  projects: defaultProjects,
  skills: defaultSkillGroups,
  experience: defaultExperience,
  certificates: defaultCertificates,
  education: defaultEducation,
  eduCerts: defaultEduCerts
};

const STORAGE_KEY = 'aadhi_portfolio_state';
const STORAGE_VERSION = 3;

function loadInitialData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return INITIAL_STATE;

    const parsed = JSON.parse(saved);
    if (!parsed) return INITIAL_STATE;

    if (parsed.__version === STORAGE_VERSION) {
      return {
        ...INITIAL_STATE,
        ...parsed,
        hero: parsed.hero || INITIAL_STATE.hero,
        about: parsed.about || INITIAL_STATE.about,
        contact: parsed.contact || INITIAL_STATE.contact,
        projects: parsed.projects || INITIAL_STATE.projects,
        skills: parsed.skills || INITIAL_STATE.skills,
        experience: parsed.experience || INITIAL_STATE.experience,
        certificates: parsed.certificates || INITIAL_STATE.certificates,
        education: parsed.education || INITIAL_STATE.education,
        eduCerts: parsed.eduCerts || INITIAL_STATE.eduCerts,
      };
    }

    if (parsed.__version === 2) {
      return {
        ...INITIAL_STATE,
        ...parsed,
        hero: parsed.hero || INITIAL_STATE.hero,
        about: parsed.about || INITIAL_STATE.about,
        contact: parsed.contact || INITIAL_STATE.contact,
        projects: parsed.projects || INITIAL_STATE.projects,
        skills: INITIAL_STATE.skills,
        experience: parsed.experience || INITIAL_STATE.experience,
        certificates: parsed.certificates || INITIAL_STATE.certificates,
        education: parsed.education || INITIAL_STATE.education,
        eduCerts: parsed.eduCerts || INITIAL_STATE.eduCerts,
      };
    }

    return INITIAL_STATE;
  } catch (err) {
    console.error('Failed to load portfolio state', err);
    return INITIAL_STATE;
  }
}

const PortfolioDataContext = createContext();

export function PortfolioDataProvider({ children }) {
  const [data, setData] = useState(loadInitialData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, __version: STORAGE_VERSION }));
  }, [data]);

  const updateData = (key, payload) => {
    setData(prev => ({
      ...prev,
      [key]: payload
    }));
  };

  const resetToDefaults = () => {
    setData(INITIAL_STATE);
  };

  return (
    <PortfolioDataContext.Provider value={{ data, updateData, resetToDefaults }}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
}
