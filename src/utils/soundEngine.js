/**
 * soundEngine.js — Web Audio API synthesizer.
 * No audio files required. All sounds generated programmatically.
 *
 * Usage:
 *   import { playClick, playHover, playSuccess, ... } from './soundEngine';
 *   playClick();
 */

let ctx = null;
let enabled = false;
let unlocked = false;

// Attempt to unlock audio on first user gesture
if (typeof window !== 'undefined') {
  window.addEventListener('click', () => {
    unlocked = true;
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }, { once: true });
}

function getCtx() {
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (_) {
      // AudioContext blocked or unsupported
      return null;
    }
  }
  return ctx;
}

export function setSoundEnabled(on) {
  enabled = !!on;
}

export function isSoundEnabled() {
  return enabled;
}

/* ── internal helpers ─────────────────────────────── */

function tone({ freq = 440, type = 'sine', gain = 0.15, duration = 0.08, startGain, endGain, detune = 0, delay = 0 } = {}) {
  if (!enabled || !unlocked) return;
  try {
    const ac = getCtx();
    if (!ac) return;
    const osc = ac.createOscillator();
    const amp = ac.createGain();

    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;

    const t = ac.currentTime + delay;
    amp.gain.setValueAtTime(startGain ?? gain, t);
    amp.gain.exponentialRampToValueAtTime(endGain ?? 0.001, t + duration);

    osc.connect(amp);
    amp.connect(ac.destination);
    osc.start(t);
    osc.stop(t + duration + 0.01);
  } catch (_) { /* silently fail if AudioContext blocked */ }
}

function noise({ duration = 0.06, gain = 0.06, filter = 2000, delay = 0 } = {}) {
  if (!enabled || !unlocked) return;
  try {
    const ac = getCtx();
    if (!ac) return;
    const bufSize = Math.floor(ac.sampleRate * duration);
    const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

    const src = ac.createBufferSource();
    src.buffer = buf;

    const flt = ac.createBiquadFilter();
    flt.type = 'lowpass';
    flt.frequency.value = filter;

    const amp = ac.createGain();
    const t = ac.currentTime + delay;
    amp.gain.setValueAtTime(gain, t);
    amp.gain.exponentialRampToValueAtTime(0.001, t + duration);

    src.connect(flt);
    flt.connect(amp);
    amp.connect(ac.destination);
    src.start(t);
  } catch (_) {}
}

/* ── Public sound effects ─────────────────────────── */

/** UI click / button press */
export function playClick() {
  tone({ freq: 880,  type: 'square',   gain: 0.08, duration: 0.06 });
  tone({ freq: 1200, type: 'sine',     gain: 0.04, duration: 0.04, delay: 0.03 });
}

let lastHoverTime = 0;
/** Subtle hover blip */
export function playHover() {
  const now = performance.now();
  if (now - lastHoverTime < 50) return; // 50ms throttle
  lastHoverTime = now;
  tone({ freq: 660, type: 'sine', gain: 0.05, duration: 0.04 });
}

/** Navigation / page transition whoosh */
export function playNav() {
  tone({ freq: 300, type: 'sine', gain: 0.08, startGain: 0.08, endGain: 0.001, duration: 0.18 });
  tone({ freq: 600, type: 'sine', gain: 0.05, duration: 0.12, delay: 0.04 });
}

/** Success / confirmation chime */
export function playSuccess() {
  tone({ freq: 523, type: 'sine', gain: 0.1, duration: 0.12 });
  tone({ freq: 659, type: 'sine', gain: 0.1, duration: 0.12, delay: 0.1 });
  tone({ freq: 783, type: 'sine', gain: 0.1, duration: 0.18, delay: 0.2 });
}

/** Error / deny buzz */
export function playError() {
  tone({ freq: 160, type: 'sawtooth', gain: 0.1, duration: 0.12 });
  tone({ freq: 120, type: 'sawtooth', gain: 0.1, duration: 0.1, delay: 0.1 });
}

/** Typing / keypress tick */
export function playTyping() {
  tone({ freq: 900 + Math.random() * 200, type: 'square', gain: 0.03, duration: 0.025 });
}

/** Konami / easter egg fanfare */
export function playKonami() {
  [0, 0.12, 0.24, 0.36, 0.52].forEach((delay, i) => {
    tone({ freq: [523, 659, 783, 1046, 1318][i], type: 'sine', gain: 0.12, duration: 0.14, delay });
  });
}

/** Theme toggle swoosh */
export function playThemeToggle() {
  tone({ freq: 440, type: 'sine', startGain: 0.12, endGain: 0.001, duration: 0.2 });
  tone({ freq: 880, type: 'sine', gain: 0.06, duration: 0.1, delay: 0.1 });
}

/** Sound toggle on */
export function playSoundOn() {
  tone({ freq: 523, type: 'sine', gain: 0.12, duration: 0.1 });
  tone({ freq: 783, type: 'sine', gain: 0.1,  duration: 0.12, delay: 0.08 });
}

/** Sound toggle off — quiet click only (happens before mute takes effect) */
export function playSoundOff() {
  tone({ freq: 440, type: 'sine', gain: 0.08, duration: 0.06 });
  tone({ freq: 330, type: 'sine', gain: 0.06, duration: 0.06, delay: 0.05 });
}

/** Data/glitch zap — used for classified hover, etc. */
export function playGlitch() {
  noise({ duration: 0.04, gain: 0.08, filter: 4000 });
  tone({ freq: 1800, type: 'sawtooth', gain: 0.04, duration: 0.04, delay: 0.01 });
}
