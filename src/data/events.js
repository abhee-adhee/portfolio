/**
 * Events and Workshops Data
 * Managed and organized by Abinav Aaditya
 */

export const eventsData = [
  {
    id: 'EVENT_01',
    title: 'THE INSIDE JOB',
    type: 'Capture The Flag (CTF)',
    hostBadge: 'Organized & Hosted',
    category: 'CTF Challenge Architecture',
    scenario: 'Insider Threat & Corporate Espionage',
    posterUrl: '/events/inside-job.jpeg',
    summary: 'First ground-up Capture The Flag challenge design exploring simulated corporate leaks and evidence reconstruction.',
    description: [
      'THE INSIDE JOB was my first experience designing and building a Capture The Flag challenge from the ground up.',
      'Built around an insider-threat / corporate espionage scenario, the CTF challenged participants to investigate a simulated information leak, uncover hidden clues, and piece together what happened.',
      'The project involved designing the challenge flow, creating the web-based investigation environment, implementing challenges and flags, and building the admin/player workflow for the competition.',
      'It was essentially where I started learning that a good CTF isn\'t just about making something vulnerable — the challenge needs a story, a logical attack path, and a satisfying solve.'
    ],
    technicalAreas: [
      'Challenge Flow Architecture',
      'Web-Based Investigation Portal',
      'Insider Threat Simulation',
      'Flag Implementation & Verification',
      'Admin / Competitor Workflows',
      'Forensic Clue Mapping'
    ],
    meta: [
      { label: 'ROLE', value: 'Challenge Designer & Host' },
      { label: 'TYPE', value: 'Scenario-Driven CTF' },
      { label: 'FOCUS', value: 'Espionage & Forensics' }
    ]
  },
  {
    id: 'EVENT_02',
    title: 'GHOST IN THE MACHINE',
    type: 'Capture The Flag (CTF)',
    hostBadge: 'Organized & Hosted',
    category: 'Full-Scale Narrative CTF',
    scenario: 'NEXUS Dynamics // AURELIA AI Platform Anomaly',
    posterUrl: '/events/ghost-in-the-machine.jpeg',
    summary: 'A multi-vector connected investigation CTF built around an AI platform anomaly at a fictional enterprise.',
    description: [
      'GHOST IN THE MACHINE was my next step in CTF development — significantly larger and more technically involved than THE INSIDE JOB.',
      'The CTF was built around NEXUS Dynamics, a fictional technology company investigating an unexplained anomaly inside its AI platform, AURELIA.',
      'Instead of simply presenting isolated challenges, I built a connected investigation environment where the website, technical artifacts, vulnerabilities, and challenge infrastructure all contribute to the larger narrative.',
      'The biggest lesson from building it was that creating a challenge is only half the job. Making sure players can actually discover the intended path, solve it fairly, and avoid unintended shortcuts required just as much testing and iteration.',
      'From designing the story to writing vulnerable APIs, generating artifacts, building binaries, integrating CTFd, and testing the complete player journey — GHOST IN THE MACHINE became a much deeper engineering project than my first CTF.'
    ],
    technicalAreas: [
      'Web & API Security',
      'Cryptography',
      'Reverse Engineering',
      'Binary Exploitation',
      'Digital Forensics',
      'Steganography & Misc',
      'OSINT',
      'Python tooling',
      'Next.js / React',
      'CTFd integration & server-side flag validation'
    ],
    meta: [
      { label: 'ROLE', value: 'Lead Architect & Host' },
      { label: 'INFRASTRUCTURE', value: 'CTFd + Custom Microservices' },
      { label: 'SYSTEM', value: 'NEXUS Dynamics / AURELIA' }
    ]
  },
  {
    id: 'EVENT_03',
    title: 'CYBERSTART',
    type: 'Workshop',
    hostBadge: 'Hosted',
    category: 'Foundational Security Workshop',
    scenario: 'Hands-on Linux & Security Onboarding',
    posterUrl: '/events/cyberstart.jpeg',
    summary: 'Hands-on entry-level cybersecurity workshop demystifying Linux commands, security principles, and CTF challenges.',
    description: [
      'A beginner-focused cybersecurity workshop covering basic Linux concepts, introductory cybersecurity knowledge, and CTF fundamentals.'
    ],
    technicalAreas: [
      'Linux CLI & File Permissions',
      'Foundational Cybersecurity Concepts',
      'CTF Problem-Solving Strategies',
      'Introductory Security Labs'
    ],
    meta: [
      { label: 'ROLE', value: 'Organizer & Host' },
      { label: 'FORMAT', value: 'Interactive Hands-on Lab' },
      { label: 'TARGET', value: 'Students & Beginners' }
    ]
  }
];
