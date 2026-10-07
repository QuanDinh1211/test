import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { content } from '@/content.config';
import { SectionWrapper, RevealItem, HeartIcon } from './effects';

export function MiniGame() {
  const [value, setValue] = useState(50);
  const max = 1000;

  const isMaxed = value >= max;

  const heartCount = useMemo(() => {
    return Math.floor((value / max) * 15) + 1;
  }, [value]);

  const displayNumber = useMemo(() => {
    if (isMaxed) return '∞';
    const base = value * 37; // arbitrary scaling for fun
    return base.toLocaleString('vi-VN');
  }, [value, isMaxed]);

  const bgIntensity = (value / max) * 100;

  return (
    <SectionWrapper
      id={content.miniGame.id}
      className="flex flex-col items-center px-6 py-24"
      bg={`linear-gradient(180deg, #fff0f5 0%, #ffe4ec ${20 + bgIntensity * 0.3}%, #fbcfe0 ${40 + bgIntensity * 0.4}%, #fff0f5 100%)`}
    >
      <RevealItem className="mb-12 text-center">
        <h2 className="font-calligraphy text-4xl text-rose-500 sm:text-5xl">
          {content.miniGame.title}
        </h2>
        <p className="mt-3 font-script text-lg text-rose-400">
          {content.miniGame.hint}
        </p>
      </RevealItem>

      <RevealItem delay={0.2} className="w-full max-w-xl">
        <div className="glass-card rounded-3xl px-6 py-12 soft-shadow sm:px-12">
          {/* Number display */}
          <motion.div
            className="mb-8 text-center"
            key={isMaxed ? 'max' : value}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-2 flex items-center justify-center gap-2">
              {Array.from({ length: Math.min(heartCount, 15) }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="text-lg sm:text-xl"
                >
                  💗
                </motion.span>
              ))}
            </div>
            <motion.span
              className={`font-serif-display font-bold text-gradient-rose ${
                isMaxed ? 'text-7xl sm:text-8xl' : 'text-5xl sm:text-7xl'
              }`}
              animate={isMaxed ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {displayNumber}
            </motion.span>
            {!isMaxed && (
              <p className="mt-2 font-body text-sm text-rose-400">
                ...và còn tăng nữa 💗
              </p>
            )}
          </motion.div>

          {/* Slider */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-body text-rose-400">
              <span>0</span>
              <span>∞</span>
            </div>
            <input
              type="range"
              min={0}
              max={max}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="love-slider w-full"
              style={{
                background: `linear-gradient(to right, #fbcfe0 0%, #ec4899 ${value / max * 100}%, #fbcfe0 ${value / max * 100}%, #fbcfe0 100%)`,
              }}
            />
          </div>

          {/* Reveal message */}
          <AnimatePresenceMaxed isMaxed={isMaxed} />

          {/* Big heart */}
          <div className="mt-8 flex justify-center">
            <motion.div
              animate={{
                scale: isMaxed ? [1, 1.3, 1] : 1 + (value / max) * 0.3,
              }}
              transition={{ duration: 1.5, repeat: isMaxed ? Infinity : 0 }}
            >
              <HeartIcon
                className={isMaxed ? 'text-rose-600' : 'text-rose-400'}
                size={48 + (value / max) * 32}
              />
            </motion.div>
          </div>
        </div>
      </RevealItem>
    </SectionWrapper>
  );
}

function AnimatePresenceMaxed({ isMaxed }: { isMaxed: boolean }) {
  return (
    <motion.div
      className="mt-6 text-center"
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: isMaxed ? 1 : 0,
        height: isMaxed ? 'auto' : 0,
      }}
      transition={{ duration: 0.5 }}
    >
      {isMaxed && (
        <motion.p
          className="font-script text-xl text-rose-600 sm:text-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {content.miniGame.infiniteMessage}
        </motion.p>
      )}
    </motion.div>
  );
}
