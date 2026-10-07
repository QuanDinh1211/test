import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/content.config';
import { SectionWrapper, RevealItem, HeartIcon, Confetti } from './effects';

export function SecretMessage({ onEasterEggFound }: { onEasterEggFound?: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const clickCount = useRef(0);

  const handleClick = () => {
    clickCount.current += 1;
    setGlitching(true);
    setTimeout(() => setGlitching(false), 400);

    if (clickCount.current >= 1) {
      setRevealed(true);
      setConfetti(true);
      onEasterEggFound?.();
      setTimeout(() => setConfetti(false), 3000);
    }
  };

  return (
    <SectionWrapper
      id={content.secretMessage.id}
      className="flex flex-col items-center px-6 py-24"
      bg="linear-gradient(180deg, #fff5f7 0%, #1a0a14 40%, #2d0a1f 70%, #1a0a14 100%)"
    >
      {/* Decorative stars */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1, 0.5] }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          >
            <span className="text-xs text-rose-200/60">✦</span>
          </motion.div>
        ))}
      </div>

      <RevealItem className="mb-12 text-center">
        {!revealed ? (
          <motion.button
            className={`relative font-mono text-3xl font-bold tracking-widest text-rose-300/70 transition sm:text-4xl ${
              glitching ? 'animate-wiggle' : ''
            }`}
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {content.secretMessage.buttonText}
            <motion.div
              className="absolute inset-0 font-mono text-3xl font-bold tracking-widest text-rose-400/40 sm:text-4xl"
              animate={glitching ? { x: [0, -3, 3, 0], y: [0, 2, -2, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              {content.secretMessage.buttonText}
            </motion.div>
          </motion.button>
        ) : null}
      </RevealItem>

      <AnimatePresence>
        {revealed && (
          <motion.div
            className="relative z-10 max-w-lg text-center"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
          >
            {/* Glass card on dark bg */}
            <div className="glass-card-dark rounded-2xl px-8 py-12 soft-shadow">
              <motion.div
                className="mb-6 flex justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <HeartIcon className="text-rose-400" size={40} />
              </motion.div>

              <h3 className="font-calligraphy text-3xl text-rose-200 sm:text-4xl">
                {content.secretMessage.title}
              </h3>
              <p className="mt-6 font-script text-xl text-rose-300 sm:text-2xl">
                {content.secretMessage.body}
              </p>
            </div>

            <motion.p
              className="mt-6 font-body text-sm text-rose-300/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Tìm thấy bí mật rồi à? 💗 Còn nhiều hơn nữa...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <Confetti active={confetti} count={80} />
    </SectionWrapper>
  );
}

// ── Easter Egg: hidden heart ──
export function HiddenHeart({ onFound }: { onFound: () => void }) {
  const [found, setFound] = useState(false);

  if (found) return null;

  return (
    <motion.div
      className="fixed bottom-20 right-4 z-40 cursor-pointer opacity-30 transition hover:opacity-100"
      onClick={() => {
        setFound(true);
        onFound();
      }}
      whileHover={{ scale: 1.5 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 5 }}
    >
      <HeartIcon className="text-rose-300" size={16} />
    </motion.div>
  );
}
