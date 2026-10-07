import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/content.config';
import { SectionWrapper, RevealItem, HeartIcon, Confetti } from './effects';

export function PhotoGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [heartBurst, setHeartBurst] = useState(false);

  const handlePhotoClick = (index: number) => {
    setSelected(index);
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 2000);
  };

  const photo = selected !== null ? content.gallery.photos[selected] : null;

  return (
    <SectionWrapper
      id={content.gallery.id}
      className="px-6 py-24"
      bg="linear-gradient(180deg, #ffe4ec 0%, #fff5f7 50%, #fff0f5 100%)"
    >
      <RevealItem className="mb-4 text-center">
        <h2 className="font-calligraphy text-4xl text-rose-500 sm:text-5xl">
          {content.gallery.title}
        </h2>
      </RevealItem>
      <RevealItem delay={0.2} className="mb-16 text-center">
        <p className="font-script text-lg text-rose-400 sm:text-xl">
          {content.gallery.subtitle}
        </p>
      </RevealItem>

      {/* Masonry / Polaroid grid */}
      <div className="mx-auto max-w-5xl columns-2 gap-4 sm:columns-3 sm:gap-6 md:columns-4">
        {content.gallery.photos.map((photo, i) => (
          <RevealItem key={i} delay={(i % 4) * 0.1} className="mb-4 sm:mb-6">
            <motion.div
              className="relative cursor-pointer break-inside-avoid bg-white p-2 pb-8 polaroid-shadow sm:p-3 sm:pb-10"
              style={{ transform: `rotate(${photo.rotate}deg)` }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              transition={{ duration: 0.3 }}
              onClick={() => handlePhotoClick(i)}
            >
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-center font-script text-sm text-rose-500 sm:text-base">
                {photo.caption}
              </p>
              {/* Tape decoration */}
              <div className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-2 bg-rose-200/60" />
            </motion.div>
          </RevealItem>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {photo && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-rose-950/60 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-h-[85vh] max-w-lg"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white p-4 pb-12 rounded-lg polaroid-shadow">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="max-h-[60vh] w-full rounded object-contain"
                />
                <p className="mt-4 text-center font-script text-xl text-rose-600">
                  {photo.caption}
                </p>
              </div>

              {/* Close button */}
              <button
                className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-rose-500 soft-shadow transition hover:scale-110 active:scale-95"
                onClick={() => setSelected(null)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              {/* Navigation */}
              {selected! > 0 && (
                <button
                  className="absolute top-1/2 -left-12 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-rose-500 soft-shadow transition hover:scale-110"
                  onClick={() => setSelected(selected! - 1)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
              {selected! < content.gallery.photos.length - 1 && (
                <button
                  className="absolute top-1/2 -right-12 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-rose-500 soft-shadow transition hover:scale-110"
                  onClick={() => setSelected(selected! + 1)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </motion.div>

            {/* Floating hearts on open */}
            {heartBurst &&
              Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="pointer-events-none fixed"
                  initial={{ x: '50%', y: '50%', opacity: 1, scale: 0 }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 60}%`,
                    y: `${50 + (Math.random() - 0.5) * 60}%`,
                    opacity: 0,
                    scale: 1.5,
                  }}
                  transition={{ duration: 1.5, delay: Math.random() * 0.3 }}
                >
                  <HeartIcon className="text-rose-400" size={20 + Math.random() * 15} />
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
