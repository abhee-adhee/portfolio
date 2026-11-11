import React, { useState, useEffect } from 'react';
import fallbackData from '../../data/githubContributions.json';

const LEVEL_COLORS = [
  '#1e1e24', // Level 0: Empty
  '#0e4429', // Level 1
  '#006d32', // Level 2
  '#26a641', // Level 3
  '#39d353', // Level 4: Highest
];

export default function GithubActivity() {
  const [data, setData] = useState(fallbackData);
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch('https://github-contributions-api.jogruber.de/v4/abhee-adhee?y=last')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((json) => {
        if (isMounted && json && json.contributions) {
          setData(json);
        }
      })
      .catch(() => {
        // Fallback remains active
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const total = data.total?.lastYear || 122;
  const contributions = data.contributions || [];

  // Group into weeks (7 days each)
  const weeks = [];
  let currentWeek = [];
  contributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === contributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div style={{ width: '100%' }}>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <a
          href="https://github.com/abhee-adhee"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#22c55e')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
        >
          <span>@abhee-adhee</span>
        </a>

        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
          }}
        >
          <strong style={{ color: 'var(--text-secondary)' }}>{total}</strong> contributions in the last year
        </div>
      </div>

      {/* Grid Container */}
      <div
        style={{
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          scrollbarWidth: 'thin',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            gap: '3.5px',
            minWidth: '680px',
          }}
        >
          {weeks.map((week, wIdx) => (
            <div
              key={wIdx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3.5px',
              }}
            >
              {week.map((day) => {
                const color = LEVEL_COLORS[day.level] || LEVEL_COLORS[0];
                return (
                  <div
                    key={day.date}
                    title={`${day.count} contributions on ${day.date}`}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '2px',
                      backgroundColor: color,
                      cursor: 'pointer',
                      transition: 'transform 0.1s ease',
                      transform: hoveredDay?.date === day.date ? 'scale(1.3)' : 'scale(1)',
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Status / Active Tooltip bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.65rem',
          fontSize: '0.7rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          minHeight: '1.2rem',
        }}
      >
        <div>
          {hoveredDay ? (
            <span style={{ color: 'var(--text-primary)' }}>
              {hoveredDay.count} contribution{hoveredDay.count === 1 ? '' : 's'} on {hoveredDay.date}
            </span>
          ) : (
            <span>GitHub Contribution Calendar</span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>Less</span>
          {LEVEL_COLORS.map((col, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '2px',
                backgroundColor: col,
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
