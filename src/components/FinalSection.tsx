import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '@/content.config';
import { SectionWrapper, RevealItem, Confetti, HeartIcon, Sparkles } from './effects';

export function FinalSection() {
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setConfetti(true), 1500);
    const stopTimer = setTimeout(() => setConfetti(false), 6000);
    return () => {
      clearTimeout(timer);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <SectionWrapper
      id={content.final.id}
      className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-32 text-center"
      bg="linear-gradient(180deg, #1a0a14 0%, #2d0a1f 30%, #4a0a2e 60%, #1a0a14 100%)"
    >
      {/* Floating hearts on dark */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${Math.random() * 100}%` }}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '-10%', opacity: [0, 1, 0] }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Infinity,
            }}
          >
            <HeartIcon
              className="text-rose-400/40"
              size={12 + Math.random() * 16}
            />
          </motion.div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-200/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
            }}
          >
            <span className="text-sm">✦</span>
          </motion.div>
        ))}
      </div>

      {/* Glowing rose decoration */}
      <motion.div
        className="absolute top-10 left-1/2 -translate-x-1/2 text-5xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🌹
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Date */}
        <RevealItem>
          <motion.p
            className="font-calligraphy text-6xl text-rose-300/80 sm:text-8xl"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {content.final.date}
          </motion.p>
        </RevealItem>

        {/* Title */}
        <RevealItem delay={0.2}>
          <h2 className="font-calligraphy text-4xl text-gradient-shimmer sm:text-6xl md:text-7xl">
            {content.final.title}
          </h2>
        </RevealItem>

        {/* Wish */}
        <RevealItem delay={0.4}>
          <p className="font-script text-2xl text-rose-200 sm:text-3xl">
            {content.final.wish}
          </p>
        </RevealItem>

        {/* And then... */}
        <RevealItem delay={0.6}>
          <p className="font-script text-xl text-rose-300/70 sm:text-2xl">
            {content.final.andThen}
          </p>
        </RevealItem>

        {/* Poem */}
        <div className="mt-4 space-y-2">
          {content.final.poem.map((line, i) => (
            <RevealItem key={i} delay={0.8 + i * 0.3}>
              <p className="font-script text-lg text-rose-200/90 sm:text-xl">
                {line}
              </p>
            </RevealItem>
          ))}
        </div>

        {/* Heart divider */}
        <RevealItem delay={2}>
          <motion.div
            className="mt-8 flex items-center gap-3"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400" />
            <HeartIcon className="text-rose-400" size={20} />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-400" />
          </motion.div>
        </RevealItem>

        {/* Signature */}
        <RevealItem delay={2.5}>
          <p className="mt-4 font-body text-sm tracking-widest text-rose-300/60 uppercase">
            {content.final.signature}
          </p>
        </RevealItem>
      </div>

      <Confetti active={confetti} count={120} />
    </SectionWrapper>
  );
}
