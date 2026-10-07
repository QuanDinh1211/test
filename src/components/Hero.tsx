import { motion } from 'framer-motion';
import { content } from '@/content.config';
import { Sparkles, HeartIcon } from './effects';

export function Hero() {
  const scrollToLetter = () => {
    const el = document.getElementById(content.hero.ctaTarget);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-blush-100 to-rose-200 px-6 py-20">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(244,114,182,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(252,207,224,0.4) 0%, transparent 50%)',
        }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <Sparkles count={25} />

      {/* Floating decorative hearts */}
      <FloatingDecorHearts />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Date badge */}
        <motion.div
          className="glass-card flex items-center gap-2 rounded-full px-6 py-2 soft-shadow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <HeartIcon className="animate-heartbeat text-rose-400" size={18} />
          <span className="font-body text-sm font-semibold tracking-widest text-rose-500">
            {content.hero.date}
          </span>
          <HeartIcon className="animate-heartbeat text-rose-400" size={18} />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-calligraphy text-5xl leading-tight text-gradient-shimmer sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {content.hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="max-w-lg font-script text-xl text-rose-500 sm:text-2xl md:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {content.hero.subtitle}
        </motion.p>

        {/* CTA button */}
        <motion.button
          className="mt-6 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 px-8 py-4 font-body text-base font-semibold text-white soft-shadow transition hover:scale-105 active:scale-95 sm:text-lg"
          onClick={scrollToLetter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {content.hero.ctaButton}
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs font-body text-rose-400">Cuộn xuống nhé 💗</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-rose-400">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingDecorHearts() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {[
        { left: '10%', top: '20%', delay: 0, size: 20, duration: 4 },
        { left: '85%', top: '15%', delay: 1, size: 16, duration: 5 },
        { left: '15%', top: '70%', delay: 2, size: 24, duration: 4.5 },
        { left: '80%', top: '65%', delay: 0.5, size: 18, duration: 5.5 },
        { left: '50%', top: '10%', delay: 1.5, size: 14, duration: 6 },
      ].map((h, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: h.left, top: h.top }}
          animate={{ y: [0, -15, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity }}
        >
          <HeartIcon className="text-rose-300" size={h.size} />
        </motion.div>
      ))}
    </div>
  );
}
