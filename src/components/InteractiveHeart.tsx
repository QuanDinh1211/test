import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { content } from '@/content.config';
import { SectionWrapper, RevealItem, HeartIcon, BurstHearts, type BurstHeart } from './effects';

export function InteractiveHeart() {
  const [count, setCount] = useState(0);
  const [bursts, setBursts] = useState<BurstHeart[][]>([]);
  const idCounter = useRef(0);

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
    const burstId = idCounter.current++;
    const newHearts: BurstHeart[] = Array.from({ length: 8 }, (_, i) => ({
      id: burstId * 100 + i,
      angle: (i / 8) * 360 + Math.random() * 30,
      distance: 80 + Math.random() * 60,
      size: 16 + Math.random() * 14,
    }));
    setBursts((prev) => [...prev, newHearts]);
    setTimeout(() => {
      setBursts((prev) => prev.slice(1));
    }, 1000);
  }, []);

  return (
    <SectionWrapper
      id={content.interactiveHeart.id}
      className="flex flex-col items-center px-6 py-24"
      bg="linear-gradient(180deg, #fff0f5 0%, #fbcfe0 30%, #ffe4ec 70%, #fff5f7 100%)"
    >
      <RevealItem className="mb-8 text-center">
        <h2 className="font-calligraphy text-4xl text-rose-500 sm:text-5xl">
          {content.interactiveHeart.title}
        </h2>
        <p className="mt-2 font-script text-lg text-rose-400">
          Chạm vào trái tim để anh gửi em một cái ôm 💗
        </p>
      </RevealItem>

      {/* Big interactive heart */}
      <RevealItem delay={0.2}>
        <div className="relative flex items-center justify-center">
          {/* Ripple rings */}
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border-2 border-rose-300/50"
              animate={{
                scale: count > 0 ? [1, 1.8, 1] : 1,
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                delay: ring * 0.3,
                repeat: Infinity,
              }}
              style={{ width: 120, height: 120 }}
            />
          ))}

          <motion.button
            className="relative z-10 flex items-center justify-center"
            onClick={handleClick}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <HeartIcon className="text-rose-500 drop-shadow-lg" size={120} />
            </motion.div>
          </motion.button>

          {/* Burst hearts */}
          {bursts.map((burst, i) => (
            <BurstHearts key={i} hearts={burst} />
          ))}
        </div>
      </RevealItem>

      {/* Counter */}
      <RevealItem delay={0.4}>
        <motion.div
          className="mt-12 glass-card rounded-full px-8 py-4 soft-shadow"
          key={count}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-body text-base text-rose-600 sm:text-lg">
            {content.interactiveHeart.counterText}{' '}
            <span className="font-serif-display text-2xl font-bold text-gradient-rose sm:text-3xl">
              {count.toLocaleString('vi-VN')}
            </span>{' '}
            {content.interactiveHeart.counterSuffix}
          </p>
        </motion.div>
      </RevealItem>

      {count >= 10 && count < 50 && (
        <motion.p
          className="mt-6 font-script text-lg text-rose-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Em chạm nhiều hơn nữa đi 💗
        </motion.p>
      )}
      {count >= 50 && (
        <motion.p
          className="mt-6 font-script text-lg text-rose-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Anh biết em đang cười rồi 😊💗
        </motion.p>
      )}
    </SectionWrapper>
  );
}
