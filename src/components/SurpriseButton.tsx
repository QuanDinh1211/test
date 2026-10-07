import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/content.config';
import { SectionWrapper, RevealItem, Confetti, HeartIcon, FloatingHearts } from './effects';

export function SurpriseButton() {
  const [revealed, setRevealed] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleClick = () => {
    setRevealed(true);
    setShowHearts(true);
    setConfetti(true);
    setTimeout(() => setShowHearts(false), 5000);
  };

  return (
    <SectionWrapper
      id={content.surprise.id}
      className="flex flex-col items-center justify-center px-6 py-24"
      bg={revealed ? 'linear-gradient(180deg, #fff0f5 0%, #fbcfe0 50%, #ffe4ec 100%)' : 'linear-gradient(180deg, #fff5f7 0%, #ffe4ec 100%)'}
    >
      <RevealItem className="mb-12 text-center">
        <h2 className="font-script text-3xl text-rose-500 sm:text-4xl">
          {content.surprise.title}
        </h2>
      </RevealItem>

      {!revealed ? (
        <RevealItem delay={0.2}>
          <motion.button
            className="relative flex flex-col items-center gap-2 rounded-3xl bg-gradient-to-br from-rose-400 to-rose-500 px-10 py-8 soft-shadow transition"
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-5xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎁
            </motion.span>
            <span className="font-body text-base font-semibold text-white sm:text-lg">
              Nhấn vào đây
            </span>
            <motion.div
              className="absolute inset-0 rounded-3xl"
              animate={{ boxShadow: ['0 0 0 0 rgba(244,114,182,0.4)', '0 0 0 20px rgba(244,114,182,0)'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>
        </RevealItem>
      ) : (
        <AnimatePresence>
          <motion.div
            className="flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <span className="text-6xl">🎁</span>
            </motion.div>

            <motion.h3
              className="font-calligraphy text-4xl text-gradient-rose sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {content.surprise.revealTitle}
            </motion.h3>

            <motion.p
              className="max-w-md font-script text-xl text-rose-600 sm:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {content.surprise.revealMessage}
            </motion.p>

            <motion.div
              className="mt-4 flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <HeartIcon className="animate-heartbeat text-rose-400" size={28} />
              <HeartIcon className="animate-heartbeat text-rose-500" size={32} />
              <HeartIcon className="animate-heartbeat text-rose-400" size={28} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {showHearts && <FloatingHearts count={30} />}
      <Confetti active={confetti} count={150} />
    </SectionWrapper>
  );
}
