import { useEffect, useState, useCallback, type ReactNode } from 'react';

// ── Floating Heart ──
export interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

export function FloatingHearts({ count = 12 }: { count?: number }) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const emojis = ['💗', '💕', '💖', '❤️', '🩷'];
    const arr: FloatingHeart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 14 + Math.random() * 20,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * 6,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setHearts(arr);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 animate-floatUp"
          style={{
            left: `${h.x}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            animationIterationCount: 'infinite',
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

// ── Sparkles ──
export interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export function Sparkles({ count = 20 }: { count?: number }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const arr: Sparkle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 10,
      delay: Math.random() * 3,
    }));
    setSparkles(arr);
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute animate-sparkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-rose-300">
            <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ── Confetti Burst ──
export interface ConfettiPiece {
  id: number;
  x: number;
  rotation: number;
  color: string;
  delay: number;
  duration: number;
  shape: 'circle' | 'square' | 'heart';
}

const confettiColors = ['#f472b6', '#ec4899', '#fbcfe0', '#ff84b4', '#db2777', '#fde047', '#fef08a'];

export function Confetti({ active, count = 80 }: { active: boolean; count?: number }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }
    const shapes: ConfettiPiece['shape'][] = ['circle', 'square', 'heart', 'heart'];
    const arr: ConfettiPiece[] = Array.from({ length: count }, (_, i) => ({
      id: i + Date.now(),
      x: Math.random() * 100,
      rotation: Math.random() * 360,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      delay: Math.random() * 0.5,
      duration: 3 + Math.random() * 2,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setPieces(arr);
  }, [active, count]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.x}%`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        >
          {p.shape === 'heart' ? (
            <span style={{ color: p.color, fontSize: '14px' }}>💗</span>
          ) : (
            <div
              style={{
                width: '10px',
                height: p.shape === 'square' ? '10px' : '8px',
                backgroundColor: p.color,
                borderRadius: p.shape === 'circle' ? '50%' : '2px',
                transform: `rotate(${p.rotation}deg)`,
              }}
            />
          )}
        </div>
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ── Burst Hearts (click interaction) ──
export interface BurstHeart {
  id: number;
  angle: number;
  distance: number;
  size: number;
}

export function BurstHearts({ hearts }: { hearts: BurstHeart[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute"
          style={{
            fontSize: `${h.size}px`,
            animation: `burstHeart 1s ease-out forwards`,
            ['--angle' as string]: `${h.angle}deg`,
            ['--distance' as string]: `${h.distance}px`,
          }}
        >
          💗
        </span>
      ))}
      <style>{`
        @keyframes burstHeart {
          0% { transform: translate(0,0) scale(0.5); opacity: 1; }
          100% {
            transform: translate(
              calc(cos(var(--angle)) * var(--distance)),
              calc(sin(var(--angle)) * var(--distance))
            ) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// ── Scroll Reveal Wrapper ──
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function SectionWrapper({
  id,
  children,
  className = '',
  bg = 'transparent',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bg?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative w-full ${className}`}
      style={{ background: bg }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.section>
  );
}

// ── Scroll Reveal Item ──
export function RevealItem({
  children,
  delay = 0,
  y = 40,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Typewriter ──
export function Typewriter({
  text,
  speed = 50,
  className = '',
  onDone,
}: {
  text: string;
  speed?: number;
  className?: string;
  onDone?: () => void;
}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onDone]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="animate-blink">|</span>}
    </span>
  );
}

// ── Heart Icon (SVG) ──
export function HeartIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

// ── Random sparkle on click position ──
export function useClickSparkle() {
  const [sparkles, setSparkles] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const trigger = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    setSparkles((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 1000);
  }, []);

  const ClickSparkles = () => (
    <div className="pointer-events-none fixed inset-0 z-[90]">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            animation: 'clickSparkle 0.8s ease-out forwards',
          }}
        >
          <span className="text-2xl">✨</span>
        </div>
      ))}
      <style>{`
        @keyframes clickSparkle {
          0% { transform: scale(0) translate(-50%, -50%); opacity: 1; }
          50% { transform: scale(1.5) translate(-50%, -50%); opacity: 1; }
          100% { transform: scale(0.5) translate(-50%, -100%); opacity: 0; }
        }
      `}</style>
    </div>
  );

  return { trigger, ClickSparkles };
}
