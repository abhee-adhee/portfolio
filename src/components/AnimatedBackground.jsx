import { useEffect, useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedBackground = memo(function AnimatedBackground() {
  const canvasRef = useRef(null);
  const { scrollY } = useScroll();
  const yOrbs = useTransform(scrollY, [0, 3000], [0, 900]); // 0.3x scroll speed

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = false;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create constellation dots
    const NUM_DOTS = 35;
    for (let i = 0; i < NUM_DOTS; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: 1, // Strict 1px radius to avoid sub-pixel blurring
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move & draw dots
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,245,255,1)'; // Solid color for crisp 1px circle
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,245,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []); // Only runs once, safe because of memo

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Canvas constellation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Glow orbs - Parallax (0.3x speed) */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
        style={{
          y: yOrbs,
          background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full"
        style={{
          y: yOrbs,
          background: 'radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid" />
    </div>
  );
});

export default AnimatedBackground;