import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * Renders a full-screen cinematic radial ripple that expands from
 * the theme toggle button position when the theme is switched.
 * Mount this once as a global overlay in App.jsx.
 */
export default function ThemeRipple() {
  const { ripple } = useTheme();

  // diameter large enough to cover any screen
  const SIZE = '250vmax';

  return (
    <AnimatePresence>
      {ripple && (
        <motion.div
          key={ripple.key}
          initial={{
            width: 0,
            height: 0,
            x: ripple.x,
            y: ripple.y,
            borderRadius: '50%',
            opacity: 1,
          }}
          animate={{
            width: SIZE,
            height: SIZE,
            x: `calc(${ripple.x}px - 125vmax)`,
            y: `calc(${ripple.y}px - 125vmax)`,
            opacity: [1, 1, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 0.7, times: [0, 0.6, 1] },
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            background: ripple.color,
            zIndex: 99997,
            pointerEvents: 'none',
            willChange: 'transform, opacity',
          }}
        />
      )}
    </AnimatePresence>
  );
}
