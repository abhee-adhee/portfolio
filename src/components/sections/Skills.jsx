import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useSound } from '../../context/SoundContext';

export default function Skills() {
  const { data } = usePortfolioData();
  const { playSound } = useSound();
  const navigate = useNavigate();
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const groups = data.skills || [];
  const projects = data.projects || [];

  const handleSkillClick = (skillName) => {
    const hasProjects = projects.some((p) =>
      p.stack?.some((s) => s.toLowerCase().includes(skillName.toLowerCase()))
    );
    if (hasProjects) {
      playSound('click');
      navigate(`/projects?skill=${encodeURIComponent(skillName)}`);
    }
  };

  return (
    <section
      id="skills"
      style={{
        padding: '5rem var(--page-gutter)',
        maxWidth: '1240px',
        margin: '0 auto',
      }}
    >
      <SectionHeading
        pageLabel="Capabilities // Directory"
        title="Technical Disciplines &amp; Tooling"
        subtitle="Languages, security instruments, and engineering frameworks utilized across active systems and research."
      />

      {/* Structured Technical Index Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}
      >
        {groups.map((group, gIdx) => (
          <div
            key={group.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* Group Header */}
            <div
              style={{
                paddingBottom: '0.65rem',
                borderBottom: '1px solid var(--border-strong)',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                }}
              >
                {group.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                }}
              >
                0{gIdx + 1}
              </span>
            </div>

            {/* List of technologies with concrete application context */}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem',
              }}
            >
              {group.skills.map((skill) => {
                const isHovered = hoveredSkill === skill.name;
                const relatedProjects = projects.filter((p) =>
                  p.stack?.some((s) => s.toLowerCase().includes(skill.name.toLowerCase()))
                );
                const hasProjects = relatedProjects.length > 0;

                return (
                  <li
                    key={skill.name}
                    onMouseEnter={() => {
                      setHoveredSkill(skill.name);
                      playSound('hover');
                    }}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() => handleSkillClick(skill.name)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem',
                      padding: '0.35rem 0',
                      cursor: hasProjects ? 'pointer' : 'default',
                      transition: 'color 0.15s ease',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          fontWeight: 500,
                          color: isHovered && hasProjects ? 'var(--accent-primary)' : 'var(--text-primary)',
                          borderBottom: isHovered && hasProjects ? '1px dotted var(--accent-primary)' : 'none',
                        }}
                      >
                        {skill.name}
                      </span>

                      {hasProjects && (
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.64rem',
                            color: isHovered ? 'var(--accent-primary)' : 'var(--text-muted)',
                          }}
                        >
                          {relatedProjects.length} {relatedProjects.length === 1 ? 'build' : 'builds'} &rarr;
                        </span>
                      )}
                    </div>

                    {skill.role && (
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.4,
                        }}
                      >
                        {skill.role}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Active Investigations & Next Frontiers */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Current Inquiries &amp; Technical Expansion
          </span>
          <span style={{ color: 'var(--border-strong)' }}>&bull;</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span>&bull; eBPF &amp; Linux Kernel Observability</span>
          <span>&bull; AI Agentic Policy Enforcement</span>
          <span>&bull; Cloud SOC Automation Pipelines</span>
          <span>&bull; Binary Analysis &amp; Disassembly</span>
        </div>
      </div>
    </section>
  );
}
