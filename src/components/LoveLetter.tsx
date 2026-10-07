import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/content.config';
import { SectionWrapper, RevealItem, HeartIcon } from './effects';

export function LoveLetter() {
  const [opened, setOpened] = useState(false);
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpened(true);
  };

  useEffect(() => {
    if (!opened) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    content.loveLetter.paragraphs.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleParagraphs(i + 1), 600 + i * 700)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [opened]);

  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [opened]);

  return (
    <SectionWrapper
      id={content.loveLetter.id}
      className="flex flex-col items-center px-6 py-24"
      bg="linear-gradient(180deg, #fff5f7 0%, #ffe4ec 50%, #fff5f7 100%)"
    >
      <RevealItem className="mb-12 text-center">
        <h2 className="font-calligraphy text-4xl text-rose-500 sm:text-5xl">
          {content.loveLetter.title}
        </h2>
      </RevealItem>

      {!opened ? (
        <RevealItem>
          <Envelope onOpen={handleOpen} />
        </RevealItem>
      ) : (
        <AnimatePresence>
          <motion.div
            ref={letterRef}
            className="relative w-full max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Letter paper */}
            <div
              className="relative rounded-lg bg-gradient-to-b from-cream-50 to-cream-100 px-6 py-12 sm:px-12 sm:py-16"
              style={{
                boxShadow:
                  '0 4px 24px rgba(131,24,67,0.15), inset 0 0 60px rgba(252,207,224,0.2)',
                backgroundImage:
                  'repeating-linear-gradient(transparent, transparent 31px, rgba(244,114,182,0.08) 31px, rgba(244,114,182,0.08) 32px)',
              }}
            >
              {/* Decorative corner */}
              <div className="absolute top-4 right-4 text-2xl opacity-50">🌷</div>
              <div className="absolute bottom-4 left-4 text-2xl opacity-50">💗</div>

              <div className="space-y-4">
                {content.loveLetter.paragraphs.slice(0, visibleParagraphs).map((para, i) => (
                  <motion.p
                    key={i}
                    className={
                      para.startsWith('—')
                        ? 'font-script text-lg text-rose-500 sm:text-xl'
                        : i === 0
                        ? 'font-script text-xl text-rose-600 sm:text-2xl'
                        : 'font-body text-base leading-relaxed text-rose-700 sm:text-lg'
                    }
                    style={{ lineHeight: '180%' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {visibleParagraphs < content.loveLetter.paragraphs.length && (
                <motion.div
                  className="mt-4 flex items-center gap-2 text-rose-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <HeartIcon size={16} />
                  <span className="text-sm font-body italic">Đang viết tiếp...</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </SectionWrapper>
  );
}

function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    setOpening(true);
    setTimeout(onOpen, 800);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        className="relative cursor-pointer"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.div
          animate={opening ? { y: -60, opacity: 0, rotateX: 180 } : {}}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: 'top' }}
          className="relative z-20"
        >
          {/* Envelope body */}
          <div className="relative h-40 w-64 rounded-lg bg-gradient-to-b from-rose-200 to-rose-300 soft-shadow sm:h-48 sm:w-80">
            {/* Flap */}
            <div
              className="absolute inset-x-0 top-0 h-0"
              style={{
                borderLeft: '128px solid transparent',
                borderRight: '128px solid transparent',
                borderTop: '64px solid #f8b4d9',
              }}
            />
            <div
              className="absolute inset-x-0 top-0 h-0 sm:hidden"
              style={{
                borderLeft: '160px solid transparent',
                borderRight: '160px solid transparent',
                borderTop: '80px solid #f8b4d9',
              }}
            />
            {/* Heart seal */}
            <div className="absolute left-1/2 top-12 -translate-x-1/2 text-3xl">💗</div>
            {/* Bottom triangles */}
            <div
              className="absolute bottom-0 left-0 h-0 w-0"
              style={{
                borderRight: '64px solid transparent',
                borderBottom: '64px solid #fbcfe0',
              }}
            />
            <div
              className="absolute bottom-0 right-0 h-0 w-0"
              style={{
                borderLeft: '64px solid transparent',
                borderBottom: '64px solid #fbcfe0',
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        className="rounded-full bg-gradient-to-r from-rose-400 to-rose-500 px-8 py-3 font-body text-base font-semibold text-white soft-shadow transition hover:scale-105 active:scale-95"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {content.loveLetter.openButton}
      </motion.button>
    </div>
  );
}
