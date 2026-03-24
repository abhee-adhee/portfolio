import { useEffect, useRef } from 'react';

/**
 * Magnetic button hook — attracts element toward cursor when within `radius` px.
 * @param {number} strength - Max px offset (default 12)
 * @param {number} radius   - Activation distance in px (default 60)
 */
export function useMagnetic(strength = 12, radius = 60) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const pull = (radius - dist) / radius; // 0–1
        const tx = dx * pull * (strength / radius) * radius / dist;
        const ty = dy * pull * (strength / radius) * radius / dist;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      } else {
        el.style.transform = 'translate(0px, 0px)';
      }
    };

    const onLeave = () => {
      el.style.transform = 'translate(0px, 0px)';
    };

    el.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength, radius]);

  return ref;
}
