import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rippleRef = useRef(null);

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const animId = useRef(null);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTouch(true);
      return;
    }
    const lerp = (a, b, t) => a + (b - a) * t;
    let hasMoved = false;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!hasMoved) {
        ringPos.current = { x: e.clientX, y: e.clientY };
        hasMoved = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = hovering ? '1' : '0.6';
      }
    };

    const onClick = (e) => {
      if (!rippleRef.current) return;
      rippleRef.current.style.left = `${e.clientX}px`;
      rippleRef.current.style.top = `${e.clientY}px`;
      rippleRef.current.style.transform = `translate(-50%, -50%) scale(0)`;
      rippleRef.current.style.opacity = 1;

      requestAnimationFrame(() => {
        rippleRef.current.style.transform = `translate(-50%, -50%) scale(3)`;
        rippleRef.current.style.opacity = 0;
      });
    };

    const animate = () => {
      // Dot (sharp + glow)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
        if (hasMoved) {
          dotRef.current.style.opacity = '1';
        }
      }

      // Smooth lagging ring
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.15);

      if (ringRef.current) {
        const size = hovering ? 50 : 26;

        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px) scale(${hovering ? 1.2 : 1})`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        if (hasMoved) {
          ringRef.current.style.opacity = hovering ? '1' : '0.6';
        }

        // COOL EFFECTS
        ringRef.current.style.borderColor = hovering
          ? 'rgba(168,85,247,0.9)'
          : 'rgba(99,102,241,0.7)';

        ringRef.current.style.boxShadow = hovering
          ? '0 0 25px rgba(168,85,247,0.8), 0 0 60px rgba(168,85,247,0.4)'
          : '0 0 12px rgba(99,102,241,0.5)';

        ringRef.current.style.backdropFilter = hovering
          ? 'blur(6px)'
          : 'blur(2px)';
      }

      animId.current = requestAnimationFrame(animate);
    };

    const onEnter = (e) => {
      setHovering(true);

      // MAGNET EFFECT
      const rect = e.target.getBoundingClientRect();
      pos.current.x = rect.left + rect.width / 2;
      pos.current.y = rect.top + rect.height / 2;
    };

    const onLeave = () => setHovering(false);

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);

    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(animId.current);
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* DOT */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 0 12px var(--accent-primary), 0 0 20px var(--accent-secondary)',
          zIndex: 99999,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* RING */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 26,
          height: 26,
          borderRadius: '50%',
          border: '1px solid rgba(168,85,247,0.7)',
          zIndex: 99998,
          pointerEvents: 'none',
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          opacity: 0,
        }}
      />

      {/* CLICK RIPPLE */}
      <div
        ref={rippleRef}
        style={{
          position: 'fixed',
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: '2px solid var(--accent-primary)',
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 99997,
          transition: 'transform 0.4s ease, opacity 0.4s ease',
        }}
      />
    </>
  );
}