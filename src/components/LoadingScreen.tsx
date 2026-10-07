import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/content.config';
import { HeartIcon } from './effects';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setReady(true), 400);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-romantic-gradient"
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
      >
        {!ready ? (
          <motion.div
            className="flex flex-col items-center gap-8 px-6"
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <HeartIcon className="text-rose-400" size={56} />
            </motion.div>

            <p className="font-script text-xl text-rose-600 text-center sm:text-2xl">
              {content.loading.message}
            </p>

            <div className="w-56 h-2 rounded-full bg-rose-100 overflow-hidden sm:w-64">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-rose-300 via-rose-400 to-rose-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm font-body text-rose-400">{progress}%</p>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center gap-8 px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HeartIcon className="text-rose-500" size={48} />
            </motion.div>

            <h2 className="font-calligraphy text-4xl text-rose-600 sm:text-5xl">
              {content.loading.readyText}
            </h2>

            <motion.button
              className="rounded-full bg-gradient-to-r from-rose-400 to-rose-500 px-10 py-4 font-body text-lg font-semibold text-white soft-shadow transition hover:scale-105 active:scale-95"
              onClick={onComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {content.loading.beginButton}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
