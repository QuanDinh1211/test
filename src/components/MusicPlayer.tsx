import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/content.config';
import { Music, Volume2, VolumeX } from 'lucide-react';

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasMusic = Boolean(content.music.src);

  useEffect(() => {
    if (hasMusic && audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, [hasMusic]);

  const toggle = () => {
    setShowHint(false);
    if (!hasMusic || !audioRef.current) {
      setPlaying((p) => !p);
      return;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        setPlaying(false);
      });
      setPlaying(true);
    }
  };

  return (
    <>
      {hasMusic && (
        <audio ref={audioRef} src={content.music.src} loop preload="auto" />
      )}

      <motion.div
        className="fixed bottom-6 right-6 z-[80] flex items-center gap-3"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <AnimatePresence>
          {showHint && (
            <motion.div
              className="glass-card rounded-full px-4 py-2 soft-shadow"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <span className="font-body text-xs text-rose-600">
                Bật nhạc 💗
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-500 text-white soft-shadow transition hover:scale-110 active:scale-95"
          onClick={toggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={playing ? { duration: 4, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
          >
            {playing ? (
              hasMusic ? (
                <Volume2 size={22} />
              ) : (
                <Music size={22} />
              )
            ) : (
              <VolumeX size={22} />
            )}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Music note particles when playing */}
      <AnimatePresence>
        {playing && (
          <div className="pointer-events-none fixed bottom-6 right-6 z-[79]">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-rose-400"
                initial={{ x: 24, y: 24, opacity: 0, scale: 0.5 }}
                animate={{
                  x: 24 + (Math.random() - 0.5) * 80,
                  y: 24 - 60 - Math.random() * 80,
                  opacity: [0, 1, 0],
                  scale: 1,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.4,
                  repeat: Infinity,
                }}
              >
                <Music size={16} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
