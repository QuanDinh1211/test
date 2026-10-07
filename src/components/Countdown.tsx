import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/content.config';
import { SectionWrapper, RevealItem, Confetti, HeartIcon } from './effects';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft | null {
  const now = new Date();
  const year = now.getFullYear();
  const birthday = new Date(year, content.birthday.month - 1, content.birthday.day, 0, 0, 0);

  // If birthday has passed this year, target next year
  if (now > birthday) {
    birthday.setFullYear(year + 1);
  }

  // Check if today is the birthday
  if (
    now.getMonth() === content.birthday.month - 1 &&
    now.getDate() === content.birthday.day
  ) {
    return null; // It's birthday!
  }

  const diff = birthday.getTime() - now.getTime();
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isBirthday, setIsBirthday] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const update = () => {
      const tl = calculateTimeLeft();
      if (tl === null) {
        setIsBirthday(true);
        setCelebrate(true);
      } else {
        setTimeLeft(tl);
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'Ngày', value: timeLeft?.days ?? 0 },
    { label: 'Giờ', value: timeLeft?.hours ?? 0 },
    { label: 'Phút', value: timeLeft?.minutes ?? 0 },
    { label: 'Giây', value: timeLeft?.seconds ?? 0 },
  ];

  return (
    <SectionWrapper
      className="flex flex-col items-center justify-center px-6 py-24"
      bg="linear-gradient(180deg, #ffe4ec 0%, #fff5f7 100%)"
    >
      <RevealItem className="mb-12 text-center">
        <h2 className="font-calligraphy text-4xl text-rose-500 sm:text-5xl">
          {content.countdown.title}
        </h2>
      </RevealItem>

      <AnimatePresence mode="wait">
        {isBirthday ? (
          <motion.div
            key="birthday"
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-6xl">🎂</span>
            </motion.div>
            <h3 className="font-calligraphy text-4xl text-gradient-rose sm:text-6xl">
              {content.countdown.birthdayMessage}
            </h3>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <HeartIcon className="text-rose-500" size={40} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="countdown"
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
            exit={{ opacity: 0 }}
          >
            {units.map((unit, i) => (
              <RevealItem key={unit.label} delay={i * 0.1}>
                <div className="glass-card flex flex-col items-center rounded-2xl px-5 py-6 soft-shadow sm:px-8 sm:py-8">
                  <motion.span
                    className="font-serif-display text-4xl font-bold text-rose-600 sm:text-6xl"
                    key={unit.value}
                    initial={{ scale: 1.2, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.span>
                  <span className="mt-2 font-body text-xs font-medium tracking-widest text-rose-400 uppercase sm:text-sm">
                    {unit.label}
                  </span>
                </div>
              </RevealItem>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Confetti active={celebrate} count={100} />
    </SectionWrapper>
  );
}
