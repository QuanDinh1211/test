import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/content.config';
import { Confetti, FloatingHearts, Sparkles, HeartIcon } from './effects';

export function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [opening, setOpening] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(() => setConfetti(true), 600);
    setTimeout(() => onComplete(), 2800);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[150] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-blush-100 to-rose-200"
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8 }}
      >
        <Sparkles count={15} />
        <FloatingHearts count={8} />

        {!opening ? (
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Gift Box */}
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <GiftBox />
            </motion.div>

            <h1 className="font-calligraphy text-4xl leading-tight text-gradient-rose sm:text-6xl md:text-7xl">
              {content.intro.title}
            </h1>

            <p className="max-w-md font-script text-lg text-rose-500 sm:text-2xl">
              {content.intro.subtitle}
            </p>

            <motion.button
              className="mt-4 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 px-8 py-4 font-body text-base font-semibold text-white soft-shadow transition hover:scale-105 active:scale-95 sm:text-lg"
              onClick={handleOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {content.intro.openGiftButton}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Opening animation */}
            <motion.div
              className="relative"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.3, 0] }}
              transition={{ duration: 1.5, times: [0, 0.5, 1] }}
            >
              {/* Lid flying off */}
              <motion.div
                className="absolute -top-8 left-1/2 z-20 -translate-x-1/2"
                animate={{ y: [-0, -200], rotate: [-0, 45], opacity: [1, 0] }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="h-6 w-28 rounded-t-lg bg-gradient-to-b from-rose-400 to-rose-500" />
              </motion.div>

              {/* Box body */}
              <div className="relative h-24 w-28 rounded-lg bg-gradient-to-b from-rose-300 to-rose-400">
                <div className="absolute left-1/2 top-0 h-full w-5 -translate-x-1/2 bg-rose-500/40" />
                <div className="absolute left-0 top-1/2 h-5 w-full -translate-y-1/2 bg-rose-500/40" />
              </div>
            </motion.div>

            {/* Hearts flying up */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                animate={{
                  x: (Math.random() - 0.5) * 300,
                  y: -200 - Math.random() * 200,
                  opacity: 0,
                  scale: 1.5,
                }}
                transition={{ duration: 1.5, delay: 0.3 + Math.random() * 0.3 }}
              >
                <HeartIcon
                  className="text-rose-400"
                  size={16 + Math.random() * 20}
                />
              </motion.div>
            ))}

            <motion.h1
              className="mt-8 font-calligraphy text-4xl text-gradient-rose sm:text-6xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {content.intro.title}
            </motion.h1>
          </motion.div>
        )}

        <Confetti active={confetti} count={60} />
      </motion.div>
    </AnimatePresence>
  );
}

function GiftBox() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Lid */}
      <div className="relative -mb-2 z-10">
        <div className="h-8 w-28 rounded-lg bg-gradient-to-b from-rose-400 to-rose-500 soft-shadow">
          <div className="absolute left-1/2 top-1/2 h-8 w-6 -translate-x-1/2 -translate-y-1/2 rounded bg-rose-600/50" />
        </div>
      </div>
      {/* Body */}
      <div className="relative h-24 w-28 rounded-lg bg-gradient-to-b from-rose-300 to-rose-400 soft-shadow">
        <div className="absolute left-1/2 top-0 h-full w-5 -translate-x-1/2 bg-rose-500/40" />
        <div className="absolute left-0 top-1/2 h-5 w-full -translate-y-1/2 bg-rose-500/40" />
        {/* Bow */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl">🎀</div>
      </div>
    </div>
  );
}
