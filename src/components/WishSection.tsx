import { motion } from 'framer-motion';
import { content } from '@/content.config';
import { SectionWrapper, RevealItem } from './effects';
import { Smile, Flower2, Heart, Sparkles, Moon } from 'lucide-react';

const iconMap: Record<string, typeof Smile> = {
  smile: Smile,
  flower: Flower2,
  heart: Heart,
  sparkles: Sparkles,
  moon: Moon,
};

export function WishSection() {
  return (
    <SectionWrapper
      id={content.wishes.id}
      className="px-6 py-24"
      bg="linear-gradient(180deg, #ffe4ec 0%, #fff5f7 50%, #fff0f5 100%)"
    >
      <RevealItem className="mb-16 text-center">
        <h2 className="font-calligraphy text-4xl text-rose-500 sm:text-5xl">
          {content.wishes.title}
        </h2>
      </RevealItem>

      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-6">
        {content.wishes.cards.map((card, i) => {
          const Icon = iconMap[card.icon] ?? Heart;
          return (
            <RevealItem key={i} delay={i * 0.15}>
              <motion.div
                className="glass-card flex w-44 flex-col items-center gap-3 rounded-2xl px-5 py-8 text-center soft-shadow sm:w-52"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-rose-200"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                >
                  <Icon className="text-rose-500" size={28} />
                </motion.div>
                <p className="font-script text-lg text-rose-600 sm:text-xl">
                  {card.text}
                </p>
              </motion.div>
            </RevealItem>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
