export const projects = [
  {
    id: 'sentinel-ids',
    codename: 'SENTINEL_03',
    title: 'Sentinel IDS',
    subtitle: 'Python Network Intrusion Detection System',
    status: 'IN_PROGRESS',
    progress: 82,
    tags: ['CYBERSEC', 'PYTHON', 'NETWORKING'],
    stack: [
      'Python',
      'Scapy',
      'SQLite',
      'Matplotlib',
      'Raw Sockets',
      'Custom Detection Engine'
    ],
    tagline: 'Raw socket packet parsing & real-time signature + anomaly attack detection engine.',
    description:
      'A modular Network Intrusion Detection System built from scratch in Python for real-time packet inspection, attack detection, offline PCAP analysis, and SOC-style monitoring.',
    shortDesc:
      'Python-based IDS with real-time packet capture, SYN flood & port scan detection, and SOC alerting.',
    fullDesc:
      'Sentinel IDS is a modular intrusion detection system built entirely in Python to understand packet processing, network security protocols, and SOC operations from first principles. It performs real-time traffic inspection at OSI Layers 2–4, configurable attack detection, structured alert logging, offline PCAP analysis, and dashboard visualization.',
    whatItIs:
      'A modular Network Intrusion Detection System built from scratch in Python for real-time packet inspection, attack detection, offline PCAP analysis, and SOC-style monitoring.',
    whyBuilt:
      'Built to understand raw network packet manipulation, protocol analysis, and signature vs. anomaly detection at the socket layer without relying on pre-packaged commercial appliances.',
    problem:
      'Organizations and security students need an accessible, transparent intrusion detection system capable of monitoring network traffic in real time while remaining modular, configurable, and inspectable.',
    technicallyInteresting:
      'Directly interfaces with Scapy to parse OSI Layer 2–4 frames asynchronously, calculating sliding-window packet arrival delta thresholds (SYN flood detection at >100 SYNs/sec per IP) and sliding-window port knock counts across sequential TCP destination ports.',
    whatIBuilt:
      'The complete asynchronous packet capture loop, the modular protocol parser (Ethernet/IP/TCP/UDP/ICMP), the stateful attack detection engine, SQLite alert storage, and the Matplotlib/Tkinter live alert monitor.',
    visitorEvidence:
      'Complete open-source repository with runnable Python scripts, PCAP replay test files, detection rule configs, and generated PDF/TXT incident reports.',
    features: [
      'Real-time packet capture using Scapy and raw sockets',
      'Modular packet parsing pipeline across Ethernet, IP, TCP, UDP, ICMP',
      'Stateful SYN Flood detection (>100 SYN packets/sec threshold)',
      'Configurable Port Scan detection across sequential destination ports',
      'Persistent SQLite alert logging with ISO timestamps and IP metadata',
      'SOC alerting monitor with real-time Matplotlib visualization',
      'Incident report generator outputting PDF & TXT summaries',
      'Offline PCAP analysis mode for historical incident replay'
    ],
    screenshot: null, // Set to '/projects/sentinel-ids.png' to use an image from public/projects/
    screenshots: [],
    repository: 'https://github.com/abhee-adhee/Network-IDS',
    demo: null,
    approach:
      'Developed a Python-based IDS using Scapy for packet capture and parsing. Built a modular detection engine with configurable rules, SQLite alert logging, live dashboard integration, PDF/TXT reporting, and offline PCAP analysis.',
    outcome:
      'Successfully implemented SYN Flood detection, Port Scan detection, live monitoring, configurable rules, reporting features, and a SOC-style dashboard. The project continues to evolve with additional attack signatures and performance improvements.'
  },

  {
    id: 'voice-for-all',
    codename: 'VF_02',
    title: 'VoiceForAll',
    subtitle: 'IBM Z Datathon 2025 Project',
    status: 'DEPLOYED',
    tags: ['WEB', 'NLP', 'ACCESSIBILITY'],
    stack: [
      'Streamlit',
      'Python',
      'SQLite',
      'Pandas',
      'TextBlob',
      'Plotly'
    ],
    tagline: 'Accessible civic barrier reporting platform converting voice & text into actionable spatial insights.',
    description:
      'Accessibility reporting platform that enables people with disabilities to submit accessibility issues using voice or text while generating actionable insights through sentiment analysis and interactive dashboards.',
    shortDesc:
      'IBM Z Datathon project empowering accessibility reporting through NLP sentiment analysis and geospatial maps.',
    fullDesc:
      'VoiceForAll empowers individuals with disabilities to report physical and digital accessibility barriers using speech or text input. Submissions are analyzed for sentiment polarity and urgency, indexed on interactive spatial maps, and transformed into prioritized reports for municipal administrators and NGOs.',
    whatItIs:
      'An accessibility grievance logging and civic reporting platform designed during the IBM Z Datathon 2025.',
    whyBuilt:
      'Built during the hackathon to provide people with physical and visual disabilities an accessible channel to submit civic barrier reports via voice or text and convert raw submissions into prioritized municipal action.',
    problem:
      'Citizens with disabilities encounter physical infrastructure and public service barriers daily, but municipal reporting channels lack accessible input modalities and fail to aggregate sentiment or urgency data.',
    technicallyInteresting:
      'Integrates browser Web Speech recognition with TextBlob NLP sentiment analysis and urgency scoring, indexing spatial grievance markers on interactive Plotly geo-maps with timestamped SQLite integrity.',
    whatIBuilt:
      'The entire multi-page Streamlit application, the speech-to-text input pipeline, the TextBlob sentiment classification module, the SQLite database layer with ISO timestamps, and the interactive Plotly geospatial dashboard.',
    visitorEvidence:
      'Live deployed web application on Vercel/Streamlit and documented GitHub repository with complete data analysis notebooks.',
    features: [
      'Voice-to-text and typed accessibility grievance reporting',
      'Interactive Plotly geospatial map displaying regional barrier clusters',
      'NLP sentiment and urgency analysis using TextBlob',
      'Municipal analytics dashboard with priority sorting',
      'Persistent SQLite storage with ISO-8601 timestamp integrity',
      'Exportable CSV and PDF grievance records'
    ],
    screenshot: null, // Set to '/projects/voice-for-all.png' to use an image from public/projects/
    screenshots: [],
    repository: 'https://github.com/abhee-adhee/voice-forall-access',
    demo: 'https://voice-for-all-phi.vercel.app/',
    approach:
      'Developed a Streamlit-based platform allowing users to submit accessibility issues through voice or text. Integrated sentiment analysis, interactive maps, SQLite storage, and analytical dashboards.',
    outcome:
      'Produced a working accessibility reporting platform showcased during IBM Z Datathon that transforms accessibility reports into actionable insights.'
  },

  {
    id: 'ai-recruiter-copilot',
    codename: 'REC_AI_06',
    title: 'AI Recruiter Copilot',
    subtitle: 'India Runs by Redrob AI by Hack2Skill 2026',
    status: 'DEPLOYED',
    tags: ['AI', 'ML', 'NLP', 'WEB'],
    stack: [
      'Streamlit',
      'Python',
      'Sentence Transformers',
      'Scikit-learn',
      'Pandas',
      'NumPy'
    ],
    tagline: 'Semantic vector candidate intelligence with explainable AI match rubrics.',
    description:
      'An AI-powered candidate intelligence platform that ranks resumes using semantic embeddings, technical capability analysis, behavioral scoring, and explainable AI.',
    shortDesc:
      'Explainable candidate intelligence platform ranking resumes via semantic embeddings and transparent rubrics.',
    fullDesc:
      'AI Recruiter Copilot is an intelligent hiring assistant that streamlines resume screening by combining semantic search, technical skill extraction, behavioral signals, and explainable AI. Recruiters can upload a job description and candidate dataset, automatically rank applicants, analyze technical fit, identify skill gaps, generate hiring insights, and export interview-ready reports without relying on opaque black-box scoring.',
    whatItIs:
      'An explainable candidate intelligence and resume ranking platform developed for Hack2Skill\'s India Runs hackathon.',
    whyBuilt:
      'Built to replace black-box keyword filtering with semantic resume matching that explicitly justifies why each candidate was ranked or rejected.',
    problem:
      'Traditional ATS tools rely on rigid keyword matches that penalize qualified candidates using synonymous phrasing, while commercial AI tools offer zero explainability into hiring decisions.',
    technicallyInteresting:
      'Generates dense vector embeddings using Sentence Transformers (all-MiniLM-L6-v2) to compute cosine similarity against job descriptions, combining technical fit scores with extracted experience signals and generating human-readable explainability rubrics.',
    whatIBuilt:
      'The full Streamlit application, sentence transformer embedding pipeline, cosine similarity ranking engine, skill gap deduction algorithms, and CSV export reporting.',
    visitorEvidence:
      'Live deployed application on Streamlit Cloud with sample candidate datasets and public GitHub repository.',
    features: [
      'Semantic similarity matching using Sentence Transformers embeddings',
      'Explainable AI rubrics detailing specific strengths and missing qualifications',
      'Multi-dimensional scoring across technical skills, experience, and domain alignment',
      'Candidate deep-dive inspection views with highlighted skill gaps',
      'Blind screening mode to mitigate unconscious bias',
      'Exportable shortlisted candidate profiles and CSV reports'
    ],
    architecture:
      'The system is built on a Python backend with a Streamlit frontend. It utilizes Sentence Transformers for generating semantic embeddings of resumes and job descriptions, enabling high-accuracy vector similarity search. The ML pipeline includes scikit-learn for supplementary analysis, Pandas for data processing, and JSON for localized database operations.',
    workflow:
      'Users upload a job description and candidate dataset. The backend processes the text, extracts semantic embeddings, and runs similarity algorithms alongside technical and behavioral scoring models. The results are visualized on a Streamlit dashboard, providing explainable rankings and insights.',
    futureImprovements: [
      'Integration with external ATS platforms via REST APIs',
      'Support for direct multi-page PDF/DOCX resume parsing',
      'Fine-tuned domain-specific embeddings for cybersecurity and systems engineering'
    ],
    screenshot: null, // Set to '/projects/ai-recruiter-copilot.png' to use an image from public/projects/
    screenshots: [],
    repository: 'https://github.com/abhee-adhee/Interviewer-AI',
    demo: 'https://interviewer-ai-hack.streamlit.app/',
    approach:
      'Developed an AI recruiter using semantic embeddings for deep context matching, explicitly providing explainable AI (XAI) insights to recruiters on why candidates rank highly.',
    outcome:
      'Successfully deployed a comprehensive dashboard that accelerates screening while maintaining human-in-the-loop oversight through explainable rankings and granular analytics.'
  },

  {
    id: 'mini-soc',
    codename: 'SOC_01',
    title: 'Mini SOC',
    subtitle: 'Endpoint Monitoring & Threat Triage Demonstration',
    status: 'DEPLOYED',
    tags: ['CYBERSEC', 'SOC', 'POWERSHELL'],
    stack: [
      'Windows Defender',
      'PowerShell',
      'Windows Event Logs',
      'Python',
      'Log Parsing'
    ],
    tagline: 'Endpoint security monitoring and incident response simulation built on Windows telemetry.',
    description:
      'A Security Operations Center (SOC) demonstration showcasing endpoint monitoring, threat detection, and defensive workflows using Windows Defender and custom PowerShell automation.',
    shortDesc:
      'SOC monitoring and defensive security demonstration using Windows Defender and PowerShell.',
    fullDesc:
      'Mini SOC demonstrates how endpoint security events can be monitored, parsed, and analyzed using native Windows Defender telemetry alongside a custom PowerShell monitoring engine. The project focuses on SOC-style visibility, logon event correlation, alert generation, and defensive response workflows without enterprise licensing overhead.',
    whatItIs:
      'An endpoint security monitoring and incident response simulation built on Windows Defender and PowerShell.',
    whyBuilt:
      'Built to simulate Tier-1 SOC analyst detection and triage workflows on a local Windows host without needing enterprise SIEM licenses.',
    problem:
      'Students studying cybersecurity rarely get hands-on experience parsing native Windows Security Event Logs (Event IDs 4624, 4625, 4688) or correlating Defender telemetry into actionable incident records.',
    technicallyInteresting:
      'Monitors Windows Event Viewer logs in real time via custom PowerShell event subscribers, filtering and correlating logon anomalies, process creation trees, and Defender malware definitions into structured alert objects.',
    whatIBuilt:
      'The PowerShell event monitoring scripts, log parsing logic for critical security Event IDs, simulated attack telemetry generators, and alerting dashboard.',
    visitorEvidence:
      'Public GitHub repository with all PowerShell automation scripts, sample event logs, and triage procedure documentation.',
    features: [
      'Real-time Windows Event Viewer subscriber for Security and System channels',
      'Custom PowerShell log parser extracting Event IDs 4624 (logon), 4625 (failed logon), and 4688 (process creation)',
      'Windows Defender alert capture and quarantine status tracking',
      'Structured CSV/JSON alert logging for offline analysis',
      'Simulated threat execution harness to validate detection rules'
    ],
    screenshot: null, // Set to '/projects/mini-soc.png' to use an image from public/projects/
    screenshots: [],
    repository: 'https://github.com/sectechsociety/CloudSEC-Sandbox/tree/Mini-SOC',
    demo: null,
    approach:
      'Built a lightweight SOC demonstration using Windows Defender, Windows Event Logs, and PowerShell monitoring to simulate endpoint monitoring and security event analysis.',
    outcome:
      'Created a practical environment demonstrating SOC workflows, endpoint monitoring, and defensive analysis suitable for cybersecurity learning.'
  },

  {
    id: 'edumate',
    codename: 'EDUMATE_04',
    title: 'EduMate',
    subtitle: "ITRYX'25 Hackathon Project",
    status: 'DEPLOYED',
    tags: ['ML', 'COMPUTER VISION', 'EDTECH'],
    stack: [
      'Python',
      'OpenCV',
      'FER',
      'Machine Learning',
      'React'
    ],
    tagline: 'Computer vision engagement analysis dynamically pacing interactive learning sessions.',
    description:
      'AI-powered adaptive learning platform that analyzes learner engagement using facial expression recognition and dynamically personalizes learning experiences.',
    shortDesc:
      'Adaptive learning platform powered by computer vision facial expression recognition.',
    fullDesc:
      'EduMate enhances digital education by continuously monitoring learner engagement through facial expression recognition, automatically adapting lesson pacing, providing contextual hints, and generating detailed learning analytics.',
    whatItIs:
      'An AI-powered adaptive learning companion built for the ITRYX\'25 Hackathon.',
    whyBuilt:
      'Built to explore computer vision feedback in remote education by assessing student engagement and affective states during learning tasks.',
    problem:
      'Remote learning platforms are static, one-way streams that cannot gauge whether a learner is confused, engaged, or fatigued.',
    technicallyInteresting:
      'Processes live webcam frames using OpenCV and FER (Facial Expression Recognition) models to infer real-time affective states, dynamically regulating quiz pacing and generating contextual hints when confusion states persist.',
    whatIBuilt:
      'The OpenCV frame capture pipeline, the emotion classification integration, and the adaptive difficulty feedback loop in Python.',
    visitorEvidence:
      'Live web prototype deployed on Vercel and complete GitHub repository with emotion analysis pipeline.',
    features: [
      'Real-time facial expression recognition via OpenCV and deep neural networks',
      'Dynamic quiz pace regulation based on detected confusion and attention metrics',
      'Context-aware scaffolded hints triggered on sustained frustration states',
      'Post-session affective engagement timeline reports'
    ],
    screenshot: null, // Set to '/projects/edumate.png' to use an image from public/projects/
    screenshots: [],
    repository: 'https://github.com/nishanthrs0312/emotion-aware-learning-companion',
    demo: 'https://emotion-aware-learning-companion.vercel.app',
    approach:
      'Developed an AI-assisted learning platform capable of detecting facial expressions and adjusting learning support through adaptive pacing, scaffolded hints, and session analytics.',
    outcome:
      'Built a functional prototype demonstrating emotion-aware learning and personalized educational assistance.'
  },

  {
    id: 'policy-sandbox',
    codename: 'SANDBOX_05',
    title: 'Policy-Based Execution Sandbox',
    subtitle: 'Secure Runtime for Autonomous AI Agents',
    status: 'PLANNING',
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
    tagline: 'Kernel-level syscall interception & declarative policy enforcement for autonomous agent tool execution.',
    description:
      'Research project exploring runtime policy enforcement and behavioral monitoring for autonomous AI agents executing tools, shell commands, APIs, and file operations.',
    shortDesc:
      'Research-oriented execution sandbox enforcing runtime kernel policies on autonomous AI agents.',
    fullDesc:
      'A research-focused execution sandbox designed to enforce security policies on autonomous AI agents using Linux syscall interception, runtime policy enforcement, and behavioral anomaly detection. The project aims to improve the safety of agentic AI systems.',
    whatItIs:
      'A research exploration into runtime syscall interception and policy enforcement for autonomous AI agent tool execution.',
    whyBuilt:
      'Conceived to investigate how autonomous AI agents executing bash commands or file I/O can be constrained safely at the OS kernel boundary without trusting the model\'s internal safeguards.',
    problem:
      'Autonomous agents running code in unconstrained or loosely sandboxed environments risk privilege escalation, unintended data exfiltration, or malicious syscall execution.',
    technicallyInteresting:
      'Leverages Linux seccomp filters, ptrace system call tracing, and Open Policy Agent (OPA) declarations to evaluate agent tool actions before kernel execution.',
    whatIBuilt:
      'Architectural specification, syscall interceptor prototype, and initial Docker isolation harness.',
    visitorEvidence:
      'Conceptual architecture documentation, policy specification schemas, and research roadmap.',
    features: [
      'Declarative policy engine powered by Open Policy Agent (OPA)',
      'Linux seccomp-bpf system call filter generation',
      'Dynamic ptrace syscall tracing and anomaly recording',
      'Docker containerized ephemeral execution harnesses',
      'Audit log generation recording blocked operations and violation rationales'
    ],
    screenshot: null, // Set to '/projects/policy-sandbox.png' to use an image from public/projects/
    screenshots: []
  },

  /* ─────────────────────────────────────────────────────────
     SIDEQUESTS / EXPERIMENTAL MINI-PROJECTS
     ───────────────────────────────────────────────────────── */
  {
    id: 'securegest',
    codename: 'GEST_07',
    title: 'SecureGest',
    subtitle: 'Computer Vision Gesture Authentication & Secure Vault',
    category: 'sidequest',
    isSidequest: true,
    featured: false,
    status: 'PROTOTYPE',
    tags: ['CYBERSEC', 'COMPUTER VISION', 'PYTHON'],
    stack: [
      'Python',
      'OpenCV',
      'MediaPipe',
      'PBKDF2-HMAC-SHA256',
      'Authentication',
      'Cybersecurity'
    ],
    tagline: 'Computer vision × cybersecurity — authenticate with hand gestures and unlock a secure digital vault.',
    description:
      'A computer vision-based gesture authentication system with liveness verification, secure credential hashing, and a protected vault interface.',
    shortDesc:
      'Computer vision gesture authentication prototype with liveness checking and secure vault UI.',
    fullDesc:
      'SecureGest is a Python-based gesture authentication prototype that uses OpenCV and MediaPipe for real-time hand tracking and gesture recognition. It combines gesture-sequence credentials, PBKDF2-HMAC-SHA256 secure storage, challenge-response liveness verification, authentication logging, and a cybersecurity-focused secure vault UI.',
    whatItIs:
      'A computer vision gesture authentication prototype and digital vault combining real-time hand tracking with cryptographic credential hashing.',
    whyBuilt:
      'Built as an experimental exploration combining biometric computer vision with cryptographic credential hashing and anti-spoofing challenge verification.',
    problem:
      'Standard webcam-based authentication is typically vulnerable to photographic replay attacks and lacks secure cryptographic key derivation.',
    technicallyInteresting:
      'Uses MediaPipe to track 21 3D hand landmarks in real time, validating custom multi-step dynamic hand gesture sequences combined with a challenge-response liveness check before deriving a PBKDF2-HMAC-SHA256 credential key.',
    whatIBuilt:
      'The entire MediaPipe hand tracking pipeline, gesture-sequence state machine, liveness challenge-response verification, PBKDF2 hashing module, and custom Tkinter/Python security vault UI.',
    visitorEvidence:
      'Documented engineering monograph, reproducible Python codebase with gesture recognition pipeline, and cryptographic verification logs.',
    features: [
      'Real-time hand tracking and 21 3D landmark analysis using MediaPipe & OpenCV',
      'Multi-step dynamic gesture-sequence credential state machine',
      'Challenge-response liveness verification preventing photographic replay spoofing',
      'PBKDF2-HMAC-SHA256 key derivation and secure salt storage',
      'Session authentication audit logging and lockout logic',
      'Protected digital vault interface unlocked exclusively on verified credentials'
    ],
    screenshot: null, // Set to '/projects/securegest.png' to use an image from public/projects/
    screenshots: [],
    repository: null,
    demo: null,
    approach:
      'Built a Python prototype leveraging OpenCV and MediaPipe for hand tracking, coupled with PBKDF2-HMAC-SHA256 hashing, challenge-response liveness verification, and a secure vault UI.',
    outcome:
      'Created a functional computer vision gesture authentication prototype exploring liveness-checked biometric access controls.'
  },

  {
    id: 'competencyfirst',
    codename: 'COMP_08',
    title: 'CompetencyFirst',
    subtitle: "Code O'Clock 2026 (CoC) — 24-Hour Hackathon at CIT",
    category: 'sidequest',
    isSidequest: true,
    featured: false,
    event: "Code O'Clock 2026 (CoC) — 24-Hour Hackathon at CIT",
    status: 'HACKATHON',
    tags: ['AI', 'ML', 'NLP', 'HEALTHCARE'],
    stack: [
      'Python',
      'Flask',
      'HTML',
      'CSS',
      'SQLite',
      'SQLAlchemy',
      'Ollama',
      'Qwen2.5:3B',
      'all-MiniLM-L6-v2',
      'NLI-MiniLM2-L6-H768'
    ],
    techRoles: [
      { name: 'Flask', role: 'Backend routing, API orchestration, and evaluation endpoints' },
      { name: 'HTML / CSS', role: 'Recruiter review interface and candidate assessment views' },
      { name: 'SQLite + SQLAlchemy', role: 'Relational data persistence and candidate evaluation ORM' },
      { name: 'all-MiniLM-L6-v2', role: 'Dense semantic similarity between job descriptions and candidate evidence' },
      { name: 'Qwen2.5:3B + Ollama', role: 'Local SLM reasoning, rubric-based evaluation, and structured justification' },
      { name: 'NLI-MiniLM2-L6-H768', role: 'Natural Language Inference verifying whether candidate answers entail clinical competencies' }
    ],
    tagline: 'Multi-stage NLP & local SLM reasoning pipeline evaluating candidate evidence over static resumes.',
    description:
      'A competency-driven healthcare hiring platform that moves beyond traditional resume and credential-based screening.',
    shortDesc:
      'Competency-driven healthcare hiring platform evaluating candidate evidence over static resumes.',
    fullDesc:
      'CompetencyFirst converts job descriptions into structured competency blueprints, evaluates candidates through role-specific knowledge and scenario-based assessments, and generates explainable competency profiles to support recruiter decision-making.',
    whatItIs:
      'A competency-driven healthcare hiring platform that moves beyond traditional resume keyword screening to evaluate clinical scenarios and practical candidate evidence.',
    whyBuilt:
      'Built at Code O\' Clock Hackathon 2026 to test whether local SLMs and Natural Language Inference could evaluate clinical scenario responses more effectively than static resume keywords.',
    problem:
      'Traditional healthcare hiring relies on static degrees and CV buzzwords rather than evaluating how candidates handle critical medical scenarios or ethical judgment calls.',
    technicallyInteresting:
      'Combines local SLM inference (Qwen2.5:3B via Ollama) for rubric-based reasoning with all-MiniLM-L6-v2 for semantic matching and NLI-MiniLM2-L6-H768 for verifying whether candidate answers entail required clinical competencies.',
    whatIBuilt:
      'The Flask backend, the Ollama LLM integration, the multi-model NLP evaluation pipeline (semantic embeddings + NLI entailment verification), and the explainable candidate competency dossier UI.',
    visitorEvidence:
      'Documented engineering monograph, multi-model evaluation pipeline architecture, and structured scoring workflow.',
    workflow:
      'Job Description → Competency Blueprint → Candidate Evidence → Assessment → Evaluation → Competency Profile → Explainable Ranking',
    features: [
      'Converts Job Descriptions into structured clinical competency blueprints',
      'Role-specific knowledge and scenario-based candidate evaluations',
      'Semantic similarity & JD-resume matching via all-MiniLM-L6-v2',
      'Rubric-based evaluation & reasoning via local Qwen2.5:3B via Ollama',
      'Evidence and entailment validation via NLI-MiniLM2-L6-H768',
      'Generates explainable competency profiles and rankings for recruiters'
    ],
    screenshot: null, // Set to '/projects/competencyfirst.png' to use an image from public/projects/
    screenshots: [],
    repository: null,
    demo: null,
    approach:
      'Designed a multi-stage NLP pipeline converting job descriptions into competency blueprints, evaluating evidence using semantic embeddings, local LLM reasoning (Qwen2.5:3B via Ollama), and NLI entailment validation.',
    outcome:
      'Produced a working hackathon prototype demonstrating explainable, competency-driven recruiter decision support.'
  }
];