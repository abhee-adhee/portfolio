import React from 'react';

export default function ProjectVisual({ id, screenshot = null, height = '100%' }) {
  const localScreenshot =
    screenshot ||
    (() => {
      try {
        return typeof window !== 'undefined'
          ? localStorage.getItem(`project_screenshot_${id}`)
          : null;
      } catch {
        return null;
      }
    })();

  if (localScreenshot) {
    return (
      <div
        style={{
          width: '100%',
          height: height || '100%',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          backgroundColor: '#0a0d14',
          position: 'relative',
        }}
      >
        <img
          src={localScreenshot}
          alt={`Project ${id}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    );
  }

  // 1. Sentinel IDS: Abstract network topology & packet stream
  if (id === 'sentinel-ids') {
    return (
      <div
        style={{
          width: '100%',
          height: height || '100%',
          aspectRatio: '16 / 9',
          backgroundColor: '#090d10',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.25rem',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* Subtle Node Grid Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              'radial-gradient(#22c55e 1px, transparent 1px), radial-gradient(#22c55e 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}
        />

        {/* Top Telemetry Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 8px rgba(34, 197, 94, 0.7)',
              }}
            />
            <span style={{ fontSize: '0.68rem', color: '#22c55e', letterSpacing: '0.08em' }}>
              RAW_SOCKET_STREAM // ACTIVE
            </span>
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>OSI L2–L4</span>
        </div>

        {/* Center: Abstract Network Topology Graph (SVG) */}
        <div
          style={{
            position: 'relative',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 340 80" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Packet Flow Paths */}
            <line x1="30" y1="40" x2="90" y2="20" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="4 2" />
            <line x1="30" y1="40" x2="90" y2="60" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="4 2" />
            <line x1="90" y1="20" x2="170" y2="40" stroke="#22c55e" strokeWidth="2" strokeOpacity="0.8" />
            <line x1="90" y1="60" x2="170" y2="40" stroke="#22c55e" strokeWidth="2" strokeOpacity="0.8" />
            <line x1="170" y1="40" x2="250" y2="25" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3 3" />
            <line x1="170" y1="40" x2="250" y2="55" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3 3" />
            <line x1="250" y1="25" x2="310" y2="40" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="250" y1="55" x2="310" y2="40" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Radar Concentric Detection Rings on Center Node */}
            <circle cx="170" cy="40" r="28" fill="none" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.15" />
            <circle cx="170" cy="40" r="18" fill="none" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.3" />

            {/* Network Nodes */}
            <circle cx="30" cy="40" r="4.5" fill="#141418" stroke="#22c55e" strokeWidth="1.5" />
            <circle cx="90" cy="20" r="4" fill="#141418" stroke="#22c55e" strokeWidth="1.5" />
            <circle cx="90" cy="60" r="4" fill="#141418" stroke="#22c55e" strokeWidth="1.5" />
            <circle cx="170" cy="40" r="7" fill="#22c55e" />
            <circle cx="250" cy="25" r="4" fill="#141418" stroke="#22c55e" strokeWidth="1.5" />
            <circle cx="250" cy="55" r="4" fill="#141418" stroke="#22c55e" strokeWidth="1.5" />
            <circle cx="310" cy="40" r="4.5" fill="#141418" stroke="#22c55e" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Bottom Telemetry Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            zIndex: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '0.5rem',
          }}
        >
          <span>PACKET INGESTION &bull; SCAPY</span>
          <span style={{ color: '#22c55e' }}>ANOMALY DELTA: NOMINAL</span>
        </div>
      </div>
    );
  }

  // 2. VoiceForAll: Waveform & Geospatial Mesh
  if (id === 'voice-for-all') {
    return (
      <div
        style={{
          width: '100%',
          height: height || '100%',
          aspectRatio: '16 / 9',
          backgroundColor: '#0a0d14',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.25rem',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* Top Telemetry Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                boxShadow: '0 0 8px rgba(59, 130, 246, 0.7)',
              }}
            />
            <span style={{ fontSize: '0.68rem', color: '#60a5fa', letterSpacing: '0.08em' }}>
              SPEECH_TO_SPATIAL_INDEX
            </span>
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>NLP &bull; PLOTLY</span>
        </div>

        {/* Center: Audio Waveform & Spatial Pins (SVG) */}
        <div
          style={{
            position: 'relative',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 340 80" style={{ width: '100%', height: '100%' }}>
            {/* Background Waveform Frequencies */}
            <path
              d="M10 40 Q40 5 70 40 T130 40 T190 20 T250 60 T310 40 T330 40"
              stroke="#3b82f6"
              strokeWidth="2"
              fill="none"
              strokeOpacity="0.8"
            />
            <path
              d="M10 40 Q45 65 80 40 T150 40 T220 25 T290 40 T330 40"
              stroke="#22c55e"
              strokeWidth="1.5"
              fill="none"
              strokeOpacity="0.6"
            />

            {/* Spatial Location Pin Clusters with Radar Echoes */}
            <circle cx="80" cy="35" r="14" fill="none" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.25" />
            <circle cx="80" cy="35" r="4" fill="#3b82f6" />

            <circle cx="190" cy="20" r="18" fill="none" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.25" />
            <circle cx="190" cy="20" r="5" fill="#22c55e" />

            <circle cx="280" cy="45" r="12" fill="none" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.25" />
            <circle cx="280" cy="45" r="4" fill="#3b82f6" />
          </svg>
        </div>

        {/* Bottom Telemetry Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            zIndex: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '0.5rem',
          }}
        >
          <span>VOICE INGESTION &bull; TEXTBLOB</span>
          <span style={{ color: '#60a5fa' }}>SPATIAL CLUSTERS: ACTIVE</span>
        </div>
      </div>
    );
  }

  // 3. AI Recruiter Copilot: Semantic Embeddings & Matching Arc
  if (id === 'ai-recruiter-copilot') {
    return (
      <div
        style={{
          width: '100%',
          height: height || '100%',
          aspectRatio: '16 / 9',
          backgroundColor: '#0f0a14',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.25rem',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* Top Telemetry Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#a855f7',
                boxShadow: '0 0 8px rgba(168, 85, 247, 0.7)',
              }}
            />
            <span style={{ fontSize: '0.68rem', color: '#c084fc', letterSpacing: '0.08em' }}>
              SEMANTIC_EMBEDDING_CLUSTER
            </span>
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>DIM: 384-D</span>
        </div>

        {/* Center: Vector Space & Cosine Similarity Arc (SVG) */}
        <div
          style={{
            position: 'relative',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 340 80" style={{ width: '100%', height: '100%' }}>
            {/* Coordinate Plane Guides */}
            <line x1="20" y1="40" x2="320" y2="40" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="170" y1="10" x2="170" y2="70" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />

            {/* Candidate Embedding Nodes */}
            <circle cx="70" cy="25" r="3.5" fill="#a855f7" opacity="0.6" />
            <circle cx="95" cy="45" r="4.5" fill="#c084fc" />
            <circle cx="60" cy="55" r="3" fill="#a855f7" opacity="0.5" />
            <circle cx="110" cy="30" r="3.5" fill="#a855f7" opacity="0.7" />

            {/* Semantic Cosine Alignment Rays to Center Anchor */}
            <line x1="95" y1="45" x2="170" y2="40" stroke="#c084fc" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="245" y1="35" x2="170" y2="40" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.8" />

            {/* Target Job Requirement Vector Anchor */}
            <circle cx="170" cy="40" r="6" fill="#f4f3ef" stroke="#a855f7" strokeWidth="2" />

            {/* Matched Profile Vector Cluster */}
            <circle cx="245" cy="35" r="4.5" fill="#60a5fa" />
            <circle cx="265" cy="20" r="3.5" fill="#3b82f6" opacity="0.6" />
            <circle cx="280" cy="50" r="4" fill="#3b82f6" opacity="0.5" />
            <circle cx="230" cy="58" r="3" fill="#60a5fa" opacity="0.6" />
          </svg>
        </div>

        {/* Bottom Telemetry Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            zIndex: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '0.5rem',
          }}
        >
          <span>DENSE VECTORS &bull; all-MiniLM</span>
          <span style={{ color: '#c084fc' }}>COSINE FIT: EXPLAINABLE</span>
        </div>
      </div>
    );
  }

  // 4. Mini SOC: Event Stream Graph & Telemetry Matrix
  if (id === 'mini-soc') {
    return (
      <div
        style={{
          width: '100%',
          height: height || '100%',
          aspectRatio: '16 / 9',
          backgroundColor: '#0f0a0e',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.25rem',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* Top Telemetry Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#ea580c',
                boxShadow: '0 0 8px rgba(234, 88, 12, 0.7)',
              }}
            />
            <span style={{ fontSize: '0.68rem', color: '#f97316', letterSpacing: '0.08em' }}>
              HOST_EVENT_STREAM
            </span>
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>WINLOG // 4624/4625</span>
        </div>

        {/* Center: Event Telemetry Sparkline & Detection Spike (SVG) */}
        <div
          style={{
            position: 'relative',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 340 80" style={{ width: '100%', height: '100%' }}>
            {/* Grid Horizon */}
            <line x1="10" y1="65" x2="330" y2="65" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

            {/* Ingestion Sparkline */}
            <path
              d="M10 60 L40 58 L70 61 L100 55 L130 58 L160 48 L175 18 L190 52 L220 56 L250 54 L280 58 L310 57 L330 60"
              fill="none"
              stroke="#ea580c"
              strokeWidth="2"
            />

            {/* Anomaly Highlight Ring at Event Spike (175, 18) */}
            <circle cx="175" cy="18" r="8" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx="175" cy="18" r="4" fill="#f97316" />

            {/* Event IDs Status Matrix Indicators */}
            <rect x="25" y="16" width="18" height="6" rx="2" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="0.8" />
            <rect x="50" y="16" width="18" height="6" rx="2" fill="rgba(234, 88, 12, 0.2)" stroke="#ea580c" strokeWidth="0.8" />
            <rect x="75" y="16" width="18" height="6" rx="2" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Bottom Telemetry Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            zIndex: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '0.5rem',
          }}
        >
          <span>POWERSHELL LOG PARSER</span>
          <span style={{ color: '#f97316' }}>ENDPOINT DEFENSE: ARMED</span>
        </div>
      </div>
    );
  }

  // 5. EduMate: Facial Landmark Wireframe & Engagement Curve
  if (id === 'edumate') {
    return (
      <div
        style={{
          width: '100%',
          height: height || '100%',
          aspectRatio: '16 / 9',
          backgroundColor: '#090d0e',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.25rem',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* Top Telemetry Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#14b8a6',
                boxShadow: '0 0 8px rgba(20, 184, 166, 0.7)',
              }}
            />
            <span style={{ fontSize: '0.68rem', color: '#2dd4bf', letterSpacing: '0.08em' }}>
              AFFECTIVE_STATE_ESTIMATION
            </span>
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>OPENCV // FER</span>
        </div>

        {/* Center: Facial Wireframe & Engagement Curve (SVG) */}
        <div
          style={{
            position: 'relative',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 340 80" style={{ width: '100%', height: '100%' }}>
            {/* Facial Landmark Constellation Mesh */}
            <g stroke="#14b8a6" strokeWidth="1" strokeOpacity="0.45" fill="none">
              {/* Eye wireframes */}
              <polygon points="120,30 135,26 145,30 135,34" />
              <polygon points="195,30 205,26 220,30 205,34" />
              {/* Nose Bridge & Base */}
              <line x1="170" y1="26" x2="170" y2="44" />
              <line x1="162" y1="44" x2="178" y2="44" />
              {/* Lip contour */}
              <polygon points="152,56 170,52 188,56 170,60" />
              {/* Jawline contour points */}
              <path d="M105,35 Q115,65 170,72 Q225,65 235,35" strokeDasharray="3 3" />
            </g>

            {/* Landmark Joint Points */}
            <circle cx="135" cy="30" r="3" fill="#2dd4bf" />
            <circle cx="205" cy="30" r="3" fill="#2dd4bf" />
            <circle cx="170" cy="44" r="2.5" fill="#2dd4bf" />
            <circle cx="170" cy="56" r="3" fill="#2dd4bf" />

            {/* Pacing Curve in background */}
            <path
              d="M10 65 Q90 15 170 50 T330 25"
              fill="none"
              stroke="rgba(45, 212, 191, 0.25)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Bottom Telemetry Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            zIndex: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '0.5rem',
          }}
        >
          <span>CV EMOTION TRACKER</span>
          <span style={{ color: '#2dd4bf' }}>DIFFICULTY PACING: DYNAMIC</span>
        </div>
      </div>
    );
  }

  // 6. Policy Sandbox: Syscall Boundary & Kernel Rings
  if (id === 'policy-sandbox') {
    return (
      <div
        style={{
          width: '100%',
          height: height || '100%',
          aspectRatio: '16 / 9',
          backgroundColor: '#0f0c08',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.25rem',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* Top Telemetry Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#f59e0b',
                boxShadow: '0 0 8px rgba(245, 158, 11, 0.7)',
              }}
            />
            <span style={{ fontSize: '0.68rem', color: '#fbbf24', letterSpacing: '0.08em' }}>
              SECCOMP_BPF_INTERCEPT_GATE
            </span>
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>RING 0 // 3</span>
        </div>

        {/* Center: Kernel Boundary & Syscall Enforcement (SVG) */}
        <div
          style={{
            position: 'relative',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 340 80" style={{ width: '100%', height: '100%' }}>
            {/* Concentric Isolation Rings */}
            <circle cx="170" cy="40" r="36" fill="none" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3" />
            <circle cx="170" cy="40" r="24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.5" />
            <circle cx="170" cy="40" r="12" fill="rgba(245, 158, 11, 0.15)" stroke="#fbbf24" strokeWidth="1.5" />

            {/* Intercepted Syscall Rays */}
            <line x1="30" y1="40" x2="134" y2="40" stroke="#fbbf24" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="206" y1="40" x2="310" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.7" />

            {/* Enforcement Filter Markers */}
            <rect x="130" y="32" width="6" height="16" rx="2" fill="#22c55e" />
            <rect x="204" y="32" width="6" height="16" rx="2" fill="#ef4444" />
          </svg>
        </div>

        {/* Bottom Telemetry Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            zIndex: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '0.5rem',
          }}
        >
          <span>PTRACE // DOCKER HARNESS</span>
          <span style={{ color: '#fbbf24' }}>POLICY: OPA ENFORCED</span>
        </div>
      </div>
    );
  }

  // 7. SecureGest: Hand Tracking Skeleton & Cryptographic Lock
  if (id === 'securegest') {
    return (
      <div
        style={{
          width: '100%',
          height: height || '100%',
          aspectRatio: '16 / 9',
          backgroundColor: '#0c0812',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.25rem',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* Top Telemetry Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#9333ea',
                boxShadow: '0 0 8px rgba(147, 51, 234, 0.7)',
              }}
            />
            <span style={{ fontSize: '0.68rem', color: '#c084fc', letterSpacing: '0.08em' }}>
              21_3D_HAND_LANDMARKS
            </span>
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>MEDIAPIPE // CV</span>
        </div>

        {/* Center: Hand Joint Skeleton Constellation & Vault Lock (SVG) */}
        <div
          style={{
            position: 'relative',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 340 80" style={{ width: '100%', height: '100%' }}>
            {/* Hand Bones Vector Skeleton */}
            <g stroke="#a855f7" strokeWidth="1.2" strokeOpacity="0.5" fill="none">
              {/* Wrist to fingers */}
              <line x1="170" y1="72" x2="135" y2="52" />
              <line x1="170" y1="72" x2="155" y2="45" />
              <line x1="170" y1="72" x2="170" y2="42" />
              <line x1="170" y1="72" x2="185" y2="46" />
              <line x1="170" y1="72" x2="205" y2="54" />

              {/* Finger segments */}
              <line x1="135" y1="52" x2="120" y2="38" />
              <line x1="155" y1="45" x2="150" y2="24" />
              <line x1="170" y1="42" x2="170" y2="18" />
              <line x1="185" y1="46" x2="190" y2="22" />
              <line x1="205" y1="54" x2="215" y2="35" />
            </g>

            {/* Fingertip & Joint Tracking Points */}
            <circle cx="120" cy="38" r="3" fill="#c084fc" />
            <circle cx="150" cy="24" r="3" fill="#c084fc" />
            <circle cx="170" cy="18" r="3.5" fill="#f4f3ef" stroke="#a855f7" strokeWidth="1.5" />
            <circle cx="190" cy="22" r="3" fill="#c084fc" />
            <circle cx="215" cy="35" r="3" fill="#c084fc" />
            <circle cx="170" cy="72" r="4" fill="#a855f7" />

            {/* Liveness Verification Rings */}
            <circle cx="170" cy="18" r="9" fill="none" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 2" />
          </svg>
        </div>

        {/* Bottom Telemetry Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            zIndex: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '0.5rem',
          }}
        >
          <span>CHALLENGE-RESPONSE LIVENESS</span>
          <span style={{ color: '#c084fc' }}>VAULT: PBKDF2 HASHED</span>
        </div>
      </div>
    );
  }

  // 8. CompetencyFirst: Clinical Competency Blueprint & SLM Entailment
  if (id === 'competencyfirst') {
    return (
      <div
        style={{
          width: '100%',
          height: height || '100%',
          aspectRatio: '16 / 9',
          backgroundColor: '#080d0e',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.25rem',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* Top Telemetry Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#06b6d4',
                boxShadow: '0 0 8px rgba(6, 182, 212, 0.7)',
              }}
            />
            <span style={{ fontSize: '0.68rem', color: '#22d3ee', letterSpacing: '0.08em' }}>
              CLINICAL_COMPETENCY_GRAPH
            </span>
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>QWEN2.5 &bull; NLI</span>
        </div>

        {/* Center: Competency Decision Flow & Entailment Nodes (SVG) */}
        <div
          style={{
            position: 'relative',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 340 80" style={{ width: '100%', height: '100%' }}>
            {/* Multi-Model Entailment Pipeline */}
            <path
              d="M30 40 L100 40 L170 20 L240 40 L310 40"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />
            <path
              d="M100 40 L170 60 L240 40"
              fill="none"
              stroke="#22c55e"
              strokeWidth="1.5"
              strokeOpacity="0.6"
              strokeDasharray="3 2"
            />

            {/* Pipeline Stage Nodes */}
            <circle cx="30" cy="40" r="4" fill="#080d0e" stroke="#06b6d4" strokeWidth="1.5" />
            <circle cx="100" cy="40" r="5" fill="#06b6d4" />
            <circle cx="170" cy="20" r="6" fill="#22d3ee" />
            <circle cx="170" cy="60" r="4.5" fill="#22c55e" />
            <circle cx="240" cy="40" r="5" fill="#06b6d4" />
            <circle cx="310" cy="40" r="4" fill="#080d0e" stroke="#22d3ee" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Bottom Telemetry Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            zIndex: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '0.5rem',
          }}
        >
          <span>LOCAL SLM INFERENCE</span>
          <span style={{ color: '#22d3ee' }}>ENTAILMENT: VERIFIED</span>
        </div>
      </div>
    );
  }

  // Generic architectural pattern fallback
  return (
    <div
      style={{
        width: '100%',
        height: height || '100%',
        aspectRatio: '16 / 9',
        backgroundColor: '#0a0d10',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
        <span style={{ fontSize: '0.68rem', color: 'var(--accent-primary)', letterSpacing: '0.08em' }}>
          ARCHITECTURAL_SCHEMATIC
        </span>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>SPECIFICATION</span>
      </div>

      <div
        style={{
          position: 'relative',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 340 80" style={{ width: '100%', height: '100%' }}>
          <line x1="20" y1="40" x2="320" y2="40" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="170" cy="40" r="18" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="170" cy="40" r="5" fill="var(--accent-primary)" />
        </svg>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          zIndex: 1,
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '0.5rem',
        }}
      >
        <span>SYSTEM ARCHITECTURE</span>
        <span style={{ color: 'var(--accent-primary)' }}>EXPLORE</span>
      </div>
    </div>
  );
}
